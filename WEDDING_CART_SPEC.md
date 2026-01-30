# Wedding Sales Shopping Cart - Software Specification

## Document Information
**Version:** 1.1  
**Date:** January 30, 2026  
**Project:** Stone House Venue - Wedding Booking System  
**Document Type:** Technical Specification  
**Location:** Nevada County, California  
**Tax Jurisdiction:** Nevada County, CA (7.75% base rate)

### Related Documentation
This specification is part of a complete documentation set:
- **WEDDING_CART_SPEC.md** (this document) - Complete technical specification
- **WEDDING_CART_UI_CONTROLS.md** - Detailed UI/UX control specifications with sliders and buttons
- **TAX_CALCULATION_GUIDE.md** - Nevada County, CA tax calculation methodology and compliance

---

## 1. Executive Summary

### 1.1 Purpose
This document defines the technical and functional requirements for a comprehensive wedding sales shopping cart system for Stone House Venue. The system will enable prospective clients to configure, price, and book complete wedding packages including venue rental, catering, beverages, and various add-on services.

### 1.2 Scope
The shopping cart system will handle:
- Dynamic venue pricing based on date and season
- Tiered catering pricing ($70-$100/person) with choice of 2 proteins
- All meals include house salad and seasonal dessert
- Customizable food and beverage packages
- Multiple service add-ons (floral, photography, DJ, planning)
- Bundled package discounts (10% off)
- Automated service fee calculations (20% on food/beverage)
- Nevada County, CA sales tax calculation (7.75% base rate)
- Real-time price calculations and quotations
- Interactive UI with sliders and toggle buttons

---

## 2. System Overview

### 2.1 Core Functionality
The wedding shopping cart is a multi-step configuration system that guides users through selecting wedding services and dynamically calculates pricing based on guest count, date, and selected options.

### 2.2 User Flow
1. **Event Details**: Date selection, guest count, venue space selection
2. **Catering**: Food package selection (choice of 2 proteins)
3. **Beverages**: Bar package selection
4. **Add-Ons**: Additional services and enhancements
5. **Review & Quote**: Complete pricing breakdown
6. **Contact/Booking**: Lead capture and booking request submission

---

## 3. Detailed Requirements

## 3.1 Event Details Configuration

### 3.1.1 Guest Count Input
**Field Type:** Slider with number input  
**Interface Components:**
- Range slider (visual selection)
- Numeric input field (manual entry)
- +/- buttons for fine-tuning
- Real-time guest count display

**Validation Rules:**
- Minimum: 20 guests (typical wedding minimum)
- Maximum: 500 guests (configurable)
- Default: 100 (suggested starting point)
- Integer values only
- Slider increments: 5 guests

**Business Logic:**
- Guest count directly impacts all per-person pricing
- Must be entered before proceeding to pricing calculations
- Should display estimated capacity warnings if exceeding venue capacity
- Display recommended venue type based on guest count:
  - 20-50 guests: Single Room or Partial Building
  - 51-150 guests: Full Building
  - 150+ guests: Premium Event Cap

### 3.1.2 Date Selection & Venue Pricing

**Field Type:** Date picker  
**Validation Rules:**
- Must be future date
- Minimum advance booking: 90 days (configurable)
- Maximum advance booking: 24 months (configurable)

**Season Classification:**
The system must automatically classify dates into three pricing seasons:

| Season | Months | Pricing Tier |
|--------|--------|--------------|
| Off-Peak | January, February | Lowest |
| Shoulder | March, April, November | Mid-range |
| Peak | May, June, July, August, September, October, December | Highest |

**Venue Space Options:**

#### Option 1: Hourly Rental (Single Room or Partial Building)
**Single Room** (3-hour minimum)
- Off-Peak: Mon-Thu $150/hr, Fri $175/hr, Sat $200/hr, Sun $175/hr
- Shoulder: Mon-Thu $175/hr, Fri $200/hr, Sat $225/hr, Sun $200/hr
- Peak: Mon-Thu $200/hr, Fri $225/hr, Sat $250/hr, Sun $225/hr

**Partial Building** (2-3 rooms)
- Off-Peak: Mon-Thu $250/hr, Fri $300/hr, Sat $350/hr, Sun $325/hr
- Shoulder: Mon-Thu $300/hr, Fri $350/hr, Sat $400/hr, Sun $350/hr
- Peak: Mon-Thu $350/hr, Fri $400/hr, Sat $450/hr, Sun $400/hr

**Full Building**
- Off-Peak: Mon-Thu $900/hr, Fri $950/hr, Sat $1,000/hr, Sun $950/hr
- Shoulder: Mon-Thu $950/hr, Fri $1,000/hr, Sat $1,100/hr, Sun $1,000/hr
- Peak: Mon-Thu $1,000/hr, Fri $1,100/hr, Sat $1,200/hr, Sun $1,100/hr

**Interface Requirements:**
- Duration slider with 3-hour minimum, 12-hour maximum
  - Slider interface with hour markers
  - +/- buttons for adjustment
  - Display: "3 hours", "4 hours", etc.
- Real-time calculation of rental cost: (hourly rate × hours)
- Visual indicator showing total venue cost

#### Option 2: Premium Event Cap (All-Inclusive Venue)
**Flat-rate pricing** (includes full building for entire day):
- Off-Peak: Mon-Thu $5,000, Fri $6,000, Sat $7,000, Sun $6,500
- Shoulder: Mon-Thu $6,500, Fri $8,000, Sat $9,000, Sun $8,500
- Peak: Mon-Thu $7,500, Fri $9,000, Sat $10,000, Sun $9,500

**Business Rules:**
- Premium Event Cap cannot be combined with hourly rental pricing
- Includes full-day access and all spaces
- Recommended for events with 100+ guests or 6+ hours

---

## 3.2 Catering Configuration

### 3.2.1 Food Package Selection

**Package Type:** Choice of 2 Proteins  
**Package Includes:** All catering selections include house salad and dessert

**Available Proteins with Pricing:**
- **Vegetarian Option** - $70.00 per person
  - Examples: Eggplant parmesan, vegetable lasagna, stuffed portobello
  - Includes: House salad and seasonal dessert
  
- **Chicken** - $80.00 per person
  - Examples: Herb roasted chicken, chicken marsala, chicken piccata
  - Includes: House salad and seasonal dessert
  
- **Fish** - $90.00 per person
  - Examples: Pan-seared salmon, sea bass, grilled tilapia
  - Includes: House salad and seasonal dessert
  
- **Steak** - $100.00 per person
  - Examples: Filet mignon, ribeye, NY strip
  - Includes: House salad and seasonal dessert

**Interface Requirements:**
- Multi-select interface allowing exactly 2 selections
- Validation: Must select exactly 2 options
- Display protein options with descriptions, images, and per-person pricing
- Show calculated cost based on guest count for each selection
- Display average price when 2 proteins are selected

**Pricing Calculation:**
When 2 proteins are selected, the system calculates the average price:
- Example: Chicken ($80) + Fish ($90) = $170 ÷ 2 = $85 per person average
- Total catering cost = $85 × guest count

**Business Logic:**
- Each protein has a fixed per-person price
- Price includes salad and dessert (no additional charge)
- Final catering price is the average of the 2 selected proteins
- Displayed as: "Catering Package (Chicken & Fish): $85/person × 150 guests = $12,750"

### 3.2.2 Catering Add-Ons

**Additional Sides**
- **Price:** $8.00 per person per side selection
- **Interface:** Toggle buttons with visual cards
  - Button grid showing all side options
  - Multi-select (tap to add/remove)
  - Visual indicator (highlighted border or checkmark) for selected items
  - Counter badge showing total sides selected
  - Real-time cost update
- **Options:** Roasted vegetables, garlic mashed potatoes, rice pilaf, truffle mac & cheese, grilled asparagus
- **Calculation:** (Number of sides × $8) × guest count
- **Example:** 2 sides × $8 × 150 guests = $2,400

**Passed Appetizers**
- **Price:** $6.00 per person per appetizer selection
- **Interface:** Toggle buttons with visual cards
  - Button grid showing all appetizer options
  - Multi-select (tap to add/remove)
  - Visual indicator (highlighted border or checkmark) for selected items
  - Counter badge showing total appetizers selected
  - Real-time cost update
- **Options:** Bruschetta, spring rolls, meatballs, shrimp cocktail, sliders, caprese skewers
- **Calculation:** (Number of appetizer types × $6) × guest count
- **Example:** 3 appetizers × $6 × 150 guests = $2,700

---

## 3.3 Beverage Packages

**Selection Type:** Radio buttons (choose one package)  
**Validation:** Optional but recommended

### Package Options:

**Option 1: Beer & Wine Package**
- **Price:** $45.00 per person
- **Includes:** 
  - Domestic and imported beer selection
  - Red and white wine selection
  - 4-hour bar service

**Option 2: Premium Beer, Wine & Liquor Package**
- **Price:** $55.00 per person
- **Includes:**
  - Premium beer selection
  - Premium wine selection
  - Full liquor bar (well brands)
  - 4-hour bar service

**Option 3: Premium Liquor Package**
- **Price:** $65.00 per person
- **Includes:**
  - Premium craft beer selection
  - Premium wine selection
  - Top-shelf liquor brands
  - 5-hour bar service

**Option 4: No Bar Service**
- **Price:** $0.00
- **Note:** BYOB policy may apply

**Business Logic:**
- Only one beverage package can be selected
- Calculate: (Package price per person) × guest count
- Subject to 20% service fee (see section 3.6)

---

## 3.4 Add-On Services

### 3.4.1 Floral Packages

**Selection Type:** Radio buttons or dropdown (choose one or none)  
**Validation:** Optional

**Package Options:**
- **Intimate Package:** $1,500
  - Bridal bouquet
  - 4 bridesmaid bouquets
  - 5 boutonnieres
  - Centerpieces for up to 10 tables
  
- **Classic Package:** $2,500
  - Everything in Intimate package
  - Ceremony arch/backdrop flowers
  - Cocktail area arrangements
  - Centerpieces for up to 15 tables
  
- **Elegant Package:** $5,000
  - Everything in Classic package
  - Premium flower varieties
  - Large ceremony installations
  - Head table arrangements
  - Centerpieces for up to 25 tables
  - Escort card display arrangement
  
- **Luxury Package:** $10,000
  - Everything in Elegant package
  - Premium imported flowers
  - Multiple ceremony installations
  - Elaborate room transformations
  - Ceiling installations/chandeliers
  - Custom floral design consultation

**Business Logic:**
- Fixed package pricing (not per person)
- Cannot select multiple packages
- No service fee applied to floral packages

### 3.4.2 Photography Service

**Selection Type:** Checkbox  
**Price:** $3,500 (flat rate)

**Includes:**
- 8 hours of coverage
- 2 photographers
- Digital gallery of 500+ edited images
- Online gallery for sharing
- Print release

**Business Logic:**
- Fixed pricing regardless of guest count
- Optional add-on
- No service fee applied

### 3.4.3 Wedding Planner Service

**Selection Type:** Checkbox  
**Price:** $2,500 (flat rate)

**Includes:**
- Day-of coordination
- Timeline creation
- Vendor management
- Setup supervision
- Guest assistance

**Business Logic:**
- Fixed pricing regardless of guest count
- Optional add-on
- Automatically included FREE with Full Package (see section 3.5)
- No service fee applied

### 3.4.4 DJ Service

**Selection Type:** Checkbox  
**Price:** $2,500 (flat rate)

**Includes:**
- 5 hours of service
- Professional sound system
- Wireless microphones (2)
- Dance floor lighting
- Music consultation

**Business Logic:**
- Fixed pricing regardless of guest count
- Optional add-on
- No service fee applied

---

## 3.5 Package Bundling

### 3.5.1 Full Wedding Package

**Trigger Conditions:**
The system should automatically detect when all of the following are selected:
1. Premium Event Cap venue rental
2. Food package (choice of 2 proteins)
3. Any beverage package
4. At least 3 of the following add-ons:
   - Floral package (any tier)
   - Photography
   - DJ

**Package Benefits:**
1. **Included:** Wedding planner service (normally $2,500) - FREE
2. **Discount:** 10% off total package price (after service fees)

**Business Logic:**
- System should display "Full Package Discount Eligible" banner when conditions are met
- Wedding planner checkbox becomes checked and disabled when package triggers
- Display savings calculation prominently
- Apply discount after service fees are calculated

### 3.5.2 Custom Package Configuration

**Alternative Flow:**
Users can build custom packages without triggering full package discount:
- Select any venue option
- À la carte food and beverage selection
- Optional add-ons as needed

---

## 3.6 Service Fee Calculation

### 3.6.1 Service Fee Rules

**Rate:** 20% of food and beverage subtotal

**Applied To:**
- All catering items (proteins, sides, appetizers)
- All beverage packages
- Any food/beverage add-ons

**NOT Applied To:**
- Venue rental fees (hourly or Premium Event Cap)
- Floral packages
- Photography service
- Wedding planner service
- DJ service

### 3.6.2 Calculation Logic

```
Food & Beverage Subtotal = 
  (Average protein price × guest count) +
  (Additional sides count × $8 × guest count) +
  (Passed appetizers count × $6 × guest count) +
  (Selected beverage package price × guest count)

Service Fee = Food & Beverage Subtotal × 0.20

Food & Beverage Total = Food & Beverage Subtotal + Service Fee
```

---

## 3.7 Sales Tax Calculation

### 3.7.1 Location
**Venue Location:** Nevada County, California

### 3.7.2 Tax Rates

**Nevada County Sales Tax Rate:** 7.75% - 8.875% (varies by city)

**Rate by City:**
- Grass Valley: 8.875%
- Nevada City: 8.875%
- Truckee: 9.00%
- Other unincorporated areas: 7.75%

**Default Rate for Calculation:** 7.75% (base county rate)

**Configuration:** System should allow admin to set specific tax rate based on venue location

### 3.7.3 Taxability Rules (California)

Per California Department of Tax and Fee Administration guidelines for caterers and venues:

**TAXABLE Items:**
✅ Venue rental (real property rental for events)
✅ Catering services (food and beverage)
✅ Service fees and gratuities
✅ Equipment rental (tables, chairs, linens)
✅ DJ services (tangible property rental - sound equipment)
✅ Floral services (tangible personal property)

**NON-TAXABLE Items:**
❌ Photography services (professional services, not tangible goods)
❌ Wedding planning services (professional services)

### 3.7.4 Tax Calculation Logic

```
Taxable Subtotal = 
  Venue Rental Cost +
  Food & Beverage Total (including 20% service fee) +
  Floral Package Cost +
  DJ Service Cost

Non-Taxable Subtotal =
  Photography Service +
  Wedding Planner Service

Sales Tax Amount = Taxable Subtotal × Tax Rate (7.75% default)

Grand Total = Taxable Subtotal + Non-Taxable Subtotal + Sales Tax Amount
```

**Example Calculation (150 guests, Peak Saturday):**
```
TAXABLE ITEMS:
Venue (Premium Event Cap)                      $10,000.00
Food & Beverage Total (w/ service fee)         $33,120.00
Floral (Elegant Package)                       $5,000.00
DJ Service                                     $2,500.00
─────────────────────────────────────────────────────────
Taxable Subtotal                               $50,620.00

NON-TAXABLE ITEMS:
Photography                                    $3,500.00
Wedding Planner                                $0.00 (FREE)
─────────────────────────────────────────────────────────
Non-Taxable Subtotal                           $3,500.00

SALES TAX (7.75% on taxable items)             $3,923.05

SUBTOTAL BEFORE DISCOUNT                       $57,543.05
Full Package Discount (10%)                    -$5,754.31
─────────────────────────────────────────────────────────
ESTIMATED TOTAL                                $51,788.74
```

### 3.7.5 Tax Display Requirements

**Throughout Cart:**
- Display "(+ tax)" notation on all taxable items
- Show "tax-exempt" or "tax included" where applicable
- Never include tax in displayed item prices (show tax separately)

**In Final Summary:**
- Line item: "Sales Tax (7.75% on taxable items)"
- Tooltip explaining what is/isn't taxable
- Link to full tax breakdown if customer wants details

**On Quote/Invoice:**
- Clearly separate taxable and non-taxable items
- Show tax rate used
- Show tax calculation formula
- Note: "Tax rate based on Nevada County, CA venue location"

---

## 4. Pricing Calculation Engine

### 4.1 Total Cost Breakdown Structure

The system must calculate and display pricing in the following structure:

```
VENUE RENTAL (+ tax)
├─ Venue Type: [Single Room / Partial / Full Building / Premium Event Cap]
├─ Date: [Selected Date] ([Season])
├─ Day: [Day of Week]
├─ Duration: [Hours] (if hourly)
└─ Venue Subtotal: $[Amount]

CATERING (includes salad & dessert) (+ tax)
├─ Guest Count: [Number]
├─ Protein 1: [Name] @ $[XX]/person = $[Amount]
├─ Protein 2: [Name] @ $[XX]/person = $[Amount]
├─ Average Meal Cost: $[XX]/person × [Guests] = $[Amount]
├─ Additional Sides: [Number] × $8/person × [Guests] = $[Amount]
├─ Passed Appetizers: [Number] × $6/person × [Guests] = $[Amount]
└─ Catering Subtotal: $[Amount]

BEVERAGES (+ tax)
├─ Package: [Selected Package Name]
├─ Price per Person: $[Amount]
└─ Beverages Subtotal: $[Amount]

FOOD & BEVERAGE SERVICE FEE (20%) (+ tax)
└─ Service Fee: $[Amount]

FOOD & BEVERAGE TOTAL: $[Amount]

ADD-ON SERVICES
├─ Floral Package: $[Amount] (if selected) (+ tax)
├─ Photography: $3,500 (if selected) (tax-exempt professional service)
├─ Wedding Planner: $2,500 (if selected) (tax-exempt professional service) [FREE with Full Package]
└─ DJ Service: $2,500 (if selected) (+ tax)

ADD-ONS SUBTOTAL: $[Amount]

──────────────────────────────────────────────
TAXABLE ITEMS SUBTOTAL: $[Amount]
NON-TAXABLE ITEMS SUBTOTAL: $[Amount]

SALES TAX (Nevada County, CA - 7.75%): $[Amount]

SUBTOTAL (before discounts): $[Amount]

FULL PACKAGE DISCOUNT (10%): -$[Amount] (if applicable)

──────────────────────────────────────────────
ESTIMATED TOTAL: $[Amount]
```

### 4.2 Real-Time Calculation Requirements

- All price updates must occur in real-time as user makes selections
- Calculations must be visible on-screen at all times (sticky sidebar or summary box)
- Changes to guest count must immediately recalculate all per-person items
- Date changes must immediately update venue pricing
- Package discount eligibility must be checked after each selection

### 4.3 Price Display Format

- All currency displayed as USD
- Format: $X,XXX.XX (comma separators, 2 decimal places)
- Display per-person pricing alongside totals where applicable
- Example: "Beer & Wine Package: $45/person × 100 guests = $4,500.00"

---

## 5. User Interface Requirements

### 5.1 Overall Layout

**Recommended Structure:** Multi-step wizard with progress indicator

**Steps:**
1. Event Details (Date, Guest Count, Venue)
2. Catering (Proteins, Sides, Appetizers)
3. Beverages (Bar Packages)
4. Add-Ons (Floral, Photo, DJ, Planner)
5. Review & Quote

**Persistent Elements:**
- Progress bar showing current step
- Price summary sidebar (sticky)
- "Save Progress" button (optional)
- "Previous" and "Next" navigation buttons

### 5.2 Step 1: Event Details

**Components:**

- **Date Picker**
  - Large calendar interface with month view
  - Highlight unavailable dates (grayed out)
  - Color-coded season indicators:
    - Off-Peak (Jan-Feb): Blue/Cool colors
    - Shoulder (Mar-Apr, Nov): Orange/Warm colors  
    - Peak (May-Oct, Dec): Gold/Premium colors
  - Display season pricing tier badge on date selection
  - Hover tooltip showing pricing tier

- **Guest Count Selector**
  - Horizontal slider (20-500 guests)
    - Visual range with tick marks every 50 guests
    - Large draggable handle
    - Responsive to click anywhere on track
  - Numeric input field (for precise entry)
  - +/- buttons (increment/decrement by 5)
  - Large display showing current count: "150 Guests"
  - Capacity recommendation based on count

- **Venue Space Selection**
  - Large visual button cards with venue images
  - Radio button selection between:
    1. Hourly Rental (Single Room / Partial / Full Building)
    2. Premium Event Cap
  - If "Hourly Rental" selected:
    - Show secondary button group for space size
    - Duration slider appears (3-12 hours)
      - Slider with hour markers
      - +/- buttons for fine control
      - Display: "5 Hours"
  - If "Premium Event Cap" selected:
    - Duration selector hidden
    - Show "All-day access included" badge
  - Real-time calculated venue cost displayed below selection

**Validation:**
- Cannot proceed without date, guest count, and venue selection
- Display error messages inline with icons
- Highlight required fields with border color
- Disable "Next" button until all required fields complete

### 5.3 Step 2: Catering

**Components:**
- **Protein Selection** (must select exactly 2)
  - Large visual button cards in 2×2 grid
  - Each card displays:
    - Protein image
    - "[Protein Name]"
    - "$XX per person"
    - "Includes salad & dessert"
  - Selection state: Outlined border when selected, solid background
  - Validation message if ≠ 2 selected
  - Display running average when 2 are selected
  - Disable remaining options when 2 are selected (or show max selections reached)

- **Additional Sides Section**
  - Section toggle switch: "Add Extra Sides?" (ON/OFF)
  - When enabled: Grid of toggle buttons for each side option
  - Each button shows side name and visual indicator when selected
  - Counter display: "X sides selected @ $8/person each"
  - Real-time cost calculation below buttons

- **Passed Appetizers Section**
  - Section toggle switch: "Add Passed Appetizers?" (ON/OFF)
  - When enabled: Grid of toggle buttons for each appetizer option
  - Each button shows appetizer name with image/icon
  - Visual indicator when selected
  - Counter display: "X appetizers selected @ $6/person each"
  - Real-time cost calculation below buttons

**Price Display:**
- Show individual protein prices: "Chicken: $80/person, Fish: $90/person"
- Show average meal cost: "Average meal cost: $85/person"
- Show base catering total: "$85 × 150 guests = $12,750"
- Show sides total (if any): "2 sides × $8 × 150 = $2,400"
- Show appetizers total (if any): "3 appetizers × $6 × 150 = $2,700"
- Show catering subtotal with all components
- Update all totals in real-time as selections change
- Clearly indicate salad and dessert are included in base price

### 5.4 Step 3: Beverages

**Components:**
- **Bar Package Selection** (choose one)
  - Large visual button cards in vertical stack or horizontal row
  - Radio button behavior (only one can be selected)
  - Each card displays:
    - Package name
    - "$XX per person"
    - Bullet list of what's included
    - Duration of service
  - Selection state: Solid border/background when active
  - Option for "No Bar Service" button (default/deselect state)

**Price Display:**
- Per-person cost prominently displayed on each card
- Total cost for guest count: "$65 × 150 guests = $9,750"
- Note: "Subject to 20% service fee and sales tax"
- Real-time update when package changed or guest count adjusted

### 5.5 Step 4: Add-Ons

**Components:**

- **Floral Package Selection**
  - Large visual button cards showing each tier
  - Radio button behavior (choose one or none)
  - Each card displays:
    - Package name and price
    - Image of sample arrangements
    - What's included (bullet list)
  - "Skip Floral" or "No Floral" button option
  - Selection state: Highlighted border when active

- **Service Add-Ons**
  - Large toggle buttons for each service
  - Each button shows:
    - Service icon/image
    - Service name
    - Price
    - Tax notation (taxable or tax-exempt)
    - Brief description
  - Visual state changes:
    - OFF: Gray/neutral with "Add" indicator
    - ON: Brand color with checkmark
  - Photography button: "$3,500 (tax-exempt)"
  - Wedding Planner button: "$2,500 (tax-exempt)" or "FREE - Included!" if Full Package
  - DJ button: "$2,500 (+ tax)"

**Visual Indicators:**
- Prominent "Full Package Discount Eligible - Save 10%!" badge when conditions met
- Show exact savings amount: "You'll save $5,412!"
- Display which items trigger the discount
- Progress indicator showing "X of 3 add-ons selected"
- Animated transition when discount activates

### 5.6 Step 5: Review & Quote

**Components:**
- Complete itemized breakdown (as specified in section 4.1)
- Editable summary with links back to each section
- Terms and conditions checkbox
- Contact form for quote request:
  - Name
  - Email
  - Phone
  - Message/Notes
  - Preferred contact method
- "Request Quote" or "Book Consultation" button

**Additional Features:**
- "Download PDF Quote" button
- "Email Quote to Me" button
- "Start Over" button
- Social sharing buttons (optional)

### 5.7 Mobile Responsiveness

- Entire cart must be fully responsive
- Price summary sidebar converts to expandable footer on mobile
- Touch-friendly button sizes (minimum 44×44px tap target)
- Single column layout on mobile
- Simplified date picker for touch interfaces
- Sliders optimized for touch:
  - Larger drag handles (minimum 44px)
  - Increased touch area around slider track
  - Haptic feedback on selection changes (if supported)
- Button grids convert to vertical stacks on mobile
- Collapsible sections to reduce scrolling

### 5.8 Interactive Controls Summary

**Sliders Used For:**
- Guest count selection (20-500)
- Event duration for hourly rentals (3-12 hours)

**Large Toggle Buttons Used For:**
- Venue space type selection (Single/Partial/Full/Premium)
- Protein selection (must select 2)
- Bar package selection (choose one)
- Floral package selection (choose one)
- Service add-ons (Photography, Planner, DJ)
- Side dishes (multi-select)
- Passed appetizers (multi-select)

**Standard Buttons:**
- +/- increment buttons next to sliders
- Navigation: "Previous Step" / "Next Step"
- "Add to Cart" / "Request Quote"
- "Save Progress" / "Start Over"

**Toggle Switches:**
- "Add Extra Sides?" section enable/disable
- "Add Passed Appetizers?" section enable/disable

**Visual Feedback:**
- All buttons show hover state
- Selected state clearly indicated (color change, checkmark, border)
- Disabled state (grayed out) when options unavailable
- Loading state for price calculations
- Smooth transitions between states (200ms)

---

## 6. Data Structure

### 6.1 Cart State Object

The application should maintain a cart state object with the following structure:

```javascript
{
  eventDetails: {
    date: "2026-06-15",
    dayOfWeek: "Saturday",
    season: "peak",
    guestCount: 150,
    venueType: "premiumEventCap", // or "singleRoom", "partialBuilding", "fullBuilding"
    duration: null, // hours, only for hourly rentals
    venueCost: 10000
  },
  
  catering: {
    proteins: [
      { id: "chicken", name: "Herb Roasted Chicken", pricePerPerson: 80 },
      { id: "fish", name: "Pan-Seared Salmon", pricePerPerson: 90 }
    ], // array of exactly 2
    averageProteinPrice: 85, // (80 + 90) / 2
    baseCateringCost: 12750, // $85/person × 150
    includesSaladAndDessert: true,
    sides: {
      enabled: true,
      selections: ["caesar-salad", "roasted-vegetables"],
      count: 2,
      costPerPerson: 8,
      total: 2400 // 2 × $8 × 150
    },
    appetizers: {
      enabled: true,
      selections: ["bruschetta", "spring-rolls", "sliders"],
      count: 3,
      costPerPerson: 6,
      total: 2700 // 3 × $6 × 150
    },
    cateringSubtotal: 17850 // baseCateringCost + sides + appetizers
  },
  
  beverages: {
    package: "premium-liquor", // or "beer-wine", "premium", null
    pricePerPerson: 65,
    total: 9750 // $65 × 150
  },
  
  serviceFee: {
    subtotal: 27600, // catering (17850) + beverages (9750)
    rate: 0.20,
    amount: 5520 // 27600 × 0.20
  },
  
  addOns: {
    floral: {
      selected: true,
      package: "elegant",
      cost: 5000
    },
    photography: {
      selected: true,
      cost: 3500
    },
    weddingPlanner: {
      selected: true,
      cost: 2500,
      isFree: true // true if part of full package
    },
    dj: {
      selected: true,
      cost: 2500
    },
    addOnsSubtotal: 13500 // or 11000 if planner is free
  },
  
  pricing: {
    venueTotal: 10000,
    foodBeverageSubtotal: 27600,
    serviceFeeAmount: 5520,
    foodBeverageTotal: 33120,
    addOnsTotal: 11000,
    taxableSubtotal: 50620, // venue + F&B + floral (5000) + DJ (2500)
    nonTaxableSubtotal: 3500, // photography only (planner is free)
    salesTax: {
      rate: 0.0775, // 7.75% Nevada County base rate
      taxableAmount: 50620,
      taxAmount: 3923.05
    },
    subtotalBeforeDiscount: 57543.05,
    fullPackageDiscount: {
      eligible: true,
      rate: 0.10,
      amount: 5754.31, // 10% of subtotal including tax
      appliedAfterTax: true
    },
    grandTotal: 51788.74
  },
  
  fullPackageEligible: true,
  
  contactInfo: {
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email"
  }
}
```

### 6.2 Pricing Configuration Data

Create a separate configuration file for all pricing data to allow easy updates without code changes:

```javascript
// pricing-config.js
export const VENUE_PRICING = {
  offPeak: {
    months: [1, 2], // January, February
    singleRoom: {
      monThu: 150, friday: 175, saturday: 200, sunday: 175
    },
    partialBuilding: {
      monThu: 250, friday: 300, saturday: 350, sunday: 325
    },
    fullBuilding: {
      monThu: 900, friday: 950, saturday: 1000, sunday: 950
    },
    premiumEventCap: {
      monThu: 5000, friday: 6000, saturday: 7000, sunday: 6500
    }
  },
  shoulder: {
    months: [3, 4, 11], // March, April, November
    singleRoom: {
      monThu: 175, friday: 200, saturday: 225, sunday: 200
    },
    partialBuilding: {
      monThu: 300, friday: 350, saturday: 400, sunday: 350
    },
    fullBuilding: {
      monThu: 950, friday: 1000, saturday: 1100, sunday: 1000
    },
    premiumEventCap: {
      monThu: 6500, friday: 8000, saturday: 9000, sunday: 8500
    }
  },
  peak: {
    months: [5, 6, 7, 8, 9, 10, 12], // May-Oct, December
    singleRoom: {
      monThu: 200, friday: 225, saturday: 250, sunday: 225
    },
    partialBuilding: {
      monThu: 350, friday: 400, saturday: 450, sunday: 400
    },
    fullBuilding: {
      monThu: 1000, friday: 1100, saturday: 1200, sunday: 1100
    },
    premiumEventCap: {
      monThu: 7500, friday: 9000, saturday: 10000, sunday: 9500
    }
  }
};

export const CATERING = {
  includesSaladAndDessert: true,
  proteins: [
    { 
      id: "vegetarian", 
      name: "Vegetarian Option", 
      pricePerPerson: 70,
      description: "Seasonal vegetable entrée with house salad and dessert",
      examples: ["Eggplant Parmesan", "Vegetable Lasagna", "Stuffed Portobello"]
    },
    { 
      id: "chicken", 
      name: "Chicken", 
      pricePerPerson: 80,
      description: "Expertly prepared chicken with house salad and dessert",
      examples: ["Herb Roasted Chicken", "Chicken Marsala", "Chicken Piccata"]
    },
    { 
      id: "fish", 
      name: "Fish", 
      pricePerPerson: 90,
      description: "Fresh fish selection with house salad and dessert",
      examples: ["Pan-Seared Salmon", "Grilled Sea Bass", "Herb-Crusted Tilapia"]
    },
    { 
      id: "steak", 
      name: "Steak", 
      pricePerPerson: 100,
      description: "Premium steak with house salad and dessert",
      examples: ["Filet Mignon", "Ribeye", "NY Strip"]
    }
  ],
  sides: {
    pricePerPerson: 8,
    description: "Additional side dishes beyond salad",
    options: [
      { id: "roasted-vegetables", name: "Roasted Seasonal Vegetables" },
      { id: "garlic-mashed", name: "Garlic Mashed Potatoes" },
      { id: "rice-pilaf", name: "Rice Pilaf" },
      { id: "mac-cheese", name: "Truffle Mac & Cheese" },
      { id: "asparagus", name: "Grilled Asparagus" }
    ]
  },
  appetizers: {
    pricePerPerson: 6,
    description: "Passed appetizers during cocktail hour",
    options: [
      { id: "bruschetta", name: "Bruschetta" },
      { id: "spring-rolls", name: "Vegetable Spring Rolls" },
      { id: "meatballs", name: "Italian Meatballs" },
      { id: "shrimp", name: "Shrimp Cocktail" },
      { id: "sliders", name: "Mini Sliders" },
      { id: "caprese", name: "Caprese Skewers" }
    ]
  }
};

export const BEVERAGES = {
  packages: [
    {
      id: "beer-wine",
      name: "Beer & Wine Package",
      pricePerPerson: 45,
      includes: ["Domestic and imported beer", "Red and white wine", "4-hour service"]
    },
    {
      id: "premium",
      name: "Premium Beer, Wine & Liquor",
      pricePerPerson: 55,
      includes: ["Premium beer", "Premium wine", "Full liquor bar", "4-hour service"]
    },
    {
      id: "premium-liquor",
      name: "Premium Liquor Package",
      pricePerPerson: 65,
      includes: ["Craft beer", "Premium wine", "Top-shelf liquor", "5-hour service"]
    }
  ]
};

export const ADD_ONS = {
  floral: [
    { id: "intimate", name: "Intimate Package", price: 1500, description: "..." },
    { id: "classic", name: "Classic Package", price: 2500, description: "..." },
    { id: "elegant", name: "Elegant Package", price: 5000, description: "..." },
    { id: "luxury", name: "Luxury Package", price: 10000, description: "..." }
  ],
  services: {
    photography: { price: 3500, description: "..." },
    weddingPlanner: { price: 2500, description: "..." },
    dj: { price: 2500, description: "..." }
  }
};

export const FEES = {
  serviceFeeRate: 0.20, // 20%
  appliesToCategories: ["catering", "beverages"],
  salesTax: {
    rate: 0.0775, // 7.75% - Nevada County CA base rate
    location: "Nevada County, California",
    taxableCategories: ["venue", "catering", "beverages", "serviceFee", "floral", "dj"],
    nonTaxableCategories: ["photography", "weddingPlanner"]
  }
};

export const PACKAGES = {
  fullPackage: {
    discountRate: 0.10, // 10%
    requirements: {
      venueType: "premiumEventCap",
      mustHaveCatering: true,
      mustHaveBeverage: true,
      minimumAddOns: 3,
      validAddOns: ["floral", "photography", "dj"]
    },
    includes: {
      freeWeddingPlanner: true
    }
  }
};
```

---

## 7. Complete Pricing Calculation Example

### 7.1 Sample Quote Calculation

**Event Details:**
- Date: Saturday, June 15, 2026 (Peak Season)
- Guest Count: 150
- Venue: Premium Event Cap

**Step-by-Step Calculation:**

```
1. VENUE RENTAL (TAXABLE)
   Premium Event Cap - Peak Saturday              $10,000.00

2. CATERING (TAXABLE)
   Selected Proteins:
   - Chicken ($80/person)
   - Fish ($90/person)
   - Average: ($80 + $90) ÷ 2 = $85/person
   
   Base Catering: $85 × 150 guests                $12,750.00
   Additional Sides: 2 × $8 × 150                 $2,400.00
   Passed Appetizers: 3 × $6 × 150                $2,700.00
   ─────────────────────────────────────────────
   Catering Subtotal                              $17,850.00

3. BEVERAGES (TAXABLE)
   Premium Liquor Package: $65 × 150              $9,750.00

4. SERVICE FEE (TAXABLE)
   20% on Food & Beverage: $27,600 × 0.20         $5,520.00
   ─────────────────────────────────────────────
   Food & Beverage Total                          $33,120.00

5. ADD-ON SERVICES
   Floral - Elegant Package (TAXABLE)             $5,000.00
   Photography (NON-TAXABLE)                      $3,500.00
   Wedding Planner (NON-TAXABLE)                  FREE
   DJ Service (TAXABLE)                           $2,500.00
   ─────────────────────────────────────────────
   Add-Ons Subtotal                               $11,000.00

6. TAX CALCULATION
   Taxable Items:
   - Venue                           $10,000.00
   - Food & Beverage Total           $33,120.00
   - Floral                          $5,000.00
   - DJ                              $2,500.00
   ─────────────────────────────────────────────
   Taxable Subtotal                               $50,620.00
   
   Non-Taxable Items:
   - Photography                     $3,500.00
   - Wedding Planner                 $0.00
   ─────────────────────────────────────────────
   Non-Taxable Subtotal                           $3,500.00
   
   Sales Tax (7.75% on taxable items)
   $50,620.00 × 0.0775                            $3,923.05

7. TOTALS
   Subtotal (before discount)                     $57,543.05
   Full Package Discount (10%)                    -$5,754.31
   ═════════════════════════════════════════════
   GRAND TOTAL                                    $51,788.74
```

**Itemized Invoice Display:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STONE HOUSE VENUE - WEDDING QUOTE
Event Date: Saturday, June 15, 2026
Guest Count: 150
Quote #: WQ-2026-0001
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VENUE RENTAL
─────────────────────────────────────────────
Premium Event Cap                   $10,000.00
Peak Season - Saturday

CATERING (includes salad & dessert)
─────────────────────────────────────────────
Herb Roasted Chicken                     $80/person
Pan-Seared Salmon                        $90/person
Average Meal Cost                        $85/person
  $85 × 150 guests                   $12,750.00

Additional Sides (2 selections)
  $8 × 2 × 150 guests                 $2,400.00
  - Garlic Mashed Potatoes
  - Roasted Seasonal Vegetables

Passed Appetizers (3 selections)
  $6 × 3 × 150 guests                 $2,700.00
  - Bruschetta
  - Spring Rolls
  - Mini Sliders

BEVERAGES
─────────────────────────────────────────────
Premium Liquor Package                   $65/person
  $65 × 150 guests                    $9,750.00
  Includes: Craft beer, premium wine,
  top-shelf liquor, 5-hour service

SERVICE FEE (20%)
─────────────────────────────────────────────
20% of Food & Beverage                 $5,520.00

ADD-ON SERVICES
─────────────────────────────────────────────
Elegant Floral Package                 $5,000.00
Professional Photography              $3,500.00 †
Wedding Planning Service                   FREE ★
DJ Entertainment                       $2,500.00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRICING SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Taxable Items Subtotal                $50,620.00
Non-Taxable Items Subtotal             $3,500.00

Sales Tax (7.75%)                      $3,923.05
  Nevada County, CA

Subtotal                              $57,543.05

★ FULL PACKAGE SAVINGS (10%)          -$5,754.31
  You qualified for our Full Package Discount!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ESTIMATED TOTAL                       $51,788.74
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

† Tax-exempt professional service
★ Included with Full Package
```

---

## 8. Technical Architecture

### 8.1 Frontend Framework

**Recommended:** React, Vue.js, or vanilla JavaScript with modular components

**Key Libraries:**
- Date picker: react-datepicker, flatpickr, or native HTML5
- Form validation: Formik, Vee-Validate, or custom validation
- State management: React Context, Vuex, or Redux (for complex implementations)
- Range sliders: rc-slider, noUiSlider, or native HTML5 input[type="range"]
- PDF generation: jsPDF or PDFMake (for downloadable quotes)
- Currency formatting: Intl.NumberFormat or accounting.js

### 8.2 Backend Requirements

**API Endpoints Needed:**

```
POST /api/wedding-quote
- Accepts: Full cart state object
- Validates: All calculations server-side
- Recalculates: Pricing and tax to prevent manipulation
- Returns: { quoteId, confirmedTotal, quoteNumber }
- Stores: Quote in database for follow-up

POST /api/check-availability
- Accepts: { date, venueType }
- Returns: { available: boolean, alternativeDates: [], pricing: {...} }

GET /api/pricing-config
- Returns: Current pricing configuration including tax rates
- Allows dynamic pricing updates without frontend changes
- Response includes: venue rates, catering prices, add-on prices, tax rates

GET /api/tax-rate
- Accepts: { zipCode, city } (optional - defaults to venue location)
- Returns: { 
    rate: 0.0775, 
    location: "Nevada County, CA",
    city: "Grass Valley",
    breakdown: {
      state: 0.06,
      county: 0.0025,
      local: 0.015
    },
    taxableCategories: [...],
    nonTaxableCategories: [...]
  }
- Allows accurate tax calculation based on specific venue location

POST /api/calculate-quote
- Accepts: Cart state object
- Returns: Complete pricing breakdown with all fees and taxes calculated
- Used for real-time calculation validation
- Prevents client-side calculation tampering

POST /api/send-quote-email
- Accepts: { quoteId, email }
- Sends: PDF quote to customer email
- Returns: Confirmation of email sent

GET /api/blocked-dates
- Returns: Array of blocked/unavailable dates
- Used by date picker to disable dates
```

### 8.3 Database Schema

**Table: wedding_quotes**

```sql
CREATE TABLE wedding_quotes (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  venue_type VARCHAR(50),
  venue_cost DECIMAL(10,2),
  catering_details JSONB, -- stores protein selections, prices, sides, appetizers
  average_meal_cost DECIMAL(10,2),
  beverage_package VARCHAR(50),
  beverage_cost DECIMAL(10,2),
  service_fee DECIMAL(10,2),
  add_ons JSONB,
  full_package_discount DECIMAL(10,2),
  grand_total DECIMAL(10,2),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  customer_message TEXT,
  sales_tax_rate DECIMAL(5,4), -- e.g., 0.0775 for 7.75%
  sales_tax_amount DECIMAL(10,2),
  taxable_subtotal DECIMAL(10,2),
  non_taxable_subtotal DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending', -- pending, contacted, booked, cancelled
  cart_state JSONB, -- full cart object for reference
  INDEX(event_date),
  INDEX(customer_email),
  INDEX(status),
  INDEX(created_at)
);
```

**Table: blocked_dates**

```sql
CREATE TABLE blocked_dates (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  reason TEXT,
  venue_type VARCHAR(50), -- if only specific venue types are blocked
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 8.4 Calculation Engine Functions

**Required JavaScript Functions:**

```javascript
// Calculate season based on date
function getSeasonFromDate(date) {
  const month = date.getMonth() + 1; // 1-12
  if ([1, 2].includes(month)) return 'offPeak';
  if ([3, 4, 11].includes(month)) return 'shoulder';
  return 'peak'; // 5,6,7,8,9,10,12
}

// Calculate day tier for pricing
function getDayTier(date) {
  const day = date.getDay(); // 0=Sun, 6=Sat
  if (day === 6) return 'saturday';
  if (day === 5) return 'friday';
  if (day === 0) return 'sunday';
  return 'monThu'; // 1-4
}

// Calculate venue cost
function calculateVenueCost(date, venueType, duration = null) {
  const season = getSeasonFromDate(date);
  const dayTier = getDayTier(date);
  const rate = VENUE_PRICING[season][venueType][dayTier];
  
  if (venueType === 'premiumEventCap') {
    return rate; // flat rate
  } else {
    return rate * Math.max(duration, 3); // minimum 3 hours
  }
}

// Calculate average protein price
function calculateAverageProteinPrice(protein1, protein2) {
  const prices = {
    vegetarian: 70,
    chicken: 80,
    fish: 90,
    steak: 100
  };
  return (prices[protein1] + prices[protein2]) / 2;
}

// Calculate catering total
function calculateCateringTotal(proteins, guestCount, sides, appetizers) {
  const avgProteinPrice = calculateAverageProteinPrice(proteins[0], proteins[1]);
  const baseCatering = avgProteinPrice * guestCount;
  const sidesTotal = sides.length * 8 * guestCount;
  const appetizersTotal = appetizers.length * 6 * guestCount;
  
  return baseCatering + sidesTotal + appetizersTotal;
}

// Calculate beverage total
function calculateBeverageTotal(packageType, guestCount) {
  const prices = {
    'beer-wine': 45,
    'premium': 55,
    'premium-liquor': 65
  };
  return packageType ? prices[packageType] * guestCount : 0;
}

// Calculate service fee
function calculateServiceFee(cateringTotal, beverageTotal) {
  return (cateringTotal + beverageTotal) * 0.20;
}

// Determine tax rate based on location
function getTaxRate(city = 'unincorporated') {
  const rates = {
    'grass-valley': 0.08875,
    'nevada-city': 0.08875,
    'truckee': 0.09,
    'unincorporated': 0.0775
  };
  return rates[city] || 0.0775;
}

// Calculate sales tax
function calculateSalesTax(cartState, taxRate) {
  const taxableItems = 
    cartState.venueCost +
    cartState.cateringTotal +
    cartState.beverageTotal +
    cartState.serviceFee +
    (cartState.addOns.floral?.cost || 0) +
    (cartState.addOns.dj?.cost || 0);
  
  return taxableItems * taxRate;
}

// Check full package eligibility
function isFullPackageEligible(cartState) {
  const isPremiumCap = cartState.venueType === 'premiumEventCap';
  const hasCatering = cartState.catering.proteins.length === 2;
  const hasBeverage = cartState.beverages.package !== null;
  
  const addOnCount = [
    cartState.addOns.floral?.selected,
    cartState.addOns.photography?.selected,
    cartState.addOns.dj?.selected
  ].filter(Boolean).length;
  
  return isPremiumCap && hasCatering && hasBeverage && addOnCount >= 3;
}

// Calculate full package discount
function calculateFullPackageDiscount(subtotalWithTax, isEligible) {
  return isEligible ? subtotalWithTax * 0.10 : 0;
}

// Master calculation function
function calculateGrandTotal(cartState) {
  // 1. Calculate all line items
  const venueCost = calculateVenueCost(cartState.date, cartState.venueType, cartState.duration);
  const cateringTotal = calculateCateringTotal(
    cartState.catering.proteins,
    cartState.guestCount,
    cartState.catering.sides,
    cartState.catering.appetizers
  );
  const beverageTotal = calculateBeverageTotal(
    cartState.beverages.package,
    cartState.guestCount
  );
  const serviceFee = calculateServiceFee(cateringTotal, beverageTotal);
  
  // 2. Add-ons
  const floralCost = cartState.addOns.floral?.cost || 0;
  const photographyCost = cartState.addOns.photography?.selected ? 3500 : 0;
  const djCost = cartState.addOns.dj?.selected ? 2500 : 0;
  
  const isFullPackage = isFullPackageEligible(cartState);
  const plannerCost = (cartState.addOns.weddingPlanner?.selected && !isFullPackage) ? 2500 : 0;
  
  // 3. Calculate tax
  const taxableSubtotal = venueCost + cateringTotal + beverageTotal + serviceFee + floralCost + djCost;
  const nonTaxableSubtotal = photographyCost + plannerCost;
  const taxRate = getTaxRate(cartState.city);
  const salesTax = taxableSubtotal * taxRate;
  
  // 4. Calculate discount
  const subtotalWithTax = taxableSubtotal + nonTaxableSubtotal + salesTax;
  const discount = calculateFullPackageDiscount(subtotalWithTax, isFullPackage);
  
  // 5. Grand total
  const grandTotal = subtotalWithTax - discount;
  
  return {
    venueCost,
    cateringTotal,
    beverageTotal,
    serviceFee,
    foodBeverageTotal: cateringTotal + beverageTotal + serviceFee,
    taxableSubtotal,
    nonTaxableSubtotal,
    salesTax,
    taxRate,
    subtotalWithTax,
    discount,
    grandTotal,
    breakdown: {
      // ... detailed breakdown for display
    }
  };
}
```

### 8.5 Integration with Existing Booking System

**Requirements:**
- Must integrate with existing Supabase database (per project documentation)
- Should sync with availability checker API
- Quote submissions should create lead records in CRM
- Consider webhook notifications to admin for new quotes

---

## 9. Validation & Error Handling

### 9.1 Client-Side Validation

**Event Details:**
- Date must be future date (minimum 90 days out)
- Date must not be blocked
- Guest count: 20-500 (slider enforces range)
- Venue selection: required
- Duration: 3-12 hours for hourly rentals (slider enforces range)

**Catering:**
- Exactly 2 proteins must be selected (required for wedding packages)
- Each protein has its own per-person pricing ($70-$100)
- Final catering price is the average of the 2 selected proteins
- If sides enabled: at least 1 side must be selected
- If appetizers enabled: at least 1 appetizer must be selected
- All meals include house salad and seasonal dessert

**Beverages:**
- Optional, but warning if hosting 50+ guests without bar service

**Contact Form:**
- Name: required, 2-100 characters
- Email: required, valid email format
- Phone: required, valid phone format
- Message: optional, max 1000 characters

### 9.2 Error Messages

**User-Friendly Language:**
- ❌ "Field is required" 
- ✅ "Please enter your guest count to continue"

- ❌ "Invalid date"
- ✅ "This date is not available. Please choose another date."

- ❌ "Must select 2"
- ✅ "Please select 2 protein options for your catering package"

### 9.3 Edge Cases

**Scenario 1:** User removes items after triggering Full Package discount
- **Behavior:** Immediately recalculate and show discount removed
- **Display:** "Full Package discount removed. Add [X] to qualify again."

**Scenario 2:** Guest count reduced after selections made
- **Behavior:** Recalculate all per-person items
- **Display:** Update totals in real-time

**Scenario 3:** Selected date becomes unavailable (double-booking)
- **Behavior:** Show availability error on submission
- **Display:** "We're sorry, this date is no longer available. Please choose another date."

**Scenario 4:** Pricing configuration changes mid-session
- **Behavior:** Lock pricing from session start, or notify user of price changes
- **Display:** "Our pricing has been updated. Please review your quote."

---

## 10. Admin Panel Requirements

### 10.1 Configuration Management

**Admin Interface Needed For:**

1. **Pricing Management**
   - Update venue hourly rates
   - Update Premium Event Cap rates
   - Modify seasonal date ranges
   - Update catering pricing
   - Update add-on service pricing
   - Set service fee percentage
   - Update sales tax rate
   - Configure taxable vs non-taxable items

2. **Date Management**
   - Block dates for private events
   - Mark dates as unavailable
   - Set capacity limits by date
   - Bulk date blocking (holidays, maintenance)

3. **Quote Management**
   - View all submitted quotes
   - Filter by status, date, price range
   - Export quotes to CSV/Excel
   - Mark quotes as contacted, booked, or cancelled
   - Add internal notes to quotes
   - Send follow-up emails

4. **Content Management**
   - Update protein descriptions and images
   - Update add-on service descriptions
   - Update package descriptions
   - Update terms and conditions

### 10.2 Analytics Dashboard

**Key Metrics to Track:**
- Number of quotes per week/month
- Average quote value
- Most popular venue selection
- Most popular add-ons
- Conversion rate (quotes to bookings)
- Peak quote submission times
- Most popular wedding dates
- Guest count distribution

---

## 11. Email Notifications

### 11.1 Customer Email - Quote Confirmation

**Trigger:** After quote submission  
**Recipients:** Customer email address

**Content:**
- Thank you message
- Quote summary (itemized)
- Quote reference number
- Next steps
- Contact information
- CTA: "Schedule a Tour" or "Book Consultation"
- PDF attachment of full quote

### 11.2 Admin Email - New Quote Notification

**Trigger:** After quote submission  
**Recipients:** Sales team email address

**Content:**
- New quote alert
- Customer contact information
- Event date and guest count
- Total quote value
- Link to admin panel to view full details
- Quick action buttons (Call, Email, View)

### 11.3 Automated Follow-Up

**Optional Enhancement:**
- Send follow-up email after 3 days if no response
- Send reminder email 1 week before automatic expiration
- Birthday/anniversary reminders for past customers

---

## 12. Additional Features & Enhancements

### 12.1 Phase 1 (MVP) - Core Features
✅ All features specified in sections 3-8 above

### 12.2 Phase 2 - Enhanced Features

**Save & Resume:**
- Allow users to save cart and return via unique link
- Email saved quote link to customer
- Cart expires after 30 days

**Seasonal Promotions:**
- Banner for off-peak discounts
- Promotional codes/coupons
- Limited-time offers

**Comparison Tool:**
- Side-by-side package comparison
- "What's included" checklist view
- Cost breakdown comparison

**Virtual Tour Integration:**
- Embed 360° venue tour
- Photo galleries of past weddings
- Sample menu images

**Interactive Calendar:**
- Show available vs booked dates
- Display pricing by hovering over dates
- Color coding for seasons

### 12.3 Phase 3 - Advanced Features

**Payment Integration:**
- Accept deposits via Stripe/Square
- Payment plans for larger bookings
- Digital contract signing (DocuSign)

**Customer Portal:**
- Login to view quote history
- Track booking status
- Upload documents (guest list, song requests)
- Message wedding planner

**Upsell Recommendations:**
- "Customers also added..." suggestions
- "You're $X away from Full Package discount"
- Smart recommendations based on guest count

**A/B Testing:**
- Test different pricing presentations
- Test package descriptions
- Test CTA button copy

---

## 13. Performance Requirements

### 13.1 Speed & Responsiveness
- Initial page load: < 3 seconds
- Price calculations: < 100ms
- Step transitions: < 200ms
- API responses: < 1 second

### 13.2 Browser Compatibility
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### 13.3 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast
- Alt text for all images
- ARIA labels for interactive elements

---

### 13.4 Slider Accessibility

**Requirements for Range Sliders:**
- Keyboard navigation support (arrow keys to adjust)
- ARIA labels: `aria-label="Guest count selector"`
- ARIA values: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Focus indicators clearly visible
- Screen reader announcements on value change
- Alternative input method (number field) always available

---

## 14. Security Considerations

### 14.1 Data Protection
- HTTPS required for all pages
- Input sanitization to prevent XSS
- SQL injection prevention (parameterized queries)
- Rate limiting on API endpoints
- CSRF protection on form submissions

### 14.2 Price Calculation Security

**Critical:** All pricing calculations MUST be validated server-side
- Never trust client-side calculations
- Recalculate entire quote on server before saving
- Compare client-submitted total with server-calculated total
- Flag discrepancies for review
- Prevent price manipulation through browser dev tools

### 14.3 Privacy
- Privacy policy link required
- Clear data usage disclosure
- Option to delete quote data
- No selling of customer information
- GDPR compliance (if applicable)

### 14.4 PCI Compliance
- If accepting payments, PCI-DSS compliance required
- Use tokenization for credit card data
- Never store full credit card numbers

---

## 15. Testing Requirements

### 15.1 Unit Tests
- Test all pricing calculation functions
  - Protein price averaging (2 selections)
  - Per-person calculations with various guest counts
  - Service fee calculation (20%)
  - Sales tax calculation (7.75%)
  - Full package discount calculation (10%)
- Test date season classification
- Test package discount eligibility logic
- Test taxability categorization
- Test tax calculation on mixed taxable/non-taxable items
- Test form validations
- Test slider value constraints (min/max ranges)
- Test button selection limits (exactly 2 proteins, etc.)

### 15.2 Integration Tests
- Test API endpoints
- Test database operations
- Test email sending functionality
- Test PDF generation

### 15.3 User Acceptance Testing
- Test complete user flow (happy path)
- Test edge cases and error scenarios
- Test on multiple devices and browsers
- Test accessibility with screen readers
- Test with real venue staff

### 15.4 Tax Calculation Testing

**Required Test Cases:**
- Verify tax applies only to taxable items
- Test all tax rates (7.75%, 8.875%, 9%)
- Test tax on various cart configurations
- Verify tax exemption for professional services
- Test discount application after tax
- Verify rounding to 2 decimal places
- Test edge case: $0 in taxable items

### 15.5 Load Testing
- Simulate 100 concurrent users
- Test database performance with 10,000+ quotes
- Test API response times under load

---

## 16. Documentation Requirements

### 16.1 User Documentation
- Customer-facing help text/tooltips
- FAQ section about pricing and packages
- Video walkthrough (optional)

### 16.2 Admin Documentation
- Admin panel user guide
- How to update pricing
- How to manage quotes
- How to block dates
- Troubleshooting guide

### 16.3 Developer Documentation
- Code architecture overview
- API documentation
- Database schema documentation
- Deployment instructions
- Environment variables configuration

---

## 17. Deployment & Hosting

### 17.1 Recommended Stack
- **Frontend:** Vercel, Netlify, or AWS S3 + CloudFront
- **Backend:** Node.js on Vercel Functions, AWS Lambda, or dedicated server
- **Database:** Supabase (PostgreSQL) - as per existing project
- **Email:** SendGrid, AWS SES, or Mailgun
- **Analytics:** Google Analytics, Mixpanel, or Plausible

### 17.2 Environment Configuration

**Required Environment Variables:**
```
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Email
SENDGRID_API_KEY=your_sendgrid_key
ADMIN_EMAIL=bookings@stonehousevenue.com

# Configuration
MIN_BOOKING_DAYS=90
MAX_BOOKING_DAYS=730
SERVICE_FEE_RATE=0.20
FULL_PACKAGE_DISCOUNT=0.10

# Tax Configuration
SALES_TAX_RATE=0.0775
TAX_LOCATION=Nevada County, CA
VENUE_CITY=Grass Valley
# Alternative rates by city:
# GRASS_VALLEY_TAX=0.08875
# NEVADA_CITY_TAX=0.08875
# TRUCKEE_TAX=0.09
# UNINCORPORATED_TAX=0.0775

# Feature Flags
ENABLE_PAYMENTS=false
ENABLE_SAVE_QUOTE=true
ENABLE_PROMO_CODES=false
```

### 17.3 Continuous Deployment
- Automated deployments on git push to main branch
- Staging environment for testing
- Production environment for live site
- Database migrations management

---

## 18. Success Metrics

### 18.1 Key Performance Indicators (KPIs)

**Engagement Metrics:**
- Cart initiation rate (% of visitors who start cart)
- Cart completion rate (% who submit quote)
- Average time to complete cart
- Drop-off points (which steps lose users)

**Business Metrics:**
- Number of quotes per month
- Average quote value
- Quote-to-booking conversion rate
- Revenue generated through cart vs traditional inquiry
- Most profitable package configurations

**User Experience Metrics:**
- User satisfaction score (post-submission survey)
- Number of support inquiries related to cart
- Mobile vs desktop completion rates
- Browser compatibility issues

---

## 19. Launch Checklist

### Pre-Launch
- [ ] All features implemented and tested
- [ ] Database schema created
- [ ] API endpoints functional
- [ ] Admin panel accessible
- [ ] Email templates designed and tested
- [ ] PDF generation working
- [ ] Analytics tracking implemented
- [ ] SSL certificate installed
- [ ] Privacy policy and terms updated
- [ ] All team members trained on admin panel

### Launch Day
- [ ] Deploy to production
- [ ] Test complete user flow on production
- [ ] Verify email notifications working
- [ ] Verify admin notifications working
- [ ] Monitor error logs
- [ ] Have support team ready for questions

### Post-Launch
- [ ] Gather user feedback
- [ ] Monitor analytics daily for first week
- [ ] Fix critical bugs within 24 hours
- [ ] Schedule weekly review meetings
- [ ] Plan Phase 2 features based on usage data

---

## 20. Open Questions & Clarifications Needed

1. **Hourly Rental Minimum:** Should there be a maximum duration for hourly rentals, or is it unlimited?

2. **Service Fee on Hourly vs Cap:** Does the service fee calculation differ between hourly rentals and Premium Event Cap? Or is it consistently applied to food/beverage regardless?

3. **Payment Terms:** What are the deposit and payment schedule terms? (e.g., 50% deposit, balance due 30 days before event)

4. **Cancellation Policy:** What is the cancellation and refund policy? Should this be included in the quote?

5. **Tax:** Are all prices tax-inclusive or tax-exclusive? Should sales tax be calculated and displayed?

6. **Guest Count Limits:** Are there minimum or maximum guest counts for each venue type?

7. **Custom Requests:** Should there be a field for custom requests or modifications to packages?

8. **Multiple Date Options:** Can customers submit one quote with multiple date options, or must they submit separate quotes?

9. **Quote Validity:** How long are quotes valid before pricing may change? 30 days? 60 days?

10. **Salad & Dessert Options:** Are there multiple salad and dessert options to choose from, or is it a standard house salad and seasonal dessert for all guests?

11. **Dietary Restrictions:** Should there be a field for guests to note dietary restrictions or special meal requirements?

12. **Minimum Guest Count:** Is there a minimum guest count required for wedding bookings?

---

## 21. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-30 | AI Assistant | Initial specification document created |
| 1.1 | 2026-01-30 | AI Assistant | Added catering pricing ($70-$100/person), Nevada County CA sales tax (7.75%-9%), detailed UI controls (sliders & buttons), complete tax calculation methodology, companion UI/UX and tax documentation |

---

## 22. Appendices

### Appendix A: Pricing Tables Reference

See attached images:
- Off-Peak Pricing (Jan-Feb)
- Shoulder Pricing (Mar-Apr, Nov)
- Peak Pricing (May-Oct, Dec)

### Appendix B: Competitor Analysis
(To be completed with research on similar venue booking systems)

### Appendix C: User Personas
**Primary Persona: Engaged Couple**
- Age: 25-35
- Planning their wedding 9-18 months in advance
- Budget-conscious but willing to invest in special day
- Researching multiple venues
- Values transparency in pricing
- Wants to understand what they're paying for

**Secondary Persona: Event Planner**
- Professional booking on behalf of clients
- Needs quick quotes for comparison
- Values detailed breakdowns for client presentations
- May book multiple events per year

### Appendix D: California Tax Guidelines for Wedding Venues

**Taxable Items per CA Department of Tax and Fee Administration:**
- Venue rental for events
- Catering services (food and beverage combined)
- Service charges and gratuities
- Equipment rental (tables, chairs, linens, sound systems)
- Tangible property sales (flowers, decorations)

**Non-Taxable Items:**
- Professional services that don't involve tangible property transfer
- Photography and videography services
- Wedding planning and coordination services

**Reference:** California Department of Tax and Fee Administration - Tax Guide for Caterers

### Appendix E: Glossary

- **Premium Event Cap:** Flat-rate pricing option that includes full building access for entire day
- **Service Fee:** 20% fee applied to food and beverage subtotal to cover service staff
- **Full Package:** Bundle that includes Premium Event Cap + catering + beverages + 3+ add-ons, qualifies for discount
- **Season:** Time of year classification affecting pricing (Off-Peak, Shoulder, Peak)
- **À la carte:** Selecting individual services without package bundling

---

## Document End

**For questions or clarifications about this specification, please contact:**  
Project Manager: [Contact Information]  
Technical Lead: [Contact Information]  
Business Owner: [Contact Information]
