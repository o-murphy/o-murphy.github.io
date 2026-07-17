'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { basePath } from '@/app/basePath';
import { isTrustedSource } from '@/lib/urlAllowlist';
import { MarkdownStatusView, MarkdownStatus, MarkdownMessage } from './MarkdownStatusView';

const NO_URL_MESSAGE: MarkdownMessage = {
    title: '400 - No Document Specified',
    body: 'Add ?url=<markdown-url> to the address to open a document.',
};

export function MdUrlPageClient() {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const [status, setStatus] = useState<MarkdownStatus>('loading');
    const [message, setMessage] = useState<MarkdownMessage | undefined>(undefined);
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        if (!url) return;

        fetch(`${basePath}/data/portfolio.json`)
            .then((res) => res.json())
            .then((data: { markdownTrustedHosts?: string[] }) => {
                if (!isTrustedSource(url, data.markdownTrustedHosts || [])) {
                    setMessage({
                        title: '403 - Source Not Allowed',
                        body: 'This domain is not in the list of trusted markdown sources.',
                    });
                    setStatus('message');
                    return;
                }

                return fetch(url)
                    .then((res) => {
                        if (res.status === 404) throw Object.assign(new Error('Not Found'), { notFound: true });
                        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
                        return res.text();
                    })
                    .then((text) => {
                        setMarkdown(text);
                        setStatus('ready');
                    })
                    .catch((err) => {
                        console.error('Error loading markdown from url:', err);
                        setMessage(
                            err?.notFound
                                ? { title: '404 - Page Not Found' }
                                : { title: "Couldn't load this page", body: `from ${url}. Try again later.` },
                        );
                        setStatus('message');
                    });
            })
            .catch((err) => {
                console.error('Error loading trusted sources config:', err);
                setMessage({ title: "Couldn't load this page", body: 'Try again later.' });
                setStatus('message');
            });
    }, [url]);

    if (!url) {
        return <MarkdownStatusView status="message" markdown="" message={NO_URL_MESSAGE} />;
    }

    return <MarkdownStatusView status={status} markdown={markdown} baseUrl={url} message={message} />;
}
