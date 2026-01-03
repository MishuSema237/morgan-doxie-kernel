'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Available Puppies', path: '/available-puppies' },
        { name: 'Breeds', path: '/breeds' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact-us' },
    ];

    return (
        <>
            <header className="h-20 bg-cream/95 border-b-2 border-gold/20 sticky top-0 z-50 shadow-sm backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition font-serif">
                        Bullify Kennel
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`text-base font-medium transition relative group ${isActive(link.path) ? 'text-gold' : 'text-brown hover:text-gold'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`}></span>
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        {/* WhatsApp button removed */}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-brown hover:text-gold transition p-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <FaBars size={28} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-dark/50 z-50 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-cream z-50 shadow-2xl transition-transform duration-300 transform lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 flex items-center justify-between border-b border-gold/20">
                    <span className="text-xl font-bold text-brown">Menu</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-brown hover:text-red-500 transition p-2"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`text-lg font-medium px-4 py-3 rounded-xl transition ${isActive(link.path)
                                ? 'bg-gold/10 text-gold hover:bg-gold/20'
                                : 'text-brown hover:bg-brown/5'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="mt-8 pt-8 border-t border-gold/20">
                        {/* WhatsApp button removed */}
                    </div>
                </nav>
            </div>
        </>
    );
}
