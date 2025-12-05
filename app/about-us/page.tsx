import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaAward, FaHeartbeat, FaHandsHelping, FaCheck, FaMapMarkerAlt } from 'react-icons/fa';

export default function AboutUs() {
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
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"></span>
            </Link>
            <Link href="/gallery" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Gallery
            </Link>
            <Link href="/contact-us" className="text-base font-medium text-dark hover:text-gold transition relative group">
              Contact
            </Link>
          </nav>
          <Link href="https://wa.me/234XXXXXXXXX" className="btn-whatsapp hidden lg:flex items-center gap-2 hover:scale-105 transition-transform">
            <FaWhatsapp className="text-lg" /> WhatsApp
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-[400px] bg-gradient-to-br from-brown via-brown/90 to-dark text-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 bg-gold rounded-full top-20 left-20 blur-3xl"></div>
          <div className="absolute w-96 h-96 bg-gold rounded-full bottom-20 right-20 blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Bullify Kennel</h1>
          <p className="text-xl text-gold">Passionate breeders dedicated to bringing healthy, happy puppies to loving families</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/photos/3dogs.jpg"
                alt="Bullify Kennel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-brown">Our Story</h2>
              <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                <p>
                  Bullify Kennel was founded with a single mission: to connect loving families with healthy, well-bred puppies who will become cherished members of their households. We believe that every puppy deserves a home filled with love, care, and attention.
                </p>
                <p>
                  Our journey began in Lagos, Nigeria, where we recognized the need for ethical, responsible dog breeding practices. Over the years, we&apos;ve built a reputation for excellence, focusing on the health, temperament, and wellbeing of every puppy that enters our care.
                </p>
                <div className="border-2 border-brown rounded-2xl p-6 bg-gold/10 my-6">
                  <p className="text-lg font-semibold italic text-brown text-center">
                    &quot;We don&apos;t just breed dogs—we create lifelong companions and bring joy to families across Nigeria.&quot;
                  </p>
                </div>
                <p>
                  Today, we&apos;re proud to have placed hundreds of happy, healthy puppies into homes where they&apos;re loved and cared for. Our commitment to ethical breeding, comprehensive health care, and ongoing support sets us apart in the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Why Families <span className="text-gold">Trust Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <FaAward className="text-5xl" />, 
                title: 'Health Guaranteed', 
                desc: 'All puppies are vaccinated, dewormed, and come with complete health certificates from licensed veterinarians.',
                color: 'from-brown/80 to-brown'
              },
              { 
                icon: <FaHeartbeat className="text-5xl" />, 
                title: 'Expert Care', 
                desc: '5+ years of breeding experience with focus on ethical practices and puppy wellbeing from birth to adoption.',
                color: 'from-brown/80 to-brown'
              },
              { 
                icon: <FaHandsHelping className="text-5xl" />, 
                title: 'Lifetime Support', 
                desc: 'We\'re here for advice anytime. Training tips, health guidance, and ongoing support for your puppy\'s life.',
                color: 'from-brown/80 to-brown'
              },
              { 
                icon: <FaMapMarkerAlt className="text-5xl" />, 
                title: 'Based in Lagos', 
                desc: 'Located in the heart of Lagos, Nigeria, we welcome visits and provide local pickup and delivery services.',
                color: 'from-brown/80 to-brown'
              },
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

      {/* Our Standards Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-brown">Our Breeding Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {[
              'Health testing for all breeding dogs',
              'Ethical breeding practices',
              'Comprehensive puppy socialization',
              'Veterinary care from birth',
              'Clean, spacious living environments',
              'Proper nutrition and exercise',
              'Early training and enrichment',
              'Transparent breeding records',
            ].map((standard, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gold/5 border border-gold/30 rounded-2xl hover:bg-gold/10 transition">
                <div className="w-8 h-8 border-2 border-gold rounded-full flex items-center justify-center bg-gold text-white flex-shrink-0">
                  <FaCheck className="text-xs" />
                </div>
                <span className="text-base text-gray-700 font-medium">{standard}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Dogs Section */}
      <section className="py-20 px-8 bg-gradient-to-b from-gray-50 via-gold/5 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-brown">Meet Our Breeding Dogs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Our breeding dogs are carefully selected champions with excellent bloodlines, health certifications, and outstanding temperaments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Thunder', breed: 'Golden Retriever', role: 'Sire', cert: 'Champion Bloodline' },
              { name: 'Sunshine', breed: 'Golden Retriever', role: 'Dam', cert: 'Champion Bloodline' },
              { name: 'Guardian', breed: 'German Shepherd', role: 'Sire', cert: 'AKC Certified' },
            ].map((parent, i) => (
              <div key={i} className="bg-white border-2 border-gold/30 rounded-3xl overflow-hidden hover:shadow-2xl transition">
                <div className="relative h-[350px] bg-gradient-to-br from-gold via-brown to-dark">
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-4xl font-bold">
                    {parent.name.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brown mb-2">{parent.name}</h3>
                  <p className="text-gray-600 mb-2">{parent.breed} • {parent.role}</p>
                  <span className="px-3 py-1 bg-gold/20 text-brown border border-gold/30 text-xs rounded-full font-semibold">
                    {parent.cert}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 bg-gradient-to-br from-brown via-brown/95 to-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Welcome a New Family Member?</h2>
          <p className="text-lg text-gold mb-8">
            Browse our available puppies or contact us to learn more about upcoming litters
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/available-puppies" 
              className="px-8 py-4 bg-gold text-dark border-2 border-gold text-base font-semibold rounded-2xl hover:bg-gold/90 hover:scale-105 transition-transform"
            >
              View Available Puppies
            </Link>
            <Link 
              href="/contact-us" 
              className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 text-base font-semibold rounded-2xl hover:bg-white/20 hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
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
                  <FaWhatsapp className="text-gold" />
                  <span>+234 XXX XXX XXXX</span>
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

