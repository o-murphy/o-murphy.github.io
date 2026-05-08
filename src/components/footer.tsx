import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faSpotify, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="p-8 text-center text-gray-500 text-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center space-x-4 mb-4 flex-wrap gap-1">
                    <Link href="/" className="hover:bg-black hover:text-white p-1 transition-colors">home</Link>
                    <Link href="/about" className="hover:bg-black hover:text-white p-1 transition-colors">about</Link>
                    <Link href="/projects" className="hover:bg-black hover:text-white p-1 transition-colors">projects</Link>
                    <Link href="/open-source" className="hover:bg-black hover:text-white p-1 transition-colors">open-source</Link>
                    <Link href="/art" className="hover:bg-black hover:text-white p-1 transition-colors">art</Link>
                    <Link href="/contact" className="hover:bg-black hover:text-white p-1 transition-colors">contact</Link>
                </div>
                
                {/* Іконки з фіксованим розміром */}
                <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
                    <Link href="https://github.com/o-murphy/" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                    </Link>
                    <Link href="https://t.me/beanyone/" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.tiktok.com/@o_murphy/" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faTiktok} className="w-5 h-5" />
                    </Link>
                    <Link href="https://open.spotify.com/artist/5MMonfU5cEE3wKrAmIUmoi?si=Q30BXm21SXGFaI0H6CZQ1w" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faSpotify} className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.instagram.com/_o_murphy_/" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                    </Link>
                    <Link href="https://www.linkedin.com/in/o--murphy/" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                    </Link>
                    <Link href="mailto:thehelixpg@gmail.com?subject=[Inquiry]%20o-murphy.net" className="hover:bg-black hover:text-white p-1 transition-colors rounded">
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                    </Link>
                </div>
                
                {/* Банер Support Ukraine - виправлений */}
                <div className="flex justify-center mb-4">
                    <Link 
                        href="https://stand-with-ukraine.pp.ua"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                    >
                        {/* Варіант 1: Використовуйте Next.js Image з віддаленого URL */}
                        <Image
                            src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg"
                            alt="Support Ukraine Badge"
                            width={160}
                            height={40}
                            className="h-auto"
                            unoptimized // Дозволяє завантажувати зовнішні зображення без оптимізації
                        />
                        
                        {/* Варіант 2: Якщо Image не працює, використовуйте звичайний img */}
                        {/*
                        <img 
                            src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg" 
                            alt="Support Ukraine Badge"
                            className="h-8 w-auto"
                        />
                        */}
                    </Link>
                </div>
                
                <p className="text-gray-400">Copyright &copy; 2025. Dmytro Yaroshenko</p>
            </div>
        </footer>
    )
}