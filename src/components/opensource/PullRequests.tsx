'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import pullRequestsData from '@/shared/opensource/pull_requests.json';
import { PullRequest } from '@/types/opensource'; // Виправлений шлях

export default function PullRequests() {
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);

  useEffect(() => {
    setPullRequests(pullRequestsData.data || []);
  }, []);

  const openCount = pullRequests.filter(pr => pr.state === 'OPEN').length;
  const mergedCount = pullRequests.filter(pr => pr.state === 'MERGED').length;
  const closedCount = pullRequests.filter(pr => pr.state === 'CLOSED').length;

  // Якщо даних немає, показуємо повідомлення
  if (pullRequests.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Pull Requests (0)</h2>
        <p className="text-gray-500 text-center py-8">No pull requests data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        Pull Requests ({pullRequests.length})
      </h2>
      <div className="grid gap-4">
        {pullRequests.map((pr) => (
          <div key={pr.url} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <Link href={pr.url} target="_blank" className="block">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                    {pr.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    #{pr.number} in {pr.baseRepository.owner.login}/{pr.baseRepository.name}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  pr.state === 'MERGED' ? 'bg-purple-100 text-purple-800' :
                  pr.state === 'OPEN' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {pr.state}
                </span>
              </div>
              <div className="mt-2 flex gap-4 text-sm text-gray-500">
                <span>➕ {pr.additions} additions</span>
                <span>➖ {pr.deletions} deletions</span>
                <span>📅 {new Date(pr.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <span>✅ Merged: {mergedCount}</span>
        <span>🟢 Open: {openCount}</span>
        <span>❌ Closed: {closedCount}</span>
      </div>
    </div>
  );
}