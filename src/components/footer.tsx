import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faSpotify, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


export const Footer = () => {
    return (
        <footer className="p-8 text-center text-gray-500 text-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="/" className="hover:bg-black hover:text-white p-1">home</a>
                    <a href="/about" className="hover:bg-black hover:text-white p-1">about</a>
                    <a href="/projects" className="hover:bg-black hover:text-white p-1">projects</a>
                    <a href="/open-source" className="hover:bg-black hover:text-white p-1">open-source</a>
                    <a href="/art" className="hover:bg-black hover:text-white p-1">art</a>
                    <a href="/contact" className="hover:bg-black hover:text-white p-1">contact</a>
                </div>
                <div className="flex justify-center space-x-1 mb-2">
                    <a href="https://github.com/o-murphy/" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://t.me/beanyone/" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faTelegram} />
                    </a>
                    <a href="https://www.tiktok.com/@o_murphy/" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faTiktok} />
                    </a>
                    <a href="https://open.spotify.com/artist/5MMonfU5cEE3wKrAmIUmoi?si=Q30BXm21SXGFaI0H6CZQ1w" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faSpotify} />
                    </a>
                    <a href="https://www.instagram.com/_o_murphy_/" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://www.linkedin.com/in/o--murphy/" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="mailto:thehelixpg@gmail.com?subject=[Inquiry]%20o-murphy.net" className="hover:bg-black hover:text-white p-1">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                </div>
                <div className="flex justify-center space-x-1 mb-2">
                    <a href="https://stand-with-ukraine.pp.ua">
                        <img src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg" alt="Support Ukraine Badge" />
                    </a>
                </div>
                <p className="text-gray-400">Copyright &copy; 2025. Dmytro Yaroshenko</p>
            </div>
        </footer>
    )
}