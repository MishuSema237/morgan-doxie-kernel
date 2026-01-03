'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent hydration mismatch
    if (!isMounted) {
        return <div className="min-h-screen bg-gray-50">{children}</div>;
    }

    const isLoginPage = pathname === '/admin/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50 main-admin-layout">
            <AdminSidebar />

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Header */}
                <header className="h-16 bg-white border-b-2 border-gold/20 sticky top-0 z-20 shadow-sm">
                    <div className="h-full px-8 flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-brown">Admin Dashboard</h1>
                        <div className="text-sm text-gray-500">
                            {/* Simplified Date to avoid hydration errors or complexities for now */}
                            Admin Panel
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
