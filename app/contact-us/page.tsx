'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiryType: '',
    message: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      inquiryType: '',
      message: '',
      agreeToTerms: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <Link href="/" className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Home
            </Link>
            <Link href="/available-puppies" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Available Puppies
            </Link>
            <Link href="/breeds" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Breeds
            </Link>
            <Link href="/about-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              About Us
            </Link>
            <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Gallery
            </Link>
            <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
            </Link>
          </nav>
          <Link href="https://wa.me/234XXXXXXXXX" className="btn-whatsapp hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
            <FaWhatsapp className="text-lg" /> WhatsApp
          </Link>
        </div>
      </header>

      {/* Page Header */}
      <section className="h-[400px] bg-gradient-to-br from-brown via-brown/90 to-dark text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-gold">We&apos;d love to hear from you. Reach out with questions about our puppies or to schedule a visit.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Contact Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* General Inquiry Form */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-brown mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-brown mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-brown mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                        placeholder="+234 XXX XXX XXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-semibold text-brown mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown bg-white"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="available">Available Puppies</option>
                        <option value="upcoming">Upcoming Litters</option>
                        <option value="visit">Schedule a Visit</option>
                        <option value="support">General Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-brown mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-brown mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gold/30 rounded-2xl focus:outline-none focus:border-gold text-brown resize-vertical"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 border-2 border-gold/30 rounded focus:ring-gold"
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                      I agree to the <Link href="#" className="text-gold hover:underline">Privacy Policy</Link> and <Link href="#" className="text-gold hover:underline">Terms of Service</Link> <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-base font-semibold rounded-2xl hover:scale-105 transition-transform"
                  >
                    Send Message
                  </button>
                  <p className="text-xs text-center text-gray-500">
                    By submitting this form, you agree to receive communications from Bullify Kennel.
                  </p>
                </form>
              </div>

              {/* Visit Us Section */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-brown mb-6">Visit Our Kennel</h2>
                <p className="text-base text-gray-600 mb-6 leading-relaxed">
                  We welcome visitors by appointment. Please contact us to schedule a visit and meet our puppies in person. Seeing our facility and meeting our breeding dogs will help you feel confident in your choice.
                </p>
                <Link
                  href="/contact-us"
                  className="block w-full py-4 bg-white text-brown border-2 border-gold text-center font-semibold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform"
                >
                  Schedule a Visit
                </Link>
                <div className="mt-6 space-y-2 text-sm text-gray-600">
                  <p><strong>Requirements for Visit:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Appointment required (book in advance)</li>
                    <li>Valid ID required</li>
                    <li>Face masks recommended</li>
                    <li>Children welcome (supervised)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-brown mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <Link
                    href="https://wa.me/234XXXXXXXXX"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-brown to-dark text-white rounded-2xl hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaWhatsapp className="text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">WhatsApp Us</div>
                      <div className="text-sm opacity-90">Instant reply</div>
                    </div>
                  </Link>
                  <Link
                    href="tel:+234XXXXXXXXX"
                    className="flex items-center gap-4 p-4 bg-white text-brown border-2 border-gold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <FaPhone className="text-xl text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold">Call Us</div>
                      <div className="text-sm text-gray-600">+234 XXX XXX XXXX</div>
                    </div>
                  </Link>
                  <Link
                    href="mailto:info@bullifykennel.com"
                    className="flex items-center gap-4 p-4 bg-white text-brown border-2 border-gold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform"
                  >
                    <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-xl text-gold" />
                    </div>
                    <div>
                      <div className="font-semibold">Email Us</div>
                      <div className="text-sm text-gray-600">info@bullifykennel.com</div>
                    </div>
                  </Link>
                </div>
                <p className="text-xs text-center text-gray-500 mt-6">
                  Average response time: Within 2 hours
                </p>
              </div>

              {/* Office Hours */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-brown mb-6 flex items-center gap-2">
                  <FaClock className="text-gold" />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                    { day: 'Saturday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Sunday', time: 'By Appointment' },
                  ].map((schedule, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gold/20 last:border-0">
                      <span className="font-semibold text-brown">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Emergency services available 24/7 for existing customers
                </p>
              </div>

              {/* Location */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-brown mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gold" />
                  Location
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="leading-relaxed">
                    Lagos, Nigeria
                  </p>
                  <div className="h-48 bg-gradient-to-br from-gold/20 via-brown/20 to-dark/20 rounded-2xl border-2 border-gold/30 flex items-center justify-center">
                    <p className="text-sm text-gray-600">Map View</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Detailed address provided upon appointment confirmation
                  </p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-white border-2 border-gold/30 rounded-3xl p-6 text-center">
                <h3 className="text-lg font-bold text-brown mb-4">Trusted by Families</h3>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-gold text-xl" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">4.9/5.0 Average Rating</p>
                <p className="text-sm text-gray-600">50+ Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4 text-gold">Bullify Kennel</div>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">Premium dog breeding in Lagos, Nigeria. Healthy, happy puppies for loving families.</p>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Quick Links</h3>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-sm text-gray-300 hover:text-gold transition">Home</Link>
                <Link href="/available-puppies" className="text-sm text-gray-300 hover:text-gold transition">Available Puppies</Link>
                <Link href="/about-us" className="text-sm text-gray-300 hover:text-gold transition">About Us</Link>
                <Link href="/gallery" className="text-sm text-gray-300 hover:text-gold transition">Gallery</Link>
                <Link href="/contact-us" className="text-sm text-gray-300 hover:text-gold transition">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Contact Info</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gold" />
                  <span>+234 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="text-gold" />
                  <span>+234 XXX XXX XXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gold" />
                  <span>info@bullifykennel.com</span>
                </div>
                <p className="mt-2">Lagos, Nigeria</p>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold mb-4 text-gold">Newsletter</h3>
              <p className="text-sm text-gray-300 mb-2">Get updates on available puppies</p>
              <input type="email" placeholder="Your email address" className="w-full px-3 py-3 border border-gold/30 bg-brown/30 rounded-2xl mb-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-gold" />
              <button className="w-full px-3 py-3 bg-gradient-to-r from-gold to-brown text-dark border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform">
                Subscribe
              </button>
              <p className="text-sm text-gray-300 mt-4">Business Hours: Mon-Sat: 9AM - 6PM</p>
            </div>
          </div>
          <div className="border-t border-gold/30 pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <div>© 2024 Bullify Kennel. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gold transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-gold transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}

