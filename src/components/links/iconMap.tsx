import type { ComponentType } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faApple, faSpotify, faTiktok, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faInstagram, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faFlutter, faJs, faPython } from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { SiTypescript, SiCplusplus, SiWebassembly } from '@icons-pack/react-simple-icons';

type IconComponent = ComponentType<{ className?: string }>;

export const wrapFa = (icon: IconDefinition): IconComponent =>
    function FaIcon({ className }) {
        return <FontAwesomeIcon icon={icon} className={className} />;
    };

// FontAwesome's own core CSS forces `width: 1.125em; height: 1em` on every icon regardless of
// our w-*/h-* classes (it's injected after Tailwind's stylesheet, so it wins the specificity tie).
// simple-icons has no such override, so match it explicitly or SI icons render bigger than FA ones.
export const wrapSi = (Icon: ComponentType<{ className?: string; style?: React.CSSProperties }>): IconComponent =>
    function SiIcon({ className }) {
        return <Icon className={className} style={{ width: '1.25em', height: '0.9em' }} />;
    };

export const iconMap: Record<string, IconComponent> = {
    'spotify': wrapFa(faSpotify),
    'youtube': wrapFa(faYoutube),
    'youtubeMusic': wrapFa(faYoutube),
    'apple': wrapFa(faYoutube),
    'appleMusic': wrapFa(faApple),
    'tiktok': wrapFa(faTiktok),
    'music': wrapFa(faMusic),
    'github': wrapFa(faGithub),
    'telegram': wrapFa(faTelegram),
    'instagram': wrapFa(faInstagram),
    'linkedin': wrapFa(faLinkedin),
    'envelope': wrapFa(faEnvelope),
    'python': wrapFa(faPython),
    // no Cython logo in either icon set, Python's is the closest fit (Cython is a Python superset)
    'cython': wrapFa(faPython),
    'flutter': wrapFa(faFlutter),
    'js': wrapFa(faJs),
    'c': wrapFa(faC),
    // no FontAwesome logo for these, simple-icons has them
    'ts': wrapSi(SiTypescript),
    'cpp': wrapSi(SiCplusplus),
    'wasm': wrapSi(SiWebassembly),
};
