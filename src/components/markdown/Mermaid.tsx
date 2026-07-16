'use client';

import { useEffect, useId, useRef, useState } from 'react';

export function Mermaid({ chart }: { chart: string }) {
    const id = useId().replace(/[^a-zA-Z0-9]/g, '');
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        import('mermaid').then(async ({ default: mermaid }) => {
            mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
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
    }, [chart, id]);

    if (error) {
        return (
            <pre className="bg-gray-100 rounded p-3 overflow-x-auto text-xs my-4 text-red-600">
                {chart}
            </pre>
        );
    }

    return <div ref={containerRef} className="my-4 flex justify-center overflow-x-auto" />;
}
