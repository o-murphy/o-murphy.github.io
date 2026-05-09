import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';
import { iconMap } from "./iconMap";


interface IconTextLinkData {
    name: string;
    url: string;
    icon: string;
    color: string;
    bgColor: string;
}


export function IconTextLink({ link }: { link: IconTextLinkData }) {

    return <Link
        key={link.name}
        href={link.url}
        target={link.name !== 'Email' ? '_blank' : undefined}
        rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
        className={`group flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors ${link.bgColor}`}
    >
        <FontAwesomeIcon icon={iconMap[link.icon]}
            className={`w-5 h-5 ${link.color} group-hover:text-white transition-colors`}
        />
        <span className="text-sm">{link.name}</span>
    </Link>
}

export function IconTextLinkBordered({ link }: { link: IconTextLinkData }) {

    return <Link
        key={link.name}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-2 w-full p-2 border rounded-lg hover:text-white transition-colors ${link.bgColor}`}
    >
        <FontAwesomeIcon
            icon={iconMap[link.icon] || iconMap.music}
            className={`w-5 h-5 ${link.color} group-hover:text-white transition-colors`}
        />
        <span className="text-sm font-medium">{link.name}</span>
    </Link>
}