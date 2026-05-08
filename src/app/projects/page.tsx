'use client';

import MProjectsImg from '@/components/images/MProjectsImg';
import { Template } from '@/components/template';
import { faFlutter, faJs, faPython } from '@fortawesome/free-brands-svg-icons';
import { faC } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';


export default function ProjectsPage() {
    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="projects-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">

                    <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4 mb-8 md:mb-0">
                        <MProjectsImg className="w-full h-auto max-w-sm" />
                    </div>

                    <div className="md:w-1/2">
                        <h2 className="text-lg p-2 font-bold mb-4 text-center md:text-left">Projects & Libraries</h2>
                        <div className="space-y-2">

                            <Link href="https://github.com/o-murphy/py-ballisticcalc"
                                className="block p-2 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">py-ballisticcalc</h3>
                                    <div className="flex gap-1.5">
                                        <FontAwesomeIcon icon={faPython} className="w-4 h-4 text-blue-500" />
                                        <FontAwesomeIcon icon={faC} className="w-4 h-4 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-xs font-light leading-relaxed mt-1">LGPL library for small arms ballistic calculations.</p>
                            </Link>

                            <Link href="https://github.com/o-murphy/ebalistyka-app"
                                className="block p-2 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">ebalistyka-app</h3>
                                    <div className="flex gap-1.5">
                                        <FontAwesomeIcon icon={faFlutter} className="w-4 h-4 text-blue-500" />
                                        <FontAwesomeIcon icon={faC} className="w-4 h-4 text-purple-500" />
                                    </div>
                                </div>
                                <p className="text-xs font-light leading-relaxed mt-1">Ballistic Calculator built with Flutter and high performance C++ engine</p>
                            </Link>


                            <Link href="https://github.com/o-murphy/pydfuutil"
                                className="block p-2 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">pydfuutil</h3>
                                    <FontAwesomeIcon icon={faPython} className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-xs font-light leading-relaxed mt-1">A pure Python wrapper for `dfu-util` to libusb.</p>
                            </Link>

                            <Link href="https://github.com/o-murphy/js-ballistics"
                                className="block p-2 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">js-ballistics</h3>
                                    <FontAwesomeIcon icon={faJs} className="w-4 h-4 text-yellow-500" />
                                </div>
                                <p className="text-xs font-light leading-relaxed mt-1">ISC library for small arms ballistic calculations (JavaScript ES6+).</p>
                            </Link>

                            <Link href="https://github.com/o-murphy/py-aiowialon"
                                className="block p-2 text-black hover:bg-black hover:text-white">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-sm">py-aiowialon</h3>
                                    <FontAwesomeIcon icon={faPython} className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-xs font-light leading-relaxed mt-1">An async Python wrapper for the Wialon Remote API.</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </Template>
    );
}