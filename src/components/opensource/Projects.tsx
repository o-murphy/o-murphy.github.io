// src/components/opensource/Projects.tsx
'use client';

import Link from 'next/link';
import { Project } from '@/types/opensource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPython, 
  faJs, 
  faJava, 
  faPhp, 
  faRust, 
  faGitAlt,
  faDocker,
  faSwift,
  faNode,
  faReact,
  faDartLang,
  faFlutter
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCode, 
  faDatabase, 
  faGem,
  faGear,
  faTerminal,
  faFileCode
} from '@fortawesome/free-solid-svg-icons';

interface ProjectsProps {
  projects: Project[];
}

const languageIcons: Record<string, any> = {
  'Python': faPython,
  'JavaScript': faJs,
  'TypeScript': faJs,
  'Java': faJava,
  'PHP': faPhp,
  'Rust': faRust,
  'Flutter': faFlutter,
  'Dart': faDartLang,
  'Git': faGitAlt,
  'Dockerfile': faDocker,
  'Docker': faDocker,
  'Swift': faSwift,
  'Node.js': faNode,
  'React': faReact,
  'Ruby': faGem,
  'C++': faGear,
  'C#': faCode,
  'Shell': faTerminal,
  'HTML': faCode,
  'CSS': faCode,
  'SQL': faDatabase,
  'Go': faCode,
  'Kotlin': faCode,
  'Jupyter Notebook': faFileCode,
};

const getLanguageIcon = (langName: string) => {
  const icon = languageIcons[langName];
  if (icon) {
    return <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />;
  }
  return <FontAwesomeIcon icon={faCode} className="w-3.5 h-3.5" />;
};

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Pinned Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.url} className="border border-gray-300 rounded-lg p-5 hover:bg-gray-100 transition-colors bg-white">
            <Link href={project.url} target="_blank" className="block">
              <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.languages?.map((lang) => (
                  <span 
                    key={lang.name} 
                    className="inline-flex items-center gap-1.5 text-xs bg-blue-200 px-2.5 py-1.5 rounded-full"
                    title={lang.name}
                  >
                    {getLanguageIcon(lang.name)}
                    <span>{lang.name}</span>
                  </span>
                ))}
              </div>
              
              <div className="text-xs text-gray-400">
                📅 Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}