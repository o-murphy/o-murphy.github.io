// src/components/opensource/Issues.tsx
'use client';

import Link from 'next/link';
import { Issue } from '@/types/dataTypes';
import { IssueIcon } from '../icons';
import { Icon } from '@iconify/react';

interface IssuesProps {
  issues: Issue[];
  limit?: number;
  id?: string;
}

const getAssigneeName = (assignee: { name: string | null; url: string }) => {
  if (assignee.name) return assignee.name;
  const urlParts = assignee.url.split('/');
  return urlParts[urlParts.length - 1];
};



export default function Issues({ issues, limit = 20, id }: IssuesProps) {
  if (!issues || issues.length === 0) {
    return null;
  }

  const openIssues = issues.filter((issue) => !issue.closed).length;
  const closedIssues = issues.filter((issue) => issue.closed).length;
  const displayIssues = issues.slice(0, limit);
  const hasMore = issues.length > limit;

  return (
    <section id={id}>
      <h2 className="text-2xl font-bold mb-4">
        Issues ({issues.length})
        <span className="ml-2 text-sm font-normal text-gray-500">
          (
          <IssueIcon closed={true} /><span className="ml-1"> {closedIssues} {"closed, "}</span>
          <IssueIcon closed={false} /><span className="ml-1"> {openIssues} {"open"}</span>
          )
        </span>
      </h2>
      <div className="border border-gray-400 rounded-lg bg-white-50 overflow-hidden">
        <div className="space-y-3 max-h-96 overflow-y-auto p-4">
          {displayIssues.map((issue) => (
            <div key={issue.url} className="relative border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors bg-white">
              <Link href={issue.url} target="_blank" className="block">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-blue-600 hover:underline text-sm line-clamp-2">
                    <IssueIcon closed={issue.closed} />
                    <span> {issue.title}</span>
                  </span>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${issue.closed ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {issue.closed ? 'CLOSED' : 'OPEN'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <span className="font-mono">#{issue.number}</span>
                  <span>in</span>
                  <span className="sm:hidden">
                    <img
                      src={issue.repository.owner.avatarUrl}
                      alt={issue.repository.owner.login}
                      className="w-3 h-3 rounded-full"
                    />
                  </span>
                  <span>{issue.repository.owner.login}/{issue.repository.name}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Icon icon="octicon:calendar-16" className="w-3.5 h-3.5" />
                    <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                  </div>
                  {issue.updatedAt !== issue.createdAt && (
                    <div className="flex items-center gap-1">
                      <Icon icon="octicon:pencil-16" className="w-3.5 h-3.5" />
                      <span>Updated: {new Date(issue.updatedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {issue.assignees.nodes.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <Icon icon="octicon:people-16" className="w-4 h-4" /> {issue.assignees.nodes.map(getAssigneeName).join(', ')}
                  </div>
                )}
              </Link>

              {/* Owner avatar - absolute positioned in bottom right corner */}
              {/* Owner avatar - hidden on mobile */}
              <div className="hidden sm:block absolute bottom-5 right-5">
                <Link
                  href={issue.repository.owner.url}
                  target="_blank"
                  className="flex items-center gap-1 hover:underline hover:text-gray-700"
                >
                  <img
                    src={issue.repository.owner.avatarUrl}
                    alt={issue.repository.owner.login}
                    className="w-9 h-9 rounded-full"
                  />
                </Link>
              </div>
            </div>
          ))}
          {hasMore && (
            <p className="text-center text-gray-400 text-sm pt-2">
              + {issues.length - limit} more issues
            </p>
          )}
        </div>
      </div>
    </section>
  );
}