// src/components/opensource/Issues.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import issuesData from '@/shared/opensource/issues.json';
import { Issue } from '@/types/opensource';

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setIssues(issuesData.data || []);
  }, []);

  // Функція для отримання імені assignee
  const getAssigneeName = (assignee: { name: string | null; url: string }) => {
    if (assignee.name) return assignee.name;
    // Отримуємо логін з URL
    const urlParts = assignee.url.split('/');
    return urlParts[urlParts.length - 1];
  };

  if (issues.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Issues (0)</h2>
        <p className="text-gray-500 text-center py-8">No issues data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Issues ({issues.length})</h2>
      <div className="grid gap-4">
        {issues.map((issue) => (
          <div key={issue.url} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <Link href={issue.url} target="_blank" className="block">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    {issue.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    #{issue.number} in {issue.repository.owner.login}/{issue.repository.name}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  issue.closed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {issue.closed ? 'CLOSED' : 'OPEN'}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                📅 Created: {new Date(issue.createdAt).toLocaleDateString()}
                {issue.updatedAt !== issue.createdAt &&
                  ` | Updated: ${new Date(issue.updatedAt).toLocaleDateString()}`}
              </div>
              {issue.assignees.nodes.length > 0 && (
                <div className="mt-2 text-sm text-gray-500">
                  👥 Assignees: {issue.assignees.nodes.map(getAssigneeName).join(', ')}
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <span>🟢 Open: {issues.filter(i => !i.closed).length}</span>
        <span>✅ Closed: {issues.filter(i => i.closed).length}</span>
      </div>
    </div>
  );
}