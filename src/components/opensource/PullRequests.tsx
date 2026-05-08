// src/components/opensource/PullRequests.tsx
'use client';

import Link from 'next/link';
import { PullRequest } from '@/types/opensource';

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
          (✅ {mergedPRs} merged, 🟢 {openPRs} open, ❌ {closedPRs} closed)
        </span>
      </h2>
      <div className="border border-gray-400 rounded-lg bg-white-50 overflow-hidden">
        <div className="space-y-3 max-h-96 overflow-y-auto p-6">
          {displayPRs.map((pr) => (
            <div key={pr.url} className="border border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition-colors bg-white">
              <Link href={pr.url} target="_blank" className="block">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-blue-600 hover:underline text-sm line-clamp-2">
                    {pr.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${pr.state === 'MERGED' ? 'bg-purple-100 text-purple-700' :
                    pr.state === 'OPEN' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                    {pr.state}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <span className="font-mono">#{pr.number}</span> in {pr.baseRepository.owner.login}/{pr.baseRepository.name}
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-400">
                  <span>➕ {pr.additions}</span>
                  <span>➖ {pr.deletions}</span>
                  <span>📅 {new Date(pr.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
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