'use client';

import MFeelingProud from '@/components/images/MFeelingProud';
import { Template } from '@/components/template';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">
                    {/* Left Column for Image (on md screens) */}
                    <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4">
                        <MFeelingProud className="w-full h-auto max-w-sm" />
                    </div>
                    {/* Right Column for Text Content (on md screens) */}
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pl-4">
                        <p className="text-sm font-light leading-relaxed">
                            I&apos;m located in Kyiv, Ukraine.<br />
                            A passionate individual who always thrives to work on end to end products<br />
                            which develop sustainable and scalable social and technical systems to create impact.<br /><br />

                            The creator of the most important at the moment
                            <Link href="https://github.com/o-murphy/py-ballisticcalc" className="underline hover:bg-black hover:text-white p-1">
                                open-source ballistics project,
                            </Link>
                            the 3-DOF + spin-drift ballistic solver with lot&apos;s of customisable and extendable features.
                            <br /><br />
                            I have extensive experience in cross-platform development and cross-language integration (Cython, WASM, C++, etc.), focusing on building efficient, interoperable systems and open-source tooling that bridges multiple technologies.
                            <br /><br />
                            As Telematics Specialist in the past<br />
                            I still interested in this area and continue to work with telematics and IOT sollutions.
                            <br /><br />
                            I am always eager to learn new technologies and improve my skills to deliver innovative solutions.
                        </p>
                    </div>
                </section>
            </div>
        </Template>
    );
}