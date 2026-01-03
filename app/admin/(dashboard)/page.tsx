import Link from 'next/link';
import { FiGrid, FiPackage, FiFileText, FiShoppingBag, FiSettings, FiImage } from 'react-icons/fi';

const dashboardCards = [
  {
    title: 'Breeds',
    description: 'Add/edit breeds, stats, images, care, temperament.',
    href: '/admin/breeds',
    icon: FiGrid,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Puppies',
    description: 'Add/edit puppies, names, prices, status, photos.',
    href: '/admin/puppies',
    icon: FiPackage,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Gallery',
    description: 'Manage gallery photos and categories.',
    href: '/admin/gallery',
    icon: FiImage, // Changed icon to FiImage if available, else FiFileText
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Orders',
    description: 'View orders, verify payments, update status.',
    href: '/admin/orders',
    icon: FiShoppingBag,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Settings',
    description: 'Banks, WhatsApp, pricing defaults, hero assets.',
    href: '/admin/settings',
    icon: FiSettings,
    color: 'from-gray-500 to-slate-600',
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brown mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Manage your dachshund kennel from this dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group relative overflow-hidden bg-white border-2 border-gold/20 rounded-2xl p-6 hover:border-gold hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`} />

              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${card.color} text-white mb-4`}>
                  <Icon size={24} />
                </div>

                <h2 className="text-xl font-bold text-brown mb-2 group-hover:text-gold transition-colors">
                  {card.title}
                </h2>

                <p className="text-sm text-gray-600 mb-4">
                  {card.description}
                </p>

                <div className="flex items-center text-gold font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  Open →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}





