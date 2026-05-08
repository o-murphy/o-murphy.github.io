// src/components/opensource/Issues.tsx
'use client';

import Link from 'next/link';
import { Issue } from '@/types/opensource';

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
          (✅ {closedIssues} closed, 🟢 {openIssues} open)
        </span>
      </h2>
      <div className="border border-gray-400 rounded-lg bg-white-50 overflow-hidden">
        <div className="space-y-3 max-h-96 overflow-y-auto p-6">
          {displayIssues.map((issue) => (
            <div key={issue.url} className="border border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition-colors bg-white">
              <Link href={issue.url} target="_blank" className="block">
                <div className="flex justify-between items-start gap-2">
                  <span className="font-semibold text-blue-600 hover:underline text-sm line-clamp-2">
                    {issue.title}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ${issue.closed ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                    {issue.closed ? 'CLOSED' : 'OPEN'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <span className="font-mono">#{issue.number}</span> in {issue.repository.owner.login}/{issue.repository.name}
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                  <span>📅 Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
                  {issue.updatedAt !== issue.createdAt && (
                    <span>🔄 Updated: {new Date(issue.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
                {issue.assignees.nodes.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    👥 Assignees: {issue.assignees.nodes.map(getAssigneeName).join(', ')}
                  </div>
                )}
              </Link>
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