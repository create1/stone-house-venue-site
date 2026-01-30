# Wedding Shopping Cart System

## Overview

Complete wedding package builder with interactive sliders, real-time pricing calculations, and Nevada County, CA sales tax integration.

## Features

✅ **Multi-Step Wizard Interface**
- 5-step guided experience
- Progress indicator
- Form validation at each step

✅ **Dynamic Pricing Engine**
- Seasonal pricing (Off-Peak, Shoulder, Peak)
- Day-of-week variations
- Hourly vs flat-rate venue options

✅ **Interactive Controls**
- Guest count slider (20-500 guests)
- Duration slider for hourly rentals
- Large toggle buttons for all selections
- Real-time price updates

✅ **Catering System**
- Tiered protein pricing: $70 (Vegetarian) → $100 (Steak)
- Must select exactly 2 proteins
- Average pricing calculation
- All meals include salad & dessert
- Optional sides ($8/person) and appetizers ($6/person)

✅ **Tax Calculations**
- Nevada County, CA sales tax (7.75% - 9%)
- Automatic taxable/non-taxable categorization
- Compliant with California tax law

✅ **Full Package Discounts**
- 10% off when conditions met
- FREE wedding planner service
- Visual savings display

✅ **Quote Management**
- Database storage with Supabase
- Email notifications (customer + admin)
- PDF quote generation (future)

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Supabase URL and keys
- Resend API key for emails
- Admin email address
- Venue city (for tax rate)

### 3. Set Up Database

Run the migration script in your Supabase SQL editor:

```bash
# Copy contents from:
database/migrations/create_wedding_quotes_table.sql
```

Or use Supabase CLI:

```bash
supabase migration create wedding_quotes
# Paste SQL content
supabase db push
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:8080/pages/wedding-cart.html`

---

## File Structure

```
wedding-cart/
├── pages/
│   └── wedding-cart.html          Main shopping cart page
│
├── src/
│   ├── css/
│   │   └── wedding-cart.css       Cart-specific styles
│   │
│   └── js/
│       ├── wedding-pricing-config.js    Pricing configuration
│       ├── wedding-calculator.js         Client-side calculator
│       ├── wedding-calculator-node.js    Server-side calculator
│       └── wedding-cart.js              Main cart controller
│
├── api/
│   └── wedding/
│       └── quote.js                 Quote submission endpoint
│
├── database/
│   └── migrations/
│       └── create_wedding_quotes_table.sql
│
└── docs/
    ├── WEDDING_CART_SPEC.md         Full technical specification
    ├── WEDDING_CART_UI_CONTROLS.md  UI component details
    ├── TAX_CALCULATION_GUIDE.md     Tax calculation guide
    └── WEDDING_CART_SUMMARY.md      Executive summary
```

---

## Usage Guide

### For Customers

1. **Select Date & Venue**
   - Choose wedding date using calendar
   - Adjust guest count with slider
   - Select venue type (see pricing update in real-time)

2. **Configure Catering**
   - Select exactly 2 protein options
   - System averages the prices
   - Optionally add sides and appetizers

3. **Choose Beverages**
   - Select bar package (or skip)
   - 20% service fee automatically added

4. **Add Services**
   - Select floral package
   - Toggle photography, planner, DJ
   - Watch for "Full Package Discount" notification

5. **Review & Submit**
   - Review complete itemized breakdown
   - Enter contact information
   - Submit quote request
   - Receive confirmation email

### For Administrators

**Access Quotes:**
```sql
-- View all pending quotes
SELECT * FROM wedding_quotes 
WHERE status = 'pending' 
ORDER BY created_at DESC;

-- View quotes for specific date
SELECT * FROM wedding_quotes 
WHERE event_date = '2026-06-15';

-- Get quotes by customer
SELECT * FROM wedding_quotes 
WHERE customer_email = 'customer@example.com';
```

**Update Quote Status:**
```sql
UPDATE wedding_quotes 
SET status = 'contacted', 
    followed_up_at = NOW(),
    admin_notes = 'Called customer, tour scheduled'
WHERE quote_number = 'WQ-1738254321-ABC123';
```

**Generate Reports:**
```sql
-- Monthly summary
SELECT 
  DATE_TRUNC('month', event_date) as month,
  COUNT(*) as quote_count,
  SUM(grand_total) as total_value,
  AVG(grand_total) as avg_value
FROM wedding_quotes
WHERE created_at >= NOW() - INTERVAL '6 months'
GROUP BY DATE_TRUNC('month', event_date)
ORDER BY month DESC;
```

---

## Configuration

### Pricing Configuration

Edit `src/js/wedding-pricing-config.js` to update:
- Venue rates (seasonal, day-of-week)
- Protein prices
- Beverage package prices
- Add-on service prices
- Tax rates by city

### Tax Configuration

Default tax rate: **7.75%** (Nevada County unincorporated)

To change venue location and tax rate, update `.env.local`:

```bash
# For Grass Valley location (8.875% tax)
VENUE_CITY=grass-valley
SALES_TAX_RATE=0.08875

# For Nevada City location (8.875% tax)
VENUE_CITY=nevada-city
SALES_TAX_RATE=0.08875

# For Truckee location (9% tax)
VENUE_CITY=truckee
SALES_TAX_RATE=0.09000
```

---

## API Endpoints

### POST /api/wedding/quote

Submit a wedding quote request.

**Request Body:**
```json
{
  "cart": {
    "venue": {
      "type": "premiumEventCap",
      "date": "2026-06-15",
      "hours": null
    },
    "guestCount": 150,
    "catering": {
      "protein1": "chicken",
      "protein2": "fish",
      "sides": ["garlic-mashed", "roasted-veg"],
      "appetizers": ["bruschetta", "shrimp", "sliders"]
    },
    "beverages": {
      "package": "premium-liquor"
    },
    "addOns": {
      "floral": "elegant",
      "photography": true,
      "weddingPlanner": true,
      "dj": true
    }
  },
  "contact": {
    "name": "John & Jane Doe",
    "email": "john@example.com",
    "phone": "(530) 555-1234",
    "message": "Excited to plan our wedding!",
    "preferredContact": "email"
  }
}
```

**Response:**
```json
{
  "success": true,
  "quoteNumber": "WQ-1738254321-ABC123",
  "quoteId": "uuid-here",
  "message": "Quote submitted successfully",
  "estimatedTotal": 51788.74
}
```

---

## Pricing Examples

### Example 1: Budget Wedding (Off-Peak)

**Configuration:**
- Monday, February 10, 2026 (Off-Peak)
- 75 guests
- Partial Building, 5 hours
- Vegetarian + Chicken ($75 avg)
- Beer & Wine bar ($45/person)
- No add-ons

**Estimated Total:** ~$12,500

### Example 2: Mid-Range Wedding (Shoulder)

**Configuration:**
- Friday, April 18, 2026 (Shoulder)
- 120 guests
- Full Building, 6 hours
- Chicken + Fish ($85 avg)
- Premium bar ($55/person)
- Classic floral, Photography

**Estimated Total:** ~$35,000

### Example 3: Premium Wedding with Full Package (Peak)

**Configuration:**
- Saturday, June 15, 2026 (Peak)
- 150 guests
- Premium Event Cap
- Fish + Steak ($95 avg)
- Premium Liquor bar ($65/person)
- Elegant floral, Photography, DJ
- **Qualifies for Full Package!**

**Estimated Total:** ~$52,000
**Savings:** ~$8,500 (Free planner + 10% discount)

---

## Customization

### Add New Protein Option

Edit `wedding-pricing-config.js`:

```javascript
catering: {
  proteins: [
    // ... existing proteins
    {
      id: 'lamb',
      name: 'Lamb',
      pricePerPerson: 110,
      description: 'Herb-crusted lamb',
      examples: ['Rack of Lamb', 'Lamb Chops'],
      image: '../src/images/food/lamb.avif'
    }
  ]
}
```

### Add New Floral Package

```javascript
addOns: {
  floral: {
    packages: [
      // ... existing packages
      {
        id: 'premium-plus',
        name: 'Premium Plus',
        price: 15000,
        includes: [
          'Everything in Luxury',
          'Custom installations',
          'Rare exotic flowers'
        ]
      }
    ]
  }
}
```

### Change Service Fee Rate

Update `.env.local`:
```bash
SERVICE_FEE_RATE=0.25  # Change to 25%
```

---

## Testing

### Manual Testing Checklist

- [ ] Date picker shows correct seasonal pricing
- [ ] Guest count slider updates all per-person calculations
- [ ] Can select exactly 2 proteins (not more, not less)
- [ ] Sides and appetizers toggles work
- [ ] Beverage packages select correctly
- [ ] Add-on services toggle on/off
- [ ] Full package discount triggers correctly
- [ ] Tax calculates on taxable items only
- [ ] Price summary updates in real-time
- [ ] Mobile responsive design works
- [ ] Quote submission succeeds
- [ ] Email notifications sent

### Test Data

Use these test configurations:

**Minimum Valid Quote:**
```javascript
{
  venue: { type: 'singleRoom', date: new Date('2026-06-01'), hours: 3 },
  guestCount: 50,
  catering: { protein1: 'vegetarian', protein2: 'chicken' },
  beverages: { package: null },
  addOns: { floral: null, photography: false, weddingPlanner: false, dj: false }
}
```

**Full Package Test:**
```javascript
{
  venue: { type: 'premiumEventCap', date: new Date('2026-06-15'), hours: null },
  guestCount: 150,
  catering: { protein1: 'chicken', protein2: 'fish' },
  beverages: { package: 'premium-liquor' },
  addOns: { floral: 'elegant', photography: true, weddingPlanner: true, dj: true }
}
```

---

## Troubleshooting

### Issue: Prices not updating

**Solution:**
- Check browser console for JavaScript errors
- Verify `wedding-cart.js` is loading as module
- Ensure all import paths are correct

### Issue: Date picker not working

**Solution:**
- Verify Flatpickr CDN is loading
- Check for JavaScript errors
- Ensure date input has correct ID

### Issue: Quote submission fails

**Solution:**
- Verify Supabase credentials in `.env.local`
- Check database table exists
- Verify API endpoint path in `wedding-cart.js`
- Check network tab for API response

### Issue: Tax calculation incorrect

**Solution:**
- Verify `VENUE_CITY` in `.env.local`
- Check tax rate in `wedding-pricing-config.js`
- Ensure server-side calculator matches client-side

### Issue: Full package discount not triggering

**Solution:**
- Must have Premium Event Cap venue
- Must have 2 proteins selected
- Must have beverage package
- Must have at least 3 of: floral, photography, DJ
- Wedding planner doesn't count toward the 3 add-ons

---

## Deployment

### Deploy to Vercel

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add wedding shopping cart system"
git push origin main
```

2. **Configure Vercel:**
- Import GitHub repository
- Add environment variables from `.env.example`
- Deploy!

3. **Set Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### Vercel Configuration

The `vercel.json` should already be configured. Verify it includes:

```json
{
  "rewrites": [
    { "source": "/api/wedding/quote", "destination": "/api/wedding/quote.js" }
  ]
}
```

---

## Email Templates

### Customer Confirmation Email

Located in: `api/wedding/quote.js` → `generateCustomerEmailHTML()`

Includes:
- Thank you message
- Quote number
- Itemized breakdown
- Next steps
- Contact information

### Admin Notification Email

Includes:
- Customer contact info
- Event details
- Quote value
- Link to admin panel

---

## Future Enhancements

### Phase 2 Features
- [ ] Save and resume cart functionality
- [ ] PDF quote download
- [ ] Comparison tool (side-by-side packages)
- [ ] Virtual venue tour integration
- [ ] Promotional code system

### Phase 3 Features
- [ ] Payment integration (deposits via Stripe)
- [ ] Digital contract signing
- [ ] Customer portal with quote history
- [ ] Admin dashboard with analytics
- [ ] Automated follow-up emails

---

## Support

### For Technical Issues

- Check documentation: `WEDDING_CART_SPEC.md`
- Review UI reference: `WEDDING_CART_UI_CONTROLS.md`
- Tax calculation guide: `TAX_CALCULATION_GUIDE.md`

### For Business Questions

- Review pricing: `wedding-pricing-config.js`
- Check tax rates: `TAX_CALCULATION_GUIDE.md`
- See examples: `WEDDING_CART_SUMMARY.md`

### Contact

- Email: dev@stonehouse.io
- Phone: (530) 265-5050

---

## License

Copyright © 2025 Stone House. All rights reserved.
