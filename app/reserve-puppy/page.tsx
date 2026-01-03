'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaCheck } from 'react-icons/fa';

function ReservePuppyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const puppyId = searchParams.get('id') || '1';

  // Sample puppy data list - in real app, fetch from API
  const list = [
    { id: '1', name: 'Max', breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tag: 'Family Friendly', price: 180000, image: '/photos/3dogs_transparent_bg.png' },
    { id: '2', name: 'Luna', breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tag: 'Active', price: 220000, image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg' },
    { id: '3', name: 'Buddy', breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tag: 'Calm', price: 170000, image: '/photos/3dogs.jpg' },
    { id: '4', name: 'Rocky', breed: 'Pitbull', age: '12 weeks', gender: 'Male', tag: 'Energetic', price: 200000, image: '/photos/pitbull.png' },
    { id: '5', name: 'Bella', breed: 'Pitbull', age: '10 weeks', gender: 'Female', tag: 'Affectionate', price: 205000, image: '/photos/pitbull_sitting.png' },
  ];
  const selected = list.find(p => p.id === puppyId) || list[0];
  const puppy = {
    id: selected.id,
    name: selected.name,
    breed: selected.breed,
    age: selected.age,
    gender: selected.gender,
    tag: selected.tag,
    price: `₦${selected.price.toLocaleString('en-US')}`,
    image: selected.image,
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    ownerType: [] as string[],
    livingSituation: '',
    caregiver: '',
    reason: '',
    delivery: '',
    preferredDate: '',
    preferredTime: '',
    depositAmount: '50%',
    paymentMethod: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'ownerType') {
        setFormData(prev => ({
          ...prev,
          ownerType: checked
            ? [...prev.ownerType, value]
            : prev.ownerType.filter((item) => item !== value),
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save form data and navigate to review
    router.push(`/review-reservation?id=${puppyId}`);
  };

  const depositAmount = formData.depositAmount === '50%'
    ? Math.round(parseInt(puppy.price.replace(/[^0-9]/g, '')) * 0.5).toLocaleString()
    : Math.round(parseInt(puppy.price.replace(/[^0-9]/g, '')) * 0.75).toLocaleString();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
          <Link href="https://wa.me/234XXXXXXXXX" className="btn-whatsapp hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
            <FaWhatsapp className="text-lg" /> WhatsApp
          </Link>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b-2 border-gold/30 py-6">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gold/20 z-0"></div>
            <div className="absolute top-5 left-0 h-0.5 bg-gold z-10" style={{ width: '33%' }}></div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 bg-gold border-2 border-gold rounded-full flex items-center justify-center text-dark font-semibold">
                <FaCheck />
              </div>
              <span className="text-xs text-brown font-semibold mt-2">Select Puppy</span>
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 bg-gold border-2 border-gold rounded-full flex items-center justify-center text-dark font-semibold">
                2
              </div>
              <span className="text-xs text-brown font-semibold mt-2">Your Information</span>
            </div>
            <div className="relative z-20 flex flex-col items-center">
              <div className="w-10 h-10 border-2 border-gold/30 rounded-full flex items-center justify-center text-gray-400 font-semibold bg-white">
                3
              </div>
              <span className="text-xs text-gray-400 mt-2">Review & Payment</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Selected Puppy Summary */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Reserving Puppy</h2>
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-gold/30">
                    <Image
                      src={puppy.image}
                      alt={puppy.breed}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-xl font-bold text-brown">{puppy.name}</h3>
                      <span className="text-sm text-gold font-semibold">AVAILABLE</span>
                    </div>
                    <div className="text-base text-gray-600 mb-3">{puppy.breed}</div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div>Age: {puppy.age}</div>
                      <div>Gender: {puppy.gender}</div>
                      <div>Tag: {puppy.tag}</div>
                    </div>
                    <div className="text-2xl font-bold text-brown">{puppy.price}</div>
                    <Link href={`/select-puppy?breed=${encodeURIComponent(puppy.breed)}`} className="text-sm text-gold hover:underline mt-2 inline-block">
                      Change selection
                    </Link>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      WhatsApp Number (if different)
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="Street address or P.O. Box"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown bg-white"
                    >
                      <option value="">Select state</option>
                      <option value="Lagos">Lagos</option>
                      <option value="Abuja">Abuja</option>
                      <option value="Rivers">Rivers</option>
                      <option value="Oyo">Oyo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="Postal code"
                    />
                  </div>
                </div>
              </div>

              {/* About Your Home */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Tell Us About Your Home</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-3">
                      I am a:
                    </label>
                    <div className="space-y-3">
                      {['First-time dog owner', 'Experienced owner', 'Have other pets'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="ownerType"
                            value={option}
                            checked={formData.ownerType.includes(option)}
                            onChange={handleChange}
                            className="w-5 h-5 border-2 border-gold/30 rounded focus:ring-gold"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-3">
                      Living situation:
                    </label>
                    <div className="space-y-3">
                      {['House with yard', 'House without yard', 'Apartment', 'Other'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="livingSituation"
                            value={option}
                            checked={formData.livingSituation === option}
                            onChange={handleChange}
                            className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-3">
                      Who will primarily care for the puppy?
                    </label>
                    <div className="space-y-3">
                      {['Me', 'Family member', 'Shared responsibility'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="caregiver"
                            value={option}
                            checked={formData.caregiver === option}
                            onChange={handleChange}
                            className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Tell us why you chose this breed (optional but helpful)
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown resize-vertical"
                      placeholder="This helps us ensure the puppy is a good match for your family..."
                    />
                  </div>
                </div>
              </div>

              {/* Pickup/Delivery */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Pickup or Delivery?</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-gold/30 rounded-2xl hover:bg-gold/5">
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={formData.delivery === 'pickup'}
                      onChange={handleChange}
                      className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                    />
                    <span className="text-sm text-gray-700">I will pick up locally (no additional charge)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-gold/30 rounded-2xl hover:bg-gold/5">
                    <input
                      type="radio"
                      name="delivery"
                      value="delivery-lagos"
                      checked={formData.delivery === 'delivery-lagos'}
                      onChange={handleChange}
                      className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                    />
                    <span className="text-sm text-gray-700">I need delivery within Lagos (₦15,000)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-gold/30 rounded-2xl hover:bg-gold/5">
                    <input
                      type="radio"
                      name="delivery"
                      value="delivery-outside"
                      checked={formData.delivery === 'delivery-outside'}
                      onChange={handleChange}
                      className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                    />
                    <span className="text-sm text-gray-700">I need delivery long distance delivery (price calculated based on location)</span>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown bg-white"
                    >
                      <option value="">Select time</option>
                      <option value="9am-11am">9:00 AM - 11:00 AM</option>
                      <option value="11am-1pm">11:00 AM - 1:00 PM</option>
                      <option value="1pm-3pm">1:00 PM - 3:00 PM</option>
                      <option value="3pm-5pm">3:00 PM - 5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Deposit & Payment */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Deposit & Payment</h2>
                <div className="bg-gold/10 border-2 border-gold/30 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-brown mb-4">Deposit Information</h3>
                  <ul className="space-y-2 text-sm text-gray-700 mb-4">
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-gold mt-1 flex-shrink-0" />
                      <span>Minimum 50% deposit required to reserve</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-gold mt-1 flex-shrink-0" />
                      <span>Remaining balance due at pickup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheck className="text-gold mt-1 flex-shrink-0" />
                      <span>Reservation held for 24 hours pending deposit</span>
                    </li>
                  </ul>
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-3">
                      Deposit Amount:
                    </label>
                    <div className="space-y-3">
                      {['50%', '75%'].map((amount) => (
                        <label key={amount} className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gold/30 rounded-2xl hover:bg-gold/5">
                          <input
                            type="radio"
                            name="depositAmount"
                            value={amount}
                            checked={formData.depositAmount === amount}
                            onChange={handleChange}
                            className="w-5 h-5 border-2 border-gold/30 focus:ring-gold"
                          />
                          <span className="text-sm font-semibold text-brown">{amount} (₦{depositAmount})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brown mb-3">
                    Preferred Payment Method:
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown bg-white"
                  >
                    <option value="">Select payment method</option>
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="paystack">Paystack (Card)</option>
                    <option value="flutterwave">Flutterwave</option>
                  </select>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      required
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 border-2 border-gold/30 rounded focus:ring-gold"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <Link href="#" className="text-gold hover:underline">Terms of Service</Link> and <Link href="#" className="text-gold hover:underline">Privacy Policy</Link> <span className="text-red-500">*</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-6 border-t-2 border-gold/30">
                <Link
                  href={`/puppy-detail/${puppyId}`}
                  className="px-8 py-4 bg-white text-brown border-2 border-gold font-semibold rounded-2xl hover:bg-gold/10 transition"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent font-semibold rounded-2xl hover:scale-105 transition-transform"
                >
                  Continue to Review
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-brown mb-4">Reservation Summary</h3>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border-2 border-gold/30 mb-4">
                <Image
                  src={puppy.image}
                  alt={puppy.breed}
                  fill
                  className="object-cover"
                  sizes="100%"
                />
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold text-brown">{puppy.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breed:</span>
                  <span className="font-semibold text-brown">{puppy.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-semibold text-brown">{puppy.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold text-brown">{puppy.gender}</span>
                </div>
              </div>
              <div className="border-t-2 border-gold/30 pt-4 mb-4">
                <div className="flex justify-between text-lg font-bold text-brown mb-2">
                  <span>Price:</span>
                  <span>{puppy.price}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Deposit ({formData.depositAmount}):</span>
                  <span className="font-semibold">₦{depositAmount}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>Health certificate included</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-gold" />
                  <span>Vaccination records</span>
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

export default function ReservePuppy() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReservePuppyContent />
    </Suspense>
  );
}
