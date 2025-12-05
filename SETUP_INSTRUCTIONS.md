# Setup Instructions - MongoDB Atlas + Admin System

## 1. Install Dependencies

```bash
npm install
```

This will install:
- `bcryptjs` - for password hashing
- `mongodb` - MongoDB driver
- And all other dependencies

## 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection
# Replace YOUR_PASSWORD with your actual password (URL-encoded if special characters)
MONGODB_URI=mongodb+srv://mishael:YOUR_PASSWORD@cluster0.za9sl.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=bullify_kennel

# Admin Authentication
# Generate password hash using: node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10).then(h => console.log(h))"
ADMIN_PASSWORD_HASH=your_hashed_password_here

# App Settings
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### How to Generate Password Hash:

1. Install bcryptjs: `npm install bcryptjs`
2. Run this command (replace `yourpassword` with your desired admin password):
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('yourpassword', 10).then(h => console.log(h))"
   ```
3. Copy the hash and paste it as `ADMIN_PASSWORD_HASH` in `.env.local`

### How to Change MongoDB Atlas Password:

1. Go to https://cloud.mongodb.com
2. Click "Database Access" in left sidebar
3. Find your user (`mishael`)
4. Click "Edit" → "Edit Password"
5. Enter new password and save
6. **URL-encode special characters** in connection string:
   - `$` → `%24`
   - `@` → `%40`
   - `#` → `%23`
   - etc.
7. Update `MONGODB_URI` in `.env.local`

## 3. Initialize Database Collections

Run this script to create initial database structure:

```bash
node scripts/init-db.js
```

Or manually create these collections in MongoDB Atlas:
- `settings` - One document with all site settings
- `breeds` - Array of breed documents
- `puppies` - Array of puppy documents
- `reservations` - Array of reservation documents

## 4. Update Footer Components

The new `Footer` component has been created and is used in the home page. You need to replace static footers in these files:

- `app/about-us/page.tsx`
- `app/gallery/page.tsx`
- `app/contact-us/page.tsx`
- `app/available-puppies/page.tsx`
- `app/breeds/page.tsx`
- `app/breeds/[breed]/page.tsx`
- `app/puppy-detail/[id]/page.tsx`
- Any other pages with footers

**How to update:**
1. Add import at top: `import Footer from '@/app/components/Footer';`
2. Replace the entire `<footer>...</footer>` section with: `<Footer />`
3. Remove any unused social media icon imports (FaInstagram, FaFacebook, etc.) if they're only used in footer

## 5. Test the Setup

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Test MongoDB connection:**
   - Visit any page - if MongoDB connection fails, you'll see errors in console
   - Check that settings API works: `http://localhost:3000/api/settings`

3. **Test Admin Login:**
   - Visit: `http://localhost:3000/admin/login`
   - Enter the password you set in `ADMIN_PASSWORD_HASH`
   - Should redirect to `/admin` dashboard

4. **Test Footer:**
   - Visit home page - footer should load (may show "Loading..." if no settings in DB)
   - Only social icons with links should appear

## 6. Next Steps - Admin Panel Development

Once setup is complete, we'll build:
- Admin dashboard with stats
- Breeds management (CRUD)
- Puppies management (CRUD)
- Reservations management
- Content management (homepage, about, gallery)
- Settings management (social media, contact, payment)

## Troubleshooting

### MongoDB Connection Error:
- Check password is URL-encoded correctly
- Verify network access in MongoDB Atlas (IP whitelist)
- Check database name matches `MONGODB_DB_NAME`

### Admin Login Not Working:
- Verify `ADMIN_PASSWORD_HASH` is set correctly
- Check password hash was generated properly
- Clear browser cookies and try again

### Footer Not Showing Social Icons:
- Check settings exist in MongoDB `settings` collection
- Verify API route `/api/settings` returns data
- Check browser console for errors



