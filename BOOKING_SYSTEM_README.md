# Stone House Booking System - Development Guide

This is the plugin development clone of the Stone House Venue Site with an automated booking and shopping cart system.

## 🎯 Project Overview

This booking system adds:
- **Real-time availability** checking with database-backed calendar
- **Dynamic pricing** based on season, day type, and venue configuration
- **Shopping cart** for managing bookings
- **Stripe payment processing** for instant booking confirmation
- **Email notifications** via Resend

## 📋 Phase 1 Complete - Backend Foundation

### ✅ What's Been Built

1. **Pricing Engine** ([src/js/pricing-engine.js](src/js/pricing-engine.js))
   - Season detection (Spring, Summer, Fall, Winter)
   - Day type detection (Weekend: Fri-Sun, Weekday: Mon-Thu)
   - Pricing tier calculation (Peak Weekend, Off-Peak Weekend/Peak Weekday, Off-Peak Weekday)
   - Full venue and individual floor pricing logic
   - Validation and error handling

2. **API Endpoints**
   - `POST /api/pricing/calculate` - Calculate booking price
   - `GET /api/availability/check?date=YYYY-MM-DD` - Check date availability

3. **Configuration Files**
   - [vercel.json](vercel.json) - Serverless function configuration
   - [.env.example](.env.example) - Environment variable template
   - [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Database setup guide

4. **Dependencies Installed**
   - `@supabase/supabase-js` - Database client
   - `stripe` - Payment processing
   - `flatpickr` - Calendar UI
   - `date-fns` - Date utilities
   - `resend` - Email service

## 🚀 Getting Started

### 1. Set Up Supabase Database

Follow the instructions in [SUPABASE_SETUP.md](SUPABASE_SETUP.md) to:
1. Create a Supabase project
2. Run SQL to create database tables
3. Configure Row Level Security
4. Get your API credentials

### 2. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your credentials:
# - Supabase URL and keys
# - Stripe keys (get from https://dashboard.stripe.com)
# - Resend API key (get from https://resend.com)
```

### 3. Start Development Server

```bash
# Start the local server
npm start
# or
./start.sh
```

The site will be available at `http://localhost:8080`

### 4. Test the API Endpoints

**Test Pricing Calculation:**
```bash
curl -X POST http://localhost:8080/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-06-15",
    "bookingType": "full_day",
    "isFullVenue": true
  }'
```

Expected response:
```json
{
  "success": true,
  "pricing": {
    "price": 5000,
    "formattedPrice": "$5,000",
    "season": "summer",
    "dayType": "weekend",
    "tier": "off_peak_weekend_or_peak_weekday",
    "tierLabel": "Off-Peak Weekend / Peak Weekday"
  }
}
```

**Test Availability Check:**
```bash
curl "http://localhost:8080/api/availability/check?date=2026-06-15"
```

Expected response:
```json
{
  "available": true,
  "date": "2026-06-15"
}
```

## 📊 Pricing Matrix

| Booking Type | Season/Day | Whole Venue Rate | Individual Floor Rate |
|--------------|------------|------------------|----------------------|
| **Peak Weekend** | Fall & Spring, Fri-Sun | $9,000 full day | NOT available |
| **Off-Peak Weekend / Peak Weekday** | Winter/Summer weekends OR Fall/Spring weekdays | $6,000 full day | $2,000 per half day per floor |
| **Off-Peak Weekday** | Winter/Summer, Mon-Wed | $5,000 full day | $2,500 per half day per floor |

**Season Definitions:**
- **Spring**: March, April, May
- **Summer**: June, July, August
- **Fall**: September, October, November
- **Winter**: December, January, February

**Day Type Definitions:**
- **Weekend**: Friday, Saturday, Sunday
- **Weekday**: Monday, Tuesday, Wednesday, Thursday

## 🏗️ Architecture

### Backend: Serverless (Vercel Functions + Supabase)

```
┌─────────────────┐
│   Frontend      │
│  (HTML/JS/CSS)  │
└────────┬────────┘
         │
         ├─────────────────────┐
         │                     │
         ▼                     ▼
┌─────────────────┐   ┌──────────────────┐
│ Vercel Functions│   │   Supabase DB    │
│                 │   │                  │
│ - pricing/      │◄──┤ - bookings       │
│ - availability/ │   │ - blocked_dates  │
│ - booking/      │   │                  │
│ - payment/      │   └──────────────────┘
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Stripe API     │
│  (Payments)     │
└─────────────────┘
```

### Database Schema

**bookings table:**
- `booking_date` (UNIQUE) - Prevents double booking
- `status` - 'pending', 'confirmed', 'cancelled'
- `pricing_tier` - Calculated tier
- `total_price` - Final price
- Customer info, payment info, etc.

**blocked_dates table:**
- `blocked_date` (UNIQUE) - Date to block
- `reason` - Why it's blocked

## 📁 File Structure

```
Stone House Venue Site - Plugin Development/
├── api/                            # Serverless functions
│   ├── pricing/
│   │   └── calculate.js            ✅ Calculate booking price
│   └── availability/
│       └── check.js                ✅ Check date availability
│
├── src/
│   └── js/
│       └── pricing-engine.js       ✅ Core pricing logic
│
├── pages/                          # HTML pages (to be created)
│   ├── book-online.html           ⏳ Main booking interface
│   └── booking-confirmation.html  ⏳ Confirmation page
│
├── .env.example                    ✅ Environment template
├── .env.local                      ⚠️ Your credentials (create this)
├── vercel.json                     ✅ Vercel configuration
├── SUPABASE_SETUP.md              ✅ Database setup guide
└── BOOKING_SYSTEM_README.md       ✅ This file
```

Legend: ✅ Complete | ⏳ To Do | ⚠️ Action Required

## 🔜 Next Steps - Phase 2

1. **Create Booking Page UI**
   - Build `pages/book-online.html`
   - Integrate Flatpickr calendar
   - Add floor selector component
   - Display pricing dynamically

2. **Frontend JavaScript Modules**
   - `availability-calendar.js` - Calendar with availability
   - `floor-selector.js` - Space selection UI
   - `booking-system.js` - Main orchestrator

3. **Styling**
   - Add booking-specific CSS to `src/css/styles.css`
   - Match existing design system
   - Mobile-responsive layouts

## 🧪 Testing the Pricing Engine

You can test the pricing engine directly in Node.js or browser console:

```javascript
// In Node.js
const PricingEngine = require('./src/js/pricing-engine');

// Test Peak Weekend (Fall, Saturday)
const date1 = new Date('2026-10-10'); // Oct 10, 2026 (Saturday in Fall)
const result1 = PricingEngine.calculatePrice(date1, 'full_day', true);
console.log(result1);
// Expected: { success: true, price: 9000, tier: 'peak_weekend' }

// Test Off-Peak Weekday (Summer, Monday)
const date2 = new Date('2026-06-15'); // Jun 15, 2026 (Monday in Summer)
const result2 = PricingEngine.calculatePrice(date2, 'half_day', false, ['parlour', 'great-hall']);
console.log(result2);
// Expected: { success: true, price: 5000, tier: 'off_peak_weekday', breakdown: { pricePerFloor: 2500, floorCount: 2 } }
```

## 🔐 Security

- ✅ Environment variables protected by `.gitignore`
- ✅ Supabase Row Level Security policies
- ✅ CORS headers on API endpoints
- ✅ Input validation on all endpoints
- ⏳ Stripe webhook signature verification (Phase 4)
- ⏳ Rate limiting (Phase 5)

## 💰 Cost Estimates

### Development (Free Tier):
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Vercel**: Free (100GB bandwidth, serverless functions)
- **Stripe**: Free (test mode)
- **Resend**: Free tier available

### Production (Estimated):
- **Supabase**: $0-$25/month
- **Vercel**: $0-$20/month
- **Stripe**: 2.9% + $0.30 per transaction
- **Resend**: $20/month (50k emails)

**Total**: ~$20-65/month + transaction fees

## 🐛 Troubleshooting

### API returns 500 error
- Check that `.env.local` file exists and has correct credentials
- Verify Supabase database tables are created
- Check console logs for detailed error messages

### Pricing calculation returns error
- Ensure date is in correct format (ISO: YYYY-MM-DD)
- Verify bookingType is either 'full_day' or 'half_day'
- Check that selectedFloors is an array

### Database connection fails
- Verify SUPABASE_URL and SUPABASE_SERVICE_KEY in `.env.local`
- Check that Supabase project is active
- Ensure you're using the SERVICE_KEY, not the ANON_KEY for API calls

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Stripe Payment Intents](https://stripe.com/docs/payments/payment-intents)
- [Flatpickr Documentation](https://flatpickr.js.org/)

## 🤝 Contributing

This is a development clone specifically for the booking plugin. The main site is in the parent directory: `../Stone House Venue Site`

## 📞 Support

For issues with the booking system:
1. Check this README
2. Review [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
3. Check API endpoint logs
4. Verify environment variables

---

**Status**: Phase 1 Complete ✅ | Backend Foundation Ready
**Next**: Phase 2 - Frontend UI Development
