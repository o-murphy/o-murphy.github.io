'use client';

import { IconTextLinkBordered } from '@/components/links/links';
import { Template } from '@/components/template';
import { Loading, MIN_LOADING_MS } from '@/components/loading';
import { ArtLink } from '@/types/dataTypes';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { basePath } from '@/app/basePath';

// Fetched once from https://open.spotify.com/oembed?url=...track/7FcGOFQQhCqLBINpd0ERNg
const SPOTIFY_TRACK_ID = '7FcGOFQQhCqLBINpd0ERNg';
const SPOTIFY_TITLE = 'On the Edge of a Ruins';
const SPOTIFY_THUMBNAIL = 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02d13482847bf9ccc3d48ecbbf';

export default function ArtPage() {
    const [artLinks, setArtLinks] = useState<ArtLink[]>([]);
    const [loading, setLoading] = useState(true);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // The Spotify embed is heavy (its own app/CSS/JS/DRM checks) — don't pay that cost until the
    // visitor actually asks to play something. Show a static cover + play button first instead.
    const [spotifyLoaded, setSpotifyLoaded] = useState(false);
    // Spotify's iframe document paints white/blank (with its own scrollbar) for a moment before
    // its JS applies the real theme — keep the cover on top until the iframe fires onLoad.
    const [spotifyReady, setSpotifyReady] = useState(false);

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

                    <div className="relative w-full max-w-md mx-auto h-[152px] rounded-xl overflow-hidden">
                        {spotifyLoaded && (
                            <iframe
                                data-testid="embed-iframe"
                                className="w-full bg-transparent"
                                src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=generator${spotifyTheme}`}
                                height="152"
                                allowFullScreen
                                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                onLoad={() => setSpotifyReady(true)}
                                style={{ borderRadius: '12px' }}
                            ></iframe>
                        )}

                        {!spotifyReady && (
                            <button
                                onClick={() => setSpotifyLoaded(true)}
                                className="group absolute inset-0 block w-full h-full"
                                aria-label={`Play "${SPOTIFY_TITLE}" on Spotify`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={SPOTIFY_THUMBNAIL}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-3 px-4">
                                    <span className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white shrink-0">
                                        <FontAwesomeIcon
                                            icon={spotifyLoaded ? faSpinner : faPlay}
                                            className={`w-4 h-4 ${spotifyLoaded ? 'animate-spin' : 'ml-0.5'}`}
                                        />
                                    </span>
                                    <span className="text-white text-sm font-medium truncate">{SPOTIFY_TITLE}</span>
                                </div>
                            </button>
                        )}
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
