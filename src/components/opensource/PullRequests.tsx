// src/components/opensource/PullRequests.tsx
'use client';

import Link from 'next/link';
import { PullRequest } from '@/types/dataTypes';
import { PrIcon, PrState, stringToPrState } from '../icons';
import { Icon } from '@iconify/react';

interface PullRequestsProps {
  pullRequests: PullRequest[];
  limit?: number;
  id?: string;
}


export default function PullRequests({ pullRequests, limit = 20, id }: PullRequestsProps) {
  if (!pullRequests || pullRequests.length === 0) {
    return null;
  }

  const displayPRs = pullRequests.slice(0, limit);
  const hasMore = pullRequests.length > limit;

  const mergedPRs = pullRequests.filter((pr) => pr.state === 'MERGED').length;
  const openPRs = pullRequests.filter((pr) => pr.state === 'OPEN').length;
  const closedPRs = pullRequests.filter((pr) => pr.state === 'CLOSED').length;

  return (
    <section id={id}>
      <h2 className="text-2xl font-bold mb-4">
        Pull Requests ({pullRequests.length})
        <span className="ml-2 text-sm font-normal text-gray-500">
          (
          <PrIcon state={PrState.merged} /><span> {mergedPRs} {"merged, "}</span>
          <PrIcon state={PrState.open} /><span> {openPRs} {"open, "}</span>
          <PrIcon state={PrState.closed} /><span> {closedPRs} {"closed"}</span>
          )
        </span>
      </h2>
      <div className="border border-gray-400 rounded-lg bg-white-50 overflow-hidden">
        <div className="space-y-3 max-h-96 overflow-y-auto p-4">
          {displayPRs.map((pr) => (
            <div key={pr.url} className="relative border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors bg-white">
              <Link href={pr.url} target="_blank" className="block">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-blue-600 hover:underline text-sm line-clamp-2">
                    <PrIcon state={stringToPrState(pr.state)} />
                    <span> {pr.title}</span>
                  </span>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${pr.state === 'MERGED' ? 'bg-purple-100 text-purple-700' :
                    pr.state === 'OPEN' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                    {pr.state}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <span className="font-mono">#{pr.number}</span> in {pr.baseRepository.owner.login}/{pr.baseRepository.name}
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Icon icon="octicon:calendar-16" className="w-4 h-4" />
                    <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
                  </div>                  <div className="flex items-center gap-1">
                    <Icon icon="octicon:diff-added-16" className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-600">+{pr.additions}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="octicon:diff-removed-16" className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-600">-{pr.deletions}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Icon icon="octicon:file-diff-16" className="w-4 h-4" />
                    <span>{pr.changedFiles}</span>
                  </div>
                </div>
              </Link>

              {/* Owner avatar - absolute positioned in bottom right corner */}
              <div className="absolute bottom-5 right-5">
                <Link
                  href={pr.baseRepository.owner.url}
                  target="_blank"
                  className="flex items-center gap-1 hover:underline hover:text-gray-700"
                >
                  <img
                    src={pr.baseRepository.owner.avatarUrl}
                    alt={pr.baseRepository.owner.login}
                    className="w-9 h-9 rounded-full"
                  />
                </Link>
              </div>
            </div>
          ))}
          {hasMore && (
            <p className="text-center text-gray-400 text-sm pt-2">
              + {pullRequests.length - limit} more contributions
            </p>
          )}
        </div>
      </div>
    </section>
  );
}