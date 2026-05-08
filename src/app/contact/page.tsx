'use client';

import ContactsImg from '@/components/images/MContactsImg';
import { Template } from '@/components/template';
import { Contact } from '@/types/dataTypes';
import { faGithub, faLinkedin, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Мапінг назв іконок до компонентів
const iconMap: Record<string, any> = {
  'github': faGithub,
  'telegram': faTelegram,
  'linkedin': faLinkedin,
  'envelope': faEnvelope,
};

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setContacts(data.contacts || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading contacts:', err);
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
            {contacts.map((contact) => (
              <Link 
                key={contact.name}
                href={contact.url}
                target={contact.name !== 'Email' ? '_blank' : undefined}
                rel={contact.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center gap-2 hover:bg-black hover:text-white p-2 transition-colors"
              >
                <FontAwesomeIcon icon={iconMap[contact.icon]} className="w-5 h-5" />
                <span className="text-sm">{contact.name}</span>
              </Link>
            ))}
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