'use client';

import MProjectsImg from '@/components/images/MProjectsImg';
import { Template } from '@/components/template';
import { faJs, faPython } from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

import React from 'react';

export default function About() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">
                    {/* Left Column for Image */}
                    <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4 mb-8 md:mb-0">
                        <MProjectsImg className="w-full h-auto max-w-sm" />
                    </div>

                    {/* Right Column for Project Links */}
                    <div className="md:w-1/2">
                        <h2 className="text-lg font-bold mb-4 text-center md:text-left">Projects & Libraries</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {/* Project 1: py-ballisticcalc */}
                            <Link href="https://github.com/o-murphy/py-ballisticcalc" className="block p-1 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base leading-snug">py-ballisticcalc</h3>
                                    <div>
                                        <FontAwesomeIcon icon={faPython} className="w-6 h-6" />
                                        <FontAwesomeIcon icon={faC} className="w-6 h-6" />
                                    </div>
                                </div>
                                <p className="text-xs">
                                    LGPL library for small arms ballistic calculations.
                                </p>
                            </Link>

                            {/* Project 2: pydfuutil */}
                            <Link href="https://github.com/o-murphy/pydfuutil" className="block p-1 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base leading-snug">pydfuutil</h3>
                                    <FontAwesomeIcon icon={faPython} className="w-6 h-6" />
                                </div>
                                <p className="text-xs">
                                    A pure Python wrapper for `dfu-util` to libusb.
                                </p>
                            </Link>

                            {/* Project 3: js-ballistics */}
                            <Link href="https://github.com/o-murphy/js-ballistics" className="block p-1 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base leading-snug">js-ballistics</h3>
                                    <FontAwesomeIcon icon={faJs} className="w-6 h-6" />
                                </div>
                                <p className="text-xs">
                                    ISC library for small arms ballistic calculations (JavaScript ES6+).
                                </p>
                            </Link>

                            {/* Project 4: py-aiowialon */}
                            <Link href="https://github.com/o-murphy/py-aiowialon" className="block p-1 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base leading-snug">py-aiowialon</h3>
                                    <FontAwesomeIcon icon={faPython} className="w-6 h-6 text-black-500 dark:text-black-400" />
                                </div>
                                <p className="text-xs">
                                    An async Python wrapper for the Wialon Remote API.
                                </p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Template>
    );
}