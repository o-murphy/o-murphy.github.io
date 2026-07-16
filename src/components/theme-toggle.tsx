'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const ICONS: Record<'system' | 'light' | 'dark', IconDefinition> = {
    system: faCircleHalfStroke,
    light: faSun,
    dark: faMoon,
};

const LABELS = {
    system: 'Theme: system',
    light: 'Theme: light',
    dark: 'Theme: dark',
};

export const ThemeToggle = () => {
    const { theme, systemTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // theme/systemTheme are only known after next-themes' script runs on the client; avoid
    // rendering a mode that might not match the server before that happens.
    useEffect(() => {
        setMounted(true);
    }, []);

    const mode = (mounted ? theme : 'system') as 'system' | 'light' | 'dark';
    const resolvedSystem = (systemTheme ?? 'light') as 'light' | 'dark';
    const opposite = resolvedSystem === 'dark' ? 'light' : 'dark';

    // 3-way cycle: system -> opposite of the current system theme (so the click is always
    // visible) -> the same as the system theme (explicit) -> back to system.
    const handleClick = () => {
        if (mode === 'system') {
            setTheme(opposite);
        } else if (mode === opposite) {
            setTheme(resolvedSystem);
        } else {
            setTheme('system');
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`fixed bottom-14 left-6 z-50 bg-black/80 text-white p-2 rounded-md hover:bg-black transition-opacity duration-300 dark:bg-white/80 dark:text-black dark:hover:bg-white ${
                mounted ? 'opacity-70' : 'opacity-0 pointer-events-none'
            }`}
            aria-label={LABELS[mode]}
            title={LABELS[mode]}
        >
            {/* FontAwesome's own CSS sets height:1em (beats the h-5 class in the cascade) and
                display:inline-block (pulls it into the button's line box, adding line-height
                on top of the icon's own size) — pin both with an inline style instead. */}
            <FontAwesomeIcon
                icon={ICONS[mode]}
                className="w-5 h-5"
                style={{ width: '1.25rem', height: '1.25rem', display: 'block' }}
            />
        </button>
    );
};
