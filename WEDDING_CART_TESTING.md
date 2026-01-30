# Wedding Cart Testing Guide

## Test Plan

### Test Environment Setup

**Local Testing:**
```bash
npm run dev
# Visit: http://localhost:8080/pages/wedding-cart.html
```

**Test Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Functional Test Cases

### TC-001: Guest Count Slider

**Test Steps:**
1. Navigate to wedding cart
2. Drag guest count slider
3. Click +/- buttons
4. Type number in input field

**Expected Results:**
- ✅ Slider moves smoothly from 20 to 500
- ✅ Display shows current count
- ✅ +/- buttons change value by 5
- ✅ Manual input accepts 20-500
- ✅ All per-person prices update immediately

**Test Values:**
- Minimum: 20 guests
- Default: 100 guests
- Maximum: 500 guests
- Manual entry: 237 (odd number)

---

### TC-002: Date Selection & Seasonal Pricing

**Test Steps:**
1. Click date picker
2. Select different dates in each season
3. Observe pricing changes

**Test Dates:**
| Date | Season | Day | Expected |
|------|--------|-----|----------|
| Feb 10, 2026 | Off-Peak | Mon | Lowest rates |
| Mar 21, 2026 | Shoulder | Fri | Mid rates |
| Jun 14, 2026 | Peak | Sat | Highest rates |
| Dec 31, 2026 | Peak | Thu | Peak weekday |

**Expected Results:**
- ✅ Season badge displays correct season
- ✅ Venue prices update by season
- ✅ Cannot select dates in past
- ✅ Cannot select dates < 90 days out
- ✅ Blocked dates are disabled (if configured)

---

### TC-003: Venue Selection

**Test Steps:**
1. Select each venue type
2. For hourly venues, adjust duration slider
3. Observe price calculations

**Test Cases:**

**Single Room:**
- Select date: June 14, 2026 (Peak Saturday)
- Expected rate: $250/hr
- Duration: 5 hours
- Expected total: $1,250

**Premium Event Cap:**
- Select date: June 14, 2026 (Peak Saturday)
- Expected total: $10,000 (flat rate)
- Duration slider should be hidden

**Expected Results:**
- ✅ Only one venue can be selected at a time
- ✅ Selected card has highlighted border
- ✅ Duration slider appears for hourly venues only
- ✅ Price updates when duration changes
- ✅ Price summary shows venue cost

---

### TC-004: Protein Selection (2-Choice Limit)

**Test Steps:**
1. Click Vegetarian ($70)
2. Click Chicken ($80)
3. Try to click Fish (should be disabled)
4. Unclick Chicken
5. Click Steak ($100)

**Expected Results:**
- ✅ Can select maximum 2 proteins
- ✅ Selection counter shows "X of 2 selected"
- ✅ Average price displays when 2 selected
- ✅ Remaining options disabled when 2 selected
- ✅ Checkmark appears on selected cards
- ✅ Can deselect by clicking again

**Average Price Tests:**
| Protein 1 | Protein 2 | Average | Test Result |
|-----------|-----------|---------|-------------|
| Vegetarian $70 | Chicken $80 | $75 | ✅ |
| Chicken $80 | Fish $90 | $85 | ✅ |
| Fish $90 | Steak $100 | $95 | ✅ |
| Vegetarian $70 | Steak $100 | $85 | ✅ |

---

### TC-005: Sides & Appetizers Toggle

**Test Steps:**
1. Toggle "Add Extra Sides" to ON
2. Select 2 sides
3. Observe cost calculation
4. Toggle to OFF
5. Toggle back to ON

**Expected Results:**
- ✅ Grid appears when toggle ON
- ✅ Grid hides when toggle OFF
- ✅ Selections cleared when toggled OFF
- ✅ Multiple sides can be selected
- ✅ Summary shows: "X sides × $8/person × Y guests = $Z"
- ✅ Price updates in real-time

**Cost Calculation Test:**
- Guests: 100
- Sides selected: 2
- Expected: 2 × $8 × 100 = $1,600

---

### TC-006: Beverage Package Selection

**Test Steps:**
1. Click Beer & Wine ($45/pp)
2. Click Premium Liquor ($65/pp)
3. Click "No Bar Service"

**Expected Results:**
- ✅ Only one package can be selected
- ✅ Selected card has highlighted style
- ✅ Price updates immediately
- ✅ "No Bar Service" deselects all packages
- ✅ Beverage line appears in price summary

**Price Test:**
- Package: Premium Liquor ($65)
- Guests: 150
- Expected: 150 × $65 = $9,750

---

### TC-007: Service Fee Calculation

**Test Setup:**
- Catering: Chicken + Fish = $85/person × 150 = $12,750
- Beverages: Premium Liquor $65/person × 150 = $9,750
- Food & Beverage Subtotal: $22,500

**Expected Result:**
- ✅ Service Fee: $22,500 × 20% = $4,500
- ✅ Service fee only applies to food/beverage
- ✅ Service fee does NOT apply to venue or add-ons
- ✅ Service fee IS taxable

---

### TC-008: Add-On Services

**Test Steps:**
1. Select Elegant Floral ($5,000)
2. Toggle Photography ON
3. Toggle DJ ON
4. Toggle Wedding Planner ON

**Expected Results:**
- ✅ Floral: Only one package selectable
- ✅ Services: Toggle on/off independently
- ✅ Selected services show checkmark
- ✅ Button text changes to "Added"
- ✅ Add-ons line shows in price summary

---

### TC-009: Sales Tax Calculation

**Test Configuration:**
- Venue: $10,000 (taxable)
- Catering: $17,850 (taxable)
- Beverages: $9,750 (taxable)
- Service Fee: $5,520 (taxable)
- Floral: $5,000 (taxable)
- Photography: $3,500 (NON-taxable)
- DJ: $2,500 (taxable)

**Expected Calculation:**
```
Taxable Subtotal = $10,000 + $17,850 + $9,750 + $5,520 + $5,000 + $2,500 
                 = $50,620

Non-Taxable Subtotal = $3,500

Sales Tax (7.75%) = $50,620 × 0.0775 = $3,923.05

Subtotal with Tax = $50,620 + $3,500 + $3,923.05 = $58,043.05
```

**Test Cases:**
- ✅ Tax applies to all taxable items
- ✅ Tax does NOT apply to photography
- ✅ Tax does NOT apply to wedding planner
- ✅ Tax badge shows on taxable items
- ✅ "Tax-exempt" shows on non-taxable items
- ✅ Tax info modal explains categories

---

### TC-010: Full Package Discount

**Qualification Requirements:**
1. ✅ Premium Event Cap venue
2. ✅ 2 proteins selected
3. ✅ Beverage package selected
4. ✅ At least 3 of: Floral, Photography, DJ

**Test Scenario 1: QUALIFIES**
- Premium Event Cap ✅
- Chicken + Fish ✅
- Premium Liquor ✅
- Elegant Floral ✅
- Photography ✅
- DJ ✅
- (3 add-ons: floral, photo, dj)

**Expected:**
- ✅ "Full Package Discount Eligible" banner appears
- ✅ Wedding Planner shows "FREE - Included"
- ✅ 10% discount applied to total (after tax)
- ✅ Savings amount displayed

**Test Scenario 2: DOES NOT QUALIFY**
- Full Building (not Premium Event Cap) ❌

**Expected:**
- ✅ No banner shown
- ✅ Wedding Planner shows normal price
- ✅ No discount applied

**Test Scenario 3: LOSES QUALIFICATION**
- Start with qualifying package
- Remove one add-on (now only 2 add-ons)

**Expected:**
- ✅ Banner disappears
- ✅ Planner becomes paid
- ✅ Discount removed
- ✅ Price updates immediately

---

### TC-011: Price Summary Sidebar

**Test Steps:**
1. Make selections through all steps
2. Observe price summary updates
3. Scroll page (sidebar should stick)

**Expected Results:**
- ✅ Sidebar sticky on desktop
- ✅ All line items appear when applicable
- ✅ Prices update in real-time
- ✅ Tax row shows correct percentage
- ✅ Discount row appears when eligible
- ✅ Grand total always accurate
- ✅ Formatted as currency ($X,XXX.XX)

**Verify:**
- Running subtotal
- Tax calculation
- Discount application
- Grand total = Subtotal + Tax - Discount

---

### TC-012: Step Navigation

**Test Steps:**
1. Try clicking "Next" on step 1 without selections
2. Make minimum selections
3. Click "Next"
4. Click "Previous"
5. Navigate through all 5 steps

**Expected Results:**
- ✅ Cannot proceed without required fields
- ✅ Validation messages show errors
- ✅ Progress bar updates with current step
- ✅ Previous button goes back one step
- ✅ Selections persist when going back
- ✅ Step content animates in/out

**Validation Requirements:**
| Step | Required |
|------|----------|
| 1 | Date, Guest count, Venue |
| 2 | Exactly 2 proteins |
| 3 | None (beverages optional) |
| 4 | None (add-ons optional) |
| 5 | Name, Email, Phone |

---

### TC-013: Quote Submission

**Test Steps:**
1. Complete all steps
2. Fill contact form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "(530) 555-1234"
3. Click "Request Quote"

**Expected Results:**
- ✅ Button shows loading spinner
- ✅ Quote saved to database
- ✅ Customer email sent
- ✅ Admin email sent
- ✅ Success message appears
- ✅ Quote number displayed
- ✅ Can download PDF (future feature)

**Database Verification:**
```sql
SELECT * FROM wedding_quotes 
WHERE customer_email = 'test@example.com' 
ORDER BY created_at DESC 
LIMIT 1;
```

Check:
- All fields populated
- Grand total matches calculation
- Cart state stored as JSON
- Status = 'pending'

---

### TC-014: Mobile Responsiveness

**Test Devices:**
- iPhone 12/13/14 (390×844)
- iPhone SE (375×667)
- iPad (768×1024)
- Android phone (360×800)

**Test Steps:**
1. Open cart on mobile device
2. Test all interactions
3. Verify touch targets

**Expected Results:**
- ✅ Layout converts to single column
- ✅ Progress bar stacks vertically
- ✅ Price sidebar becomes bottom bar
- ✅ Tap bottom bar to expand summary
- ✅ All buttons minimum 44×44px
- ✅ Sliders have large touch targets
- ✅ Forms are thumb-friendly
- ✅ No horizontal scrolling

**Slider Mobile Test:**
- Touch drag should work smoothly
- Handle should be 44×44px minimum
- Tapping track should jump to position

---

### TC-015: Edge Cases

**Test Case 1: Zero Selections**
- No venue selected → Cannot proceed
- No proteins selected → Cannot proceed
- No beverages selected → Allowed, continue
- No add-ons selected → Allowed, continue

**Test Case 2: Maximum Values**
- Guest count: 500
- Duration: 12 hours
- All sides selected (6)
- All appetizers selected (8)
- All add-ons selected

**Expected:**
- System handles large numbers
- No overflow errors
- Prices calculate correctly

**Test Case 3: Minimum Values**
- Guest count: 20
- Duration: 3 hours
- Only 2 proteins, no extras

**Expected:**
- Minimum quote generates
- All calculations work
- Can submit quote

**Test Case 4: Rapid Changes**
- Quickly change guest count multiple times
- Rapidly select/deselect options
- Change date multiple times

**Expected:**
- No lag or freezing
- Calculations stay accurate
- UI remains responsive

---

## Calculation Verification Tests

### Test Set 1: Basic Wedding

**Input:**
- Date: Monday, Feb 10, 2026 (Off-Peak)
- Guests: 50
- Venue: Partial Building, 4 hours
- Proteins: Vegetarian + Chicken (avg $75)
- Beverages: Beer & Wine ($45/pp)
- No add-ons
- Tax: 7.75%

**Manual Calculation:**
```
Venue: $250/hr × 4 hrs                $1,000.00
Catering: $75 × 50                    $3,750.00
Beverages: $45 × 50                   $2,250.00
Service Fee: ($3,750 + $2,250) × 20%  $1,200.00
─────────────────────────────────────────────
Subtotal                               $8,200.00

Tax (7.75% on $8,200)                   $635.50
─────────────────────────────────────────────
TOTAL                                  $8,835.50
```

**Automated Test:**
✅ Verify system calculates: $8,835.50

---

### Test Set 2: Full Package Wedding

**Input:**
- Date: Saturday, June 14, 2026 (Peak)
- Guests: 150
- Venue: Premium Event Cap
- Proteins: Fish + Steak (avg $95)
- Sides: 3 selections
- Appetizers: 4 selections
- Beverages: Premium Liquor ($65/pp)
- Floral: Luxury ($10,000)
- Photography: Yes
- Wedding Planner: Yes (FREE)
- DJ: Yes
- Tax: 7.75%

**Manual Calculation:**
```
Venue: Premium Event Cap              $10,000.00
Catering: $95 × 150                   $14,250.00
Sides: 3 × $8 × 150                    $3,600.00
Appetizers: 4 × $6 × 150               $3,600.00
Catering Total                        $21,450.00

Beverages: $65 × 150                   $9,750.00
Service Fee: ($21,450 + $9,750) × 20%  $6,240.00

Floral: Luxury                        $10,000.00
Photography (non-taxable)              $3,500.00
Wedding Planner                            $0.00 (FREE)
DJ                                     $2,500.00
─────────────────────────────────────────────
Taxable Subtotal:                     $59,940.00
  ($10,000 + $21,450 + $9,750 + $6,240 + $10,000 + $2,500)

Non-Taxable Subtotal:                  $3,500.00

Tax (7.75% on $59,940)                 $4,645.35
─────────────────────────────────────────────
Subtotal with Tax                     $68,085.35

Full Package Discount (10%)           -$6,808.54
─────────────────────────────────────────────
TOTAL                                 $61,276.81
```

**Automated Test:**
✅ Verify system calculates: $61,276.81

**Savings:**
- Wedding Planner (normally $2,500): FREE
- 10% Discount: $6,808.54
- **Total Savings: $9,308.54**

---

### Test Set 3: Different Tax Rates

**Configuration:** Same as Test Set 2

**Nevada City (8.875% tax):**
```
Taxable Subtotal:     $59,940.00
Tax (8.875%):         $5,319.68
Subtotal with Tax:    $68,759.68
Discount (10%):       -$6,875.97
TOTAL:                $61,883.71
```

**Truckee (9.00% tax):**
```
Taxable Subtotal:     $59,940.00
Tax (9.00%):          $5,394.60
Subtotal with Tax:    $68,834.60
Discount (10%):       -$6,883.46
TOTAL:                $61,951.14
```

✅ Verify tax rate changes affect final total

---

## UI/UX Test Cases

### TC-100: Visual Feedback

**Test Steps:**
1. Hover over buttons
2. Click selections
3. Watch animations

**Expected:**
- ✅ Buttons show hover state
- ✅ Selected items highlight immediately
- ✅ Checkmarks animate in
- ✅ Price changes have subtle flash
- ✅ Transitions are smooth (200-300ms)
- ✅ No janky animations

---

### TC-101: Accessibility

**Keyboard Navigation Test:**
1. Tab through all form elements
2. Use arrow keys on sliders
3. Use space/enter to select buttons

**Expected:**
- ✅ All interactive elements focusable
- ✅ Focus indicators visible
- ✅ Logical tab order
- ✅ Sliders respond to arrow keys
- ✅ Space/Enter activates buttons

**Screen Reader Test:**
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate through cart

**Expected:**
- ✅ All labels read correctly
- ✅ Slider announces value changes
- ✅ Selection states announced
- ✅ Error messages read aloud
- ✅ Price updates announced

---

### TC-102: Form Validation

**Test Invalid Inputs:**

| Field | Invalid Input | Expected Error |
|-------|---------------|----------------|
| Date | (blank) | "Please select a wedding date" |
| Date | Yesterday | "Minimum 90 days advance" |
| Guest count | 15 | Slider prevents (min 20) |
| Proteins | Only 1 selected | "Select exactly 2 proteins" |
| Email | "notanemail" | "Invalid email format" |
| Phone | (blank) | "Required field" |

**Expected:**
- ✅ Inline error messages
- ✅ Red borders on invalid fields
- ✅ Cannot proceed until valid
- ✅ Helpful error messages

---

## Performance Tests

### TC-200: Page Load Speed

**Measure:**
- Initial page load time
- Time to interactive
- JavaScript bundle size

**Target:**
- Page load: < 3 seconds
- Time to interactive: < 2 seconds
- Bundle size: < 500KB

**Test:**
1. Open Chrome DevTools
2. Go to Network tab
3. Hard refresh page
4. Check load time

---

### TC-201: Calculation Performance

**Test:**
- Change guest count rapidly 20 times
- Measure time for price update

**Expected:**
- ✅ Each calculation: < 100ms
- ✅ UI remains responsive
- ✅ No frame drops
- ✅ Smooth animations

**Stress Test:**
- Guests: 500 (maximum)
- All options selected
- Calculation time should still be < 100ms

---

### TC-202: Memory Leaks

**Test Steps:**
1. Navigate through wizard 50 times
2. Monitor memory in DevTools
3. Check for increasing memory

**Expected:**
- ✅ Memory stays stable
- ✅ No constantly increasing usage
- ✅ Event listeners cleaned up

---

## Integration Tests

### TC-300: API Quote Submission

**Test:**
```bash
curl -X POST http://localhost:8080/api/wedding/quote \
  -H "Content-Type: application/json" \
  -d '{
    "cart": {
      "venue": {"type": "premiumEventCap", "date": "2026-06-15"},
      "guestCount": 100,
      "catering": {"protein1": "chicken", "protein2": "fish"},
      "beverages": {"package": "premium"},
      "addOns": {"floral": null, "photography": false, "weddingPlanner": false, "dj": false}
    },
    "contact": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "530-555-1234"
    }
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "quoteNumber": "WQ-...",
  "estimatedTotal": 34567.89
}
```

---

### TC-301: Database Storage

**Verify:**
```sql
-- Check quote was saved
SELECT * FROM wedding_quotes 
WHERE customer_email = 'test@example.com'
ORDER BY created_at DESC LIMIT 1;

-- Verify all fields populated
-- Verify grand_total matches quote
-- Verify cart_state JSON is valid
```

---

### TC-302: Email Delivery

**Test:**
1. Submit quote with real email
2. Check inbox for confirmation
3. Check admin email for notification

**Customer Email Should Contain:**
- ✅ Quote number
- ✅ Itemized breakdown
- ✅ Grand total
- ✅ Contact information
- ✅ Next steps

**Admin Email Should Contain:**
- ✅ Customer name & contact
- ✅ Event date
- ✅ Guest count
- ✅ Total value
- ✅ Link to admin panel (or quote details)

---

## Regression Tests

Run these tests after any code changes:

### Regression Set 1: Core Calculations
- [ ] Guest count slider → price updates
- [ ] Date change → venue price updates
- [ ] Protein selection → average calculates
- [ ] Service fee → 20% of F&B
- [ ] Tax → correct items only
- [ ] Discount → triggers correctly

### Regression Set 2: UI Interactions
- [ ] All buttons clickable
- [ ] All sliders draggable
- [ ] All toggles working
- [ ] Cards select/deselect
- [ ] Navigation works
- [ ] Mobile responsive

### Regression Set 3: Data Flow
- [ ] Form validation working
- [ ] Quote submission succeeds
- [ ] Database saves correctly
- [ ] Emails send successfully

---

## Browser Compatibility Testing

### Desktop Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 120+ | ✅ Primary |
| Firefox | 120+ | ✅ Tested |
| Safari | 17+ | ✅ Tested |
| Edge | 120+ | ✅ Tested |

**Known Issues:**
- Safari: Range slider styling differs (acceptable)
- Firefox: Slider fill uses `-moz-range-track` (handled)

### Mobile Browsers

| Browser | Device | Status |
|---------|--------|--------|
| Safari | iPhone | ✅ Primary |
| Chrome | Android | ✅ Tested |
| Samsung Internet | Android | ⚠️ Test |

---

## User Acceptance Testing (UAT)

### UAT Checklist

**Give to 3-5 test users:**

- [ ] Can you complete a quote without help?
- [ ] Are the pricing options clear?
- [ ] Did you understand the full package discount?
- [ ] Was the interface intuitive?
- [ ] Did prices update as expected?
- [ ] Was the mobile experience good?
- [ ] Would you use this to plan your wedding?
- [ ] Any confusing parts?
- [ ] Any bugs or errors?
- [ ] Suggestions for improvement?

**Success Criteria:**
- 80%+ complete without assistance
- 90%+ find interface intuitive
- 100% understand pricing
- 0 critical bugs reported

---

## Load Testing (Future)

### Concurrent Users Test

**Simulate:**
- 100 simultaneous users
- All submitting quotes

**Tools:**
- Apache JMeter
- Artillery.io
- k6

**Measure:**
- Response times
- Database performance
- Error rates
- Server resource usage

**Target:**
- 95% of requests < 2 seconds
- 0% error rate
- Database handles 1000+ quotes

---

## Testing Checklist Summary

### Pre-Launch Testing

- [ ] All functional tests passed
- [ ] Mobile responsive verified
- [ ] Browser compatibility confirmed
- [ ] Calculations manually verified
- [ ] Database storage working
- [ ] Emails sending correctly
- [ ] Tax calculations accurate
- [ ] Accessibility standards met
- [ ] UAT feedback incorporated
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Security review completed

### Post-Launch Monitoring

- [ ] Monitor first 10 real quotes
- [ ] Verify calculation accuracy
- [ ] Check email delivery rates
- [ ] Monitor error logs
- [ ] Gather user feedback
- [ ] Track conversion metrics
- [ ] Review database performance

---

## Test Data Sets

### Dataset 1: Budget Wedding
```javascript
{
  date: new Date('2026-02-14'),
  guestCount: 60,
  venue: 'partialBuilding',
  hours: 4,
  protein1: 'vegetarian',
  protein2: 'chicken',
  beverage: 'beer-wine',
  floral: null,
  services: []
}
// Expected: ~$10,000
```

### Dataset 2: Average Wedding
```javascript
{
  date: new Date('2026-04-18'),
  guestCount: 120,
  venue: 'fullBuilding',
  hours: 6,
  protein1: 'chicken',
  protein2: 'fish',
  beverage: 'premium',
  floral: 'classic',
  services: ['photography']
}
// Expected: ~$35,000
```

### Dataset 3: Luxury Wedding
```javascript
{
  date: new Date('2026-09-19'),
  guestCount: 200,
  venue: 'premiumEventCap',
  protein1: 'fish',
  protein2: 'steak',
  sides: ['garlic-mashed', 'asparagus', 'truffle-mac'],
  appetizers: ['shrimp', 'sliders', 'caprese', 'crostini'],
  beverage: 'premium-liquor',
  floral: 'luxury',
  services: ['photography', 'dj', 'weddingPlanner']
}
// Expected: ~$75,000 (with full package discount)
```

---

## Automated Testing (Future Enhancement)

### Unit Tests (Jest)

```javascript
// test/wedding-calculator.test.js
describe('WeddingCalculator', () => {
  test('calculates average protein price', () => {
    const calc = new WeddingCalculator();
    const avg = calc.calculateAverageProteinPrice('chicken', 'fish');
    expect(avg).toBe(85);
  });

  test('applies tax to taxable items only', () => {
    const cart = {/* ... */};
    const quote = calc.calculateCompleteQuote(cart);
    // Verify photography is not taxed
    expect(quote.addOns.photography.taxable).toBe(false);
  });
});
```

### E2E Tests (Cypress/Playwright)

```javascript
// cypress/e2e/wedding-cart.cy.js
describe('Wedding Cart Flow', () => {
  it('completes full quote submission', () => {
    cy.visit('/pages/wedding-cart.html');
    cy.get('#wedding-date').type('06/15/2026');
    cy.get('#guest-count').invoke('val', 150).trigger('input');
    cy.get('[data-venue="premiumEventCap"]').click();
    // ... continue through all steps
    cy.get('#submit-quote').click();
    cy.get('.success-message').should('be.visible');
  });
});
```

---

## Bug Tracking Template

When you find a bug, document it:

**Bug #XXX: [Title]**

**Severity:** Critical / High / Medium / Low

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Device: Desktop
- URL: /pages/wedding-cart.html

**Screenshots:**
[Attach if applicable]

**Console Errors:**
```
[Paste any console errors]
```

---

## Testing Sign-Off

**Tested by:** _____________________  
**Date:** _____________________  
**Version:** v1.0  

**Test Results:**
- Functional Tests: ___ / ___ passed
- UI Tests: ___ / ___ passed
- Integration Tests: ___ / ___ passed
- Accessibility: ___ / ___ passed

**Approved for Production:** ☐ Yes ☐ No

**Notes:**
_________________________________
_________________________________
