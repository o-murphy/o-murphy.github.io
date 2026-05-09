'use client';

import MProjectsImg from '@/components/images/MProjectsImg';
import { iconMap } from '@/components/links/iconMap';
import { Template } from '@/components/template';
import { ProjectInfo } from '@/types/dataTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Template>
        <div className="w-full max-w-4xl p-8 text-center">
          <p>Loading projects...</p>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="w-full max-w-4xl p-8">
        <section id="projects-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">

          <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4 mb-8 md:mb-0">
            <MProjectsImg className="w-full h-auto max-w-sm" />
          </div>

          <div className="md:w-1/2">
            <h2 className="text-lg p-2 font-bold mb-4 text-center md:text-left">Projects & Libraries</h2>
            <div className="space-y-2">
              {projects.map((project) => (
                <Link
                  key={project.title}
                  href={project.url}
                  target="_blank"
                  className="block p-2 text-black hover:bg-black hover:text-white transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm">{project.title}</h3>
                    <div className="flex gap-1.5">
                      {project.icons.map((icon, idx) => (
                        <FontAwesomeIcon 
                          key={idx}
                          icon={iconMap[icon.name]} 
                          className={`w-4 h-4 ${icon.color}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs font-light leading-relaxed mt-1">{project.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Template>
  );
}