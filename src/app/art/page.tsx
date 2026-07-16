'use client';

import { IconTextLinkBordered } from '@/components/links/links';
import { Template } from '@/components/template';
import { Loading, MIN_LOADING_MS } from '@/components/loading';
import { ArtLink } from '@/types/dataTypes';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { basePath } from '@/app/basePath';

export default function ArtPage() {
    const [artLinks, setArtLinks] = useState<ArtLink[]>([]);
    const [loading, setLoading] = useState(true);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Spotify's embed defaults to its own dark skin; `theme=0` forces the light one. Only ask
    // for it when the site itself is light, otherwise the white widget clashes with our dark bg.
    const spotifyTheme = mounted && resolvedTheme === 'dark' ? '' : '&theme=0';

    useEffect(() => {
        fetch(`${basePath}/data/portfolio.json`)
            .then((res) => res.json())
            .then((data) => {
                setArtLinks(data.artLinks || []);
            })
            .catch((err) => {
                console.error('Error loading art data:', err);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), MIN_LOADING_MS);
            });
    }, []);

    if (loading) {
        return (
            <Template>
                <Loading />
            </Template>
        );
    }

    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section className="flex flex-col items-center justify-center h-full text-center">
                    <h2 className="text-xl font-bold mb-6">Listen to my music</h2>

                    {/* Spotify iframe */}
                    {/* <div className="w-full max-w-md mx-auto">
                        <iframe
                            data-testid="embed-iframe"
                            className="rounded-xl w-full"
                            src="https://open.spotify.com/embed/artist/5MMonfU5cEE3wKrAmIUmoi?utm_source=generator&theme=0"
                            height="352"
                            frameBorder="0"
                            allowFullScreen
                            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"s
                        />
                    </div> */}

                    <div className="w-full max-w-md mx-auto">
                        <iframe
                            data-testid="embed-iframe"
                            className="w-full bg-transparent"
                            src={`https://open.spotify.com/embed/track/7FcGOFQQhCqLBINpd0ERNg?utm_source=generator${spotifyTheme}`}
                            height="152"
                            allowFullScreen
                            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ borderRadius: '12px' }}
                        ></iframe>
                    </div>

                    {/* Music Links */}
                    <div className="w-full max-w-md mx-auto mt-8">
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
