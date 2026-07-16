// src/app/open-source/page.tsx
'use client';

import { Template } from '@/components/template';
import { Loading, MIN_LOADING_MS } from '@/components/loading';
import { useEffect, useState } from 'react';
import { Project, PullRequest, Issue, Organization } from '@/types/dataTypes';
import Organizations from '@/components/open-source/Organizations';
import Projects from '@/components/open-source/Projects';
import PullRequests from '@/components/open-source/PullRequests';
import Issues from '@/components/open-source/Issues';
import Statistics from '@/components/open-source/Statistics';
import { basePath } from '@/app/basePath';

export default function OpenSourcePage() {
    const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${basePath}/data/pull_requests.json`).then((res) => res.json()),
            fetch(`${basePath}/data/issues.json`).then((res) => res.json()),
            fetch(`${basePath}/data/projects.json`).then((res) => res.json()),
            fetch(`${basePath}/data/organizations.json`).then((res) => res.json()),
        ])
            .then(([prData, issuesData, projectsData, orgsData]) => {
                setPullRequests(prData.data || []);
                setIssues(issuesData.data || []);
                setProjects(projectsData.data || []);
                setOrganizations(orgsData.data || []);
            })
            .catch((err) => {
                console.error('Error loading data:', err);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), MIN_LOADING_MS);
            });
    }, []);

    if (loading) {
        return (
            <Template>
                <Loading message="Loading open source contributions..." className="w-full max-w-6xl p-8 text-center" />
            </Template>
        );
    }

    const openPRs = pullRequests.filter((pr: PullRequest) => pr.state === 'OPEN').length;
    const mergedPRs = pullRequests.filter((pr: PullRequest) => pr.state === 'MERGED').length;
    const openIssues = issues.filter((issue: Issue) => !issue.closed).length;
    const closedIssues = issues.filter((issue: Issue) => issue.closed).length;

    return (
        <Template>
            <div className="w-full max-w-6xl p-8 space-y-12">
                <h1 className="text-xl font-bold text-center">Open Source Contributions</h1>

                <Statistics
                    mergedPRs={mergedPRs}
                    openPRs={openPRs}
                    openIssues={openIssues}
                    closedIssues={closedIssues}
                />

                <Organizations organizations={organizations} />

                <Projects projects={projects} />

                <PullRequests pullRequests={pullRequests} limit={20} id="pull-requests" />

                <Issues issues={issues} limit={20} id="issues" />
            </div>
        </Template>
    );
}
