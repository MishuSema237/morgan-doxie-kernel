import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-8">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-brown mb-4">404</h1>
                <h2 className="text-2xl font-bold text-brown mb-4">Breed Not Found</h2>
                <p className="text-gray-600 mb-8">
                    Sorry, we couldn't find the breed you're looking for.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        href="/breeds"
                        className="px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-dark font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        View All Breeds
                    </Link>
                    <Link
                        href="/"
                        className="px-6 py-3 border-2 border-gold text-brown font-semibold rounded-xl hover:bg-gold/10 transition-all"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
