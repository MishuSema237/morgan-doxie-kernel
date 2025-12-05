# Instagram Feed Integration Guide

This guide explains how to integrate a live Instagram feed into your Bullify Kennel website.

## Method 1: Instagram Basic Display API (Recommended)

### Setup Steps:

1. **Create a Facebook App:**
   - Go to https://developers.facebook.com/apps/
   - Click "Create App"
   - Select "Consumer" or "Business" type
   - Fill in your app details

2. **Add Instagram Basic Display Product:**
   - In your app dashboard, go to "Add Product"
   - Find "Instagram Basic Display" and click "Set Up"
   - Add a valid OAuth Redirect URI (e.g., `http://localhost:3000/api/instagram/callback`)

3. **Get Access Token:**
   - Go to "User Token Generator" in your app
   - Add your Instagram account
   - Generate a User Token
   - Save it securely (use environment variables)

4. **Create API Route:**
   Create `app/api/instagram/route.ts`:

```typescript
import { NextResponse } from 'next/server';

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function GET() {
  try {
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      return NextResponse.json({ error: 'Instagram credentials not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,media_url,permalink,caption&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=6`
    );

    if (!response.ok) {
      throw new Error('Instagram API request failed');
    }

    const data = await response.json();
    return NextResponse.json({ posts: data.data });
  } catch (error) {
    console.error('Instagram API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}
```

5. **Add Environment Variables:**
   Create `.env.local`:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_access_token_here
   INSTAGRAM_USER_ID=your_user_id_here
   ```

6. **Update the Component:**
   In `app/components/InstagramFeed.tsx`, uncomment and update the API call:
   ```typescript
   const response = await fetch('/api/instagram');
   const data = await response.json();
   setPosts(data.posts);
   ```

## Method 2: Third-Party Services (Easier Alternative)

### Option A: InstagramFeed.com
1. Sign up at https://www.instagramfeed.com/
2. Connect your Instagram account
3. Get your embed code or API key
4. Update the component to use their API

### Option B: SociableKit
1. Go to https://www.sociablekit.com/
2. Create an Instagram feed
3. Get your embed code or API endpoint
4. Integrate into your component

### Option C: Smash Balloon Instagram Feed
1. Use the plugin: https://wordpress.org/plugins/instagram-feed/
2. Or use their embed code/API for Next.js

## Method 3: RSS Feed (Simple but Limited)

Some Instagram to RSS services are available, but Instagram has limited official RSS support.

## Using the Component

After setting up one of the methods above, update `app/page.tsx`:

```tsx
import InstagramFeed from './components/InstagramFeed';

// In your Instagram Gallery Section:
<InstagramFeed username="bullifykennel" limit={6} />
```

## Important Notes:

- Instagram Basic Display API requires app review for production use
- Access tokens expire - implement token refresh
- Rate limits apply (200 requests/hour per token)
- For production, use server-side rendering or API routes to hide tokens
- Always handle errors gracefully with fallback content

## Token Refresh

Create `app/api/instagram/refresh/route.ts` to refresh expired tokens:

```typescript
export async function GET() {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  );
  const data = await response.json();
  // Update your stored token
  return NextResponse.json(data);
}
```



