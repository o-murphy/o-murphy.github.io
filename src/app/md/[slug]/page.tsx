import fs from 'fs';
import path from 'path';
import { MdPageClient } from '@/components/markdown/MdPageClient';
import { slugify } from '@/lib/slugify';
import { MarkdownEntry } from '@/types/dataTypes';

function getMarkdownEntries(): MarkdownEntry[] {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'portfolio.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return data.markdown || [];
    } catch (error) {
        console.error('Error loading markdown entries:', error);
        return [];
    }
}

export async function generateStaticParams() {
    return getMarkdownEntries().map(entry => ({ slug: slugify(entry.name) }));
}

export default async function MdPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <MdPageClient slug={slug} />;
}
