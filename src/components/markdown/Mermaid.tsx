'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export function Mermaid({ chart }: { chart: string }) {
    const id = useId().replace(/[^a-zA-Z0-9]/g, '');
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        let cancelled = false;

        import('mermaid').then(async ({ default: mermaid }) => {
            // Mermaid bakes colors directly into the rendered SVG, so it needs its own theme
            // (re-rendered whenever the site's theme changes) rather than following dark: classes.
            mermaid.initialize({ startOnLoad: false, theme: resolvedTheme === 'dark' ? 'dark' : 'neutral' });
            try {
                const { svg } = await mermaid.render(`mermaid-${id}`, chart);
                if (!cancelled && containerRef.current) {
                    containerRef.current.innerHTML = svg;
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to render diagram');
                }
            }
        });

        return () => {
            cancelled = true;
        };
    }, [chart, id, resolvedTheme]);

    if (error) {
        return (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto text-xs my-4 text-red-600 dark:text-red-400">
                {chart}
            </pre>
        );
    }

    return <div ref={containerRef} className="my-4 flex justify-center overflow-x-auto" />;
}
