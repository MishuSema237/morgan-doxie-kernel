'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

interface InstagramFeedProps {
  username?: string;
  limit?: number;
}

export default function InstagramFeed({ username = 'bullifykennel', limit = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Option 1: Using Instagram Basic Display API
    // You need to set up an Instagram App and get an access token
    // See: https://developers.facebook.com/docs/instagram-basic-display-api
    
    // Option 2: Using a third-party service like:
    // - https://www.instagramfeed.com/
    // - https://www.sociablekit.com/
    // - https://www.twilio.com/blog/building-instagram-feed-nextjs
    
    // For now, we'll use a placeholder approach
    // Replace this with actual API call when you have credentials
    
    const fetchInstagramPosts = async () => {
      try {
        // TODO: Replace with your actual Instagram API endpoint
        // Example API endpoint structure:
        // const response = await fetch(`/api/instagram?username=${username}&limit=${limit}`);
        // const data = await response.json();
        // setPosts(data.posts);
        
        // Placeholder: Using your existing photos for demo
        const placeholderPosts: InstagramPost[] = [
          { id: '1', media_url: '/photos/3dogs_transparent_bg.png', permalink: 'https://instagram.com/bullifykennel', caption: 'Our beautiful puppies' },
          { id: '2', media_url: '/photos/group-dogs-facing-camera-isolated-transparent-background_1033579-238659.jpg', permalink: 'https://instagram.com/bullifykennel', caption: 'Happy families' },
          { id: '3', media_url: '/photos/3dogs.jpg', permalink: 'https://instagram.com/bullifykennel', caption: 'New arrivals' },
          { id: '4', media_url: '/photos/pitbull.png', permalink: 'https://instagram.com/bullifykennel', caption: 'Pitbull puppies' },
          { id: '5', media_url: '/photos/pitbull_sitting.png', permalink: 'https://instagram.com/bullifykennel', caption: 'Adorable puppies' },
          { id: '6', media_url: '/photos/3dogs_transparent_bg.png', permalink: 'https://instagram.com/bullifykennel', caption: 'Our kennel family' },
        ];
        
        setPosts(placeholderPosts.slice(0, limit));
        setLoading(false);
      } catch (err) {
        setError('Failed to load Instagram posts');
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [username, limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="aspect-square bg-gradient-to-br from-gold via-brown to-dark rounded-2xl animate-pulse border-2 border-gold/50"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-gold mb-8">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-square relative bg-gradient-to-br from-gold via-brown to-dark rounded-2xl overflow-hidden hover:scale-110 transition-transform border-2 border-gold/50 group"
        >
          <Image
            src={post.media_url}
            alt={post.caption || 'Instagram post'}
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
  );
}



