'use client';

import MFeelingProud from '@/components/images/MFeelingProud';
import { Template } from '@/components/template';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">
                    <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4">
                        <MFeelingProud className="w-full h-auto max-w-sm" />
                    </div>
                    
                    <div className="md:w-1/2">
                        <p className="text-sm font-light leading-relaxed">
                            Based in Kyiv, Ukraine. Passionate about building sustainable and scalable systems.
                            <br /><br />
                            Creator of the leading 
                            <Link href="https://github.com/o-murphy/py-ballisticcalc" className="underline hover:bg-black hover:text-white p-1">
                                open-source ballistics project
                            </Link>
                            — a 3-DOF + spin-drift ballistic solver with extensive customization features.
                            <br /><br />
                            Experienced in cross-platform development and cross-language integration (Cython, WASM, C++). Author of 
                            <Link href="https://github.com/o-murphy/ebalistyka-app" className="underline hover:bg-black hover:text-white p-1">
                                ebalistyka
                            </Link>
                            (Ballistic Calculator built with Flutter),
                            <Link href="https://github.com/ballistics-lab/bclibc" className="underline hover:bg-black hover:text-white p-1">
                                bclibc
                            </Link>
                            (high performance C++ ballistic calculation engine), and 
                            <Link href="https://github.com/o-murphy/pydfuutil" className="underline hover:bg-black hover:text-white p-1">
                                pydfuutil
                            </Link>
                            (Python DFU utility wrapper).
                            <br /><br />
                            Former Telematics Specialist, currently working with IoT solutions.
                            <br /><br />
                            Always eager to learn new technologies and deliver innovative solutions.
                        </p>
                    </div>
                </section>
            </div>
        </Template>
    );
}