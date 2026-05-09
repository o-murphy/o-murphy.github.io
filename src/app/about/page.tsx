'use client';

import MFeelingProud from '@/components/images/MFeelingProud';
import { Template } from '@/components/template';
import { useEffect, useState } from 'react';
import { basePath } from '@/app/basePath';

export default function AboutPage() {
    const [paragraphs, setParagraphs] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${basePath}/data/portfolio.json`)
            .then(res => res.json())
            .then(data => {
                setParagraphs(data.about?.paragraphs || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading about content:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Template>
                <div className="w-full max-w-4xl p-8 text-center">
                    <p>Loading...</p>
                </div>
            </Template>
        );
    }

    return (
        <Template>
            <div className="w-full max-w-4xl p-8">
                <section id="about-content" className="flex flex-col md:flex-row items-center justify-center md:justify-between h-full text-center md:text-left">
                    <div className="md:w-1/2 flex justify-center md:justify-start md:pr-4">
                        <MFeelingProud className="w-full h-auto max-w-sm" />
                    </div>

                    <div className="md:w-1/2">
                        <div className="text-sm font-light leading-relaxed space-y-4">
                            {paragraphs.map((paragraph, index) => (
                                <p 
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: paragraph }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Template>
    );
}