# Wedding Shopping Cart System - Executive Summary

**Project:** Stone House Venue Wedding Booking System  
**Date:** January 30, 2026  
**Location:** Nevada County, California

---

## Overview

This specification package defines a complete wedding sales shopping cart system for Stone House Venue, enabling couples to configure and price their entire wedding package online with real-time calculations including Nevada County, CA sales tax.

---

## Documentation Set

### 📋 WEDDING_CART_SPEC.md (Main Specification)
**Purpose:** Complete technical and functional requirements  
**Audience:** Project managers, developers, stakeholders

**Key Sections:**
- Event details configuration (date, guest count, venue selection)
- Catering system with tiered protein pricing
- Beverage packages
- Add-on services
- Pricing engine with tax calculations
- Data structures and API requirements
- Database schema
- Admin panel specifications

### 🎨 WEDDING_CART_UI_CONTROLS.md (UI/UX Reference)
**Purpose:** Detailed interface specifications for all interactive controls  
**Audience:** UI/UX designers, frontend developers

**Key Sections:**
- Slider implementations (guest count, duration)
- Button grids and toggle controls
- Visual states and animations
- Mobile responsiveness
- Accessibility features
- Code examples and styling

### 💰 TAX_CALCULATION_GUIDE.md (Tax Implementation)
**Purpose:** Nevada County sales tax calculation methodology  
**Audience:** Developers, accountants, compliance officers

**Key Sections:**
- Nevada County tax rates by city
- California taxability rules for wedding services
- Complete calculation algorithms
- Tax reporting requirements
- Compliance checklist

---

## System Capabilities

### Core Features

✅ **Dynamic Venue Pricing**
- 3 seasonal tiers (Off-Peak, Shoulder, Peak)
- 4 venue options (Single Room, Partial, Full Building, Premium Event Cap)
- Day-of-week pricing variations
- Hourly vs flat-rate options

✅ **Tiered Catering System**
- Choose 2 proteins from 4 options
- Pricing: $70 (Vegetarian) → $80 (Chicken) → $90 (Fish) → $100 (Steak)
- Includes house salad and seasonal dessert
- Average pricing calculation
- Optional sides ($8/person each)
- Optional passed appetizers ($6/person each)

✅ **Beverage Packages**
- Beer & Wine: $45/person
- Premium Beer, Wine & Liquor: $55/person
- Premium Liquor: $65/person
- Subject to 20% service fee

✅ **Add-On Services**
- Floral packages: $1,500 / $2,500 / $5,000 / $10,000
- Photography: $3,500 (tax-exempt)
- Wedding Planner: $2,500 (tax-exempt, FREE with full package)
- DJ: $2,500

✅ **Automated Calculations**
- 20% service fee on all food and beverage
- Nevada County sales tax (7.75% - 9% by location)
- 10% full package discount when eligible
- Real-time price updates

✅ **Interactive UI**
- Sliders for guest count and duration
- Large toggle buttons for all selections
- Visual feedback and animations
- Mobile-optimized touch controls

---

## Pricing Structure Summary

### Catering Pricing (Per Person)
| Protein | Price | Includes |
|---------|-------|----------|
| Vegetarian | $70 | Salad & Dessert |
| Chicken | $80 | Salad & Dessert |
| Fish | $90 | Salad & Dessert |
| Steak | $100 | Salad & Dessert |

**Note:** Customer selects 2, system averages the price

### Add-Ons Pricing
| Item | Price | Per Person | Taxable |
|------|-------|------------|---------|
| Additional Sides | $8 | Yes | Yes |
| Passed Appetizers | $6 | Yes | Yes |
| Beer & Wine Bar | $45 | Yes | Yes |
| Premium Bar | $55 | Yes | Yes |
| Premium Liquor Bar | $65 | Yes | Yes |
| Intimate Floral | $1,500 | No | Yes |
| Classic Floral | $2,500 | No | Yes |
| Elegant Floral | $5,000 | No | Yes |
| Luxury Floral | $10,000 | No | Yes |
| Photography | $3,500 | No | No |
| Wedding Planner | $2,500 / FREE | No | No |
| DJ Service | $2,500 | No | Yes |

### Fees & Discounts
| Fee/Discount | Rate | Applied To |
|--------------|------|------------|
| Service Fee | 20% | Food & Beverage only |
| Sales Tax | 7.75% - 9% | Taxable items (see tax guide) |
| Full Package Discount | 10% | Total (after tax) |

---

## Sample Quote Calculation

**Configuration:**
- 150 guests, Peak Saturday
- Premium Event Cap venue: $10,000
- Chicken + Fish catering: $85/person avg
- 2 sides, 3 appetizers
- Premium Liquor bar: $65/person
- Elegant floral, Photography, DJ
- Grass Valley location: 8.875% tax

**Total Breakdown:**
```
Venue                                $10,000.00
Catering (150 × $85 + sides + apps)  $17,850.00
Beverages (150 × $65)                 $9,750.00
Service Fee (20%)                     $5,520.00
Floral                                $5,000.00
Photography                           $3,500.00
DJ                                    $2,500.00
─────────────────────────────────────────────
Subtotal                             $54,120.00

Sales Tax (8.875% on $50,620)         $4,492.53
─────────────────────────────────────────────
Subtotal with Tax                    $58,612.53

Full Package Discount (10%)          -$5,861.25
─────────────────────────────────────────────
TOTAL                                $52,751.28
```

**Savings:** $8,361.25 (Free planner $2,500 + 10% discount $5,861.25)

---

## Full Package Benefits

### Qualification Requirements
1. ✅ Premium Event Cap venue
2. ✅ Full catering package (choice of 2 proteins)
3. ✅ Any beverage package
4. ✅ At least 3 add-ons from: Floral, Photography, DJ

### Benefits Received
- 🎁 Wedding Planner service included FREE (normally $2,500)
- 💰 10% discount on entire quote (after tax)
- ⭐ Priority booking status
- 📋 Comprehensive planning services

**Average Savings:** $5,000 - $10,000 depending on package size

---

## Technical Implementation

### Technology Stack
- **Frontend:** React/Vue.js with slider components
- **Backend:** Node.js API (Vercel Functions)
- **Database:** Supabase (PostgreSQL)
- **Email:** SendGrid
- **PDF:** jsPDF
- **Hosting:** Vercel

### Key Components
1. Multi-step wizard (5 steps)
2. Real-time price calculator
3. Sticky price summary sidebar
4. Date availability checker
5. Quote generation and email system
6. Admin panel for configuration
7. Analytics dashboard

### API Endpoints
- `POST /api/wedding-quote` - Submit quote
- `GET /api/pricing-config` - Get current pricing
- `GET /api/tax-rate` - Get tax rate by location
- `POST /api/check-availability` - Check date availability
- `POST /api/calculate-quote` - Real-time calculation

---

## User Experience Flow

```
1. EVENT DETAILS
   ├─ Select date (calendar picker)
   ├─ Set guest count (slider: 20-500)
   ├─ Choose venue type (button cards)
   └─ Set duration if hourly (slider: 3-12 hrs)
   
2. CATERING
   ├─ Select 2 proteins (toggle button grid)
   │   Vegetarian $70 → Chicken $80 → Fish $90 → Steak $100
   ├─ Add sides (optional toggle buttons)
   └─ Add appetizers (optional toggle buttons)
   
3. BEVERAGES
   └─ Select bar package (radio button cards)
       $45 → $55 → $65 per person
   
4. ADD-ONS
   ├─ Floral package (radio buttons: $1.5K - $10K)
   ├─ Photography toggle ($3,500)
   ├─ Wedding planner toggle ($2,500)
   └─ DJ toggle ($2,500)
   
5. REVIEW & QUOTE
   ├─ Complete breakdown with tax
   ├─ Full package discount applied if eligible
   ├─ Contact form
   └─ Submit quote request
```

---

## Key Business Rules

1. **Service Fee:** 20% on food and beverage only (not venue or add-ons)

2. **Sales Tax:** Applied to all items except photography and wedding planning services

3. **Full Package Discount:** 
   - Requires Premium Event Cap + catering + beverages + 3 add-ons
   - Includes free wedding planner service
   - 10% off total (after tax)

4. **Protein Pricing:** Average of 2 selected proteins determines per-person meal cost

5. **Minimum Booking:** 90 days in advance (configurable)

6. **Tax Rates:** 
   - Default: 7.75% (Nevada County unincorporated)
   - Grass Valley/Nevada City: 8.875%
   - Truckee: 9.00%

---

## Success Metrics

### Target KPIs
- **Cart Completion Rate:** >60%
- **Average Quote Value:** $45,000 - $55,000
- **Quote-to-Booking Conversion:** >25%
- **Mobile Usage:** >40% of quotes
- **Time to Complete Cart:** <10 minutes

### ROI Expectations
- Reduce sales team time per quote by 70%
- Increase quote volume by 200%
- Improve quote accuracy to 95%+
- Reduce back-and-forth emails by 60%

---

## Implementation Phases

### Phase 1: MVP (Core Features) - 8-10 weeks
- All pricing calculations
- Multi-step wizard interface
- Tax calculations
- Quote submission and email
- Basic admin panel

### Phase 2: Enhanced Features - 4-6 weeks
- Save and resume carts
- PDF quote generation
- Advanced analytics
- Promotional codes
- Enhanced admin tools

### Phase 3: Advanced Features - 6-8 weeks
- Payment integration
- Customer portal
- Digital contracts
- Automated follow-ups
- A/B testing framework

---

## Compliance & Legal

### Tax Compliance
- ✅ Compliant with California CDTFA guidelines
- ✅ Proper categorization of taxable vs non-taxable services
- ✅ Audit trail for all transactions
- ✅ Tax reporting capabilities

### Privacy & Security
- ✅ HTTPS required
- ✅ Data encryption
- ✅ GDPR considerations
- ✅ Privacy policy disclosure
- ✅ Secure payment processing (Phase 3)

### Terms & Conditions
- Quote validity period
- Deposit and payment terms
- Cancellation policy
- Service guarantees

---

## Quick Start for Developers

### 1. Read All Three Documents
```
1. WEDDING_CART_SPEC.md - Understand requirements
2. WEDDING_CART_UI_CONTROLS.md - Understand UI patterns
3. TAX_CALCULATION_GUIDE.md - Understand tax logic
```

### 2. Set Up Environment
```bash
# Clone repository
git clone [repo-url]

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add Supabase credentials, tax rates, etc.

# Run development server
npm run dev
```

### 3. Build Core Components
```
Priority Order:
1. Pricing configuration and calculation engine
2. Guest count slider and date picker
3. Venue selection cards
4. Catering protein selector (2-choice limit)
5. Beverage package selector
6. Add-ons toggles
7. Tax calculator
8. Price summary sidebar
9. Quote submission form
10. Email notifications
```

### 4. Testing Checklist
```
□ Test all pricing calculations with multiple scenarios
□ Verify tax applies only to taxable items
□ Test full package discount trigger
□ Verify slider constraints (min/max)
□ Test 2-protein selection limit
□ Test mobile responsiveness
□ Verify email delivery
□ Test with different tax rates
□ Validate form inputs
□ Cross-browser testing
```

---

## Cost Estimates

### Development Costs (Estimated)
- **Frontend Development:** 120-160 hours
- **Backend Development:** 80-100 hours
- **UI/UX Design:** 40-60 hours
- **Testing & QA:** 40-60 hours
- **Total:** 280-380 hours

### Ongoing Costs
- **Hosting:** $20-50/month (Vercel)
- **Database:** $25/month (Supabase)
- **Email Service:** $15-30/month (SendGrid)
- **Analytics:** Free - $50/month
- **Maintenance:** 10-20 hours/month

---

## Risk Assessment

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Tax calculation errors | High | Server-side validation, extensive testing |
| Price manipulation | High | Server-side recalculation, validation |
| Poor mobile experience | Medium | Mobile-first design, responsive testing |
| Slow performance | Medium | Optimized calculations, caching |
| Browser compatibility | Low | Modern framework, polyfills |

### Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Customer confusion | Medium | Clear UI, help tooltips, FAQ |
| Incorrect pricing display | High | Admin price controls, audit logs |
| Low conversion rate | Medium | A/B testing, user feedback |
| Technical support burden | Medium | Self-service help, clear documentation |

---

## Key Decisions Made

### Pricing Decisions
✓ Catering priced at $70-$100/person based on protein selection  
✓ System averages the price of 2 selected proteins  
✓ All meals include salad and dessert at no extra charge  
✓ Service fee (20%) applies to food and beverage only  
✓ Full package discount (10%) applies after tax calculation

### Tax Decisions
✓ Use Nevada County base rate (7.75%) as default  
✓ Allow admin configuration for specific city rates  
✓ Tax applies to venue, catering, beverages, service fee, floral, DJ  
✓ Photography and planning services are tax-exempt  
✓ Tax calculated on server-side for security

### UI/UX Decisions
✓ Use sliders for numeric inputs (guest count, duration)  
✓ Use large toggle buttons for selection grids  
✓ Multi-step wizard with progress indicator  
✓ Sticky price summary always visible  
✓ Mobile-first responsive design  
✓ Real-time price updates throughout

---

## Example Use Cases

### Use Case 1: Budget-Conscious Couple
**Goal:** Find affordable off-peak option

**Path:**
1. Select Monday in February (Off-Peak)
2. 80 guests
3. Partial Building, 5 hours
4. Vegetarian + Chicken catering ($75 avg)
5. Beer & Wine bar ($45/person)
6. Skip most add-ons

**Result:** ~$15,000 - $18,000 total

---

### Use Case 2: Premium Weekend Wedding
**Goal:** Full-service luxury wedding

**Path:**
1. Select Saturday in June (Peak)
2. 175 guests
3. Premium Event Cap
4. Fish + Steak catering ($95 avg)
5. Premium Liquor bar ($65/person)
6. Luxury floral, Photography, DJ
7. **Triggers Full Package:** Gets planner free + 10% off

**Result:** ~$65,000 - $75,000 total  
**Savings:** ~$10,000 with full package discount

---

### Use Case 3: Mid-Size Spring Wedding
**Goal:** Balance features and budget

**Path:**
1. Select Friday in April (Shoulder)
2. 120 guests
3. Full Building, 6 hours
4. Chicken + Fish catering ($85 avg)
5. Premium bar package ($55/person)
6. Classic floral, Photography
7. No full package (only 2 add-ons)

**Result:** ~$32,000 - $38,000 total

---

## Next Steps

### For Project Approval
1. ✅ Review complete specification package
2. ⬜ Approve budget and timeline
3. ⬜ Assign development team
4. ⬜ Schedule kickoff meeting

### For Development Start
1. ⬜ Finalize design mockups based on UI spec
2. ⬜ Set up development environment
3. ⬜ Configure Supabase database
4. ⬜ Implement pricing configuration
5. ⬜ Build calculation engine with tests
6. ⬜ Develop UI components (sliders, buttons)
7. ⬜ Integrate tax calculations
8. ⬜ Build multi-step wizard
9. ⬜ Implement quote submission
10. ⬜ Create admin panel

### For Business Launch
1. ⬜ Train sales staff on new system
2. ⬜ Test with real quotes
3. ⬜ Prepare marketing materials
4. ⬜ Update website with new cart
5. ⬜ Monitor analytics and conversion
6. ⬜ Gather customer feedback
7. ⬜ Iterate based on usage data

---

## Questions & Approvals Needed

### Clarifications Required
1. Exact venue location city (for precise tax rate)
2. Payment terms and deposit structure
3. Quote validity period
4. Cancellation policy details
5. Minimum guest count requirements
6. Split protein service approach (50/50 or guest choice?)

### Approvals Needed
- [ ] Overall specification approved
- [ ] Pricing structure confirmed
- [ ] Tax calculation methodology approved
- [ ] UI/UX approach approved
- [ ] Development budget approved
- [ ] Timeline approved
- [ ] Compliance review completed

---

## Contact Information

**For Specification Questions:**  
Project Manager: [Contact]

**For Technical Questions:**  
Development Lead: [Contact]

**For Tax/Compliance Questions:**  
Accountant/Tax Advisor: [Contact]

**For Business/Pricing Questions:**  
Venue Owner/Manager: [Contact]

---

## Document End

**Last Updated:** January 30, 2026  
**Status:** Draft - Pending Approval  
**Next Review:** [Schedule review meeting]

---

## Appendix: File Structure

```
/wedding-cart-system/
├── docs/
│   ├── WEDDING_CART_SPEC.md          (Main specification)
│   ├── WEDDING_CART_UI_CONTROLS.md   (UI/UX reference)
│   ├── TAX_CALCULATION_GUIDE.md      (Tax implementation)
│   └── WEDDING_CART_SUMMARY.md       (This document)
│
├── src/
│   ├── components/
│   │   ├── GuestCountSlider.jsx
│   │   ├── ProteinSelector.jsx
│   │   ├── BeveragePackageSelector.jsx
│   │   ├── AddOnServices.jsx
│   │   └── PriceSummary.jsx
│   │
│   ├── utils/
│   │   ├── pricing-calculator.js
│   │   ├── tax-calculator.js
│   │   └── validators.js
│   │
│   ├── config/
│   │   ├── pricing-config.js
│   │   └── tax-config.js
│   │
│   └── api/
│       ├── quote-submission.js
│       ├── availability-check.js
│       └── pricing-fetch.js
│
└── tests/
    ├── pricing.test.js
    ├── tax.test.js
    └── ui-components.test.js
```
