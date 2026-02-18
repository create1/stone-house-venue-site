# 🚀 Wedding Cart Deployment Guide

Complete guide to deploy your wedding shopping cart as a live website.

---

## 📋 Pre-Deployment Checklist

Before deploying, you need to set up these services:

### 1. ✅ Supabase Account (Database)
- [ ] Create account at https://supabase.com
- [ ] Create new project
- [ ] Run the database migration
- [ ] Get your API credentials

### 2. ✅ Resend Account (Email)
- [ ] Create account at https://resend.com
- [ ] Verify your domain (or use sandbox for testing)
- [ ] Get your API key

### 3. ✅ Vercel Account (Hosting)
- [ ] Create account at https://vercel.com
- [ ] Link to your GitHub repository

---

## 🗄️ Step 1: Set Up Supabase Database

### Create Your Project

1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in details:
   - **Name:** `stonehouse-wedding-cart`
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to you
4. Click **"Create new project"** (takes ~2 minutes)

### Run the Database Migration

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the contents of `database/migrations/create_wedding_quotes_table.sql`
4. Paste into the SQL editor
5. Click **"Run"** (bottom right)
6. You should see: "Success. No rows returned"

### Get Your API Credentials

1. In Supabase Dashboard, go to **Settings** > **API**
2. Copy these values (you'll need them later):
   - **Project URL:** `https://xxxxx.supabase.co`
   - **Project API Key (anon/public):** `eyJhbGc...`

---

## 📧 Step 2: Set Up Resend Email

### Create Your Account

1. Go to https://resend.com
2. Sign up with email
3. Verify your email address

### Get Your API Key

1. In Resend Dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Name it: `Wedding Cart Production`
4. Copy the key (starts with `re_...`)
5. **Save it securely** (you can't see it again!)

### Domain Setup (Optional for Now)

For testing, you can use Resend's sandbox:
- **From Email:** `onboarding@resend.dev`
- **Limitations:** Only sends to your verified email

For production:
1. Go to **Domains** > **Add Domain**
2. Enter your domain: `stonehouse.io`
3. Add the DNS records they provide
4. Wait for verification (usually 5-30 minutes)

---

## 🌐 Step 3: Deploy to Vercel

### Option A: Deploy via CLI (Fastest)

```bash
# Make sure you're in the project directory
cd "/Users/jonathanrowe/Code Projects/Stone House Venue Site - Plugin Development"

# Login to Vercel (opens browser)
vercel login

# Deploy to production
vercel --prod
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? (Select your account)
- Link to existing project? **N**
- What's your project's name? `stonehouse-wedding-cart`
- In which directory is your code located? `./` (press Enter)
- Want to modify settings? **N**

### Option B: Deploy via GitHub (Recommended for Teams)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repo: `create1/stone-house-venue-site`
4. Configure project:
   - **Project Name:** `stonehouse-wedding-cart`
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click **"Deploy"** (don't worry about env vars yet)

---

## 🔐 Step 4: Configure Environment Variables

After your first deployment, add environment variables:

### In Vercel Dashboard

1. Go to your project: https://vercel.com/dashboard
2. Click on your project: `stonehouse-wedding-cart`
3. Go to **Settings** > **Environment Variables**
4. Add these variables one by one:

#### Required Variables

| Variable | Value | Example |
|----------|-------|---------|
| `SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbGciOiJIUzI1NiIsInR5cCI6...` |
| `RESEND_API_KEY` | Your Resend API key | `re_123456789...` |
| `ADMIN_EMAIL` | Your venue email | `bookings@stonehouse.io` |
| `FROM_EMAIL` | Email to send from | `bookings@stonehouse.io` |

#### Optional Variables

| Variable | Value | Default |
|----------|-------|---------|
| `VENUE_NAME` | Your venue name | `Stone House Venue` |
| `VENUE_CITY` | City for tax calculation | `unincorporated` |
| `SALES_TAX_RATE` | Tax rate as decimal | `0.0775` |
| `SERVICE_FEE_RATE` | Service fee as decimal | `0.20` |
| `FULL_PACKAGE_DISCOUNT` | Discount as decimal | `0.10` |
| `MIN_BOOKING_DAYS` | Minimum days advance | `90` |

### Apply the Changes

After adding all variables:
1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"**
5. Click **"Redeploy"**

---

## ✅ Step 5: Test Your Deployment

### 1. Access Your Site

Your site is now live at:
```
https://stonehouse-wedding-cart.vercel.app
```

Or your custom domain if you set one up:
```
https://weddings.stonehouse.io
```

### 2. Test the Wedding Cart

Go to: `https://your-domain.vercel.app/pages/wedding-cart.html`

**Quick Test:**
1. Select a date (90+ days from today)
2. Move guest count slider to 150
3. Select "Premium Event Cap" venue
4. Choose 2 proteins
5. Select a beverage package
6. Add 3+ add-ons to trigger full package discount
7. Fill out contact form
8. Submit quote

### 3. Check Database

1. Go to Supabase Dashboard
2. Navigate to **Table Editor**
3. Select `wedding_quotes` table
4. You should see your test quote!

### 4. Check Email

1. Check your email (the one you used in the contact form)
2. You should receive a quote confirmation
3. Check admin email for notification

---

## 🎨 Step 6: Custom Domain (Optional)

### Add Your Domain in Vercel

1. In Vercel Dashboard, go to your project
2. Go to **Settings** > **Domains**
3. Click **"Add"**
4. Enter your domain: `weddings.stonehouse.io`
5. Follow the DNS instructions

### Update DNS Records

Add these records in your domain registrar:

**For subdomain (weddings.stonehouse.io):**
```
Type: CNAME
Name: weddings
Value: cname.vercel-dns.com
```

**For root domain (stonehouse.io):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**Wait 5-30 minutes for DNS propagation.**

---

## 🔧 Troubleshooting

### Issue: Quote Submission Fails

**Check:**
1. Environment variables are set correctly in Vercel
2. Supabase table exists (check SQL Editor)
3. Browser console for error messages (F12)
4. Vercel Functions logs: **Deployments** > **Functions**

**Common Fixes:**
```bash
# Verify environment variables
vercel env ls

# Check function logs
vercel logs --follow
```

### Issue: Email Not Sending

**Check:**
1. Resend API key is correct
2. `FROM_EMAIL` matches verified domain
3. Check Resend Dashboard > Logs

**For Testing:**
- Use `onboarding@resend.dev` as `FROM_EMAIL`
- Only sends to verified email addresses

### Issue: Tax Not Calculating

**Check:**
1. `VENUE_CITY` matches a value in pricing config
2. `SALES_TAX_RATE` is set correctly
3. Check browser console for calculation errors

### Issue: Prices Look Wrong

**Check:**
1. Dates are not in the past
2. Guest count is within min/max (20-500)
3. Clear browser cache and reload
4. Check `src/js/wedding-pricing-config.js` for rates

---

## 📊 Monitoring & Analytics

### View Quote Submissions

**In Supabase:**
1. Go to **Table Editor** > `wedding_quotes`
2. Filter by date, status, etc.
3. Export to CSV for analysis

### Track Errors

**In Vercel:**
1. Go to **Deployments** tab
2. Click on latest deployment
3. Go to **Functions** tab
4. View real-time logs

### Add Analytics (Optional)

Add Google Analytics to `pages/wedding-cart.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 Continuous Deployment

Now that you're connected to GitHub, every time you push to `main`:

```bash
git add .
git commit -m "Update pricing"
git push origin main
```

Vercel will automatically:
1. Detect the change
2. Build and deploy
3. Your site updates in ~30 seconds!

---

## 💰 Cost Breakdown

### Free Tier Limits

**Vercel (Free):**
- ✅ 100 GB bandwidth/month
- ✅ 100 GB-hours compute/month
- ✅ Custom domains
- ✅ Automatic HTTPS

**Supabase (Free):**
- ✅ 500 MB database
- ✅ 50,000 monthly active users
- ✅ 2 GB file storage
- ✅ Unlimited API requests

**Resend (Free):**
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ 1 verified domain

**Total Cost:** $0/month for small to medium traffic! 🎉

### Paid Plans (If You Outgrow Free Tier)

- **Vercel Pro:** $20/month
- **Supabase Pro:** $25/month
- **Resend Pro:** $20/month

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** - Run through full quote flow
2. **Customize branding** - Update colors, logos, text
3. **Adjust pricing** - Modify `src/js/wedding-pricing-config.js`
4. **Add custom domain** - Use your actual domain
5. **Link from main site** - Add prominent CTA buttons
6. **Monitor submissions** - Check Supabase daily
7. **Respond to inquiries** - Check admin email regularly

---

## 📞 Support Resources

### Documentation
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Resend Docs:** https://resend.com/docs

### Community
- **Vercel Discord:** https://vercel.com/discord
- **Supabase Discord:** https://discord.supabase.com

### Your Documentation
- `START_HERE.md` - Quick setup
- `WEDDING_CART_README.md` - Full system docs
- `WEDDING_CART_TESTING.md` - Testing guide

---

## 🎊 You're Live!

Once deployed, share your cart:

- **Main Cart:** `https://your-domain.vercel.app/pages/wedding-cart.html`
- **Weddings Page:** `https://your-domain.vercel.app/pages/weddings.html`

Congratulations on launching your wedding shopping cart! 🥂
