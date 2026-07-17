import { Suspense } from 'react';
import { MdUrlPageClient } from '@/components/markdown/MdUrlPageClient';

export default function MdIndexPage() {
    return (
        <Suspense>
            <MdUrlPageClient />
        </Suspense>
    );
}
