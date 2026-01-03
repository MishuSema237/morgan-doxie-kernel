'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useEffect } from 'react';
import PriceDisplay from '@/components/PriceDisplay';

export default function OrderConfirmation() {
    const { cart, removeFromCart } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (!cart) {
            router.push('/available-puppies');
        }
    }, [cart, router]);

    if (!cart) {
        return null; // Or loading state
    }

    const { puppy } = cart;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <Link href="/available-puppies" className="flex items-center text-brown hover:text-gold transition mb-8">
                    <FaArrowLeft className="mr-2" /> Back to Puppies
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-brown">Order Confirmation</h1>
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold">1</div>
                            <div className="w-16 h-1 bg-gold"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">2</div>
                            <div className="w-16 h-1 bg-gray-300"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">3</div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Review Selection -&gt; Enter Details -&gt; Complete</p>
                </div>

                <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-gold/20">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative h-64 md:h-auto">
                            <Image
                                src={puppy.images && puppy.images[0] ? puppy.images[0] : '/photos/placeholder-dog.png'}
                                alt={puppy.breed}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-8 md:w-1/2 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-brown mb-2">{puppy.breed}</h2>
                                <div className="flex flex-col gap-2 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Age:</span>
                                        <span className="font-semibold">{puppy.age}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Gender:</span>
                                        <span className="font-semibold">{puppy.gender}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Color:</span>
                                        <span className="font-semibold">{puppy.color}</span>
                                    </div>
                                </div>
                                <PriceDisplay price={puppy.price} className="text-3xl font-bold text-gold mb-2" />
                                <p className="text-sm text-gray-500">Includes heavy vetting, vaccination records, and starter pack.</p>
                            </div>

                            <div className="mt-8 flex flex-col gap-4">
                                <button
                                    onClick={() => router.push('/order/details')}
                                    className="w-full py-4 bg-gradient-to-r from-brown to-dark text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout <FaCheck />
                                </button>
                                <button
                                    onClick={() => { removeFromCart(); router.push('/available-puppies'); }}
                                    className="w-full py-3 text-red-500 font-semibold hover:text-red-600 transition text-sm"
                                >
                                    Remove & Select Different Puppy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
