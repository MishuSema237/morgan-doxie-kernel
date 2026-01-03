'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaPhone, FaEnvelope, FaTwitter } from 'react-icons/fa';

interface SocialMedia {
  instagram?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  whatsapp?: string;
}

interface Contact {
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  businessHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
}

interface Settings {
  socialMedia: SocialMedia;
  contact: Contact;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
      })
      .catch((err) => {
        console.error('Error fetching settings:', err);
      });
  }, []);

  const socialMedia = settings?.socialMedia || {
    instagram: 'https://instagram.com/bullifykennel',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    whatsapp: 'https://wa.me/234XXXXXXXXX'
  };

  const contact = settings?.contact || {
    phone: '+234 XXX XXX XXXX',
    whatsapp: '+234 XXX XXX XXXX',
    email: 'info@bullifykennel.com',
    address: 'Your Location',
    businessHours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  };

  // Only show social icons that have links
  const socialLinks = [
    { key: 'instagram', url: socialMedia.instagram, icon: FaInstagram },
    { key: 'facebook', url: socialMedia.facebook, icon: FaFacebook },
    { key: 'twitter', url: socialMedia.twitter, icon: FaTwitter },
    { key: 'tiktok', url: socialMedia.tiktok, icon: FaTiktok },
    { key: 'whatsapp', url: socialMedia.whatsapp, icon: FaWhatsapp },
  ].filter((link) => link.url && link.url.trim() !== '' && link.url !== '#');

  return (
    <footer className="bg-dark text-white pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-bold mb-4 text-gold">Bullify Kennel</div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Premium Dachshund breeding. Healthy, happy puppies for loving families.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.key}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition"
                      aria-label={link.key}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-base font-bold mb-4 text-gold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-300 hover:text-gold transition">
                Home
              </Link>
              <Link href="/available-puppies" className="text-sm text-gray-300 hover:text-gold transition">
                Available Puppies
              </Link>
              <Link href="/breeds" className="text-sm text-gray-300 hover:text-gold transition">
                Breeds
              </Link>
              <Link href="/about-us" className="text-sm text-gray-300 hover:text-gold transition">
                About Us
              </Link>
              <Link href="/gallery" className="text-sm text-gray-300 hover:text-gold transition">
                Gallery
              </Link>
              <Link href="/contact-us" className="text-sm text-gray-300 hover:text-gold transition">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-4 text-gold">Contact Info</h3>
            <div className="text-sm text-gray-300 space-y-2">
              {contact.phone && (
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gold" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {/* WhatsApp removed */}
              {contact.email && (
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gold" />
                  <span>{contact.email}</span>
                </div>
              )}
              {contact.address && <p className="mt-2">{contact.address}</p>}
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-4 text-gold">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-2">Get updates on available puppies</p>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-3 py-3 border border-gold/30 bg-brown/30 rounded-2xl mb-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gold"
            />
            <button className="w-full px-3 py-3 bg-gradient-to-r from-gold to-brown text-dark border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform">
              Subscribe
            </button>
            {contact.businessHours?.weekdays && (
              <p className="text-sm text-gray-300 mt-4">
                Business Hours: {contact.businessHours.weekdays}
              </p>
            )}
          </div>
        </div>
        <div className="border-t border-gold/30 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div>© 2024 Bullify Kennel. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gold transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gold transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}



