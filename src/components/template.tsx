'use client';

import { Main } from "./main"
import { Footer } from "./footer"
import { Header } from "./header"
import { ReactNode, useEffect, useState } from "react"
import { Icon } from '@iconify/react';

export const Template = ({ children }: { children: ReactNode }) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="bg-white text-gray-800 font-mono antialiased flex flex-col min-h-screen">
    <Header />
    <Main>
        {children}
    </Main>
    <Footer />
    
    {/* Floating button with Iconify */}
    <button
        onClick={scrollToTop}
        className={`fixed bottom-14 right-6 z-50 bg-black/80 text-white p-2 rounded-md hover:bg-black transition-opacity duration-300 ${
            showScrollTop ? 'opacity-70' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
    >
        <Icon icon="heroicons:arrow-up-20-solid" className="w-5 h-5" />
    </button>
</div>
    )
}