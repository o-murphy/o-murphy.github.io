// page.tsx

'use client';

import { Template } from '@/components/template';
import React from 'react';

export default function Home() {
  return (
    <Template>
      <div className="w-full max-w-4xl p-8">
        <section id="hero" className="flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-xl font-bold mb-4 max-w-lg">
            👋🏻 I'm Dmytro: Python Developer & Software Engineer.
          </h2>
          <p className="text-sm font-light leading-relaxed">
            Lover of programming languages.<br />
            Musician.
          </p>
          <div className="flex space-x-0 mt-4">
            <span className="text-xl">👨‍💻</span>
            <span className="text-xl">🐍</span>
          </div>
        </section>
      </div>
    </Template>
  );
}