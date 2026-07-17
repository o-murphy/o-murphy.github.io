'use client';

import { useEffect, useState } from 'react';
import { basePath } from '@/app/basePath';
import { MarkdownEntry } from '@/types/dataTypes';
import { slugify } from '@/lib/slugify';
import { MarkdownStatusView, MarkdownStatus, MarkdownMessage } from './MarkdownStatusView';

export function MdPageClient({ slug }: { slug: string }) {
    const [status, setStatus] = useState<MarkdownStatus>('loading');
    const [message, setMessage] = useState<MarkdownMessage | undefined>(undefined);
    const [markdown, setMarkdown] = useState('');
    const [baseUrl, setBaseUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetch(`${basePath}/data/portfolio.json`)
            .then((res) => res.json())
            .then((data: { markdown?: MarkdownEntry[] }) => {
                const match = (data.markdown || []).find((e) => slugify(e.name) === slug);
                if (!match) {
                    setMessage({ title: '404 - Page Not Found' });
                    setStatus('message');
                    return;
                }
                return fetch(match.url)
                    .then((res) => {
                        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                        return res.text();
                    })
                    .then((text) => {
                        setMarkdown(text);
                        setBaseUrl(match.url);
                        setStatus('ready');
                    })
                    .catch((err) => {
                        console.error('Error loading markdown page:', err);
                        setMessage({ title: "Couldn't load this page", body: `from ${match.url}. Try again later.` });
                        setStatus('message');
                    });
            })
            .catch((err) => {
                console.error('Error loading markdown page:', err);
                setMessage({ title: "Couldn't load this page", body: 'Try again later.' });
                setStatus('message');
            });
    }, [slug]);

    return <MarkdownStatusView status={status} markdown={markdown} baseUrl={baseUrl} message={message} />;
}
