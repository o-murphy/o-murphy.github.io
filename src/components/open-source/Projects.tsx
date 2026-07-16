// src/components/opensource/Projects.tsx
'use client';

import Link from 'next/link';
import { Project } from '@/types/dataTypes';
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
  faTerminal,
  faFileCode
} from '@fortawesome/free-solid-svg-icons';
import { SiTypescript, SiCplusplus } from '@icons-pack/react-simple-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ProjectsProps {
  projects: Project[];
}

type SiIconComponent = React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;

type LanguageIcon =
  | { kind: 'fa'; icon: IconDefinition }
  | { kind: 'si'; Icon: SiIconComponent };

const fa = (icon: IconDefinition): LanguageIcon => ({ kind: 'fa', icon });
const si = (Icon: SiIconComponent): LanguageIcon => ({ kind: 'si', Icon });

// no decent FontAwesome logo for these two, simple-icons draws them correctly
const languageIcons: Record<string, LanguageIcon> = {
  'Python': fa(faPython),
  'JavaScript': fa(faJs),
  'TypeScript': si(SiTypescript),
  'Java': fa(faJava),
  'PHP': fa(faPhp),
  'Rust': fa(faRust),
  'Flutter': fa(faFlutter),
  'Dart': fa(faDartLang),
  'Git': fa(faGitAlt),
  'Dockerfile': fa(faDocker),
  'Docker': fa(faDocker),
  'Swift': fa(faSwift),
  'Node.js': fa(faNode),
  'React': fa(faReact),
  'Ruby': fa(faGem),
  'C++': si(SiCplusplus),
  'C#': fa(faCode),
  'Shell': fa(faTerminal),
  'HTML': fa(faCode),
  'CSS': fa(faCode),
  'SQL': fa(faDatabase),
  'Go': fa(faCode),
  'Kotlin': fa(faCode),
  'Jupyter Notebook': fa(faFileCode),
};

const getLanguageIcon = (langName: string) => {
  const entry = languageIcons[langName] ?? fa(faCode);
  if (entry.kind === 'si') {
    // match FontAwesome's own forced `width: 1.125em; height: 1em` (see iconMap.tsx) so both read the same size
    return <entry.Icon className="w-3.5 h-3.5" style={{ width: '1.125em', height: '1em' }} />;
  }
  return <FontAwesomeIcon icon={entry.icon} className="w-3.5 h-3.5" />;
};

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Pinned Projects</h2>
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
