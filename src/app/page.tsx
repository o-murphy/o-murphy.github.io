'use client';

import React from 'react';  // ← Додайте цей імпорт
import { Template } from '@/components/template';
import { useEffect, useState } from 'react';
import { Person } from '@/types/dataTypes';
import { basePath } from '@/app/basePath';



export default function Home() {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${basePath}/data/portfolio.json`)
      .then(res => res.json())
      .then(data => {
        setPerson(data.person);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading portfolio data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Template>
        <div className="w-full max-w-4xl p-8 text-center">
          <p>Loading...</p>
        </div>
      </Template>
    );
  }

  return (
    <Template>
      <div className="w-full max-w-4xl p-8">
        <section id="hero" className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-xl font-bold mb-4 max-w-lg">
            {person?.homeTitle}
          </h2>
          <p className="text-sm font-light leading-relaxed">
            {person?.homeSubtitles?.map((subtitle, index) => (
              <React.Fragment key={index}>
                {subtitle}
                {index < (person?.homeSubtitles?.length || 0) - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <div className="flex space-x-0 mt-4">
            {person?.homeEmojis?.map((emoji, index) => (
              <span key={index} className="text-xl">{emoji}</span>
            ))}
          </div>
        </section>
      </div>
    </Template>
  );
}