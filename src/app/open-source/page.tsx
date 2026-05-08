// src/app/open-source/page.tsx
'use client';

import { Template } from '@/components/template';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OpenSourcePage() {
    const [pullRequests, setPullRequests] = useState([]);
    const [issues, setIssues] = useState([]);
    const [projects, setProjects] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/data/pull_requests.json').then(res => res.json()),
            fetch('/data/issues.json').then(res => res.json()),
            fetch('/data/projects.json').then(res => res.json()),
            fetch('/data/organizations.json').then(res => res.json()),
        ])
            .then(([prData, issuesData, projectsData, orgsData]) => {
                setPullRequests(prData.data || []);
                setIssues(issuesData.data || []);
                setProjects(projectsData.data || []);
                setOrganizations(orgsData.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Template>
                <div className="w-full max-w-6xl p-8 text-center">
                    <p>Loading open source contributions...</p>
                </div>
            </Template>
        );
    }

    const openPRs = pullRequests.filter((pr: any) => pr.state === 'OPEN').length;
    const mergedPRs = pullRequests.filter((pr: any) => pr.state === 'MERGED').length;
    const openIssues = issues.filter((issue: any) => !issue.closed).length;
    const closedIssues = issues.filter((issue: any) => issue.closed).length;

    return (
        <Template>
            <div className="w-full max-w-6xl p-8 space-y-12">
                <h1 className="text-3xl font-bold text-center">Open Source Contributions</h1>

                {/* Статистика */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-purple-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{mergedPRs}</div>
                        <div className="text-sm">Merged PRs</div>
                    </div>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{openPRs}</div>
                        <div className="text-sm">Open PRs</div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{openIssues}</div>
                        <div className="text-sm">Open Issues</div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{closedIssues}</div>
                        <div className="text-sm">Closed Issues</div>
                    </div>
                </div>

                {/* Організації */}
                {organizations.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Organizations</h2>
                        <div className="flex flex-wrap gap-4">
                            {organizations.map((org: any) => (
                                <Link
                                    key={org.login}
                                    href={`https://github.com/${org.login}`}
                                    target="_blank"
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                                >
                                    <img src={org.avatarUrl} alt={org.login} className="w-8 h-8 rounded-full" />
                                    <span>{org.login}</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Проекти */}
                {projects.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Pinned Projects</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {projects.map((project: any) => (
                                <div key={project.url} className="border p-4 rounded-lg">
                                    <Link href={project.url} target="_blank" className="text-blue-600 font-semibold hover:underline">
                                        {project.name}
                                    </Link>
                                    {project.description && (
                                        <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                                    )}
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.languages?.map((lang: any) => (
                                            <span key={lang.name} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                {lang.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Pull Requests */}
                {pullRequests.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Pull Requests ({pullRequests.length})</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {pullRequests.slice(0, 20).map((pr: any) => (
                                <div key={pr.url} className="border p-3 rounded-lg">
                                    <Link href={pr.url} target="_blank" className="block">
                                        <div className="flex justify-between items-start">
                                            <span className="font-semibold text-blue-600 hover:underline">{pr.title}</span>
                                            <span className={`text-xs px-2 py-1 rounded ${pr.state === 'MERGED' ? 'bg-purple-100 text-purple-700' :
                                                    pr.state === 'OPEN' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {pr.state}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            #{pr.number} in {pr.baseRepository.owner.login}/{pr.baseRepository.name}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </Template>
    );
}
