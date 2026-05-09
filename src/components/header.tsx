'use client';

import { basePath } from '@/app/basePath';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [name, setName] = useState<string>('<unknown name>');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${basePath}/data/portfolio.json`)
      .then(res => res.json())
      .then(data => {
        setName(data.person?.name || '<unknown name>');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading header data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <header className="py-6 px-8 flex justify-start w-full">
        <Link href="/" className="hover:bg-black hover:text-white p-1">
          <h1 className="text-l underline font-medium">{"<Loading...>"}</h1>
        </Link>
      </header>
    );
  }

  return (
    <header className="py-6 px-8 flex justify-start w-full">
      <Link href="/" className="hover:bg-black hover:text-white p-1">
        <h1 className="text-l underline font-medium">{`<${name}>`}</h1>
      </Link>
    </header>
  );
};