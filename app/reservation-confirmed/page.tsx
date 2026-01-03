'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCheck, FaCopy, FaDownload, FaClock, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ReservationConfirmed() {
  const [toast, setToast] = useState<string>('');
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };
  const reservation = {
    number: 'REF-12345',
    email: 'customer@email.com',
    puppy: {
      breed: 'Golden Retriever',
      age: '8 weeks',
      gender: 'Male',
      price: '₦180,000',
      image: '/photos/3dogs_transparent_bg.png',
    },
    payment: {
      total: 180000,
      deposit: 90000,
      balance: 90000,
      deadline: '2024-02-15T15:00:00',
      account: {
        name: 'Bullify Kennel',
        bank: 'Your Bank',
        number: '0123456789',
        reference: 'REF-12345',
      },
    },
  };

  const deadlineDate = new Date(reservation.payment.deadline);
  const isDeadlinePassed = deadlineDate < new Date();

  const handleCopyAccountDetails = () => {
    const details = `Account Name: ${reservation.payment.account.name}\nBank: ${reservation.payment.account.bank}\nAccount Number: ${reservation.payment.account.number}\nReference: ${reservation.payment.account.reference}`;
    navigator.clipboard.writeText(details);
    showToast('Account details copied');
  };

  const handleUploadProof = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,application/pdf';
    input.onchange = () => {
      if (input.files && input.files[0]) {
        showToast('Payment proof uploaded');
      }
    };
    input.click();
  };

  const handleDownloadReceipt = () => {
    const content = `Reservation Receipt\n\nReservation: ${reservation.number}\nBreed: ${reservation.puppy.breed}\nAge: ${reservation.puppy.age}\nGender: ${reservation.puppy.gender}\nTotal: ₦${reservation.payment.total.toLocaleString()}\nDeposit: ₦${reservation.payment.deposit.toLocaleString()}\nBalance: ₦${reservation.payment.balance.toLocaleString()}\n\nThank you for reserving with Bullify Kennel.`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reservation.number}-receipt.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Receipt downloaded');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Success Animation Section */}
      <section className="bg-white border-b-2 border-gold/30 py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="w-32 h-32 mx-auto mb-8 border-4 border-gold rounded-full flex items-center justify-center bg-gold/10">
            <FaCheck className="text-6xl text-gold" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-brown mb-4">Reservation Confirmed! 🎉</h1>
          <p className="text-xl text-gray-600 mb-6">Your puppy is officially reserved</p>
          <div className="px-6 py-4 bg-gold/20 border-2 border-gold rounded-2xl inline-block mb-4">
            <div className="text-sm text-gray-600 mb-1">Reservation Number</div>
            <div className="text-2xl font-bold text-brown">{reservation.number}</div>
          </div>
          <p className="text-base text-gray-600">
            Confirmation sent to {reservation.email}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-3xl font-bold text-brown mb-8">Your Next Steps</h2>

              {/* Step 1 - Payment */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 relative pl-16">
                <div className="absolute left-8 top-8 w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-dark font-bold text-sm">
                  1
                </div>
                <div className="absolute left-11 top-16 bottom-0 w-0.5 bg-gold/30"></div>

                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Step 1 - Now</div>
                <h3 className="text-xl font-bold text-brown mb-4">Complete Your Payment</h3>
                <p className="text-base text-gray-700 mb-4">
                  Please transfer the deposit amount to the account below within 24 hours to secure your reservation.
                </p>

                <div className="bg-gold/10 border-2 border-gold/30 rounded-2xl p-6 mb-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-semibold text-brown">{reservation.payment.account.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-semibold text-brown">{reservation.payment.account.bank}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-semibold text-brown">{reservation.payment.account.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-semibold text-brown">{reservation.payment.account.reference}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gold/30">
                      <span className="font-semibold text-brown">Amount to Pay:</span>
                      <span className="text-xl font-bold text-brown">₦{reservation.payment.deposit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <button
                    onClick={handleCopyAccountDetails}
                    className="px-6 py-3 bg-brown text-white border-2 border-transparent font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <FaCopy className="text-sm" />
                    Copy Account Details
                  </button>
                  <button onClick={handleUploadProof} className="px-6 py-3 bg-white text-brown border-2 border-gold font-semibold rounded-2xl hover:bg-gold/10 transition flex items-center gap-2">
                    Upload Payment Proof
                  </button>
                </div>

                {!isDeadlinePassed && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClock className="text-red-600" />
                      <span className="text-sm font-bold text-red-600">
                        Payment Deadline: {deadlineDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at {deadlineDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-red-600">
                      Please pay within 24 hours to secure your reservation
                    </p>
                  </div>
                )}
              </div>

              {/* Step 2 - Confirmation */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 relative pl-16">
                <div className="absolute left-8 top-8 w-8 h-8 border-2 border-gold/30 rounded-full flex items-center justify-center bg-white text-gray-400 font-bold text-sm">
                  2
                </div>
                <div className="absolute left-11 top-16 bottom-0 w-0.5 bg-gold/30"></div>

                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Step 2 - Within 24 Hours</div>
                <h3 className="text-xl font-bold text-brown mb-4">Payment Confirmation</h3>
                <p className="text-base text-gray-700 mb-2">
                  We&apos;ll confirm your payment via WhatsApp and email once received.
                </p>
                <p className="text-base text-gray-700">
                  Your puppy will be officially reserved and removed from availability.
                </p>
              </div>

              {/* Step 3 - Updates */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 relative pl-16">
                <div className="absolute left-8 top-8 w-8 h-8 border-2 border-gold/30 rounded-full flex items-center justify-center bg-white text-gray-400 font-bold text-sm">
                  3
                </div>
                <div className="absolute left-11 top-16 bottom-0 w-0.5 bg-gold/30"></div>

                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Step 3 - Regular Updates</div>
                <h3 className="text-xl font-bold text-brown mb-4">Stay Connected</h3>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>We&apos;ll send you photos and videos of your puppy weekly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>WhatsApp updates every few days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Feel free to request photos anytime</span>
                  </li>
                </ul>
              </div>

              {/* Step 4 - Preparations */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 relative pl-16">
                <div className="absolute left-8 top-8 w-8 h-8 border-2 border-gold/30 rounded-full flex items-center justify-center bg-white text-gray-400 font-bold text-sm">
                  4
                </div>
                <div className="absolute left-11 top-16 bottom-0 w-0.5 bg-gold/30"></div>

                <div className="text-xs font-bold text-gray-500 uppercase mb-2">Step 4 - 7 Days Before Pickup</div>
                <h3 className="text-xl font-bold text-brown mb-4">Final Preparations</h3>
                <ul className="space-y-2 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>We&apos;ll confirm pickup date and time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Send puppy care guide and checklist</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Final balance payment reminder</span>
                  </li>
                </ul>
              </div>

              {/* Step 5 - Pickup */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8 relative">
                <div className="absolute left-8 top-8 w-8 h-8 border-2 border-gold/30 rounded-full flex items-center justify-center bg-white text-gray-400 font-bold text-sm">
                  5
                </div>

                <div className="text-xs font-bold text-gray-500 uppercase mb-2 pl-16">Step 5 - Pickup Day</div>
                <h3 className="text-xl font-bold text-brown mb-4 pl-16">Welcome Your Puppy Home!</h3>
                <ul className="space-y-2 text-base text-gray-700 pl-16">
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Bring valid ID and remaining payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Receive your puppy with all documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheck className="text-gold mt-1 flex-shrink-0" />
                    <span>Take home welcome package</span>
                  </li>
                </ul>
              </div>

              {/* Important Information */}
              <div className="bg-white border-2 border-red-300 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-red-600 mb-4">Important Information</h3>
                <ul className="space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>Your reservation is valid for 24 hours from confirmation. Payment must be received within this time.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>If payment is not received within 24 hours, your reservation will be automatically cancelled.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>Once payment is confirmed, your puppy will be reserved and no longer available to other customers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>Please keep this confirmation page and your reservation number for your records.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span>For any questions or concerns, contact us immediately via WhatsApp or email.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              {/* Reservation Summary */}
              <div className="bg-white border-2 border-gold rounded-3xl p-6">
                <h3 className="text-lg font-bold text-brown mb-4 text-center">Reservation Summary</h3>

                <div className="relative w-full h-40 rounded-2xl overflow-hidden border-2 border-gold/30 mb-4">
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

                <div className="border-t-2 border-gold/30 pt-4 mb-4">
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
                  <div className="text-2xl font-bold text-brown text-center">
                    ₦{reservation.payment.deposit.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Download Receipt */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-brown mb-4">Download Documents</h3>
                <button onClick={handleDownloadReceipt} className="w-full py-3 bg-white text-brown border-2 border-gold font-semibold rounded-2xl hover:bg-gold/10 transition flex items-center justify-center gap-2">
                  <FaDownload />
                  Download Receipt
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Confirmation email also sent to {reservation.email}
                </p>
              </div>

              {/* Quick Contact */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-brown mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to assist you with any questions about your reservation.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://wa.me/234XXXXXXXXX"
                    className="block w-full py-3 bg-whatsapp text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp />
                    WhatsApp Us
                  </Link>
                  <Link
                    href="mailto:info@bullifykennel.com"
                    className="block w-full py-3 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition flex items-center justify-center gap-2"
                  >
                    <FaEnvelope />
                    Email Us
                  </Link>
                  <Link
                    href="tel:+234XXXXXXXXX"
                    className="block w-full py-3 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition flex items-center justify-center gap-2"
                  >
                    <FaPhone />
                    Call Us
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/available-puppies"
                  className="block w-full py-3 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 transition"
                >
                  Browse More Puppies
                </Link>
                <Link
                  href="/"
                  className="block w-full py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-center font-semibold rounded-2xl hover:scale-105 transition-transform"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-dark text-white border-2 border-gold rounded-2xl px-4 py-3 shadow-xl z-[200]">
          {toast}
        </div>
      )}
    </div>
  );
}
