'use client';

import { useEffect, useState } from 'react';
import { Template } from '@/components/template';
import { basePath } from '@/app/basePath';
import { MarkdownEntry } from '@/types/dataTypes';
import { slugify } from '@/lib/slugify';
import { MarkdownContent } from './MarkdownContent';

type Status = 'loading' | 'not-found' | 'error' | 'ready';

export function MdPageClient({ slug }: { slug: string }) {
    const [status, setStatus] = useState<Status>('loading');
    const [entry, setEntry] = useState<MarkdownEntry | null>(null);
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(`${basePath}/data/portfolio.json`)
            .then((res) => res.json())
            .then((data: { markdown?: MarkdownEntry[] }) => {
                const match = (data.markdown || []).find((e) => slugify(e.name) === slug);
                if (!match) {
                    setStatus('not-found');
                    return;
                }
                setEntry(match);
                return fetch(match.url)
                    .then((res) => {
                        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                        return res.text();
                    })
                    .then((text) => {
                        setMarkdown(text);
                        setStatus('ready');
                    });
            })
            .catch((err) => {
                console.error('Error loading markdown page:', err);
                setStatus('error');
            });
    }, [slug]);

    if (status === 'loading') {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <p>Loading...</p>
                </div>
            </Template>
        );
    }

    if (status === 'not-found') {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <h1 className="text-xl font-bold">404 - Page Not Found</h1>
                </div>
            </Template>
        );
    }

    if (status === 'error') {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <p>Couldn&apos;t load this page{entry ? ` from ${entry.url}` : ''}. Try again later.</p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 md:p-8 bg-white dark:bg-background">
                    <MarkdownContent markdown={markdown} />
                </div>
            </div>
        </Template>
    );
}
