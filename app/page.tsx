import Link from 'next/link';
import { FaWhatsapp, FaAward, FaHeartbeat, FaHandsHelping, FaHospital, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Footer from '@/app/components/Footer';

export default function Home() {
  // Sample data that would come from database
  const puppies = [
    { id: 1, breed: 'Golden Retriever', age: '8 weeks', gender: 'Male', tag: 'Family Friendly', price: '₦180,000', desc: 'Beautiful, healthy Golden Retriever puppy. Vaccinated, dewormed, and vet-checked. Great with kids.', image: '/photos/3dogs_transparent_bg.png' },
    { id: 2, breed: 'German Shepherd', age: '10 weeks', gender: 'Female', tag: 'Active', price: '₦220,000', desc: 'Intelligent and loyal German Shepherd. Perfect for families who want a protective companion.', image: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg' },
    { id: 3, breed: 'Labrador Retriever', age: '6 weeks', gender: 'Male', tag: 'Calm', price: '₦170,000', desc: 'Friendly Labrador puppy with gentle temperament. Fully vaccinated and ready for a loving home.', image: '/photos/3dogs.jpg' },
  ];

  const testimonials = [
    { quote: '"Best breeder in Lagos! Our Golden Retriever is healthy, happy, and perfectly trained. The support we received was incredible."', name: 'Chidi Okonkwo', location: 'Lekki, Lagos', avatar: '/api/placeholder/60/60' },
    { quote: '"Professional service from start to finish. Our German Shepherd came with all documents and the breeder even helped with initial training."', name: 'Amaka Johnson', location: 'Victoria Island, Lagos', avatar: '/api/placeholder/60/60' },
    { quote: '"Trustworthy and caring. We visited the facility and saw how well the puppies are treated. Highly recommend!"', name: 'Ibrahim Yusuf', location: 'Ikeja, Lagos', avatar: '/api/placeholder/60/60' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 bg-white border-b-2 border-gold sticky top-0 z-50 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between h-full">
          <div className="text-2xl font-bold text-brown hover:text-gold transition cursor-pointer">Bullify Kennel</div>
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
            </Link>
            <Link href="/available-puppies" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Available Puppies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/breeds" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Breeds
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/about-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full"></span>
            </Link>
          </nav>
          <Link href="https://wa.me/234XXXXXXXXX" className="btn-whatsapp hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
            <FaWhatsapp className="text-lg" /> WhatsApp
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brown via-brown/90 to-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl animate-pulse delay-300"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-16 lg:gap-20">
          <div className="flex-1 flex flex-col justify-center gap-6 animate-fade-in-up">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect <span className="text-gold">Companion</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gold font-light">
              Premium dog breeding in Lagos, Nigeria
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/available-puppies" className="btn-primary hover:scale-105 transition-transform">
                View Available Puppies
              </Link>
              <Link href="/breeds" className="btn-secondary bg-white/10 border-white hover:bg-white/20">
                Browse by Breed
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl text-sm hover:bg-white/20 transition">
                5+ Years Experience
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl text-sm hover:bg-white/20 transition">
                Healthy Puppies
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-gold/20 rounded-2xl text-sm hover:bg-white/20 transition">
                Lifetime Support
              </div>
            </div>
          </div>
          {/* Hero Right - Large Transparent PNG Dog */}
          <div className="flex-1 relative h-[500px] lg:h-[600px] rounded-3xl overflow-visible flex items-end justify-center">
            {/* Decorative brush-stroke background - Simplified Pattern */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
              {/* 6 Circles - Spread Out */}
              <svg viewBox="0 0 1400 1200" className="absolute -top-30 -left-30 w-[160%] h-[160%] rotate-[-10deg] opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top left */}
                <circle cx="150" cy="200" r="110" stroke="#D4AF37" strokeWidth="70" fill="none"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute -top-25 -right-35 w-[165%] h-[165%] rotate-[15deg] opacity-48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top right */}
                <circle cx="1250" cy="250" r="95" stroke="#8B7355" strokeWidth="65" fill="none" opacity="0.8"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute -top-20 left-[20%] w-[155%] h-[155%] rotate-[-5deg] opacity-48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top center */}
                <circle cx="700" cy="180" r="85" stroke="#D4AF37" strokeWidth="60" fill="none"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-25px] -left-20 w-[160%] h-[160%] rotate-[22deg] opacity-45" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom left */}
                <circle cx="120" cy="1000" r="100" stroke="#8B7355" strokeWidth="68" fill="none" opacity="0.75"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-20px] -right-25 w-[158%] h-[158%] rotate-[-18deg] opacity-45" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom right */}
                <circle cx="1280" cy="1050" r="90" stroke="#D4AF37" strokeWidth="62" fill="none" opacity="0.7"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-15px] right-[30%] w-[150%] h-[150%] rotate-[25deg] opacity-45" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom center-right */}
                <circle cx="980" cy="1100" r="75" stroke="#8B7355" strokeWidth="58" fill="none" opacity="0.8"/>
              </svg>

              {/* 3 Squares - Spread Out */}
              <svg viewBox="0 0 1400 1200" className="absolute top-[-10px] left-[15%] w-[145%] h-[145%] rotate-[-18deg] opacity-52" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left side */}
                <rect x="250" y="500" width="130" height="130" stroke="#D4AF37" strokeWidth="68" fill="none" transform="rotate(20 315 565)" opacity="0.7"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute -top-25 -right-40 w-[170%] h-[170%] rotate-[25deg] opacity-48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top right */}
                <rect x="1100" y="350" width="115" height="115" stroke="#8B7355" strokeWidth="63" fill="none" transform="rotate(-25 1157.5 407.5)" opacity="0.75"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-30px] left-[40%] w-[165%] h-[165%] rotate-[-12deg] opacity-46" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bottom center */}
                <rect x="560" y="900" width="120" height="120" stroke="#D4AF37" strokeWidth="65" fill="none" transform="rotate(35 620 960)" opacity="0.72"/>
              </svg>

              {/* 4 Confetti Spirals - Spread Out */}
              <svg viewBox="0 0 1400 1200" className="absolute -top-35 -left-45 w-[180%] h-[180%] rotate-[-30deg] opacity-55" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Large confetti spiral - Far top left */}
                <path d="M300 250 Q 285 235 300 220 Q 315 205 300 190 Q 285 175 300 160 Q 315 145 300 130 Q 285 115 300 100" 
                      stroke="#D4AF37" 
                      strokeWidth="75" 
                      strokeLinecap="round" 
                      fill="none"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute -top-20 -right-50 w-[175%] h-[175%] rotate-[28deg] opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Medium confetti spiral - Top right */}
                <path d="M1050 300 Q 1035 315 1050 330 Q 1065 345 1050 360 Q 1035 375 1050 390 Q 1065 405 1050 420" 
                      stroke="#8B7355" 
                      strokeWidth="68" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.8"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-35px] -right-35 w-[170%] h-[170%] rotate-[-20deg] opacity-52" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Small confetti spiral - Bottom right */}
                <path d="M1200 950 Q 1190 940 1200 930 Q 1210 920 1200 910 Q 1190 900 1200 890" 
                      stroke="#D4AF37" 
                      strokeWidth="60" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.75"/>
              </svg>
              <svg viewBox="0 0 1400 1200" className="absolute bottom-[-25px] left-[25%] w-[160%] h-[160%] rotate-[35deg] opacity-48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Extra small confetti spiral - Bottom left center */}
                <path d="M350 1000 Q 340 990 350 980 Q 360 970 350 960 Q 340 950 350 940 Q 360 930 350 920 Q 340 910 350 900" 
                      stroke="#8B7355" 
                      strokeWidth="55" 
                      strokeLinecap="round" 
                      fill="none"
                      opacity="0.8"/>
              </svg>
            </div>
            <img src="/photos/pitbull.png" alt="Beautiful Pitbull" className="relative z-20 h-[80%] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div className="h-32 bg-gradient-to-r from-gold via-brown to-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-center gap-16 lg:gap-24">
          {[
            { icon: <FaAward className="text-3xl" />, number: '20+', label: 'Happy Families' },
            { icon: <FaHeartbeat className="text-3xl" />, number: '50+', label: 'Puppies Placed' },
            { icon: <FaHandsHelping className="text-3xl" />, number: '5+', label: 'Years Experience' },
            { icon: <FaAward className="text-3xl" />, number: 'Lagos', label: 'Based' },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 hover:scale-110 transition-transform">
              <div className="text-gold">{stat.icon}</div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold">{stat.number}</div>
                <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Puppies Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between items-center mb-12 gap-4">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Meet Our <span className="text-gold">Available Puppies</span>
            </h2>
            <div className="flex gap-4">
              <Link href="/available-puppies" className="text-base text-brown hover:text-gold underline font-semibold hover:scale-105 transition-transform inline-block">
                View All →
              </Link>
              <Link href="/breeds" className="text-base text-brown hover:text-gold underline font-semibold hover:scale-105 transition-transform inline-block">
                Browse by Breed →
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {puppies.map((puppy, i) => (
              <div key={puppy.id} className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="h-[350px] relative overflow-hidden">
                  <Image 
                    src={puppy.image} 
                    alt={`${puppy.breed} puppy`} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-brown group-hover:text-gold transition">{puppy.breed}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.age}</span>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.gender}</span>
                    <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">{puppy.tag}</span>
                  </div>
                  <div className="text-2xl font-bold mb-4 text-gold">{puppy.price}</div>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">{puppy.desc}</p>
                  <div className="flex flex-col gap-2">
                    <button className="py-3 bg-gradient-to-r from-brown to-dark text-white border-2 border-transparent text-sm font-semibold rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
                      <FaWhatsapp /> Reserve on WhatsApp
                    </button>
                    <Link href={`/puppy-detail/${puppy.id}`} className="py-3 bg-white text-brown border-2 border-gold text-sm font-semibold rounded-2xl hover:bg-gold/10 hover:scale-105 transition-transform text-center">
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Families <span className="text-gold">Trust Us</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: 'Health Guaranteed', icon: <FaHospital className="text-5xl" />, desc: 'All puppies are vaccinated, dewormed, and come with complete health certificates from licensed veterinarians.', color: 'from-brown/80 to-brown' },
              { title: 'Expert Care', icon: <FaHeartbeat className="text-5xl" />, desc: '5+ years of breeding experience with focus on ethical practices and puppy wellbeing from birth to adoption.', color: 'from-brown/80 to-brown' },
              { title: 'Lifetime Support', icon: <FaHandsHelping className="text-5xl" />, desc: "We're here for advice anytime. Training tips, health guidance, and ongoing support for your puppy's life.", color: 'from-brown/80 to-brown' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border-2 border-gold/30 p-8 rounded-3xl text-center hover:bg-white/20 hover:scale-105 transition-all">
                <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center text-gold rounded-full bg-gradient-to-br ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gold">{item.title}</h3>
                <p className="text-sm leading-relaxed opacity-90">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-white via-gold/5 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4">
              Happy Families <span className="text-gold">Share</span> Their Stories
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-6 snap-x snap-mandatory">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="min-w-[400px] bg-white border-2 border-gold/30 p-8 rounded-3xl hover:shadow-2xl transition-all snap-start">
                <div className="w-15 h-15 border-2 border-gold rounded-full mb-4 bg-gradient-to-br from-gold to-brown"></div>
                <p className="text-base text-dark mb-4 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="text-sm font-semibold mb-1 text-brown">{testimonial.name}</div>
                <div className="text-xs text-gray-600">{testimonial.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-dark via-brown to-brown/90 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Follow Our Journey on <span className="text-gold">Instagram</span>
            </h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-4"></div>
            <p className="text-lg text-gold">@bullifykennel</p>
          </div>
          {/* Instagram Feed - Replace with actual InstagramFeed component when API is set up */}
          {/* See INSTAGRAM_INTEGRATION.md for setup instructions */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {[
              '/photos/3dogs_transparent_bg.png',
              '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg',
              '/photos/3dogs.jpg',
              '/photos/pitbull.png',
              '/photos/pitbull_sitting.png',
              '/photos/3dogs_transparent_bg.png',
            ].map((img, i) => (
              <a
                key={i}
                href="https://instagram.com/bullifykennel"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative bg-gradient-to-br from-gold via-brown to-dark rounded-2xl overflow-hidden hover:scale-110 transition-transform border-2 border-gold/50 group"
              >
                <Image
                  src={img}
                  alt={`Instagram post ${i + 1}`}
                  fill
                  className="object-cover group-hover:opacity-80 transition-opacity"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaInstagram className="text-white text-2xl" />
                </div>
              </a>
            ))}
          </div>
          <Link href="https://instagram.com/bullifykennel" className="block mx-auto w-fit px-8 py-4 bg-white text-brown border-2 border-transparent text-base font-semibold rounded-2xl hover:bg-gold hover:text-dark hover:scale-105 transition-transform flex items-center gap-2">
            <FaInstagram className="text-xl" /> Follow Us on Instagram
          </Link>
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