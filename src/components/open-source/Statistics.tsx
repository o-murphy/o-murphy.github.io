// src/components/opensource/Statistics.tsx
'use client';

import { IssueIcon, PrIcon, PrState } from '../icons';

interface StatisticsProps {
    mergedPRs: number;
    openPRs: number;
    openIssues: number;
    closedIssues: number;
}

function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Statistics({ mergedPRs, openPRs, openIssues, closedIssues }: StatisticsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div onClick={() => scrollToId('pull-requests')} className="cursor-pointer">
                <div className="bg-green-100 dark:bg-green-950 p-4 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition-colors">
                    <div className="flex items-center justify-center gap-2">
                        <PrIcon state={PrState.open} />
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{openPRs}</div>
                    </div>
                    <div className="text-sm text-center mt-1">Open PRs</div>
                </div>
            </div>

            <div onClick={() => scrollToId('pull-requests')} className="cursor-pointer">
                <div className="bg-purple-100 dark:bg-purple-950 p-4 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors">
                    <div className="flex items-center justify-center">
                        <PrIcon state={PrState.merged} />
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 ml-2">{mergedPRs}</div>
                    </div>
                    <div className="text-sm text-center mt-1">Merged PRs</div>
                </div>
            </div>

            <div onClick={() => scrollToId('issues')} className="cursor-pointer">
                <div className="bg-blue-100 dark:bg-blue-950 p-4 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors">
                    <div className="flex items-center justify-center gap-2">
                        <IssueIcon closed={false} color="text-blue-600 dark:text-blue-400" />
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{openIssues}</div>
                    </div>
                    <div className="text-sm text-center mt-1">Open Issues</div>
                </div>
            </div>

            <div onClick={() => scrollToId('issues')} className="cursor-pointer">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center justify-center gap-2">
                        <IssueIcon closed={true} />
                        <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{closedIssues}</div>
                    </div>
                    <div className="text-sm text-center mt-1">Closed Issues</div>
                </div>
            </div>
        </div>
    );
}
