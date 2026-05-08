'use client';

import ContactsImg from '@/components/images/MContactsImg';
import { Template } from '@/components/template';
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function About() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col items-center justify-center h-full text-center">
                    {/* Картинка зверху - SVG компонент */}
                    <div className="flex justify-center mb-6">
                        <div className="w-64">  {/* або w-24, w-28, w-36 тощо */}
                            <ContactsImg className="w-full h-auto" />
                        </div>
                    </div>

                    <h2 className="text-lg font-bold mb-4">Contact me</h2>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <Link href="https://github.com/o-murphy/" className="flex items-center gap-3 hover:bg-black hover:text-white p-3 transition-colors rounded">
                            <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                            <span>GitHub</span>
                        </Link>

                        <Link href="https://t.me/beanyone/" className="flex items-center gap-3 hover:bg-black hover:text-white p-3 transition-colors rounded">
                            <FontAwesomeIcon icon={faTelegram} className="w-6 h-6" />
                            <span>Telegram</span>
                        </Link>

                        <Link href="https://www.linkedin.com/in/o--murphy/" className="flex items-center gap-3 hover:bg-black hover:text-white p-3 transition-colors rounded">
                            <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                            <span>LinkedIn</span>
                        </Link>

                        <Link href="mailto:thehelixpg@gmail.com?subject=[Inquiry]%20o-murphy.net" className="flex items-center gap-3 hover:bg-black hover:text-white p-3 transition-colors rounded">
                            <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
                            <span>Email</span>
                        </Link>
                    </div>
                </section>
            </div>
        </Template>
    );
}