'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from 'react-icons/fa';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          inquiryType: '',
          message: '',
          agreeToTerms: false,
        });
        alert('Thank you for contacting us! We will get back to you soon.');
      } else {
        setStatus('error');
        alert(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setStatus(prev => prev === 'submitting' ? 'idle' : prev); // Only reset if currently submitting
    }
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
      <Header />

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
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-base font-semibold rounded-2xl hover:scale-105 transition-transform disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
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
                    Your Location
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

      <Footer />

      {/* Floating WhatsApp Button */}
      <Link href="https://wa.me/234XXXXXXXXX" className="fixed bottom-8 right-8 w-16 h-16 bg-whatsapp border-2 border-white rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:rotate-12 transition-transform z-50 animate-bounce-slow">
        <FaWhatsapp className="text-2xl" />
      </Link>
    </div>
  );
}
