# Wedding Cart Tax Calculation Guide

## Nevada County, California Sales Tax Implementation

**Document Version:** 1.0  
**Date:** January 30, 2026  
**Tax Jurisdiction:** Nevada County, California

---

## 1. Tax Rate Overview

### 1.1 Nevada County Tax Rates by Location

| City/Area | Total Rate | State | County | Local/City |
|-----------|------------|-------|--------|------------|
| Grass Valley | 8.875% | 6.00% | 0.25% | 2.625% |
| Nevada City | 8.875% | 6.00% | 0.25% | 2.625% |
| Truckee | 9.000% | 6.00% | 0.25% | 2.750% |
| Unincorporated Areas | 7.750% | 6.00% | 0.25% | 1.500% |

**Default Rate for System:** 7.75% (unincorporated Nevada County)

**Configuration:** System should allow admin to set specific rate based on actual venue address.

### 1.2 Tax Rate Selection Logic

```javascript
function getTaxRateByLocation(city) {
  const TAX_RATES = {
    'grass-valley': 0.08875,
    'nevada-city': 0.08875,
    'truckee': 0.09000,
    'default': 0.07750  // Unincorporated Nevada County
  };
  
  return TAX_RATES[city?.toLowerCase().replace(/\s+/g, '-')] || TAX_RATES.default;
}

// Usage
const taxRate = getTaxRateByLocation('Grass Valley'); // 0.08875
```

---

## 2. California Taxability Rules for Wedding Services

### 2.1 What IS Taxable

Based on California Department of Tax and Fee Administration (CDTFA) guidelines:

✅ **TAXABLE ITEMS:**

1. **Venue Rental**
   - Rental of real property for events
   - All venue space rental fees
   - Hourly rentals and flat-rate event caps

2. **Catering Services**
   - Prepared food and meals
   - All protein selections
   - Side dishes and appetizers
   - Salads and desserts

3. **Beverage Services**
   - Alcoholic beverage packages
   - Bar service packages
   - Non-alcoholic beverages

4. **Service Charges & Gratuities**
   - Mandatory service fees
   - Automatic gratuities
   - **Note:** 20% service fee IS taxable in California

5. **Tangible Property Rental/Sales**
   - Equipment rental (tables, chairs, linens)
   - Sound system rental (DJ equipment)
   - Decorations and floral arrangements
   - Any physical goods sold or rented

### 2.2 What is NOT Taxable

❌ **NON-TAXABLE ITEMS:**

1. **Professional Photography Services**
   - Wedding photography packages
   - Videography services
   - Digital image delivery
   - **Rationale:** Professional service, not tangible property sale

2. **Wedding Planning Services**
   - Coordination services
   - Day-of planning
   - Timeline creation
   - Vendor management
   - **Rationale:** Professional consulting service

### 2.3 Gray Areas & Special Considerations

⚠️ **VERIFY WITH TAX PROFESSIONAL:**

- **DJ Services:** Taxable if primarily equipment rental; may be partially exempt if significant professional service component
  - **Our Implementation:** Treat as TAXABLE (conservative approach)
  
- **Floral Arrangements:** Generally taxable as sale of tangible property
  - **Our Implementation:** TAXABLE

- **Service Fees:** Mandatory service charges are taxable in California
  - **Our Implementation:** TAXABLE

---

## 3. Tax Calculation Methodology

### 3.1 Step-by-Step Calculation Process

```
STEP 1: Calculate All Line Items
├─ Venue rental cost
├─ Catering subtotal (proteins + sides + appetizers)
├─ Beverage subtotal
├─ Service fee (20% of catering + beverages)
└─ All add-on services

STEP 2: Categorize Taxable vs Non-Taxable
├─ Taxable Subtotal = Sum of taxable items
└─ Non-Taxable Subtotal = Sum of non-taxable items

STEP 3: Calculate Sales Tax
└─ Tax Amount = Taxable Subtotal × Tax Rate

STEP 4: Calculate Subtotal with Tax
└─ Subtotal = Taxable Subtotal + Non-Taxable Subtotal + Tax Amount

STEP 5: Apply Full Package Discount (if eligible)
└─ Discount = Subtotal × 10%

STEP 6: Calculate Grand Total
└─ Grand Total = Subtotal - Discount
```

### 3.2 Detailed Calculation Formula

```javascript
function calculateWeddingQuoteWithTax(cart, taxRate = 0.0775) {
  // === STEP 1: Line Item Calculations ===
  
  // Venue
  const venueCost = cart.venue.cost;
  
  // Catering
  const protein1 = cart.catering.proteins[0]; // e.g., { id: 'chicken', price: 80 }
  const protein2 = cart.catering.proteins[1]; // e.g., { id: 'fish', price: 90 }
  const avgProteinPrice = (protein1.price + protein2.price) / 2; // 85
  const baseCatering = avgProteinPrice * cart.guestCount; // 85 × 150 = 12,750
  
  const sidesCount = cart.catering.sides.length;
  const sidesCost = sidesCount * 8 * cart.guestCount; // 2 × 8 × 150 = 2,400
  
  const appetizersCount = cart.catering.appetizers.length;
  const appetizersCost = appetizersCount * 6 * cart.guestCount; // 3 × 6 × 150 = 2,700
  
  const cateringSubtotal = baseCatering + sidesCost + appetizersCost; // 17,850
  
  // Beverages
  const beveragePackage = cart.beverages.package; // e.g., 'premium-liquor'
  const beveragePricePerPerson = beveragePackage ? BEVERAGES[beveragePackage].price : 0; // 65
  const beverageSubtotal = beveragePricePerPerson * cart.guestCount; // 65 × 150 = 9,750
  
  // Service Fee (20% on food & beverage)
  const serviceFee = (cateringSubtotal + beverageSubtotal) * 0.20; // 27,600 × 0.20 = 5,520
  
  // Add-Ons
  const floralCost = cart.addOns.floral?.price || 0; // 5,000
  const photographyCost = cart.addOns.photography ? 3500 : 0; // 3,500
  const djCost = cart.addOns.dj ? 2500 : 0; // 2,500
  
  // Wedding Planner (free with full package)
  const isFullPackage = checkFullPackageEligibility(cart);
  const plannerCost = (cart.addOns.weddingPlanner && !isFullPackage) ? 2500 : 0; // 0 (free)
  
  // === STEP 2: Categorize Taxable vs Non-Taxable ===
  
  const taxableItems = {
    venue: venueCost,              // 10,000 - TAXABLE
    catering: cateringSubtotal,    // 17,850 - TAXABLE
    beverages: beverageSubtotal,   // 9,750 - TAXABLE
    serviceFee: serviceFee,        // 5,520 - TAXABLE
    floral: floralCost,            // 5,000 - TAXABLE
    dj: djCost                     // 2,500 - TAXABLE
  };
  
  const nonTaxableItems = {
    photography: photographyCost,  // 3,500 - NON-TAXABLE (professional service)
    weddingPlanner: plannerCost    // 0 - NON-TAXABLE (professional service)
  };
  
  const taxableSubtotal = Object.values(taxableItems).reduce((sum, val) => sum + val, 0);
  // 10,000 + 17,850 + 9,750 + 5,520 + 5,000 + 2,500 = 50,620
  
  const nonTaxableSubtotal = Object.values(nonTaxableItems).reduce((sum, val) => sum + val, 0);
  // 3,500 + 0 = 3,500
  
  // === STEP 3: Calculate Sales Tax ===
  
  const salesTaxAmount = taxableSubtotal * taxRate;
  // 50,620 × 0.0775 = 3,923.05
  
  // === STEP 4: Subtotal with Tax ===
  
  const subtotalBeforeDiscount = taxableSubtotal + nonTaxableSubtotal + salesTaxAmount;
  // 50,620 + 3,500 + 3,923.05 = 58,043.05
  
  // === STEP 5: Apply Discount ===
  
  const discountAmount = isFullPackage ? subtotalBeforeDiscount * 0.10 : 0;
  // 58,043.05 × 0.10 = 5,804.31 (rounded)
  
  // === STEP 6: Grand Total ===
  
  const grandTotal = subtotalBeforeDiscount - discountAmount;
  // 58,043.05 - 5,804.31 = 52,238.74
  
  return {
    lineItems: {
      venue: venueCost,
      catering: cateringSubtotal,
      beverages: beverageSubtotal,
      serviceFee: serviceFee,
      floral: floralCost,
      photography: photographyCost,
      weddingPlanner: plannerCost,
      dj: djCost
    },
    taxableSubtotal,
    nonTaxableSubtotal,
    salesTax: {
      rate: taxRate,
      ratePercent: (taxRate * 100).toFixed(2) + '%',
      amount: salesTaxAmount,
      appliedTo: 'taxable items only'
    },
    subtotalBeforeDiscount,
    discount: {
      eligible: isFullPackage,
      amount: discountAmount,
      percentage: '10%'
    },
    grandTotal,
    breakdown: taxableItems,
    nonTaxableBreakdown: nonTaxableItems
  };
}
```

---

## 4. Tax Calculation Examples

### Example 1: Small Wedding - Off-Peak Monday

**Event Details:**
- Date: Monday, February 10, 2026 (Off-Peak)
- Guest Count: 50
- Venue: Partial Building, 4 hours
- Tax Rate: 7.75%

**Selections:**
- Catering: Vegetarian ($70) + Chicken ($80) = $75/person avg
- No additional sides or appetizers
- Beverages: Beer & Wine ($45/person)
- No add-ons

**Calculation:**
```
Venue: Partial Building
  Mon-Thu Off-Peak: $250/hr × 4 hrs              $1,000.00  (taxable)

Catering: 
  Avg: $75/person × 50 guests                    $3,750.00  (taxable)

Beverages:
  Beer & Wine: $45/person × 50 guests            $2,250.00  (taxable)

Service Fee:
  ($3,750 + $2,250) × 20%                        $1,200.00  (taxable)
  
─────────────────────────────────────────────────────────
Taxable Subtotal                                 $8,200.00
Non-Taxable Subtotal                                 $0.00

Sales Tax (7.75%)                                  $635.50
─────────────────────────────────────────────────────────
GRAND TOTAL                                      $8,835.50
```

### Example 2: Medium Wedding - Peak Friday

**Event Details:**
- Date: Friday, September 12, 2026 (Peak)
- Guest Count: 120
- Venue: Full Building, 6 hours
- Tax Rate: 7.75%

**Selections:**
- Catering: Chicken ($80) + Fish ($90) = $85/person avg
- Sides: 1 selection (Garlic Mashed Potatoes)
- Appetizers: 2 selections (Bruschetta, Shrimp)
- Beverages: Premium Package ($55/person)
- Photography: Yes ($3,500)
- DJ: Yes ($2,500)

**Calculation:**
```
Venue: Full Building
  Peak Friday: $1,100/hr × 6 hrs                 $6,600.00  (taxable)

Catering:
  Proteins: $85/person × 120                    $10,200.00  (taxable)
  Sides: 1 × $8 × 120                              $960.00  (taxable)
  Appetizers: 2 × $6 × 120                       $1,440.00  (taxable)
  ─────────────────────────────────────────────
  Catering Subtotal                             $12,600.00

Beverages:
  Premium: $55/person × 120                      $6,600.00  (taxable)

Service Fee:
  ($12,600 + $6,600) × 20%                       $3,840.00  (taxable)

Add-Ons:
  Photography                                    $3,500.00  (NON-taxable)
  DJ Service                                     $2,500.00  (taxable)

─────────────────────────────────────────────────────────
Taxable Subtotal                                $32,540.00
  (Venue + Catering + Beverages + Service Fee + DJ)

Non-Taxable Subtotal                             $3,500.00
  (Photography only)

Sales Tax (7.75% on $32,540)                     $2,521.85
─────────────────────────────────────────────────────────
GRAND TOTAL                                     $38,561.85
```

### Example 3: Large Wedding - Peak Saturday with Full Package

**Event Details:**
- Date: Saturday, October 4, 2026 (Peak)
- Guest Count: 200
- Venue: Premium Event Cap
- Tax Rate: 8.875% (Grass Valley location)

**Selections:**
- Catering: Fish ($90) + Steak ($100) = $95/person avg
- Sides: 3 selections
- Appetizers: 4 selections
- Beverages: Premium Liquor ($65/person)
- Floral: Luxury Package ($10,000)
- Photography: Yes ($3,500)
- Wedding Planner: Yes (FREE with full package)
- DJ: Yes ($2,500)

**Calculation:**
```
Venue: Premium Event Cap
  Peak Saturday                                 $10,000.00  (taxable)

Catering:
  Proteins: $95/person × 200                    $19,000.00  (taxable)
  Sides: 3 × $8 × 200                            $4,800.00  (taxable)
  Appetizers: 4 × $6 × 200                       $4,800.00  (taxable)
  ─────────────────────────────────────────────
  Catering Subtotal                             $28,600.00

Beverages:
  Premium Liquor: $65/person × 200              $13,000.00  (taxable)

Service Fee:
  ($28,600 + $13,000) × 20%                      $8,320.00  (taxable)

Add-Ons:
  Luxury Floral Package                         $10,000.00  (taxable)
  Photography                                    $3,500.00  (NON-taxable)
  Wedding Planner                                    $0.00  (FREE - Full Package)
  DJ Service                                     $2,500.00  (taxable)

─────────────────────────────────────────────────────────
Taxable Subtotal                                $72,420.00
Non-Taxable Subtotal                             $3,500.00

Sales Tax (8.875% on $72,420 - Grass Valley)     $6,427.28
─────────────────────────────────────────────────────────
Subtotal with Tax                               $82,347.28

★ FULL PACKAGE DISCOUNT (10%)                   -$8,234.73
  ✓ Premium Event Cap
  ✓ Full catering package
  ✓ Bar package
  ✓ 3+ add-ons (Floral + Photo + DJ)
  ✓ Wedding Planner included FREE

═════════════════════════════════════════════════════════
GRAND TOTAL                                     $74,112.55
═════════════════════════════════════════════════════════

SAVINGS BREAKDOWN:
Wedding Planner (included free)                  $2,500.00
Full Package Discount (10%)                      $8,234.73
─────────────────────────────────────────────────────────
TOTAL SAVINGS                                   $10,734.73
```

---

## 5. Implementation Code

### 5.1 Complete Tax Calculator Function

```javascript
/**
 * Calculate complete wedding quote with Nevada County, CA sales tax
 * @param {Object} cart - Cart state object
 * @param {string} venueCity - Specific city for tax rate ('grass-valley', 'nevada-city', 'truckee', or null for unincorporated)
 * @returns {Object} Complete pricing breakdown
 */
function calculateQuoteWithTax(cart, venueCity = null) {
  
  // Get applicable tax rate
  const taxRate = getTaxRateByLocation(venueCity);
  
  // === VENUE ===
  const venueCost = cart.venue.cost;
  
  // === CATERING ===
  // Average of 2 selected proteins
  const proteinPrices = cart.catering.selectedProteins.map(id => {
    const protein = CATERING.proteins.find(p => p.id === id);
    return protein.pricePerPerson;
  });
  const avgProteinPrice = proteinPrices.reduce((a, b) => a + b, 0) / 2;
  const baseCateringCost = avgProteinPrice * cart.guestCount;
  
  // Additional sides
  const sidesCount = cart.catering.selectedSides?.length || 0;
  const sidesCost = sidesCount * 8 * cart.guestCount;
  
  // Passed appetizers
  const appetizersCount = cart.catering.selectedAppetizers?.length || 0;
  const appetizersCost = appetizersCount * 6 * cart.guestCount;
  
  const cateringTotal = baseCateringCost + sidesCost + appetizersCost;
  
  // === BEVERAGES ===
  const beveragePackage = cart.beverages.selectedPackage;
  const beveragePricePerPerson = beveragePackage 
    ? BEVERAGES.packages.find(p => p.id === beveragePackage).pricePerPerson 
    : 0;
  const beverageTotal = beveragePricePerPerson * cart.guestCount;
  
  // === SERVICE FEE ===
  const serviceFee = (cateringTotal + beverageTotal) * 0.20;
  
  // === ADD-ONS ===
  const floralCost = cart.addOns.floral?.price || 0;
  const photographyCost = cart.addOns.photography ? 3500 : 0;
  const djCost = cart.addOns.dj ? 2500 : 0;
  
  // Wedding planner - free with full package
  const isFullPackage = checkFullPackageEligibility(cart);
  const plannerCost = (cart.addOns.weddingPlanner && !isFullPackage) ? 2500 : 0;
  
  // === CATEGORIZE FOR TAX ===
  
  const taxableSubtotal = 
    venueCost +           // Venue rental - TAXABLE
    cateringTotal +       // All food - TAXABLE
    beverageTotal +       // All beverages - TAXABLE
    serviceFee +          // Service charges - TAXABLE
    floralCost +          // Floral arrangements - TAXABLE
    djCost;               // DJ equipment/service - TAXABLE
  
  const nonTaxableSubtotal = 
    photographyCost +     // Professional service - NON-TAXABLE
    plannerCost;          // Professional service - NON-TAXABLE
  
  // === CALCULATE SALES TAX ===
  
  const salesTaxAmount = roundToTwoDecimals(taxableSubtotal * taxRate);
  
  // === SUBTOTAL WITH TAX ===
  
  const subtotalWithTax = taxableSubtotal + nonTaxableSubtotal + salesTaxAmount;
  
  // === APPLY DISCOUNT ===
  
  const discountAmount = isFullPackage 
    ? roundToTwoDecimals(subtotalWithTax * 0.10)
    : 0;
  
  // === GRAND TOTAL ===
  
  const grandTotal = roundToTwoDecimals(subtotalWithTax - discountAmount);
  
  // === RETURN COMPLETE BREAKDOWN ===
  
  return {
    eventDetails: {
      date: cart.date,
      guestCount: cart.guestCount,
      venueType: cart.venue.type
    },
    
    lineItems: {
      venue: {
        description: cart.venue.description,
        cost: venueCost,
        taxable: true
      },
      catering: {
        proteins: cart.catering.selectedProteins,
        avgPrice: avgProteinPrice,
        baseCost: baseCateringCost,
        sides: { count: sidesCount, cost: sidesCost },
        appetizers: { count: appetizersCount, cost: appetizersCost },
        total: cateringTotal,
        taxable: true,
        includesSaladAndDessert: true
      },
      beverages: {
        package: beveragePackage,
        pricePerPerson: beveragePricePerPerson,
        total: beverageTotal,
        taxable: true
      },
      serviceFee: {
        rate: '20%',
        appliedTo: cateringTotal + beverageTotal,
        amount: serviceFee,
        taxable: true
      },
      addOns: {
        floral: { cost: floralCost, taxable: true },
        photography: { cost: photographyCost, taxable: false },
        weddingPlanner: { cost: plannerCost, isFree: isFullPackage, taxable: false },
        dj: { cost: djCost, taxable: true }
      }
    },
    
    taxCalculation: {
      taxableSubtotal,
      nonTaxableSubtotal,
      taxRate,
      taxRateDisplay: (taxRate * 100).toFixed(3) + '%',
      taxJurisdiction: venueCity || 'Nevada County, CA',
      salesTaxAmount,
      itemizedTaxable: {
        venue: venueCost,
        catering: cateringTotal,
        beverages: beverageTotal,
        serviceFee: serviceFee,
        floral: floralCost,
        dj: djCost
      }
    },
    
    totals: {
      subtotalBeforeDiscount,
      fullPackageDiscount: {
        eligible: isFullPackage,
        amount: discountAmount,
        savingsOnPlanner: isFullPackage ? 2500 : 0
      },
      grandTotal
    },
    
    // For display
    formattedTotals: {
      grandTotal: formatCurrency(grandTotal),
      salesTax: formatCurrency(salesTaxAmount),
      discount: formatCurrency(discountAmount)
    }
  };
}

// Helper functions
function roundToTwoDecimals(num) {
  return Math.round(num * 100) / 100;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigths: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

function checkFullPackageEligibility(cart) {
  const isPremiumCap = cart.venue.type === 'premiumEventCap';
  const hasCatering = cart.catering.selectedProteins?.length === 2;
  const hasBeverages = cart.beverages.selectedPackage !== null;
  
  const addOnCount = [
    cart.addOns.floral?.selected,
    cart.addOns.photography,
    cart.addOns.dj
  ].filter(Boolean).length;
  
  return isPremiumCap && hasCatering && hasBeverages && addOnCount >= 3;
}
```

---

## 6. Tax Exemption Certificates

### 6.1 Handling Tax-Exempt Organizations

**Scenario:** Nonprofit organization or tax-exempt entity booking wedding

**Requirements:**
1. Customer must provide valid California tax exemption certificate
2. Certificate must be uploaded and verified before tax removal
3. System should flag quote as "pending tax exemption verification"
4. Admin approves exemption before final quote

**Implementation:**
```javascript
function calculateQuoteWithExemption(cart, venueCity, taxExemptCertificate = null) {
  const quote = calculateQuoteWithTax(cart, venueCity);
  
  if (taxExemptCertificate && taxExemptCertificate.verified) {
    quote.taxCalculation.salesTaxAmount = 0;
    quote.taxCalculation.exemptionApplied = true;
    quote.taxCalculation.exemptionCertificate = taxExemptCertificate.number;
    quote.totals.grandTotal = quote.totals.subtotalBeforeDiscount - quote.totals.fullPackageDiscount.amount;
  }
  
  return quote;
}
```

---

## 7. Display Templates

### 7.1 Tax Line on Quote Display

**Desktop View:**
```html
<div class="tax-line">
  <div class="tax-label">
    <span>Sales Tax</span>
    <button class="info-tooltip" aria-label="Tax information">
      <InfoIcon />
    </button>
  </div>
  <div class="tax-details">
    <span class="tax-rate">7.75%</span>
    <span class="tax-location">Nevada County, CA</span>
  </div>
  <div class="tax-amount">
    $3,923.05
  </div>
</div>

<!-- Tooltip content -->
<div class="tooltip-content">
  <h4>Sales Tax Breakdown</h4>
  <p>California sales tax applies to:</p>
  <ul>
    <li>✓ Venue rental</li>
    <li>✓ Food & beverage services</li>
    <li>✓ Service charges</li>
    <li>✓ Floral arrangements</li>
    <li>✓ DJ services</li>
  </ul>
  <p>Tax-exempt professional services:</p>
  <ul>
    <li>• Photography</li>
    <li>• Wedding planning</li>
  </ul>
  <p class="tax-note">
    Tax rate: 7.75% (Nevada County base rate)
  </p>
</div>
```

**Mobile View:**
```
Sales Tax (7.75%)                    $3,923.05
  [?] Tap for details
```

### 7.2 Itemized Tax Breakdown (Expandable Section)

```
┌─────────────────────────────────────────────┐
│  DETAILED TAX BREAKDOWN          [−]        │ <- Click to collapse
├─────────────────────────────────────────────┤
│                                              │
│  TAXABLE ITEMS (7.75% sales tax applies)    │
│  ─────────────────────────────────────────  │
│  Venue Rental                   $10,000.00  │
│  Catering Services              $17,850.00  │
│  Beverage Service                $9,750.00  │
│  Service Fee (20%)               $5,520.00  │
│  Luxury Floral Package          $10,000.00  │
│  DJ Entertainment                $2,500.00  │
│  ─────────────────────────────────────────  │
│  Taxable Subtotal               $55,620.00  │
│                                              │
│  NON-TAXABLE ITEMS (tax-exempt services)    │
│  ─────────────────────────────────────────  │
│  Professional Photography        $3,500.00  │
│  Wedding Planning Service            $0.00  │
│    (Included free with package)             │
│  ─────────────────────────────────────────  │
│  Non-Taxable Subtotal            $3,500.00  │
│                                              │
│  SALES TAX CALCULATION                      │
│  ─────────────────────────────────────────  │
│  $55,620.00 × 7.75%              $4,310.55  │
│                                              │
│  Location: Nevada County, CA                │
│  Rate: 7.75% (unincorporated area)          │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 8. Tax-Related Error Handling

### 8.1 Tax Calculation Errors

**Scenario 1: Tax rate unavailable**
```
Error: Unable to determine tax rate for your location
Fallback: Use default 7.75% with warning message
Display: "Tax calculated at 7.75% (subject to verification)"
```

**Scenario 2: Tax calculation mismatch (client vs server)**
```
Error: Price discrepancy detected
Action: Use server-calculated value
Display: "Quote recalculated with current rates"
Log: Flag for admin review
```

### 8.2 Rounding Considerations

**Rule:** Always round to 2 decimal places (cents)

**Method:** Standard rounding (0.5 rounds up)
```javascript
// CORRECT
const salesTax = Math.round(taxableSubtotal * taxRate * 100) / 100;
// Example: 50620 × 0.0775 = 3923.05

// INCORRECT - Don't truncate
const salesTax = Math.floor(taxableSubtotal * taxRate * 100) / 100;
```

**Edge Case:** Ensure grand total is exact sum of components
```javascript
// Verify no rounding errors
const calculated = taxableSubtotal + nonTaxableSubtotal + salesTax - discount;
const displayed = grandTotal;

if (Math.abs(calculated - displayed) > 0.01) {
  console.error('Rounding error detected');
  // Adjust salesTax by penny to reconcile
}
```

---

## 9. Tax Reporting for Admin

### 9.1 Required Tax Reports

**Monthly Tax Summary Report:**
```
Nevada County Sales Tax Report
Month: January 2026

Total Quotes Submitted: 45
Total Bookings Confirmed: 12

Taxable Sales:
├─ Venue Rentals                   $145,000.00
├─ Catering Services               $234,500.00
├─ Beverage Services               $89,750.00
├─ Service Fees                    $64,850.00
├─ Floral Services                 $32,500.00
└─ DJ Services                     $18,000.00
─────────────────────────────────────────────
Total Taxable Sales                $584,600.00

Non-Taxable Sales:
├─ Photography Services            $42,000.00
└─ Planning Services                $7,500.00
─────────────────────────────────────────────
Total Non-Taxable Sales            $49,500.00

Sales Tax Collected:
├─ 7.75% rate (unincorporated)     $38,254.50
├─ 8.875% rate (Grass Valley)      $7,021.88
└─ 9.00% rate (Truckee)            $1,890.00
─────────────────────────────────────────────
Total Tax Collected                $47,166.38

Tax Liability Due to CDTFA:        $47,166.38
```

### 9.2 Tax Audit Trail

**Database Fields for Audit:**
```sql
ALTER TABLE wedding_quotes ADD COLUMN tax_calculation_details JSONB;

-- Example stored data:
{
  "taxRate": 0.0775,
  "taxJurisdiction": "Nevada County, CA",
  "venueCity": "unincorporated",
  "calculationDate": "2026-01-30T10:30:00Z",
  "taxableItems": {
    "venue": 10000.00,
    "catering": 17850.00,
    "beverages": 9750.00,
    "serviceFee": 5520.00,
    "floral": 5000.00,
    "dj": 2500.00
  },
  "taxableSubtotal": 50620.00,
  "nonTaxableItems": {
    "photography": 3500.00,
    "weddingPlanner": 0.00
  },
  "nonTaxableSubtotal": 3500.00,
  "salesTaxAmount": 3923.05,
  "calculatedBy": "system_v1.1",
  "verifiedByAdmin": false
}
```

---

## 10. Tax Updates & Maintenance

### 10.1 When Tax Rates Change

**Process:**
1. Admin receives notification of rate change from CDTFA
2. Admin updates tax rate in configuration
3. System applies new rate to all NEW quotes
4. System flags existing quotes with old rate
5. Option to recalculate pending quotes with new rate

**Implementation:**
```javascript
// Configuration file: tax-config.js
export const TAX_CONFIG = {
  effectiveDate: '2026-01-01',
  rates: {
    'grass-valley': 0.08875,
    'nevada-city': 0.08875,
    'truckee': 0.09000,
    'default': 0.07750
  },
  lastUpdated: '2026-01-15',
  source: 'California CDTFA',
  
  // Historical rates for audit
  history: [
    {
      effectiveDate: '2025-01-01',
      rates: { 'default': 0.0750 }, // example
      endDate: '2025-12-31'
    }
  ]
};
```

### 10.2 Admin Interface for Tax Management

**Tax Settings Page:**
```
┌────────────────────────────────────────────────┐
│  TAX RATE CONFIGURATION                        │
├────────────────────────────────────────────────┤
│                                                 │
│  Venue Location                                │
│  ○ Grass Valley (8.875%)                       │
│  ● Nevada City (8.875%)                        │
│  ○ Truckee (9.00%)                             │
│  ○ Unincorporated (7.75%)                      │
│  ○ Custom Rate                                 │
│                                                 │
│  Current Rate: 8.875%                          │
│  Effective Date: Jan 1, 2026                   │
│  Last Updated: Jan 15, 2026                    │
│                                                 │
│  [ UPDATE TAX RATE ]                           │
│                                                 │
│  ─────────────────────────────────────────     │
│                                                 │
│  TAXABLE CATEGORIES                            │
│  ☑ Venue Rental                                │
│  ☑ Catering & Food Services                    │
│  ☑ Beverage Services                           │
│  ☑ Service Fees & Gratuities                   │
│  ☑ Floral Arrangements                         │
│  ☑ DJ & Entertainment Equipment                │
│  ☐ Photography Services                        │
│  ☐ Planning Services                           │
│                                                 │
│  [ SAVE CONFIGURATION ]                        │
│                                                 │
└────────────────────────────────────────────────┘
```

---

## 11. Customer-Facing Tax Disclosure

### 11.1 Tax Information Page/Section

**Content to Display:**
```markdown
### About Sales Tax

All prices shown are before tax. California sales tax will be added to your final total.

**Tax Rate:** 7.75% - 8.875% depending on venue location

**What's Taxable:**
California law requires us to collect sales tax on:
- Venue rental fees
- Food and beverage services
- Service charges and gratuities
- Equipment rentals and decorations
- Floral arrangements
- Entertainment services

**Tax-Exempt Services:**
The following professional services are not subject to sales tax:
- Photography and videography
- Wedding planning and coordination

**Your Location:**
This quote uses the tax rate for Nevada County, California.

**Questions?**
Contact our team if you have questions about tax or need information for tax-exempt organizations.
```

### 11.2 FAQ Section

**Q: Why is there tax on the service fee?**  
A: California law requires sales tax on all service charges and gratuities associated with catering and food service.

**Q: Can I get a tax exemption?**  
A: Tax-exempt organizations must provide a valid California resale or exemption certificate. Contact us for details.

**Q: Is the tax rate correct?**  
A: Tax rates vary by city within Nevada County (7.75% - 9.00%). Your quote uses the rate applicable to our venue location.

**Q: Why isn't photography taxed?**  
A: Professional photography services are exempt from sales tax in California as they are professional services, not tangible goods.

---

## 12. Testing Tax Calculations

### 12.1 Unit Test Cases

```javascript
describe('Tax Calculation', () => {
  
  test('calculates correct tax on taxable items only', () => {
    const cart = {
      venue: { cost: 10000 },
      catering: { total: 17850 },
      beverages: { total: 9750 },
      serviceFee: 5520,
      addOns: {
        floral: 5000,
        photography: 3500, // NON-TAXABLE
        dj: 2500
      }
    };
    
    const taxableSubtotal = 10000 + 17850 + 9750 + 5520 + 5000 + 2500;
    // = 50,620
    
    const expectedTax = Math.round(50620 * 0.0775 * 100) / 100;
    // = 3,923.05
    
    const result = calculateQuoteWithTax(cart);
    
    expect(result.taxCalculation.taxableSubtotal).toBe(50620);
    expect(result.taxCalculation.salesTaxAmount).toBe(3923.05);
  });
  
  test('applies correct tax rate by city', () => {
    const cart = { /* ... */ };
    
    const grassValleyQuote = calculateQuoteWithTax(cart, 'grass-valley');
    expect(grassValleyQuote.taxCalculation.taxRate).toBe(0.08875);
    
    const truckeeQuote = calculateQuoteWithTax(cart, 'truckee');
    expect(truckeeQuote.taxCalculation.taxRate).toBe(0.09000);
    
    const defaultQuote = calculateQuoteWithTax(cart);
    expect(defaultQuote.taxCalculation.taxRate).toBe(0.0775);
  });
  
  test('excludes professional services from tax', () => {
    const cart = {
      addOns: {
        photography: 3500,
        weddingPlanner: 2500
      }
    };
    
    const result = calculateQuoteWithTax(cart);
    
    expect(result.taxCalculation.nonTaxableSubtotal).toBe(6000);
    // Photography + Planner should not be taxed
  });
  
  test('applies discount after tax calculation', () => {
    const cart = { /* full package cart */ };
    
    const result = calculateQuoteWithTax(cart);
    
    // Discount should be on subtotal INCLUDING tax
    const subtotalWithTax = 
      result.taxCalculation.taxableSubtotal + 
      result.taxCalculation.nonTaxableSubtotal + 
      result.taxCalculation.salesTaxAmount;
    
    const expectedDiscount = Math.round(subtotalWithTax * 0.10 * 100) / 100;
    
    expect(result.totals.fullPackageDiscount.amount).toBe(expectedDiscount);
  });
  
  test('rounds to 2 decimal places correctly', () => {
    const result = calculateQuoteWithTax(/* cart with odd amounts */);
    
    // All money values should have exactly 2 decimal places
    expect(Number.isInteger(result.taxCalculation.salesTaxAmount * 100)).toBe(true);
    expect(Number.isInteger(result.totals.grandTotal * 100)).toBe(true);
  });
});
```

---

## 13. Compliance Checklist

### 13.1 California Tax Compliance Requirements

- [ ] Venue has valid California Seller's Permit
- [ ] Tax collected on all applicable items per CDTFA guidelines
- [ ] Tax calculated at correct rate for venue location
- [ ] Tax displayed separately from item prices
- [ ] Tax exemption process in place for eligible organizations
- [ ] Records retained for minimum 4 years
- [ ] Monthly/quarterly tax returns filed with CDTFA
- [ ] Tax rates updated when jurisdiction rates change
- [ ] Customers provided with itemized receipts showing tax
- [ ] Professional services correctly classified as non-taxable

### 13.2 System Implementation Checklist

- [ ] Tax rate configurable by admin
- [ ] Tax calculation validated server-side
- [ ] Taxable items clearly marked in UI
- [ ] Tax breakdown available to customers
- [ ] Tax audit trail maintained in database
- [ ] Tax reports available for accounting
- [ ] Tax rate effective dates tracked
- [ ] Rounding errors prevented/detected
- [ ] Customer invoices show tax separately
- [ ] Quote PDFs include tax disclaimer

---

## 14. Tax Disclaimer Text

### For Quotes and Invoices

```
TAX NOTICE:
All prices shown are subject to Nevada County, California sales tax.
Current rate: 7.75% (unincorporated areas) or 8.875% (Grass Valley/Nevada City).
Tax applies to venue rental, catering, beverages, service charges, and certain
add-on services. Professional photography and planning services are tax-exempt.

Final tax amount will be calculated based on the venue's specific location and
current tax rates at the time of booking. Rates shown are current as of 
January 2026 and subject to change.

Tax-exempt organizations must provide valid California tax exemption certificate.
```

### For Website Footer

```
Sales tax applies to applicable services in Nevada County, California.
Rates vary by location (7.75% - 9.00%). Tax-exempt services available
for qualifying organizations with valid certificates.
```

---

## 15. Special Scenarios

### 15.1 Multi-Day Events

**Scenario:** Wedding spans multiple days (rehearsal dinner Friday, wedding Saturday)

**Tax Approach:**
- Calculate each day separately
- Apply tax to each day's taxable items
- Combine for total tax liability
- Show breakdown by day

### 15.2 Partial Deposits

**Scenario:** Customer pays 50% deposit, 50% at event

**Tax Approach:**
- Collect tax on deposit proportionally
- Example: $52,238 total, $3,923 tax
- Deposit (50%): $26,119 includes $1,961.50 tax
- Balance (50%): $26,119 includes $1,961.55 tax (penny adjustment)

### 15.3 Cancellations and Refunds

**Tax Refund Rules:**
- If event cancelled, refund includes tax paid
- If partial refund (e.g., change guest count), recalculate tax
- Maintain records of all tax refunds
- Report refunded tax on CDTFA returns

---

## 16. Integration with Accounting Software

### 16.1 Export Format for Tax Records

**CSV Export Structure:**
```csv
Quote_ID,Date,Customer,Event_Date,Taxable_Subtotal,Tax_Rate,Tax_Amount,Non_Taxable_Subtotal,Grand_Total
WQ-2026-0001,2026-01-30,Smith Wedding,2026-06-15,50620.00,0.0775,3923.05,3500.00,51788.74
```

**QuickBooks Integration:**
```json
{
  "invoice": {
    "lineItems": [
      { "description": "Venue Rental", "amount": 10000, "taxable": true },
      { "description": "Catering Services", "amount": 17850, "taxable": true },
      { "description": "Photography", "amount": 3500, "taxable": false }
    ],
    "taxRate": 0.0775,
    "taxAmount": 3923.05,
    "total": 51788.74
  }
}
```

---

## Document End

**For tax-related questions:**
- Consult with California-licensed tax professional
- Reference: [California CDTFA - Tax Guide for Caterers](https://cdtfa.ca.gov/industry/caterers.htm)
- Reference: [California CDTFA - Tax Guide for Venue Rental Businesses](https://cdtfa.ca.gov/industry/venue-rental-businesses.htm)

**Document maintained by:**  
Finance Department / Tax Compliance Officer
