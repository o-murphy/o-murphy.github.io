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
          isPrivate
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
          isPrivate
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
        var cropped = { data: [] };

        // Фільтруємо приватні PR
        const allNodes = data.data.search.nodes || [];
        const publicNodes = filterPrivateNodes(allNodes);
        
        cropped["data"] = publicNodes;

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
        var cropped = { data: [] };

        const allNodes = data.data.search.nodes || [];
        const publicIssues = filterPrivateNodes(allNodes);

        cropped["data"] = publicIssues;

        var open = 0;
        var closed = 0;
        for (var i = 0; i < cropped["data"].length; i++) {
            if (cropped["data"][i]["closed"] === false) open++;
            else closed++;
        }

        cropped["open"] = open;
        cropped["closed"] = closed;
        cropped["totalCount"] = cropped["data"].length;

        console.log("Fetching the Issues Data.\n");
        fs.writeFile(
            "./public/data/issues.json",
            JSON.stringify(cropped, null, 2),
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        );
    })
    .catch((error) => console.log(JSON.stringify(error)));

// Organizations
fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(query_org),
})
    .then((response) => response.text())
    .then((txt) => {
        const data = JSON.parse(txt);
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
    Ruby: "logos:ruby",
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