import Link from 'next/link';
import { FaAward, FaHeartbeat, FaHandsHelping, FaHospital } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PriceDisplay from '@/components/PriceDisplay';
import dbConnect from '@/lib/dbConnect';
import Puppy from '@/lib/models/Puppy';

export const dynamic = 'force-dynamic';

async function getFeaturedPuppies() {
  await dbConnect();
  // Fetch featured available puppies, limited to 3
  const puppies = await Puppy.find({
    status: { $in: ['available', 'new'] },
    isFeatured: true
  }).limit(3).lean();

  // If no featured, just get latest 3
  if (puppies.length === 0) {
    return await Puppy.find({ status: { $in: ['available', 'new'] } })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
  }

  return JSON.parse(JSON.stringify(puppies));
}

export default async function Home() {
  const puppies = await getFeaturedPuppies();

  const testimonials = [
    { quote: '"Best breeder in Lagos! Our Golden Retriever is healthy, happy, and perfectly trained. The support we received was incredible."', name: 'Chidi Okonkwo', location: 'Lekki, Lagos' },
    { quote: '"Professional service from start to finish. Our German Shepherd came with all documents and the breeder even helped with initial training."', name: 'Amaka Johnson', location: 'Victoria Island, Lagos' },
    { quote: '"Trustworthy and caring. We visited the facility and saw how well the puppies are treated. Highly recommend!"', name: 'Ibrahim Yusuf', location: 'Ikeja, Lagos' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-cream overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/10 skew-x-12 transform origin-top-left translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-brown/5 rounded-tr-[100px]"></div>

        <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-0">
          <div className="flex flex-col gap-8 animate-fade-in-up order-2 lg:order-1">
            <div className="flex items-center gap-2 text-gold font-semibold tracking-wider uppercase text-sm">
              <span className="w-8 h-[2px] bg-gold"></span>
              Premium Dog Breeder
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold font-serif text-brown leading-tight">
              Raise a Friend <br />
              <span className="text-gold italic">Not Just a Pet</span>
            </h1>
            <p className="text-xl text-dark/70 leading-relaxed max-w-xl">
              Ethically bred, genetically tested, and raised in a loving home environment. Discover the difference of a well-bred companion.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/available-puppies" className="btn-primary">
                View Available Puppies
              </Link>
              <Link href="/about-us" className="btn-secondary">
                Our Philosophy
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 pt-8 border-t border-brown/10 flex flex-col gap-4">
              <p className="text-sm font-semibold text-brown/60">Trusted & Secured By</p>
              <div className="flex flex-wrap gap-6 hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                <div className="flex items-center gap-2 font-bold text-gray-500"><FaHospital className="text-xl" /> VetChecked</div>
                <div className="flex items-center gap-2 font-bold text-gray-500"><FaHandsHelping className="text-xl" /> EthicalBreeding</div>
                <div className="flex items-center gap-2 font-bold text-gray-500"><span className="text-xl">stripe</span></div>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[600px]">
            {/* Main Hero Image Frame */}
            <div className="absolute inset-0 bg-gold/20 rounded-t-full rounded-b-[200px] transform rotate-3 scale-95"></div>
            <div className="relative h-full w-full rounded-t-full rounded-b-[200px] overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="/photos/pitbull.png"
                alt="Happy Puppy"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
              {/* Removed overlays as requested by user */}
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Health Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">Our Guarantee</span>
          <h2 className="text-4xl font-serif font-bold text-brown mb-12">The Health Promise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-cream border border-gold/10 hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl text-gold mb-6 border-2 border-gold/20">
                <FaHeartbeat />
              </div>
              <h3 className="text-xl font-bold text-brown mb-4">Genetic Testing</h3>
              <p className="text-gray-600">Every parent is genetically tested to ensure your puppy is free from breed-specific hereditary conditions.</p>
            </div>
            <div className="p-8 rounded-3xl bg-cream border border-gold/10 hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl text-gold mb-6 border-2 border-gold/20">
                <FaHospital />
              </div>
              <h3 className="text-xl font-bold text-brown mb-4">Vet Certified</h3>
              <p className="text-gray-600">Comprehensive nose-to-tail examinations by licensed veterinarians before any puppy goes home.</p>
            </div>
            <div className="p-8 rounded-3xl bg-cream border border-gold/10 hover:shadow-xl transition text-center">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl text-gold mb-6 border-2 border-gold/20">
                <FaAward />
              </div>
              <h3 className="text-xl font-bold text-brown mb-4">Written Guarantee</h3>
              <p className="text-gray-600">We stand behind our puppies with a comprehensive written health guarantee for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Our Process */}
      <section className="py-20 bg-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Bringing a new family member home should be exciting, not stressful. We've simplified our adoption process.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse & Select', desc: 'Explore our available puppies or view upcoming litters.' },
              { step: '02', title: 'Reserve', desc: 'Place a deposit to secure your chosen puppy immediately.' },
              { step: '03', title: 'Updates', desc: 'Receive weekly photos and videos as your puppy grows.' },
              { step: '04', title: 'Welcome Home', desc: 'Pick up your puppy or have us arrange travel to you.' }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-white/5 absolute -top-8 left-0">{item.step}</div>
                <h3 className="text-xl font-bold text-gold mb-2 relative">{item.title}</h3>
                <p className="text-sm text-white/70 relative">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Puppies Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown mb-4">Featured <span className="text-gold">Puppies</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto">These little ones are looking for their forever homes. Each puppy comes with a health guarantee and lifetime support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {puppies.map((puppy: any) => (
              <div key={puppy._id} className="bg-cream rounded-3xl overflow-hidden hover:shadow-2xl transition-all group flex flex-col border border-gold/10">
                <div className="h-[350px] relative overflow-hidden">
                  <Image
                    src={puppy.images && puppy.images.length > 0 ? puppy.images[0] : '/photos/placeholder-dog.png'}
                    alt={`${puppy.breed} puppy`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {puppy.status === 'new' && (
                    <div className="absolute top-4 left-4 px-4 py-1 bg-gold text-white text-xs font-bold rounded-full shadow-lg">
                      NEW ARRIVAL
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-xl font-bold text-brown shadow-sm">
                    <PriceDisplay price={puppy.price} />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-brown mb-1 font-serif">{puppy.breed}</h3>
                      <p className="text-sm text-gray-500">{puppy.gender} • {puppy.age}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {puppy.tags && puppy.tags.map((tag: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-white border border-gold/20 text-brown text-xs rounded-full">{tag}</span>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link href={`/puppy-detail/${puppy._id}`} className="py-3 text-center border-2 border-brown text-brown font-semibold rounded-xl hover:bg-brown hover:text-white transition">
                      Details
                    </Link>
                    <Link href={`/available-puppies`} className="py-3 text-center bg-brown text-gold font-semibold rounded-xl hover:shadow-lg transition">
                      Adopt Me
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/available-puppies" className="inline-flex items-center gap-2 text-brown font-semibold hover:text-gold transition border-b-2 border-gold pb-1">
              View All Available Puppies →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-brown text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Why Families <span className="text-gold">Choose Us</span></h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                We don't just breed dogs; we raise family members. Our commitment goes beyond the sale, ensuring every puppy is healthy, happy, and well-adjusted.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Health Guaranteed', desc: 'Comprehensive health checks and genetic testing.' },
                  { title: 'Ethical Breeding', desc: 'Raised in a loving home environment, not kennels.' },
                  { title: 'Lifetime Support', desc: 'We are just a phone call away for any advice you need.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold flex-shrink-0">
                      <FaAward />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gold mb-1">{item.title}</h4>
                      <p className="text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[250px] bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center transform translate-y-8">
                <h3 className="text-5xl font-bold text-gold mb-2">5+</h3>
                <p className="text-sm">Years of Experience</p>
              </div>
              <div className="h-[250px] bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-5xl font-bold text-gold mb-2">100%</h3>
                <p className="text-sm">Health Guarantee</p>
              </div>
              <div className="h-[250px] bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center transform translate-y-8">
                <h3 className="text-5xl font-bold text-gold mb-2">24/7</h3>
                <p className="text-sm">Lifetime Support</p>
              </div>
              <div className="h-[250px] bg-white/10 rounded-3xl backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center text-center">
                <h3 className="text-5xl font-bold text-gold mb-2">50+</h3>
                <p className="text-sm">Top Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brown mb-16">Happy <span className="text-gold">Tails</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border border-gold/10 relative">
                <div className="absolute -top-4 left-8 text-6xl text-gold opacity-20 font-serif">"</div>
                <p className="text-gray-600 mb-6 italic relative z-10">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brown text-gold rounded-full flex items-center justify-center font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-brown">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Banner */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Follow @bullifykennel on Instagram for daily doses of cuteness, training tips, and behind-the-scenes moments.</p>
          <Link href="https://instagram.com/bullifykennel" className="btn-primary bg-gold text-dark hover:bg-white hover:text-dark border-transparent">
            Follow on Instagram
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}