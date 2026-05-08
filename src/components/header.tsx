'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [name, setName] = useState<string>('Dmytro Yaroshenko');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setName(data.person?.name || 'Dmytro Yaroshenko');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading header data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <header className="py-6 px-4 flex justify-start w-full">
        <Link href="/" className="hover:bg-black hover:text-white p-1">
          <h1 className="text-l underline">{"<Loading...>"}</h1>
        </Link>
      </header>
    );
  }

  return (
    <header className="py-6 px-4 flex justify-start w-full">
      <Link href="/" className="hover:bg-black hover:text-white p-1">
        <h1 className="text-l underline">{`<${name}>`}</h1>
      </Link>
    </header>
  );
};