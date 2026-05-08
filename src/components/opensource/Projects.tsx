'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import projectsData from '@/shared/opensource/projects.json';
import { Project } from '@/types/opensource'; // Виправлений шлях

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(projectsData.data || []);
  }, []);

  if (projects.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Pinned Projects</h2>
        <p className="text-gray-500 text-center py-8">No projects data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Pinned Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.url} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <Link href={project.url} target="_blank" className="block">
              <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-gray-600 mb-3">{project.description}</p>
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.languages.map((lang) => (
                  <span key={lang.name} className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {lang.name}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                📅 Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}