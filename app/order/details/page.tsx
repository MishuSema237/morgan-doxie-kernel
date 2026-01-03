'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaLock } from 'react-icons/fa';
import PriceDisplay from '@/components/PriceDisplay';

export default function OrderDetails() {
    const { cart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    useEffect(() => {
        if (!cart) {
            router.push('/available-puppies');
        }
    }, [cart, router]);

    if (!cart) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    puppyId: cart.puppyId,
                    customer: formData,
                    amount: cart.puppy.price
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            // Success - redirect to success page with order details (or just clear cart and separate page)
            // Ideally pass order ID or something. 
            // For now we can just redirect and maybe clear cart there or pass query param.
            // But clearing cart here is safer.
            // Actually success page might need order details. Let's pass order param.
            // Or use local storage or context update.
            // Let's pass orderNumber in query.
            router.push(`/order/success?orderNumber=${data.order.orderNumber}`);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <Link href="/order/confirmation" className="flex items-center text-brown hover:text-gold transition mb-8">
                    <FaArrowLeft className="mr-2" /> Back to Confirmation
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-brown">Client Details</h1>
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold">✓</div>
                            <div className="w-16 h-1 bg-gold"></div>
                            <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold">2</div>
                            <div className="w-16 h-1 bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Secure Order Process</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border-2 border-gold/20">
                    <h2 className="text-xl font-bold text-brown mb-6 flex items-center gap-2">
                        <FaLock className="text-gold" /> Personal Information
                    </h2>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input required name="city" value={formData.city} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State/Region</label>
                                <input required name="state" value={formData.state} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input required name="zipCode" value={formData.zipCode} onChange={handleChange} type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                            <select name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition bg-white">
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                {/* Add more as needed */}
                            </select>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium">Total to Pay (On Delivery/Transfer)</span>
                                <PriceDisplay price={cart.puppy.price} className="text-2xl font-bold text-gold" />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-brown to-dark text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Complete Order'}
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-4">By completing this order, you agree to our terms of service.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
