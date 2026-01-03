'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { FaAward, FaHeartbeat, FaHandHoldingHeart, FaUserFriends, FaWhatsapp } from 'react-icons/fa';

export default function AboutUs() {
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Bullify Kennel</h1>
          <p className="text-xl text-gold">Passionate breeders dedicated to raising healthy, happy puppies</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-full z-0"></div>
                <h2 className="text-4xl font-bold text-brown mb-6 relative z-10">
                  More Than Just a <span className="text-gold">Breeder</span>
                </h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in Lagos with a deep love for dogs, Bullify Kennel has grown from a small family passion into a premier breeding facility known for excellence, ethics, and care.
                </p>
                <p>
                  We believe that every puppy deserves to start life in a loving, nurturing environment. That's why we don't just breed dogs; we raise family members. Our facility is designed to provide plenty of space for play, socialization, and comfort, ensuring that each puppy is physically healthy and emotionally tailored for a forever home.
                </p>
                <p>
                  Our commitment extends beyond the point of sale. we provide lifetime support to all our families, offering guidance on training, nutrition, and health to ensure your journey with your new companion is as smooth and joyful as possible.
                </p>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/photos/pitbull.png"
                  alt="Breeder with dog"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gold/10 rounded-full -z-10 blur-3xl"></div>
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-brown/10 rounded-full -z-10 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brown mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaHeartbeat />, title: 'Health First', desc: 'Rigorous health testing for all breeding pairs and comprehensive vet care for every puppy.' },
              { icon: <FaHandHoldingHeart />, title: 'Ethical Breeding', desc: 'We strictly adhere to ethical breeding standards, prioritizing the well-being of our dogs above all else.' },
              { icon: <FaUserFriends />, title: 'Socialization', desc: 'Puppies are raised in our home and handled daily to ensure they are confident and friendly.' },
              { icon: <FaAward />, title: 'Excellence', desc: 'Striving for the best in conformation, temperament, and genetic health in every litter.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border-2 border-gold/20 hover:border-gold hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-brown/20 rounded-2xl flex items-center justify-center text-3xl text-brown mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-brown mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Founder Section could go here */}

      {/* CTA */}
      <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your New Best Friend?</h2>
          <p className="text-xl text-gold mb-12">
            Browse our available puppies or contact us to discuss upcoming litters.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/available-puppies"
              className="px-8 py-4 bg-gold text-dark border-2 border-gold text-lg font-bold rounded-2xl hover:bg-gold/90 hover:scale-105 transition-transform"
            >
              See Available Puppies
            </Link>
            <Link
              href="/contact-us"
              className="px-8 py-4 bg-transparent border-2 border-white text-lg font-bold rounded-2xl hover:bg-white/10 hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
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
