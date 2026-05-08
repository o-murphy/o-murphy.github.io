'use client';

import ContactsImg from '@/components/images/MContactsImg';
import { Template } from '@/components/template';
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section className="flex flex-col items-center justify-center h-full text-center">
                    
                    {/* Картинка */}
                    <div className="flex justify-center mb-6">
                        <div className="w-48 md:w-64">
                            <ContactsImg className="w-full h-auto" />
                        </div>
                    </div>

                    {/* Greeting */}
                    <h2 className="text-xl font-bold mb-2">Let's connect</h2>
                    <p className="text-sm text-gray-500 mb-6">Feel free to reach out for collaborations or just a chat</p>

                    {/* Contact Links - 2 columns grid */}
                    <div className="grid grid-cols-2 gap-3 max-w-md w-full mx-auto">
                        <Link href="https://github.com/o-murphy/" 
                              className="flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors">
                            <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                            <span className="text-sm">GitHub</span>
                        </Link>

                        <Link href="https://t.me/beanyone/" 
                              className="flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors">
                            <FontAwesomeIcon icon={faTelegram} className="w-5 h-5" />
                            <span className="text-sm">Telegram</span>
                        </Link>

                        <Link href="https://www.linkedin.com/in/o--murphy/" 
                              className="flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors">
                            <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                            <span className="text-sm">LinkedIn</span>
                        </Link>

                        <Link href="mailto:thehelixpg@gmail.com?subject=[Inquiry]%20o-murphy.net" 
                              className="flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors">
                            <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                            <span className="text-sm">Email</span>
                        </Link>
                    </div>

                    {/* Response time note */}
                    <p className="text-xs text-gray-400 mt-6">
                        ⚡ Usually responds within 24 hours
                    </p>
                </section>
            </div>
        </Template>
    );
}