'use client';

import { Template } from '@/components/template';

import React from 'react';

export default function About() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-xl font-bold mb-4 max-w-lg">
                        Contact me
                    </h2>
                    <p className="text-sm font-light leading-relaxed">
                        This is the page.
                    </p>
                </section>
            </div>
        </Template>
    );
}