# Wedding Cart Setup Guide

## Complete Installation Instructions

### Prerequisites

- Node.js 16+ installed
- Supabase account (free tier works)
- Resend account for email (free tier: 3000 emails/month)
- Git installed

---

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd "/Users/jonathanrowe/Code Projects/Stone House Venue Site - Plugin Development"
npm install
```

This installs:
- `@supabase/supabase-js` - Database client
- `resend` - Email service
- `flatpickr` - Date picker
- `date-fns` - Date utilities

### 2. Configure Supabase

#### A. Create Database Table

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create new one)
3. Go to SQL Editor
4. Copy contents from `database/migrations/create_wedding_quotes_table.sql`
5. Run the SQL script
6. Verify table created in Table Editor

#### B. Get API Credentials

1. Go to Project Settings → API
2. Copy these values:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - `anon` `public` key
   - `service_role` `secret` key

### 3. Configure Resend (Email Service)

1. Go to [Resend](https://resend.com)
2. Sign up / log in
3. Go to API Keys
4. Create new API key
5. Copy the key (starts with `re_...`)

**Configure Domain (Optional but Recommended):**
1. Go to Domains
2. Add `stonehouse.io` (or your domain)
3. Add DNS records as instructed
4. Verify domain

### 4. Set Up Environment Variables

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here

# Resend Email
RESEND_API_KEY=re_your_api_key_here

# Admin
ADMIN_EMAIL=bookings@stonehouse.io
ADMIN_PANEL_URL=https://yourdomain.com/admin

# Venue Configuration
VENUE_CITY=nevada-city
SALES_TAX_RATE=0.08875

# Application
APP_URL=http://localhost:8080
NODE_ENV=development
```

### 5. Start Development Server

```bash
npm run dev
```

Server starts at: `http://localhost:8080`

### 6. Test the Cart

Visit: `http://localhost:8080/pages/wedding-cart.html`

**Test Flow:**
1. Select a date (90+ days in future)
2. Adjust guest count with slider
3. Select a venue type
4. Choose 2 proteins
5. Add beverage package
6. Add some add-ons
7. Proceed to review
8. Fill out contact form
9. Submit quote

**Check:**
- Email sent to customer? (check Resend dashboard)
- Email sent to admin?
- Quote stored in database? (check Supabase table editor)

---

## Vercel Deployment

### Initial Deploy

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

Follow prompts:
- Link to existing project or create new
- Set project name: `stone-house-venue`
- Keep default settings

### Configure Environment Variables

1. Go to Vercel Dashboard → Your Project
2. Go to Settings → Environment Variables
3. Add each variable from `.env.local`:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`
   - `VENUE_CITY`
   - `SALES_TAX_RATE`
   - etc.

4. **Important:** Select environment:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

### Deploy to Production

```bash
vercel --prod
```

Your wedding cart will be live at: `https://stone-house-venue.vercel.app/pages/wedding-cart.html`

### Custom Domain (Optional)

1. In Vercel Dashboard → Domains
2. Add `weddings.stonehouse.io` (or your domain)
3. Update DNS as instructed
4. SSL automatically configured

---

## Email Configuration

### Resend Setup

**From Address Options:**

1. **Using Resend Domain (Quick Start):**
   - From: `weddings@resend.dev`
   - Works immediately, no configuration needed
   - Limited to 100 emails/day

2. **Using Your Domain (Recommended):**
   - From: `weddings@stonehouse.io`
   - Add domain in Resend dashboard
   - Add DNS records (SPF, DKIM, DMARC)
   - Verify domain
   - Unlimited emails (up to plan limit)

### Email Templates

Edit email HTML in `api/wedding/quote.js`:
- `generateCustomerEmailHTML()` - Customer confirmation
- `sendAdminNotification()` - Admin alert

---

## Database Configuration

### Row Level Security (RLS)

For production, enable RLS on `wedding_quotes` table:

```sql
-- Enable RLS
ALTER TABLE wedding_quotes ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service role has full access"
  ON wedding_quotes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public inserts only (for quote submission)
CREATE POLICY "Public can insert quotes"
  ON wedding_quotes
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Deny public reads (quotes are private)
-- Admins use service_role key to read
```

### Backup Strategy

**Automatic Backups:**
- Supabase Pro plan includes daily backups
- Free tier: manual backups recommended

**Manual Backup:**
```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or from Supabase dashboard
# Database → Backups → Download
```

---

## Monitoring & Analytics

### Track Quote Submissions

**Metrics to Monitor:**
- Total quotes submitted (daily/weekly)
- Average quote value
- Full package conversion rate
- Most popular dates
- Most popular protein combinations

**Example Queries:**

```sql
-- Daily quote count
SELECT 
  DATE(created_at) as date,
  COUNT(*) as quotes,
  AVG(grand_total) as avg_total
FROM wedding_quotes
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Most popular proteins
SELECT 
  catering_protein1,
  catering_protein2,
  COUNT(*) as count
FROM wedding_quotes
GROUP BY catering_protein1, catering_protein2
ORDER BY count DESC;

-- Full package rate
SELECT 
  COUNT(*) FILTER (WHERE full_package_eligible) as full_package_count,
  COUNT(*) as total_count,
  ROUND(COUNT(*) FILTER (WHERE full_package_eligible)::NUMERIC / COUNT(*) * 100, 2) as full_package_rate
FROM wedding_quotes;
```

### Error Logging

Add logging service (optional):
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

---

## Security Best Practices

### Environment Variables

✅ **DO:**
- Store secrets in `.env.local`
- Use Vercel environment variables in production
- Use different keys for development/production
- Rotate API keys periodically

❌ **DON'T:**
- Commit `.env.local` to git
- Hardcode API keys in code
- Share API keys in public repos
- Use production keys in development

### Price Validation

The system validates prices server-side:
- Client sends calculated quote
- Server recalculates from scratch
- Compares totals (allows $1 rounding difference)
- Uses server calculation for database
- Prevents price manipulation via browser dev tools

### Input Validation

All user inputs are validated:
- Date: Must be future, 90+ days advance
- Guest count: 20-500 range
- Email: Format validation
- Phone: Required field
- Proteins: Exactly 2 required

---

## Maintenance

### Update Pricing

When prices change:

1. Edit `src/js/wedding-pricing-config.js`
2. Update relevant prices
3. Commit and deploy
4. Consider backward compatibility for pending quotes

**Example: Increase steak price to $110:**

```javascript
{
  id: 'steak',
  name: 'Steak',
  pricePerPerson: 110, // was 100
  // ...
}
```

### Update Tax Rate

If Nevada County tax rate changes:

1. Update `.env.local` (development)
2. Update Vercel environment variables (production)
3. Update `wedding-pricing-config.js` if needed
4. Redeploy

### Seasonal Updates

**Before each season:**
- Review and update venue pricing if needed
- Check tax rates haven't changed
- Review catering prices with kitchen
- Update floral package availability

---

## FAQ

**Q: Can customers pay directly through the cart?**
A: Not in Phase 1. This is a quote system. Payment integration is Phase 3.

**Q: How are quotes stored?**
A: In Supabase (PostgreSQL) with full JSONB cart state for reference.

**Q: Can I change the 2-protein requirement?**
A: Yes, edit the validation in `wedding-cart.js` and `wedding-pricing-config.js`. Update `mustSelectTwo: false` to allow different quantities.

**Q: What if I need to add venue locations?**
A: Add new entries in `VENUE_PRICING_CONFIG.venue.options` and corresponding HTML in `wedding-cart.html`.

**Q: How do I handle blocked dates?**
A: Add to Flatpickr `disable` array. In future, fetch from database.

**Q: Can I offer promotional codes?**
A: Not in Phase 1. Add discount code field in Phase 2.

---

## Quick Reference

### File Locations

| Component | File Path |
|-----------|-----------|
| Main cart page | `pages/wedding-cart.html` |
| Cart JavaScript | `src/js/wedding-cart.js` |
| Cart styles | `src/css/wedding-cart.css` |
| Pricing config | `src/js/wedding-pricing-config.js` |
| Calculator | `src/js/wedding-calculator.js` |
| API endpoint | `api/wedding/quote.js` |
| Database schema | `database/migrations/create_wedding_quotes_table.sql` |

### Important Variables

| Variable | Default | Location |
|----------|---------|----------|
| Min guest count | 20 | `wedding-pricing-config.js` |
| Max guest count | 500 | `wedding-pricing-config.js` |
| Min booking days | 90 | `.env.local` |
| Service fee | 20% | `.env.local` |
| Tax rate | 7.75% | `.env.local` |
| Full package discount | 10% | `.env.local` |

### Price Ranges

| Item | Min | Max |
|------|-----|-----|
| Venue | $150/hr | $10,000 flat |
| Catering | $70/person | $100/person |
| Beverages | $45/person | $65/person |
| Floral | $1,500 | $10,000 |
| Services | $2,500 each | - |

---

## Version History

- **v1.0** (Jan 30, 2026) - Initial release
  - Multi-step wizard
  - Real-time pricing
  - Tax calculations
  - Quote submission
  - Email notifications

---

## Credits

**Developed for:** Stone House Venue, Nevada City, CA  
**Date:** January 2026  
**Framework:** Vanilla JavaScript (ES6 modules)  
**Database:** Supabase (PostgreSQL)  
**Email:** Resend  
**Hosting:** Vercel

---

## Need Help?

📧 **Email:** bookings@stonehouse.io  
📱 **Phone:** (530) 265-5050  
🌐 **Website:** stonehouse.io

**For developers:**  
See full technical specification in `WEDDING_CART_SPEC.md`
