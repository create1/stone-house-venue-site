# Wedding Cart - Quick Installation Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (1 minute)

```bash
npm install
```

### Step 2: Set Up Database (2 minutes)

1. Go to [Supabase](https://app.supabase.com)
2. Create new project (or use existing)
3. Go to SQL Editor
4. Copy/paste contents from: `database/migrations/create_wedding_quotes_table.sql`
5. Click "Run"

### Step 3: Configure Environment (1 minute)

```bash
cp .env.example .env.local
```

Edit `.env.local` - add your credentials:

```bash
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_anon_key_here
RESEND_API_KEY=re_your_resend_key_here
ADMIN_EMAIL=bookings@stonehouse.io
```

**Get Supabase keys:**
- Project Settings → API → Copy URL and anon key

**Get Resend key:**
- Sign up at [resend.com](https://resend.com)
- API Keys → Create API Key

### Step 4: Start Server (1 minute)

```bash
npm run dev
```

### Step 5: Test (1 minute)

Visit: `http://localhost:8080/pages/wedding-cart.html`

1. Pick a date
2. Slide guest count
3. Select Premium Event Cap
4. Pick 2 proteins (Chicken + Fish)
5. Select Premium Liquor bar
6. Add Elegant floral + Photography + DJ
7. See "Full Package Discount" trigger!
8. Review and submit

---

## ✅ That's It!

Your wedding shopping cart is now running with:
- ✨ Interactive sliders and buttons
- 💰 Real-time pricing calculations
- 📊 Nevada County CA tax (7.75%)
- 🎁 10% full package discounts
- 📧 Email notifications
- 💾 Database storage

---

## 🎯 What You Get

### For Customers
- Beautiful multi-step interface
- Real-time price updates
- Clear breakdown of all costs
- Instant quote confirmation

### For You (Venue Owner)
- Automated quote generation
- Email notifications for new quotes
- Database of all inquiries
- Pre-qualified leads with budgets

---

## 📊 Sample Quote

**150 guests, Peak Saturday, Full Package:**

```
Venue (Premium Event Cap)           $10,000
Catering (Chicken + Fish @ $85/pp)  $17,850
Premium Liquor Bar ($65/pp)          $9,750
Service Fee (20%)                    $5,520
Elegant Floral                       $5,000
Photography                          $3,500
DJ Service                           $2,500
──────────────────────────────────────────
Subtotal                            $54,120
Sales Tax (7.75%)                    $3,923
Full Package Discount (10%)         -$5,804
══════════════════════════════════════════
TOTAL                               $52,239
```

**Customer saves $8,304** (Free planner + discount)!

---

## 🔧 Customization

### Change Tax Rate (Grass Valley = 8.875%)

```bash
# In .env.local
VENUE_CITY=grass-valley
SALES_TAX_RATE=0.08875
```

### Change Minimum Guest Count to 30

```javascript
// In wedding-pricing-config.js
constraints: {
  guestCount: {
    minimum: 30, // was 20
    // ...
  }
}
```

### Add 4th Protein Option (Lamb @ $110)

```javascript
// In wedding-pricing-config.js
proteins: [
  // ... existing
  {
    id: 'lamb',
    name: 'Lamb',
    pricePerPerson: 110,
    description: 'Herb-crusted lamb',
    image: '../src/images/food/lamb.avif'
  }
]
```

Then add HTML card in `wedding-cart.html`:

```html
<div class="protein-card" data-protein="lamb">
  <img src="../src/images/food/lamb.avif" alt="Lamb">
  <div class="protein-content">
    <h3>Lamb</h3>
    <div class="protein-price">$110<span>/person</span></div>
    <p class="protein-description">Herb-crusted lamb</p>
    <p class="includes-note">Includes salad & dessert</p>
  </div>
  <div class="selection-indicator">
    <i class="fas fa-check"></i>
  </div>
</div>
```

---

## 🐛 Troubleshooting

### "Module not found" error

**Fix:** Make sure all JavaScript files use `.js` extension in imports:

```javascript
// Correct
import { WeddingCalculator } from './wedding-calculator.js';

// Incorrect  
import { WeddingCalculator } from './wedding-calculator';
```

### Prices showing $0.00

**Check:**
1. Date selected? (required for venue pricing)
2. Venue type selected?
3. Proteins selected? (required for catering)
4. Browser console for errors

### Email not sending

**Check:**
1. `RESEND_API_KEY` in `.env.local`
2. Resend dashboard for errors
3. "From" address is verified domain or use `@resend.dev`

---

## 📱 Mobile Testing

Test on mobile devices:
- Sliders should have larger touch targets
- Price summary becomes bottom bar
- Tap to expand full breakdown
- All buttons are 44x44px minimum

---

## 🎨 Brand Customization

### Change Colors

Edit `wedding-cart.css`:

```css
:root {
  --cart-primary: #D4AF37;    /* Change to your brand gold */
  --cart-secondary: #8B4053;  /* Change to your brand color */
  --cart-success: #27AE60;
}
```

### Change Fonts

Edit `wedding-cart.html` and `wedding-cart.css`:

```html
<!-- Use your brand fonts -->
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

```css
.cart-step h2 {
  font-family: 'YourFont', serif;
}
```

---

## 📈 Next Steps

After installation:

1. ✅ Test complete user flow
2. ✅ Send test quote to yourself
3. ✅ Check email delivery
4. ✅ Verify database storage
5. ✅ Test on mobile device
6. ✅ Customize colors/branding
7. ✅ Add to main navigation
8. ✅ Deploy to production
9. ✅ Monitor first real quotes
10. ✅ Gather customer feedback

---

## 🎉 You're Ready!

The wedding shopping cart is fully functional and ready to accept quotes!

**Access it at:**
- Development: `http://localhost:8080/pages/wedding-cart.html`
- Production: `https://yourdomain.com/pages/wedding-cart.html`

**View quotes in:**
- Supabase Dashboard → Table Editor → `wedding_quotes`

**Monitor emails in:**
- Resend Dashboard → Logs

---

**Questions?** See `WEDDING_CART_README.md` for detailed documentation.
