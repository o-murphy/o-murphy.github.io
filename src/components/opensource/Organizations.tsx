// src/components/opensource/Organizations.tsx
'use client';

import Link from 'next/link';
import { Organization } from '@/types/dataTypes';
import { useEffect, useState } from 'react';

interface OrganizationsProps {
  organizations: Organization[];
}

export default function Organizations({ organizations }: OrganizationsProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (!organizations || organizations.length === 0) {
    return null;
  }

  // На маленьких екранах - flex wrap з тільки іконками
  if (isSmallScreen) {
    return (
      <section>
        <h2 className="text-xl font-bold mb-4">Organizations Contributed</h2>
        <div className="flex flex-wrap gap-3">
          {organizations.map((org) => (
            <Link
              key={org.login}
              href={`https://github.com/${org.login}`}
              target="_blank"
              className="flex items-center justify-center p-2 hover:bg-gray-100 rounded transition-colors"
              title={org.login}
            >
              <img 
                src={org.avatarUrl} 
                alt={org.login} 
                className="w-8 h-8 rounded-full" 
              />
            </Link>
          ))}
        </div>
      </section>
    );
  }

  // На великих екранах - grid з іконками + текст
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Organizations Contributed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {organizations.map((org) => (
          <Link
            key={org.login}
            href={`https://github.com/${org.login}`}
            target="_blank"
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded transition-colors"
          >
            <img 
              src={org.avatarUrl} 
              alt={org.login} 
              className="w-8 h-8 rounded-full flex-shrink-0" 
            />
            <span className="text-sm font-medium truncate">
              {org.login}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}