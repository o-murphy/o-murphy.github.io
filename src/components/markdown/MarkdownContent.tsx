'use client';

import { Children, createElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBan,
    faCircleInfo,
    faLightbulb,
    faTriangleExclamation,
    faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { slugify } from '@/lib/slugify';
import { Mermaid } from './Mermaid';

// inline-block (not plain inline): vertical padding on a plain inline <a> doesn't reserve
// space in the line box, so when these links wrap across lines their padding paints over
// the neighboring line instead of pushing it away.
const linkClass =
    'underline hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black p-1 inline-block transition-colors';

// GitHub's "> [!WARNING]" alert syntax isn't standard markdown, remark-gfm doesn't parse it into
// anything special — it just shows up as literal "[!WARNING]" text inside a normal blockquote's
// first paragraph. Detect it there and render it as an actual callout instead of raw marker text.
function extractText(node: ReactNode): string {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (isValidElement(node)) return extractText((node as ReactElement<{ children?: ReactNode }>).props.children);
    return '';
}

const ALERT_STYLES: Record<string, { label: string; icon: IconDefinition; classes: string; iconClasses: string }> = {
    NOTE: {
        label: 'Note',
        icon: faCircleInfo,
        classes: 'border-blue-400 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-500/15',
        iconClasses: 'text-blue-500 dark:text-blue-400',
    },
    TIP: {
        label: 'Tip',
        icon: faLightbulb,
        classes: 'border-green-400 dark:border-green-500/40 bg-green-50 dark:bg-green-500/15',
        iconClasses: 'text-green-600 dark:text-green-400',
    },
    IMPORTANT: {
        label: 'Important',
        icon: faCircleExclamation,
        classes: 'border-purple-400 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-500/15',
        iconClasses: 'text-purple-600 dark:text-purple-400',
    },
    WARNING: {
        label: 'Warning',
        icon: faTriangleExclamation,
        classes: 'border-yellow-400 dark:border-yellow-500/40 bg-yellow-50 dark:bg-yellow-500/15',
        iconClasses: 'text-yellow-600 dark:text-yellow-400',
    },
    CAUTION: {
        label: 'Caution',
        icon: faBan,
        classes: 'border-red-400 dark:border-red-500/40 bg-red-50 dark:bg-red-500/15',
        iconClasses: 'text-red-600 dark:text-red-400',
    },
};

// GitHub-style heading anchors: a chain-link icon that only appears on hover, linking to `#slug`.
function Heading({
    level,
    className,
    children,
}: {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    className: string;
    children: ReactNode;
}) {
    const slug = slugify(extractText(children));
    return createElement(
        `h${level}`,
        // scroll-mt-24 clears the site's sticky 80px header when jumping to #slug
        { id: slug, className: `group relative scroll-mt-24 ${className}` },
        <a
            href={`#${slug}`}
            aria-label="Link to this section"
            className="absolute left-[var(--heading-anchor-offset,-1.5rem)] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity no-underline inline-flex items-center"
        >
            <Icon icon="octicon:link-16" className="w-4 h-4 text-gray-400 hover:text-black dark:hover:text-white" />
        </a>,
        children,
    );
}

// Blockquotes/alerts indent their content past the markdown's left edge (border + padding).
// Headings inside them would otherwise anchor the link icon to their own (indented) edge instead
// of the shared left gutter every other heading uses — this pushes the anchor out by the same
// amount, so it lines up with the rest regardless of nesting.
function anchorIndentStyle(insetPx: number): CSSProperties {
    return { '--heading-anchor-offset': `calc(-1.5rem - ${insetPx}px)` } as CSSProperties;
}

const components: Components = {
    h1: ({ children }) => (
        <Heading level={1} className="text-2xl md:text-3xl font-bold mt-6 mb-6">
            {children}
        </Heading>
    ),
    h2: ({ children }) => (
        <Heading level={2} className="text-xl font-bold mt-6 mb-5">
            {children}
        </Heading>
    ),
    h3: ({ children }) => (
        <Heading level={3} className="text-lg font-bold mt-4 mb-4">
            {children}
        </Heading>
    ),
    h4: ({ children }) => (
        <Heading level={4} className="text-base font-bold mt-3 mb-3">
            {children}
        </Heading>
    ),
    h5: ({ children }) => (
        <Heading level={5} className="text-sm font-bold mt-2 mb-2">
            {children}
        </Heading>
    ),
    h6: ({ children }) => (
        <Heading level={6} className="text-sm font-bold mt-2 mb-2">
            {children}
        </Heading>
    ),
    p: ({ children }) => <p className="text-sm leading-relaxed mb-4">{children}</p>,
    a: ({ children, href }) => {
        // Badge links (shields.io etc, wrapping only an image with no text) shouldn't get the
        // black-box text-link hover — it clashes with the badge's own colors. Fade it instead.
        const isBadgeLink = extractText(children).trim() === '';
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={isBadgeLink ? 'hover:opacity-70 transition-opacity' : linkClass}
            >
                {children}
            </a>
        );
    },
    ul: ({ children }) => <ul className="list-disc list-inside text-sm space-y-1 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside text-sm space-y-1 mb-4">{children}</ol>,
    hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
    blockquote: ({ children }) => {
        const items = Children.toArray(children).filter((c) => !(typeof c === 'string' && c.trim() === ''));
        const marker = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]$/i.exec(extractText(items[0]).trim());

        if (marker) {
            const style = ALERT_STYLES[marker[1].toUpperCase()];
            return (
                <div className={`border-l-4 ${style.classes} p-4 my-4 rounded-r`} style={anchorIndentStyle(20)}>
                    <p className="font-bold text-sm mb-2 flex items-center gap-1.5">
                        <FontAwesomeIcon icon={style.icon} className={`w-4 h-4 ${style.iconClasses}`} /> {style.label}
                    </p>
                    <div className="text-sm [&>*:last-child]:mb-0">{items.slice(1)}</div>
                </div>
            );
        }

        return (
            <blockquote
                className="border-l-4 border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-3 my-4 text-sm"
                style={anchorIndentStyle(16)}
            >
                {children}
            </blockquote>
        );
    },
    img: ({ src, alt, width, height }) => {
        // Explicit width/height (e.g. the org logo's raw <img width="100" height="100">) means the
        // source sized it deliberately — respect that. Otherwise assume it's an inline badge (shields.io
        // etc, which never sets these) and keep it small.
        const hasExplicitSize = width != null || height != null;
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={typeof src === 'string' ? src : undefined}
                alt={alt}
                width={width}
                height={height}
                className={hasExplicitSize ? 'inline-block' : 'inline-block h-5 my-0.5 align-text-bottom mr-1'}
            />
        );
    },
    table: ({ children }) => (
        <div className="overflow-x-auto mb-4">
            <table className="text-sm border-collapse">{children}</table>
        </div>
    ),
    th: ({ children }) => (
        <th className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-left font-bold">{children}</th>
    ),
    td: ({ children }) => <td className="border border-gray-300 dark:border-gray-700 px-2 py-1">{children}</td>,
    pre: ({ children }) => {
        const child = Array.isArray(children) ? children[0] : children;
        const childClassName =
            child && typeof child === 'object' && 'props' in child
                ? (child.props as { className?: string }).className
                : undefined;
        if (childClassName?.includes('language-mermaid')) {
            return <>{children}</>;
        }
        return (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto text-sm my-4 font-mono">
                {children}
            </pre>
        );
    },
    code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        if (match?.[1] === 'mermaid') {
            return <Mermaid chart={String(children).replace(/\n$/, '')} />;
        }
        if (match) {
            return <code className={`${className} font-mono`}>{children}</code>;
        }
        return <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
    },
};

export function MarkdownContent({ markdown }: { markdown: string }) {
    return (
        <div className="font-mono">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
}
