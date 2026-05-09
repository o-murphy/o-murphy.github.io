'use client';

import { Template } from '@/components/template';
import { ArtLink } from '@/types/dataTypes';
import { faApple, faSpotify, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const iconMap: Record<string, any> = {
    'spotify': faSpotify,
    'youtube': faYoutube,
    'youtubeMusic': faYoutube,
    'apple': faYoutube,
    'appleMusic': faApple,
    'tiktok': faTiktok,
};

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
                    <h1 className="text-3xl font-bold mb-8">Art & Music</h1>

                    {/* Music Links */}
                    <div className="w-full max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-6">Listen to my music</h2>
                        <div className="space-y-3">
                            {artLinks.map((link: any) => (
                                <Link
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex items-center justify-center gap-2 w-full p-2 border rounded-lg hover:text-white transition-colors ${link.bgColor}`}
                                >
                                    <FontAwesomeIcon
                                        icon={iconMap[link.icon] || faMusic}
                                        className={`w-5 h-5 ${link.color} group-hover:text-white transition-colors`}
                                    />
                                    <span className="text-sm font-medium">{link.name}</span>
                                </Link>
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