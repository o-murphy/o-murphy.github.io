// src/components/opensource/Statistics.tsx
'use client';

import { Link as ScrollLink } from 'react-scroll';

interface StatisticsProps {
    mergedPRs: number;
    openPRs: number;
    openIssues: number;
    closedIssues: number;
}

export default function Statistics({ mergedPRs, openPRs, openIssues, closedIssues }: StatisticsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">


            <ScrollLink
                to="pull-requests"
                smooth={true}
                duration={500}
                className="cursor-pointer"
            >
                <div className="bg-green-100 p-4 rounded-lg hover:bg-green-200 transition-colors">
                    <div className="text-2xl font-bold text-green-600">{openPRs}</div>
                    <div className="text-sm">Open PRs</div>
                </div>
            </ScrollLink>

            <ScrollLink
                to="pull-requests"
                smooth={true}
                duration={500}
                className="cursor-pointer"
            >
                <div className="bg-purple-100 p-4 rounded-lg hover:bg-purple-200 transition-colors">
                    <div className="text-2xl font-bold text-purple-600">{mergedPRs}</div>
                    <div className="text-sm">Merged PRs</div>
                </div>
            </ScrollLink>

            <ScrollLink
                to="issues"
                smooth={true}
                duration={500}
                className="cursor-pointer"
            >
                <div className="bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors">
                    <div className="text-2xl font-bold text-blue-600">{openIssues}</div>
                    <div className="text-sm">Open Issues</div>
                </div>
            </ScrollLink>

            <ScrollLink
                to="issues"
                smooth={true}
                duration={500}
                className="cursor-pointer"
            >
                <div className="bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors">
                    <div className="text-2xl font-bold text-gray-600">{closedIssues}</div>
                    <div className="text-sm">Closed Issues</div>
                </div>
            </ScrollLink>
        </div>
    );
}