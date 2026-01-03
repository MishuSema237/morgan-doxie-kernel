'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaPrint } from 'react-icons/fa';
import { useEffect, Suspense } from 'react';
import { useCart } from '@/context/CartContext';

export const dynamic = 'force-dynamic';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('orderNumber');
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear cart on success page load
        clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-4xl text-green-500" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-brown mb-2">Order Confirmed!</h1>
                    <p className="text-gray-500">Thank you for choosing Bullify Kennel.</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gold/20 text-left mb-8">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Order Receipt</h3>
                    <div className="py-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Order Number</span>
                            <span className="font-mono font-bold text-brown">{orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Status</span>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-bold">Pending Confirmation</span>
                        </div>
                        <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
                            A confirmation email has been sent to your inbox. We will contact you shortly to arrange delivery and payment.
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <button onClick={() => window.print()} className="w-full py-3 bg-white border-2 border-brown text-brown font-semibold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                        <FaPrint /> Print Receipt
                    </button>
                    <Link href="/" className="w-full py-3 bg-gradient-to-r from-brown to-dark text-white font-semibold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
                        <FaHome /> Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function OrderSuccess() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <OrderSuccessContent />
        </Suspense>
    );
}
