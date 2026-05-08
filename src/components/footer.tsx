'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin, faSpotify, faTelegram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { NavLink, SocialLink } from '@/types/dataTypes';

// Мапінг назв іконок до компонентів FontAwesome
const iconMap: Record<string, any> = {
  'github': faGithub,
  'telegram': faTelegram,
  'tiktok': faTiktok,
  'spotify': faSpotify,
  'instagram': faInstagram,
  'linkedin': faLinkedin,
  'envelope': faEnvelope,
};

export const Footer = () => {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [copyright, setCopyright] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setNavLinks(data.navLinks || []);
        setSocialLinks(data.socialLinks || []);
        setCopyright(data.person?.copyright || 'Copyright &copy; 2025. Dmytro Yaroshenko');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading footer data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <footer className="p-8 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>Loading...</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="p-8 text-center text-gray-500 text-sm">
      <div className="max-w-7xl mx-auto">
        {/* Навігаційні лінки */}
        <div className="flex justify-center space-x-4 mb-4 flex-wrap gap-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className="hover:bg-black hover:text-white p-1 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Соціальні лінки з іконками */}
        <div className="flex justify-center items-center gap-3 mb-4 flex-wrap">
          {socialLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
              className="hover:bg-black hover:text-white p-1 transition-colors rounded"
            >
              <FontAwesomeIcon icon={iconMap[link.icon]} className="w-5 h-5" />
            </Link>
          ))}
        </div>
        
        {/* Банер Support Ukraine */}
        <div className="flex justify-center mb-4">
          <Link 
            href="https://stand-with-ukraine.pp.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg"
              alt="Support Ukraine Badge"
              width={160}
              height={40}
              className="h-auto"
              unoptimized
            />
          </Link>
        </div>
        
        {/* Копірайт з JSON */}
        <p className="text-gray-400">{copyright}</p>
      </div>
    </footer>
  );
};