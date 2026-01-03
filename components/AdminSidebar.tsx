'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    FiHome,
    FiGrid,
    FiPackage,
    FiFileText,
    FiShoppingBag,
    FiSettings,
    FiMenu,
    FiX,
    FiLogOut
} from 'react-icons/fi';

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Breeds', href: '/admin/breeds', icon: FiGrid },
    { name: 'Puppies', href: '/admin/puppies', icon: FiPackage },
    { name: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
    { name: 'Content', href: '/admin/content', icon: FiFileText },
    { name: 'Settings', href: '/admin/settings', icon: FiSettings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        // Clear session cookie
        document.cookie = 'admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    };

    return (
        <>
            {/* Mobile Menu Button - Right Side */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-gold text-dark rounded-lg shadow-lg"
            >
                {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar - Always visible on large screens */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-brown via-brown/95 to-dark
          border-r-2 border-gold/30 z-40 transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b-2 border-gold/30">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-gold hover:text-white transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Bullify Kennel
                        </Link>
                        <p className="text-xs text-white/60 mt-1">Admin Panel</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href ||
                                (item.href !== '/admin' && pathname.startsWith(item.href));

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                                            ? 'bg-gold text-dark font-semibold shadow-lg'
                                            : 'text-white/80 hover:bg-white/10 hover:text-gold'
                                        }
                  `}
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="p-4 border-t-2 border-gold/30">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-all"
                        >
                            <FiLogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
