'use client';

import { ReactNode } from 'react';
import { Template } from '@/components/template';
import { MarkdownContent } from './MarkdownContent';

export type MarkdownStatus = 'loading' | 'message' | 'ready';

export type MarkdownMessage = {
    title: string;
    body?: ReactNode;
};

export function MarkdownStatusView({
    status,
    markdown,
    baseUrl,
    message,
}: {
    status: MarkdownStatus;
    markdown: string;
    baseUrl?: string;
    message?: MarkdownMessage;
}) {
    if (status === 'loading') {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <p>Loading...</p>
                </div>
            </Template>
        );
    }

    if (status === 'message') {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <h1 className="text-xl font-bold">{message?.title}</h1>
                    {message?.body && <p className="text-sm mt-2">{message.body}</p>}
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                {baseUrl && (
                    <a
                        href={baseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={baseUrl}
                        className="mb-2 block max-w-full truncate px-2 text-xs text-gray-500 dark:text-gray-400 underline hover:text-black dark:hover:text-white"
                    >
                        {baseUrl}
                    </a>
                )}
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6 md:p-8 bg-white dark:bg-background">
                    <MarkdownContent markdown={markdown} baseUrl={baseUrl} />
                </div>
            </div>
        </Template>
    );
}
