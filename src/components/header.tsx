'use client';

import { basePath } from '@/app/basePath';
import { NavLink } from '@/types/dataTypes';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

export const Header = () => {
  const [name, setName] = useState<string>('<unknown name>');
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${basePath}/data/portfolio.json`)
      .then(res => res.json())
      .then(data => {
        setNavLinks(data.navLinks || []);
        setName(data.person?.name || '<unknown name>');
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading header data:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <header className={`sticky top-0 z-50 py-6 px-8 flex justify-start w-full bg-white transition-shadow duration-100 ${scrolled ? 'shadow-md' : 'shadow-sm'
        }`}>
        <Link href="/" className="hover:bg-black hover:text-white p-1">
          <h1 className="text-l underline font-medium">{"<Loading...>"}</h1>
        </Link>
      </header>
    );
  }

  return (
    <>
      <header className={`sticky top-0 z-50 py-6 px-8 flex justify-between items-center w-full bg-white transition-shadow duration-100 ${scrolled ? 'shadow-md' : ''
        }`}>
        <Link href="/" className="hover:bg-black hover:text-white p-1 shrink-0">
          <h1 className="text-l underline font-medium whitespace-nowrap">
            {`<${name}>`}
          </h1>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="hover:bg-black hover:text-white p-1 transition-colors underline whitespace-nowrap"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1 hover:bg-black hover:text-white transition-colors shrink-0"
          aria-label="Menu"
        >
          <Icon icon="heroicons:bars-3-20-solid" className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div className={`fixed top-[73px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-md transition-all duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
        <div className="flex flex-col gap-2 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={handleLinkClick}
              className="hover:bg-black hover:text-white p-2 transition-colors underline"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};