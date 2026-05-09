'use client';

import {IconTextLinkBordered} from '@/components/links/links';
import { Template } from '@/components/template';
import { ArtLink } from '@/types/dataTypes';
import { useEffect, useState } from 'react';


export default function ArtPage() {
    const [artLinks, setArtLinks] = useState<ArtLink[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/portfolio.json')
            .then(res => res.json())
            .then(data => {
                setArtLinks(data.artLinks || []);
                console.log(data.artLinks);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading art data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <p>Loading...</p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section className="flex flex-col items-center justify-center h-full text-center">
                    {/* <h1 className="text-3xl font-bold mb-8">Art & Music</h1> */}

                    {/* Music Links */}
                    <div className="w-full max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-6">Listen to my music</h2>
                        <div className="space-y-3">
                            {artLinks.map((link) => (
                                <IconTextLinkBordered key={link.name} link={link} />
                            ))}
                        </div>
                    </div>

                    {/* Coming Soon Section */}
                    {/* <div className="mt-12 pt-8 border-t border-gray-200">
                            <h2 className="text-lg font-bold mb-4">Coming Soon</h2>
                            <p className="text-sm text-gray-500">
                            🎸 Live performances and behind-the-scenes content
                            </p>
                        </div> */}
                </section>
            </div>
        </Template>
    );
}