import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const openSource = {
    githubConvertedToken: process.env.GITHUB_TOKEN,
    githubUserName: process.env.GITHUB_USERNAME,
};

// Додаємо is:public у всі пошукові запити
const query_pr = {
    query: `query {
    search(first: 100, type: ISSUE, query: "is:pr author:${openSource.githubUserName} is:public sort:created-desc") {
      issueCount
      nodes {
        ... on PullRequest {
          id
          title
          url
          state
          mergedBy {
            avatarUrl
            url
            login
          }
          createdAt
          number
          changedFiles
          additions
          deletions
          baseRepository {
            name
            url
            isPrivate
            owner {
              avatarUrl
              login
              url
            }
          }
        }
      }
    }
  }`
};

const query_issue = {
    query: `query {
    search(first: 100, type: ISSUE, query: "is:issue author:${openSource.githubUserName} is:public sort:updated-desc") {
      issueCount
      nodes {
        ... on Issue {
          id
          closed
          title
          createdAt
          url
          number
          updatedAt
          assignees(first: 100) {
            nodes {
              avatarUrl
              name
              url
            }
          }
          repository {
            name
            url
            isPrivate
            owner {
              login
              avatarUrl
              url
            }
          }
        }
      }
    }
  }`
};

const query_org = {
    query: `query{
    user(login: "${openSource.githubUserName}") {
        repositoriesContributedTo(last: 100, privacy: PUBLIC){
          totalCount
          nodes{
            isPrivate
            owner{
              login
              avatarUrl
              __typename
            }
          }
        }
      }
    }`,
};

const query_pinned_projects = {
    query: `
    query { 
      user(login: "${openSource.githubUserName}") { 
        pinnedItems(first: 6, types: REPOSITORY) {
          totalCount
          nodes{
            ... on Repository{
              id
              name
              createdAt
              url
              description
              isFork
              isPrivate
              languages(first:10){
                nodes{
                  name
                }
              }
            }
          }
        }
      }
    }
    `,
};

const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type": "application/json",
    Authorization: "bearer " + openSource.githubConvertedToken,
};

// Функція для фільтрації приватних елементів
function filterPrivateNodes(nodes) {
    if (!nodes) return [];
    return nodes.filter(node => {
        // Перевіряємо чи елемент не приватний
        if (node.isPrivate === true) return false;
        // Перевіряємо чи репозиторій не приватний
        if (node.baseRepository?.isPrivate === true) return false;
        if (node.repository?.isPrivate === true) return false;
        return true;
    });
}

// Pull Requests
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_pr),
})
    .then((response) => response.text())
    .then((txt) => {
        const data = JSON.parse(txt);

        if (data.errors) {
            console.error("GraphQL errors:", JSON.stringify(data.errors, null, 2));
            throw new Error(data.errors[0].message);
        }

        if (!data.data || !data.data.search) {
            console.error("Unexpected response structure:", Object.keys(data));
            return;
        }
        var cropped = { data: [] };

        // Фільтруємо приватні PR
        const allNodes = data.data.search.nodes || [];
        const publicNodes = filterPrivateNodes(allNodes);
        // Репозиторії, які потрібно ПРИХОВАТИ
        const hideRepos = [
            "ArcherBC2",            // Додайте інші репозиторії для приховування
        ];
        // Фільтрація - виключаємо зазначені репозиторії
        const filteredPRs = publicNodes.filter(pr => {
            const repoName = pr.baseRepository?.name;
            return !hideRepos.includes(repoName);
        });
        cropped["data"] = filteredPRs.slice(0, 100);

        var open = 0;
        var closed = 0;
        var merged = 0;
        for (var i = 0; i < cropped["data"].length; i++) {
            if (cropped["data"][i]["state"] === "OPEN") open++;
            else if (cropped["data"][i]["state"] === "MERGED") merged++;
            else closed++;
        }

        cropped["open"] = open;
        cropped["closed"] = closed;
        cropped["merged"] = merged;
        cropped["totalCount"] = cropped["data"].length;

        console.log("Fetching the Pull Request Data.\n");
        fs.writeFile(
            "./public/data/pull_requests.json",
            JSON.stringify(cropped, null, 2),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    })
    .catch((error) => console.log(JSON.stringify(error)));

// Issues
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_issue),
})
    .then((response) => response.text())
    .then((txt) => {
        const data = JSON.parse(txt);

        if (data.errors) {
            console.error("GraphQL errors:", JSON.stringify(data.errors, null, 2));
            throw new Error(data.errors[0].message);
        }

        if (!data.data || !data.data.search) {
            console.error("Unexpected response structure:", Object.keys(data));
            return;
        }


        var cropped = { data: [] };

        const allNodes = data.data.search.nodes || [];
        const publicIssues = filterPrivateNodes(allNodes);

        // Репозиторії, які потрібно ПРИХОВАТИ
        const hideRepos = [
            "ArcherBC2",
            // Додайте інші репозиторії для приховування
        ];
        // Фільтрація - виключаємо зазначені репозиторії
        const filteredIssues = publicIssues.filter(issue => {
            const repoName = issue.repository?.name;
            return !hideRepos.includes(repoName);
        });

        console.log(`Found ${filteredIssues.length} issues after repo filter`); // Діагностика

        // Виводимо перші 5 issues для перевірки
        if (filteredIssues.length > 0) {
        } else {
            console.warn("No issues found! Check if you have any issues or if they are all private.");
        }

        cropped["data"] = filteredIssues.slice(0, 100);

        var open = 0;
        var closed = 0;
        for (var i = 0; i < cropped["data"].length; i++) {
            if (cropped["data"][i]["closed"] === false) open++;
            else closed++;
        }

        cropped["open"] = open;
        cropped["closed"] = closed;
        cropped["totalCount"] = cropped["data"].length;

        console.log("Fetching the Issues Data. Total issues saved:", cropped["totalCount"]);
        fs.writeFile(
            "./public/data/issues.json",
            JSON.stringify(cropped, null, 2),
            function (err) {
                if (err) {
                    console.log("Error writing issues.json:", err);
                } else {
                    console.log("Successfully wrote issues.json");
                }
            }
        );
    })
    .catch((error) => {
        console.error("Error fetching issues:", JSON.stringify(error));
        // Створюємо пустий файл у разі помилки, щоб не поламати сайт
        const emptyData = { data: [], open: 0, closed: 0, totalCount: 0 };
        fs.writeFile("./public/data/issues.json", JSON.stringify(emptyData, null, 2), (err) => {
            if (err) console.error("Error writing empty issues.json:", err);
        });
    });

// Organizations
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_org),
})
    .then((response) => response.text())
    .then((txt) => {
        const data = JSON.parse(txt);

        // if (data.errors) {
        //     console.error("GraphQL errors:", JSON.stringify(data.errors, null, 2));
        //     throw new Error(data.errors[0].message);
        // }

        // if (!data.data || !data.data.search) {
        //     console.error("Unexpected response structure:", Object.keys(data));
        //     return;
        // }
        const repos = data["data"]["user"]["repositoriesContributedTo"]["nodes"] || [];

        // Фільтруємо тільки публічні репозиторії
        const publicRepos = repos.filter(repo => repo.isPrivate === false);

        var newOrgs = { data: [] };
        for (var i = 0; i < publicRepos.length; i++) {
            var obj = publicRepos[i]["owner"];
            if (obj["__typename"] === "Organization") {
                var flag = 0;
                for (var j = 0; j < newOrgs["data"].length; j++) {
                    if (JSON.stringify(obj) === JSON.stringify(newOrgs["data"][j])) {
                        flag = 1;
                        break;
                    }
                }
                if (flag === 0) {
                    newOrgs["data"].push(obj);
                }
            }
        }

        console.log("Fetching the Contributed Organization Data.\n");
        fs.writeFile(
            "./public/data/organizations.json",
            JSON.stringify(newOrgs, null, 2),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    })
    .catch((error) => console.log(JSON.stringify(error)));

const languages_icons = {
    Python: "logos-python",
    "Jupyter Notebook": "logos-jupyter",
    HTML: "logos-html-5",
    CSS: "logos-css-3",
    JavaScript: "logos-javascript",
    "C#": "logos-c-sharp",
    Java: "logos-java",
    Shell: "simple-icons:shell",
    Dart: "simple-icons:dart",
    Flutter: "simple-icons:flutter",
    C: "logos-c",
    // Ruby: "logos:ruby",
    PHP: "logos-php",
    Dockerfile: "simple-icons:docker",
    Rust: "logos-rust",
};

// Pinned Projects
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_pinned_projects),
})
    .then((response) => response.text())
    .then((txt) => {
        const data = JSON.parse(txt);

        if (data.errors) {
            console.error("GraphQL errors:", JSON.stringify(data.errors, null, 2));
            throw new Error(data.errors[0].message);
        }

        if (!data.data || !data.data.search) {
            console.error("Unexpected response structure:", Object.keys(data));
            return;
        }
        const projects = data["data"]["user"]["pinnedItems"]["nodes"] || [];

        // Фільтруємо тільки публічні проекти
        const publicProjects = projects.filter(project => project.isPrivate === false);

        var newProjects = { data: [] };
        for (var i = 0; i < publicProjects.length; i++) {
            var obj = publicProjects[i];
            var langobjs = obj["languages"]["nodes"] || [];
            var newLangobjs = [];
            for (var j = 0; j < langobjs.length; j++) {
                if (langobjs[j]["name"] in languages_icons) {
                    newLangobjs.push({
                        name: langobjs[j]["name"],
                        iconifyClass: languages_icons[langobjs[j]["name"]],
                    });
                }
            }
            obj["languages"] = newLangobjs;
            newProjects["data"].push(obj);
        }

        console.log("Fetching the Pinned Projects Data.\n");
        fs.writeFile(
            "./public/data/projects.json",
            JSON.stringify(newProjects, null, 2),
            function (err) {
                if (err) {
                    console.log(
                        "Error occured in pinned projects 1",
                        JSON.stringify(err)
                    );
                }
            }
        );
    })
    .catch((error) =>
        console.log("Error occured in pinned projects 2", JSON.stringify(error))
    );