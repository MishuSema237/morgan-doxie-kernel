# Admin System Design - MongoDB Atlas

## Database Collections Structure

### 1. `breeds` Collection
```json
{
  "_id": ObjectId,
  "slug": "golden-retriever",
  "name": "Golden Retriever",
  "image": "url or path",
  "galleryImages": ["url1", "url2", "url3"],
  "tags": ["Family Friendly", "Medium Size", "High Energy"],
  "stats": {
    "size": "Large",
    "energy": "High",
    "withKids": "Excellent",
    "grooming": "Medium",
    "lifespan": "10-12 years",
    "trainability": "Very Easy"
  },
  "description": "Full description text...",
  "temperament": "Friendly, Reliable, Trustworthy...",
  "care": ["Daily exercise of 1-2 hours", "Regular brushing..."],
  "idealFor": ["Active families with children", "First-time dog owners"],
  "considerations": ["Requires regular exercise", "Needs mental stimulation"],
  "price": "From ₦180,000",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### 2. `puppies` Collection
```json
{
  "_id": ObjectId,
  "name": "Luna",
  "breed": "German Shepherd",
  "breedId": ObjectId("breed reference"),
  "age": "10 weeks",
  "gender": "Male",
  "color": "Black & Tan",
  "weight": "5.1kg",
  "price": 220000,
  "status": "available", // available, reserved, sold
  "tag": "Active",
  "tags": ["Active", "Intelligent", "Loyal"],
  "description": "Full description...",
  "image": "url or path",
  "images": ["url1", "url2"],
  "parentMale": "Champion Thunder",
  "parentFemale": "Lady Sunshine",
  "healthCert": true,
  "firstVaccination": true,
  "dewormed": true,
  "microchip": true,
  "paymentOptions": ["Cash", "Bank Transfer"],
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### 3. `reservations` Collection
```json
{
  "_id": ObjectId,
  "reservationNumber": "REF-12345",
  "puppyId": ObjectId("puppy reference"),
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 123 456 7890",
    "whatsapp": "+234 123 456 7890",
    "address": "Full address..."
  },
  "delivery": {
    "method": "pickup",
    "date": "2024-02-15",
    "time": "2:00 PM - 4:00 PM",
    "fee": 0
  },
  "payment": {
    "total": 220000,
    "deposit": 110000,
    "depositPercent": "50%",
    "balance": 110000,
    "method": "Bank Transfer",
    "status": "pending", // pending, confirmed, completed, cancelled
    "proofFile": "url or path (optional)"
  },
  "formData": {
    "ownerType": ["First-time dog owner"],
    "livingSituation": "House with yard",
    "caregiver": "Me",
    "reason": "Why they chose this breed..."
  },
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

### 4. `settings` Collection (Single Document)
```json
{
  "_id": ObjectId,
  "socialMedia": {
    "instagram": "https://instagram.com/bullifykennel",
    "facebook": "https://facebook.com/bullifykennel",
    "twitter": "https://twitter.com/bullifykennel",
    "tiktok": "https://tiktok.com/@bullifykennel",
    "whatsapp": "https://wa.me/234XXXXXXXXX"
  },
  "contact": {
    "phone": "+234 XXX XXX XXXX",
    "whatsapp": "+234 XXX XXX XXXX",
    "email": "info@bullifykennel.com",
    "address": "Lagos, Nigeria",
    "businessHours": {
      "weekdays": "9:00 AM - 6:00 PM",
      "saturday": "9:00 AM - 5:00 PM",
      "sunday": "By Appointment"
    }
  },
  "payment": {
    "depositOptions": ["50%", "75%"],
    "bankAccounts": [
      {
        "name": "Bullify Kennel",
        "bank": "GTBank Nigeria",
        "number": "0123456789"
      }
    ]
  },
  "homepage": {
    "heroTitle": "Find Your Perfect Companion",
    "heroSubtitle": "Premium dog breeding in Lagos, Nigeria",
    "testimonials": []
  },
  "about": {
    "story": "Full story text...",
    "standards": ["Health testing...", "Ethical breeding..."]
  },
  "updatedAt": ISODate
}
```

### 5. `admin` Collection (Optional - if we want to extend later)
```json
{
  "_id": ObjectId,
  "username": "admin",
  "passwordHash": "bcrypt hash",
  "createdAt": ISODate
}
```

## Admin Pages Structure

```
/admin
  ├── /login (password protected)
  ├── / (dashboard - stats overview)
  ├── /breeds
  │   ├── / (list all breeds)
  │   └── /[id] (create/edit breed)
  ├── /puppies
  │   ├── / (list all puppies with filters)
  │   └── /[id] (create/edit puppy)
  ├── /reservations
  │   ├── / (list all reservations)
  │   └── /[id] (view/edit reservation, payment verification)
  ├── /content
  │   ├── /homepage (edit hero, testimonials)
  │   ├── /about (edit story, standards)
  │   └── /gallery (manage gallery photos)
  └── /settings
      ├── /social-media (manage social links)
      ├── /contact (contact info, hours)
      └── /payment (bank accounts, deposit options)
```

## Features Breakdown

### Breeds Manager
- List all breeds in table format
- Create new breed with all fields
- Edit existing breed
- Delete breed (with confirmation)
- Image upload for main image and gallery
- Real-time preview of breed data

### Puppies Manager
- List all puppies with filters (breed, status, gender)
- Create new puppy
- Edit puppy details
- Update status (available/reserved/sold)
- Image upload for main image and gallery
- Link puppy to breed

### Reservations Manager
- View all reservations in table
- Filter by status, date, customer name
- View full reservation details
- Verify payment (upload proof file)
- Update reservation status
- Send confirmation emails (future)
- Export reservations to CSV

### Content Manager
- Homepage: Edit hero text, add testimonials
- About: Edit story, add/remove standards
- Gallery: Upload/manage gallery photos

### Settings Manager
- Social Media: Add/edit links (Instagram, Facebook, Twitter, TikTok, WhatsApp)
- Contact: Phone, email, address, business hours
- Payment: Bank accounts, deposit percentages

## Authentication

- Simple password protection for `/admin/*` routes
- Password hash stored in `.env.local`
- Session-based auth using cookies
- Middleware to protect all admin routes

## Implementation Plan

1. **Setup MongoDB connection** ✅
2. **Create API routes for CRUD operations**
3. **Build admin login page**
4. **Build dashboard with stats**
5. **Build breeds manager**
6. **Build puppies manager**
7. **Build reservations manager**
8. **Build content manager**
9. **Build settings manager**
10. **Update frontend to fetch from MongoDB**

## Image Storage Decision

**Recommended: Cloudinary**
- Best for production
- Auto optimization
- CDN delivery
- Easy transformations
- Free tier: 25GB storage, 25GB bandwidth/month

**Alternative: Local Uploads**
- For development/testing
- Store in `/public/uploads`
- MongoDB stores file paths
- Not ideal for production (Vercel limits)



