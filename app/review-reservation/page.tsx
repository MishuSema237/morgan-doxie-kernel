'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCheck, FaEdit, FaLock } from 'react-icons/fa';

function ReviewReservationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const puppyId = searchParams.get('id') || '1';

  // Sample data - in real app, get from form state/context
  const list = [
    { id: '1', name: 'Max', breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tag: 'Family Friendly', price: 180000, image: '/photos/3dogs_transparent_bg.png' },
    { id: '2', name: 'Luna', breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tag: 'Active', price: 220000, image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg' },
    { id: '3', name: 'Buddy', breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tag: 'Calm', price: 170000, image: '/photos/3dogs.jpg' },
    { id: '4', name: 'Rocky', breed: 'Pitbull', age: '12 weeks', gender: 'Male', tag: 'Energetic', price: 200000, image: '/photos/pitbull.png' },
    { id: '5', name: 'Bella', breed: 'Pitbull', age: '10 weeks', gender: 'Female', tag: 'Affectionate', price: 205000, image: '/photos/pitbull_sitting.png' },
  ];
  const selected = list.find(p => p.id === puppyId) || list[0];
  const reservation = {
    puppy: {
      id: selected.id,
      name: selected.name,
      breed: selected.breed,
      age: selected.age,
      gender: selected.gender,
      tag: selected.tag,
      price: `₦${selected.price.toLocaleString('en-US')}`,
      image: selected.image,
    },
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 123 456 7890',
      address: '123 Main Street, Your Location',
    },
    delivery: {
      method: 'Pickup in Lagos',
      date: '2024-02-15',
      time: '2:00 PM - 4:00 PM',
      fee: 0,
    },
    payment: {
      total: selected.price,
      deposit: Math.round(selected.price * 0.5),
      depositPercent: '50%',
      balance: selected.price - Math.round(selected.price * 0.5),
      method: 'Bank Transfer',
    },
  };

  const [agreeAll, setAgreeAll] = useState(false);

  const handleConfirm = () => {
    if (agreeAll) {
      router.push('/reservation-confirmed');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b-2 border-gold/30 py-6">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gold/20 z-0"></div>
            <div className="absolute top-5 left-0 h-0.5 bg-gold z-10" style={{ width: '66%' }}></div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 bg-gold border-2 border-gold rounded-full flex items-center justify-center text-dark font-semibold">
                <FaCheck />
              </div>
              <span className="text-xs text-brown font-semibold mt-2">Select Puppy</span>
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 bg-gold border-2 border-gold rounded-full flex items-center justify-center text-dark font-semibold">
                <FaCheck />
              </div>
              <span className="text-xs text-brown font-semibold mt-2">Your Information</span>
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 bg-gold border-2 border-gold rounded-full flex items-center justify-center text-dark font-semibold">
                3
              </div>
              <span className="text-xs text-brown font-semibold mt-2">Review & Payment</span>
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-gold/30 rounded-full flex items-center justify-center text-gray-400 font-semibold bg-white">
                4
              </div>
              <span className="text-xs text-gray-400 mt-2">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-brown mb-4">Review Your Reservation</h1>
          <p className="text-lg text-gray-600">Please review all details before confirming your reservation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Review Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Puppy Details */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brown">Puppy Details</h2>
                <Link href={`/puppy-detail/${puppyId}`} className="text-sm text-gold hover:underline flex items-center gap-2">
                  <FaEdit className="text-xs" />
                  Edit
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-gold/30">
                  <Image
                    src={reservation.puppy.image}
                    alt={reservation.puppy.breed}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <div className="text-lg font-semibold text-brown">{reservation.puppy.name}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Breed:</span>
                    <div className="text-lg font-semibold text-brown">{reservation.puppy.breed}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Age:</span>
                    <div className="text-lg font-semibold text-brown">{reservation.puppy.age}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Gender:</span>
                    <div className="text-lg font-semibold text-brown">{reservation.puppy.gender}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Tag:</span>
                    <div className="text-lg font-semibold text-brown">{reservation.puppy.tag}</div>
                  </div>
                  <div className="pt-3 border-t border-gold/20">
                    <span className="text-sm text-gray-600">Price:</span>
                    <div className="text-2xl font-bold text-brown">{reservation.puppy.price}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brown">Contact Information</h2>
                <Link href="/reserve-puppy" className="text-sm text-gold hover:underline flex items-center gap-2">
                  <FaEdit className="text-xs" />
                  Edit
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Full Name:</span>
                  <div className="text-base font-semibold text-brown">{reservation.customer.name}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <div className="text-base font-semibold text-brown">{reservation.customer.email}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <div className="text-base font-semibold text-brown">{reservation.customer.phone}</div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-gray-600">Address:</span>
                  <div className="text-base font-semibold text-brown">{reservation.customer.address}</div>
                </div>
              </div>
            </div>

            {/* Pickup/Delivery */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-brown">Pickup/Delivery</h2>
                <Link href="/reserve-puppy" className="text-sm text-gold hover:underline flex items-center gap-2">
                  <FaEdit className="text-xs" />
                  Edit
                </Link>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Method:</span>
                  <div className="text-base font-semibold text-brown">{reservation.delivery.method}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Date:</span>
                  <div className="text-base font-semibold text-brown">{new Date(reservation.delivery.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Time:</span>
                  <div className="text-base font-semibold text-brown">{reservation.delivery.time}</div>
                </div>
                {reservation.delivery.fee > 0 && (
                  <div>
                    <span className="text-sm text-gray-600">Delivery Fee:</span>
                    <div className="text-base font-semibold text-brown">₦{reservation.delivery.fee.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-brown mb-6">Payment Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Price:</span>
                  <span className="text-base font-semibold text-brown">₦{reservation.payment.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Deposit ({reservation.payment.depositPercent}):</span>
                  <span className="text-base font-semibold text-brown">₦{reservation.payment.deposit.toLocaleString()}</span>
                </div>
                {reservation.delivery.fee > 0 && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Delivery Fee:</span>
                    <span className="text-base font-semibold text-brown">₦{reservation.delivery.fee.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <div className="border-t-2 border-gold/30 pt-4 mb-4">
                <div className="flex justify-between text-xl font-bold text-brown mb-2">
                  <span>Amount Due Today:</span>
                  <span>₦{reservation.payment.deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Balance Due at Pickup:</span>
                  <span className="font-semibold">₦{reservation.payment.balance.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 text-sm text-gray-700">
                <p className="font-semibold mb-2">Payment Method: {reservation.payment.method}</p>
                <p>You will receive payment instructions after confirmation. Payment must be completed within 24 hours to secure your reservation.</p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-brown mb-6">Terms & Conditions</h2>
              <div className="space-y-4 mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeAll}
                    onChange={(e) => setAgreeAll(e.target.checked)}
                    className="mt-1 w-5 h-5 border-2 border-gold/30 rounded focus:ring-gold"
                  />
                  <span className="text-sm text-gray-700">
                    I have read and agree to the <Link href="#" className="text-gold hover:underline font-semibold">Terms of Service</Link> and <Link href="#" className="text-gold hover:underline font-semibold">Privacy Policy</Link> <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 p-3 bg-gold/10 border border-gold/30 rounded-2xl">
                <FaLock className="text-gold" />
                <span className="text-xs text-gray-600 font-semibold">Your information is secure and encrypted</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t-2 border-gold/30">
              <Link
                href="/reserve-puppy"
                className="px-8 py-4 bg-white text-brown border-2 border-gold font-semibold rounded-2xl hover:bg-gold/10 transition"
              >
                Back
              </Link>
              <button
                onClick={handleConfirm}
                disabled={!agreeAll}
                className={`px-8 py-4 font-semibold rounded-2xl transition ${agreeAll
                    ? 'bg-gradient-to-r from-brown to-dark text-white hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
              >
                Confirm Reservation
              </button>
            </div>
          </div>

          {/* Right Sidebar - Summary Card */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-white border-2 border-gold rounded-3xl p-6">
              <h3 className="text-lg font-bold text-brown mb-4 text-center">Reservation Summary</h3>

              <div className="relative w-full h-32 rounded-2xl overflow-hidden border-2 border-gold/30 mb-4">
                <Image
                  src={reservation.puppy.image}
                  alt={reservation.puppy.breed}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-brown">{reservation.puppy.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breed:</span>
                  <span className="font-semibold text-brown">{reservation.puppy.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-semibold text-brown">{reservation.puppy.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold text-brown">{reservation.puppy.gender}</span>
                </div>
              </div>

              <div className="border-t-2 border-gold pt-4 pb-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Total Price:</span>
                  <span className="font-semibold text-brown">₦{reservation.payment.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Deposit:</span>
                  <span className="font-semibold text-brown">₦{reservation.payment.deposit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Balance:</span>
                  <span className="font-semibold text-brown">₦{reservation.payment.balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t-2 border-gold pt-4">
                <div className="text-base font-bold text-brown mb-2 text-center">
                  Amount Due Today
                </div>
                <div className="text-2xl font-bold text-brown text-center mb-4">
                  ₦{reservation.payment.deposit.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Balance of ₦{reservation.payment.balance.toLocaleString()} due at pickup
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-6 mt-6">
              <div className="flex flex-col gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>Health guarantee included</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>Lifetime support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}

export default function ReviewReservation() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReviewReservationContent />
    </Suspense>
  );
}
