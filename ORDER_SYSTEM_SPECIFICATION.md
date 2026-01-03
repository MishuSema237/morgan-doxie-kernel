# Order System Implementation Specification
## Bullify Kennel - Dachshund Puppy E-Commerce Website

---

## Executive Summary

This document provides a comprehensive specification for implementing a complete order management system for the Bullify Kennel e-commerce website. The system handles the entire puppy purchase lifecycle from reservation to delivery, including automated email notifications, payment tracking, and customer communication.

---

## Current System Analysis

### Existing Components

#### 1. Database Models

**Puppy Model** (`lib/models/Puppy.ts`)
- Breed, age, gender, price
- Description and images
- Status: available, reserved, sold, new
- Color, tags, featured flag

**Breed Model** (`lib/models/Breed.ts`)
- Breed information and characteristics
- Size, energy level, temperament
- Price range and availability

**Order Model** (`lib/models/Order.ts`)
- Customer information
- Puppy selection
- Payment details
- Order status tracking

**Admin Model** (`lib/models/Admin.ts`)
- Admin authentication
- Username, email, password hash

**Settings Model** (`lib/models/Settings.ts`)
- Currency settings
- Site-wide configurations

#### 2. Frontend Pages

**Available Puppies** (`app/available-puppies/page.tsx`)
- Browse available puppies
- Filter by breed, gender, status
- View puppy details

**Puppy Detail** (`app/puppy-detail/[id]/page.tsx`)
- Detailed puppy information
- Image gallery
- Reserve button

**Select Puppy** (`app/select-puppy/page.tsx`)
- Puppy selection interface
- Add to reservation

**Reserve Puppy** (`app/reserve-puppy/page.tsx`)
- Reservation form
- Customer details
- Payment options

**Review Reservation** (`app/review-reservation/page.tsx`)
- Review order details
- Confirm reservation

**Reservation Confirmed** (`app/reservation-confirmed/page.tsx`)
- Confirmation page
- Order reference
- Next steps

#### 3. Admin Pages

**Admin Dashboard** (`app/admin/page.tsx`)
- Overview cards
- Quick navigation

**Breeds Management** (`app/admin/breeds/page.tsx`)
- CRUD operations for breeds
- Search and filter

**Puppies Management** (`app/admin/puppies/page.tsx`)
- CRUD operations for puppies
- Status management
- Image upload

**Settings** (`app/admin/settings/page.tsx`)
- Currency configuration
- Site settings

#### 4. API Routes

**Puppies API**
- GET/POST `/api/admin/puppies`
- GET/PUT/DELETE `/api/admin/puppies/[id]`

**Breeds API**
- GET/POST `/api/admin/breeds`
- GET/PUT/DELETE `/api/admin/breeds/[id]`

**Upload API**
- POST `/api/upload` - Image upload

**Settings API**
- GET/PUT `/api/settings`

#### 5. Features Implemented

✅ Admin authentication with MongoDB
✅ Image upload from device
✅ Dynamic currency management
✅ Toast notifications
✅ Mobile-responsive admin panel
✅ Database-driven content (no dummy data)

---

## Implementation Requirements

### Phase 1: Order/Reservation System Foundation

#### 1.1 Order Model Enhancement

**Current State**: Basic order model exists
**Required Enhancements**:

```typescript
interface IOrder {
  // Existing fields
  orderReference: string;  // Format: BK{YYYYMMDD}{0001}
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Puppy Information
  puppyId: ObjectId;
  puppyName: string;
  puppyBreed: string;
  puppyAge: string;
  puppyGender: string;
  puppyPrice: number;
  puppyImages: string[];
  
  // New fields to add
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Payment Details
  paymentMethod: string;
  depositPercentage: number;
  depositAmount: number;
  balanceAmount: number;
  totalAmount: number;
  depositPaid: boolean;
  depositPaidDate?: Date;
  fullPaymentPaid: boolean;
  fullPaymentDate?: Date;
  paymentProofUrls: string[];
  
  // Delivery
  deliveryMethod: 'pickup' | 'delivery_lagos' | 'delivery_outside';
  deliveryFee: number;
  deliveryAddress?: string;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  trackingNumber?: string;
  
  // Status Management
  status: 'new' | 'pending' | 'confirmed' | 'awaiting_deposit' | 
          'deposit_received' | 'awaiting_balance' | 'paid' | 
          'ready_for_pickup' | 'in_transit' | 'delivered' | 
          'completed' | 'cancelled';
  statusHistory: {
    status: string;
    changedBy: string;
    changedAt: Date;
    notes?: string;
  }[];
  
  // Communication
  customerNotes?: string;
  specialRequests?: string;
  internalNotes?: string;
  adminReplies: {
    message: string;
    sentBy: string;
    sentAt: Date;
    attachments?: string[];
  }[];
  
  // Additional
  vaccinated: boolean;
  microchipped: boolean;
  healthCertificate: boolean;
  cancellationReason?: string;
  refundAmount?: number;
  refundDate?: Date;
  
  createdAt: Date;
  updatedAt: Date;
}
```

#### 1.2 Reservation Flow Enhancement

**Pages to Create/Update**:

1. **Cart/Reservation Summary** (New)
   - Show selected puppy
   - Display pricing breakdown
   - Add-ons (vaccination, microchip, etc.)
   - Proceed to checkout

2. **Checkout Form** (Update `app/reserve-puppy/page.tsx`)
   - Customer information
   - Shipping/delivery details
   - Payment method selection
   - Special requests
   - Terms acceptance

3. **Order Confirmation** (Update `app/reservation-confirmed/page.tsx`)
   - Order reference
   - Order summary
   - Payment instructions
   - Next steps
   - Track order link

#### 1.3 Payment Configuration

**Settings to Add**:
- Default deposit percentage (e.g., 50%)
- Payment methods with instructions
- Delivery fees by region
- Add-on pricing (vaccination, microchip, etc.)

---

### Phase 2: Order Status Workflow

#### 2.1 Complete Status Flow

```
1. new → Customer submits reservation
   ↓ Email: Order confirmation to customer & admin
   
2. pending → Admin reviews order
   ↓ Admin action: Confirm or request changes
   
3. confirmed → Order details confirmed
   ↓ Email: Payment details sent to customer
   
4. awaiting_deposit → Waiting for deposit payment
   ↓ Customer pays deposit
   
5. deposit_received → Deposit verified
   ↓ Email: Deposit confirmation, puppy preparation begins
   
6. awaiting_balance → Waiting for final payment
   ↓ Customer pays balance
   
7. paid → Full payment received
   ↓ Email: Payment confirmation, delivery arrangements
   
8. ready_for_pickup → Puppy ready (if pickup)
   OR
   in_transit → Puppy shipped (if delivery)
   ↓ Email: Pickup details or tracking info
   
9. delivered → Puppy delivered
   ↓ Email: Delivery confirmation request
   
10. completed → Order completed
    ↓ Email: Thank you, care instructions, review request
    
11. cancelled → Order cancelled (any stage)
    ↓ Email: Cancellation confirmation, refund details
```

#### 2.2 Automated Email Triggers

**Customer Emails**:
1. Order Confirmation
2. Payment Details
3. Deposit Received
4. Balance Due Reminder
5. Payment Confirmed
6. Puppy Ready for Pickup
7. Shipping Notification
8. Delivery Confirmation
9. Order Completed
10. Cancellation Notice

**Admin Emails**:
1. New Order Alert
2. Payment Received Alert
3. Delivery Scheduled
4. Customer Inquiry

---

### Phase 3: Admin Order Management

#### 3.1 Orders Dashboard (New Page)

**File**: `app/admin/orders/page.tsx`

**Features**:
- Order statistics cards
  - Total orders
  - Pending orders
  - Revenue (total, this month)
  - Awaiting payment count
- Order list with filters
  - Search by reference, customer name, email
  - Filter by status
  - Filter by date range
  - Filter by payment status
- Quick actions
  - View details
  - Update status
  - Send email
  - Mark as paid
- Export functionality

#### 3.2 Order Detail Page (New)

**File**: `app/admin/orders/[id]/page.tsx`

**Sections**:

1. **Order Header**
   - Order reference
   - Status badge
   - Created date
   - Quick actions (print, email, cancel)

2. **Customer Information**
   - Name, email, phone
   - Shipping address
   - Customer notes

3. **Puppy Details**
   - Puppy image
   - Name, breed, age, gender
   - Price breakdown
   - Add-ons selected

4. **Payment Information**
   - Payment method
   - Deposit amount & status
   - Balance amount & status
   - Payment proofs (view/download)
   - Payment timeline

5. **Delivery Information**
   - Delivery method
   - Delivery address
   - Delivery fee
   - Estimated/actual delivery date
   - Tracking number

6. **Status Management**
   - Current status
   - Status history timeline
   - Update status dropdown
   - Add internal notes

7. **Communication**
   - Reply to customer form
   - Email history
   - Attach files (payment QR, invoice, etc.)
   - Quick templates

8. **Actions**
   - Generate invoice
   - Send payment reminder
   - Mark payment received
   - Update delivery status
   - Cancel order
   - Refund

#### 3.3 Order Statistics (New)

**File**: `app/admin/orders/stats/page.tsx`

**Metrics**:
- Total revenue (all time, this month, this year)
- Orders by status (pie chart)
- Orders over time (line chart)
- Popular breeds
- Average order value
- Payment completion rate
- Delivery performance

---

### Phase 4: Email System

#### 4.1 Email Templates

**Customer Email Templates**:

1. **Order Confirmation**
```
Subject: Order Confirmed - {orderReference}

Dear {customerName},

Thank you for choosing Bullify Kennel! Your reservation has been confirmed.

ORDER DETAILS:
Reference: {orderReference}
Puppy: {puppyName} - {puppyBreed}
Age: {puppyAge}
Gender: {puppyGender}

PRICING:
Puppy Price: {currency}{puppyPrice}
Delivery Fee: {currency}{deliveryFee}
Total: {currency}{totalAmount}

NEXT STEPS:
1. You will receive payment details within 24 hours
2. Pay the deposit of {currency}{depositAmount} ({depositPercentage}%)
3. We'll prepare your puppy
4. Pay the balance before delivery

Track your order: {trackOrderLink}

Questions? Reply to this email or WhatsApp us.

Best regards,
Bullify Kennel Team
```

2. **Payment Details**
```
Subject: Payment Details - {orderReference}

Dear {customerName},

Your order is confirmed! Here are the payment details:

DEPOSIT AMOUNT: {currency}{depositAmount}

PAYMENT METHODS:
[Payment method details with QR codes/account numbers]

DEADLINE: Please pay within 48 hours to secure your puppy.

After payment, please:
1. Take a screenshot of payment confirmation
2. Reply to this email with the screenshot
3. We'll confirm receipt within 24 hours

[Attachment: Payment QR Code]

Thank you!
Bullify Kennel
```

3. **Deposit Received**
```
Subject: Deposit Received - {orderReference}

Dear {customerName},

Great news! We've received your deposit payment.

PAYMENT CONFIRMED:
Amount: {currency}{depositAmount}
Date: {paymentDate}

NEXT STEPS:
✓ Your puppy is now reserved
✓ We're preparing {puppyName} for you
✓ Balance of {currency}{balanceAmount} due before delivery
✓ Estimated ready date: {estimatedDate}

We'll keep you updated on {puppyName}'s progress!

Warm regards,
Bullify Kennel
```

4. **Balance Due**
```
Subject: Final Payment - {orderReference}

Dear {customerName},

{puppyName} is almost ready for you!

BALANCE DUE: {currency}{balanceAmount}

Your puppy will be ready for {deliveryMethod} on {estimatedDate}.

Please complete payment to arrange {pickup/delivery}.

[Payment instructions]

Excited to unite you with {puppyName}!

Bullify Kennel
```

5. **Ready for Pickup/Delivery**
```
Subject: {puppyName} is Ready! - {orderReference}

Dear {customerName},

Wonderful news! {puppyName} is ready to meet you!

[If Pickup]
PICKUP DETAILS:
Location: {address}
Date: {pickupDate}
Time: {pickupTime}
Contact: {phone}

[If Delivery]
DELIVERY DETAILS:
Tracking: {trackingNumber}
Carrier: {carrier}
Estimated Delivery: {deliveryDate}

WHAT'S INCLUDED:
✓ Health certificate
✓ Vaccination record
✓ Care instructions
✓ Puppy starter kit

See you soon!
Bullify Kennel
```

6. **Delivery Confirmed**
```
Subject: Welcome Home {puppyName}! - {orderReference}

Dear {customerName},

We hope {puppyName} has settled in well!

CARE REMINDERS:
- Feed 3 times daily
- Vet checkup within 7 days
- Keep vaccination schedule
- Training tips: [link]

SUPPORT:
We're here for you! Contact us anytime:
- WhatsApp: {phone}
- Email: {email}

SHARE YOUR JOY:
Post photos with #BullifyKennel and tag us!

Would you recommend us? [Review Link]

Thank you for choosing Bullify Kennel!
```

**Admin Email Templates**:

1. **New Order Alert**
```
Subject: 🐕 New Order - {orderReference}

New puppy reservation received!

CUSTOMER:
Name: {customerName}
Email: {customerEmail}
Phone: {customerPhone}

PUPPY:
{puppyName} - {puppyBreed}
{puppyAge}, {puppyGender}
Price: {currency}{totalAmount}

DELIVERY:
Method: {deliveryMethod}
Location: {city}, {state}

[View Order] [Send Payment Details]

Bullify Kennel Admin
```

2. **Payment Received Alert**
```
Subject: 💰 Payment Received - {orderReference}

Payment confirmed for order {orderReference}

PAYMENT:
Type: {Deposit/Balance}
Amount: {currency}{amount}
Method: {paymentMethod}

CUSTOMER: {customerName}
PUPPY: {puppyName}

[View Order] [Update Status]

Bullify Kennel Admin
```

#### 4.2 Email System Features

**Implementation**:
- Email queue with retry logic
- Email templates with variable substitution
- Attachment support (QR codes, invoices, certificates)
- Email delivery tracking
- Failed email alerts to admin
- Email preview before sending
- Template editor in admin settings

---

### Phase 5: Customer Order Tracking

#### 5.1 Track Order Page Enhancement

**File**: `app/track-order/page.tsx`

**Features**:
- Order lookup by reference number
- Visual timeline/progress bar
- Current status with description
- Payment status
- Delivery tracking (if applicable)
- Download invoice/receipt
- Contact admin button
- Estimated dates for next steps

**Timeline Visualization**:
```
✓ Order Placed - Jan 1, 2024
✓ Payment Details Sent - Jan 1, 2024
✓ Deposit Received - Jan 2, 2024
⏳ Preparing Puppy - In Progress
○ Balance Payment - Pending
○ Ready for Delivery - Upcoming
○ Delivered - Upcoming
```

---

## Technical Implementation Details

### Database Schema

#### Order Model
```typescript
// lib/models/Order.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IOrder extends Document {
  orderReference: string;
  
  // Customer
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Puppy
  puppyId: mongoose.Types.ObjectId;
  puppyDetails: {
    name: string;
    breed: string;
    age: string;
    gender: string;
    price: number;
    images: string[];
  };
  
  // Shipping
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Payment
  paymentMethod: string;
  depositPercentage: number;
  depositAmount: number;
  balanceAmount: number;
  totalAmount: number;
  depositPaid: boolean;
  depositPaidDate?: Date;
  fullPaymentPaid: boolean;
  fullPaymentDate?: Date;
  paymentProofUrls: string[];
  
  // Delivery
  deliveryMethod: 'pickup' | 'delivery_lagos' | 'delivery_outside';
  deliveryFee: number;
  estimatedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  trackingNumber?: string;
  
  // Status
  status: string;
  statusHistory: {
    status: string;
    changedBy: string;
    changedAt: Date;
    notes?: string;
  }[];
  
  // Communication
  customerNotes?: string;
  internalNotes?: string;
  adminReplies: {
    message: string;
    sentBy: string;
    sentAt: Date;
    attachments?: string[];
  }[];
  
  // Add-ons
  vaccinated: boolean;
  microchipped: boolean;
  healthCertificate: boolean;
  
  createdAt: Date;
  updatedAt: Date;
}
```

#### Email Log Model
```typescript
// lib/models/EmailLog.ts
export interface IEmailLog extends Document {
  orderId: mongoose.Types.ObjectId;
  orderReference: string;
  recipient: string;
  recipientName: string;
  subject: string;
  template: string;
  status: 'sent' | 'failed' | 'bounced';
  sentAt: Date;
  errorMessage?: string;
  attachments?: string[];
}
```

### API Endpoints

#### Public Endpoints
```
POST   /api/orders                    - Create order
GET    /api/orders/[reference]        - Track order (public)
POST   /api/orders/[reference]/cancel - Request cancellation
```

#### Admin Endpoints
```
GET    /api/admin/orders              - List orders (with filters)
GET    /api/admin/orders/[id]         - Get single order
PUT    /api/admin/orders/[id]         - Update order
DELETE /api/admin/orders/[id]         - Delete order
POST   /api/admin/orders/[id]/reply   - Send email to customer
POST   /api/admin/orders/[id]/payment - Mark payment received
POST   /api/admin/orders/[id]/invoice - Generate invoice
GET    /api/admin/orders/stats        - Order statistics
POST   /api/admin/orders/bulk-update  - Bulk status update
```

### Environment Variables

```env
# Existing
MONGODB_URI=
NEXT_PUBLIC_BASE_URL=

# Email Configuration
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_NAME=Bullify Kennel
SMTP_FROM_EMAIL=
ADMIN_EMAIL=

# Order Configuration
DEFAULT_DEPOSIT_PERCENTAGE=50
DELIVERY_FEE_LAGOS=15000
DELIVERY_FEE_OUTSIDE=25000
VACCINATION_FEE=10000
MICROCHIP_FEE=15000

# WhatsApp
WHATSAPP_NUMBER=234XXXXXXXXX

# Optional
ENABLE_SMS_NOTIFICATIONS=false
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

---

## Implementation Checklist

### P0 (Critical - Implement First)

- [ ] Create enhanced Order model
- [ ] Create order creation API
- [ ] Build order confirmation page
- [ ] Implement order status workflow
- [ ] Create admin orders list page
- [ ] Create admin order detail page
- [ ] Build payment tracking system
- [ ] Create order confirmation email
- [ ] Create payment details email
- [ ] Create deposit received email

### P1 (High Priority)

- [ ] Create all customer email templates
- [ ] Create all admin email templates
- [ ] Implement email queue system
- [ ] Build order timeline visualization
- [ ] Add payment proof upload
- [ ] Create invoice generation
- [ ] Build order tracking page
- [ ] Add internal notes system
- [ ] Implement status change notifications

### P2 (Medium Priority)

- [ ] Create order statistics dashboard
- [ ] Add bulk order actions
- [ ] Build email template editor
- [ ] Add advanced order filtering
- [ ] Implement delivery tracking
- [ ] Create customer order history
- [ ] Add order export functionality
- [ ] Build payment reminder system

### P3 (Nice to Have)

- [ ] SMS notifications (Twilio)
- [ ] Customer accounts/login
- [ ] Email open/click tracking
- [ ] Automated review requests
- [ ] Multi-language support
- [ ] WhatsApp integration
- [ ] Loyalty program
- [ ] Subscription for puppy updates

---

## Success Criteria

### Functional Requirements
✅ Customers can reserve puppies seamlessly
✅ Admin receives instant new order notifications
✅ Payment tracking is clear and accurate
✅ Customers receive emails at each status change
✅ Orders can be searched and filtered efficiently
✅ Email delivery is reliable
✅ Customers can track orders without logging in
✅ Admin can communicate with customers easily

### Performance Requirements
- Order creation < 3 seconds
- Email delivery < 1 minute
- Admin dashboard loads < 2 seconds
- Support 1,000+ orders efficiently

### User Experience Requirements
- Mobile-friendly admin interface
- Clear visual status indicators
- Professional email templates
- Intuitive order management
- Minimal clicks for common tasks

---

## Priority Implementation Order

### Week 1: Foundation
1. Enhanced Order model
2. Order creation API
3. Basic admin orders list
4. Order confirmation email

### Week 2: Payment & Status
1. Payment tracking system
2. Status workflow implementation
3. Payment emails
4. Admin order detail page

### Week 3: Communication
1. All email templates
2. Email queue system
3. Admin reply functionality
4. Email delivery tracking

### Week 4: Enhancement
1. Order statistics
2. Invoice generation
3. Order tracking page
4. Advanced filtering

---

## Notes for Implementation

1. **Email Reliability**: Use email queue with retry logic
2. **File Uploads**: Implement for payment proofs and documents
3. **Security**: Validate all admin actions with authentication
4. **Performance**: Index MongoDB on orderReference, status, customerEmail
5. **Testing**: Create seed data for various order scenarios
6. **Mobile**: Ensure all admin pages are mobile-responsive
7. **Notifications**: Use toast notifications for user feedback
8. **Currency**: Use dynamic currency from settings

---

## Maintenance & Future Enhancements

### Ongoing Maintenance
- Monitor email delivery rates
- Update email templates
- Optimize database queries
- Regular data backups
- Review order analytics

### Future Enhancements
- Customer loyalty program
- Automated review requests
- Social media integration
- Advanced analytics dashboard
- Mobile app for tracking
- Shipping carrier integration
- Automated inventory management
- Multi-currency support
- Puppy care subscription service

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Project**: Bullify Kennel Order Management System
