# Wedding Shopping Cart - UI Controls Reference

## Quick Reference Guide for Developers

This document provides a visual reference for all UI controls specified in the Wedding Cart system.

---

## Control Type Overview

| Control Type | Used For | Interaction | Selection Limit |
|--------------|----------|-------------|-----------------|
| **Slider** | Guest count, Event duration | Drag or click | Range: min-max |
| **Large Toggle Buttons** | Proteins, Bar packages, Floral, Services | Click to toggle | Varies by section |
| **Radio Button Cards** | Venue type selection | Single selection | Choose 1 |
| **Toggle Switch** | Enable/disable sections | Switch ON/OFF | Boolean |
| **+/- Buttons** | Fine-tune slider values | Click to increment | N/A |

---

## 1. Slider Controls

### Guest Count Slider
```
Configuration:
├─ Type: Range slider (horizontal)
├─ Range: 20 - 500 guests
├─ Default: 100 guests
├─ Step: 5 guests
├─ Display: Large number above slider
└─ Additional: +/- buttons, numeric input field

Visual Design:
├─ Track: Full-width bar with gradient or solid color
├─ Filled track: Shows selected range (0-current value)
├─ Handle: Large circular or pill-shaped (min 44px)
├─ Tick marks: Every 50 guests (20, 50, 100, 150, 200...)
├─ Labels: Show "20" at start, "500" at end
└─ Value display: "150 Guests" in large text above

States:
├─ Default: Neutral color
├─ Hover: Handle enlarges slightly
├─ Active/Dragging: Handle highlighted, track emphasized
├─ Disabled: Grayed out (not used initially)
└─ Focus: Visible outline for keyboard navigation
```

### Event Duration Slider (for Hourly Rentals)
```
Configuration:
├─ Type: Range slider (horizontal)
├─ Range: 3 - 12 hours
├─ Default: 5 hours
├─ Step: 1 hour
├─ Display: "X Hours" with clock icon
└─ Additional: +/- buttons for precise control

Visual Design:
├─ Track: Shorter than guest slider
├─ Tick marks: Every hour (3, 4, 5, 6... 12)
├─ Handle: Circular with hour icon
├─ Labels: "3 hrs" minimum, "12 hrs" maximum
└─ Cost display: Updates in real-time below slider

Conditional Display:
└─ Only appears when "Hourly Rental" venue option selected
```

---

## 2. Large Toggle Button Controls

### Protein Selection (Must Select Exactly 2)

```
Layout: 2×2 Grid

Button Structure (each):
┌─────────────────────────────────┐
│  [Protein Image/Icon]           │
│                                  │
│  CHICKEN                         │
│  $80 per person                  │
│                                  │
│  Includes salad & dessert        │
│                                  │
│  [ ✓ Selected ]                  │
└─────────────────────────────────┘

States:
├─ Unselected: White/light background, gray border
├─ Selected: Brand color background, solid border, checkmark
├─ Disabled: Gray background (when 2 already selected)
└─ Hover: Shadow effect, slight scale

Grid Layout:
Row 1: [Vegetarian - $70] [Chicken - $80]
Row 2: [Fish - $90]       [Steak - $100]

Validation:
├─ Counter display: "2 of 2 proteins selected ✓"
├─ Error state: Red border if not exactly 2 selected on Next
└─ Auto-calculate average: "Average meal cost: $85/person"
```

### Bar Package Selection (Choose 1)

```
Layout: Vertical stack or horizontal row

Button Structure (each):
┌─────────────────────────────────────────────┐
│  BEER & WINE PACKAGE              $45/person│
│  ○ Select this package                      │
│                                              │
│  ✓ Domestic and imported beer               │
│  ✓ Red and white wine selection             │
│  ✓ 4-hour bar service                       │
│                                              │
│  150 guests × $45 = $6,750                  │
│  + 20% service fee and sales tax            │
└─────────────────────────────────────────────┘

States:
├─ Unselected: White background, thin border, empty radio
├─ Selected: Highlighted border, filled radio, emphasized
└─ Hover: Lift effect (subtle shadow)

Options (3 buttons):
1. Beer & Wine - $45/person
2. Premium Beer, Wine & Liquor - $55/person
3. Premium Liquor Package - $65/person

Additional:
└─ "Skip Bar Service" button (deselects all)
```

### Floral Package Selection (Choose 1 or None)

```
Layout: Horizontal scrollable cards (mobile) or 4-column grid (desktop)

Button Structure (each):
┌──────────────────────────┐
│  [Floral Arrangement     │
│   Image]                 │
│                          │
│  ELEGANT PACKAGE         │
│  $5,000                  │
│                          │
│  ✓ Ceremony flowers      │
│  ✓ 25 table centerpieces │
│  ✓ Bridal bouquet        │
│  ✓ Cocktail arrangements │
│                          │
│  [ SELECT ]              │
└──────────────────────────┘

Package Tiers:
├─ Intimate: $1,500
├─ Classic: $2,500
├─ Elegant: $5,000
└─ Luxury: $10,000

States:
├─ Unselected: Card with "SELECT" button
├─ Selected: Green border, "SELECTED ✓" button
└─ Deselect: Click selected card to remove
```

### Service Add-Ons (Independent Toggles)

```
Layout: 2×2 grid (desktop) or vertical stack (mobile)

Button Structure (each):
┌─────────────────────────────────┐
│  [Service Icon/Image]           │
│                                  │
│  PROFESSIONAL PHOTOGRAPHY        │
│  $3,500                          │
│  Tax-exempt service              │
│                                  │
│  8 hours • 2 photographers       │
│  500+ edited images              │
│                                  │
│  [  ADD TO PACKAGE  ]            │
└─────────────────────────────────┘

States:
├─ Not added: White background, "ADD TO PACKAGE" button
├─ Added: Brand color, "✓ ADDED" button, highlighted
├─ Free (planner w/ full package): Gold badge "FREE - Included!"
└─ Hover: Slight elevation effect

Services (4 buttons):
1. Photography - $3,500 (tax-exempt)
2. Wedding Planner - $2,500 (tax-exempt) or FREE
3. DJ Service - $2,500 (+ tax)
4. (Leave space for future add-ons)
```

---

## 3. Multi-Select Button Grids

### Additional Sides Selection

```
Header:
┌─────────────────────────────────────────────┐
│  ADD EXTRA SIDES?           [○ OFF  ● ON]   │ <- Toggle switch
└─────────────────────────────────────────────┘

When ON, display button grid:

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Roasted          │ │ Garlic Mashed    │ │ Rice Pilaf       │
│ Vegetables       │ │ Potatoes         │ │                  │
│                  │ │                  │ │                  │
│ [    ADD    ]    │ │ [  ✓ ADDED ]     │ │ [    ADD    ]    │
└──────────────────┘ └──────────────────┘ └──────────────────┘

Cost Display Below:
"2 sides selected × $8/person × 150 guests = $2,400.00"

Button States:
├─ Not selected: Light background, "ADD" text
├─ Selected: Brand color, checkmark, "ADDED" text
└─ Hover: Border highlight

Grid: Auto-responsive (3 columns desktop, 2 mobile, 1 small mobile)
```

### Passed Appetizers Selection

```
Header:
┌─────────────────────────────────────────────┐
│  ADD PASSED APPETIZERS?     [○ OFF  ● ON]   │ <- Toggle switch
└─────────────────────────────────────────────┘

When ON, display button grid:

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [Image]      │ │ [Image]      │ │ [Image]      │ │ [Image]      │
│              │ │              │ │              │ │              │
│ Bruschetta   │ │ Spring Rolls │ │ Sliders      │ │ Shrimp       │
│              │ │              │ │              │ │ Cocktail     │
│ [✓ ADDED]    │ │ [✓ ADDED]    │ │ [✓ ADDED]    │ │ [   ADD ]    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Cost Display Below:
"3 appetizers selected × $6/person × 150 guests = $2,700.00"

Features:
├─ Images: Small photos of each appetizer
├─ Multi-select: Can select as many as desired
└─ Counter badge: Shows "3 selected" at top
```

---

## 4. Venue Selection - Radio Button Cards

```
Layout: Horizontal cards (desktop) or vertical stack (mobile)

Card Structure:
┌───────────────────────────────────────────────────────┐
│  ○  PREMIUM EVENT CAP                                 │
│                                                        │
│     [Venue Image - Full Building]                     │
│                                                        │
│     Perfect for large weddings                        │
│     • Full building all-day access                    │
│     • No hourly limits                                │
│     • Best value for 100+ guests                      │
│                                                        │
│     Peak Saturday: $10,000                            │
│     (Selected date: June 15, 2026)                    │
└───────────────────────────────────────────────────────┘

States:
├─ Unselected: Light border, empty radio circle
├─ Selected: Heavy brand-color border, filled radio, highlighted background
└─ Hover: Shadow and slight lift effect

Options:
1. Hourly Rental (Single Room / Partial / Full)
   └─ If selected: Show secondary selector for room size + duration slider
2. Premium Event Cap
   └─ If selected: Hide duration slider, show "all-day access" badge
```

---

## 5. Increment/Decrement Buttons

```
Used alongside sliders and numeric inputs

Button Pair:
┌─────┐   ┌───────────┐   ┌─────┐
│  -  │   │    150    │   │  +  │
└─────┘   └───────────┘   └─────┘

Specifications:
├─ Size: 40×40px minimum (44×44px on touch)
├─ Symbol: Minus (-) and plus (+) or chevron icons
├─ Increment: Same as slider step (5 for guests, 1 for hours)
├─ Disabled state: Gray when at min/max limit
└─ Ripple effect on click

Placement:
└─ Directly adjacent to numeric input field
└─ Below slider on mobile, inline on desktop
```

---

## 6. Toggle Switches

```
Used for enabling/disabling optional sections

Standard Toggle:
                 OFF              ON
              ┌────────┐      ┌────────┐
  Label       │  ○     │      │     ●  │
              └────────┘      └────────┘

Specifications:
├─ Size: 50×28px switch
├─ Handle: 24px circle
├─ Animation: Smooth slide (200ms)
├─ Colors:
│   ├─ OFF: Gray track, white handle
│   └─ ON: Brand color track, white handle
└─ Labels: "Add Extra Sides?" with switch aligned right

Usage:
├─ "Add Extra Sides?" - Shows/hides side selection grid
└─ "Add Passed Appetizers?" - Shows/hides appetizer selection grid
```

---

## 7. Progress Indicator

```
Multi-Step Wizard Progress Bar

Step 1      Step 2       Step 3      Step 4      Step 5
  ●─────────○────────────○───────────○───────────○
Event     Catering    Beverages   Add-Ons     Review
Details

States:
├─ Completed: Filled circle (●) with checkmark
├─ Current: Filled circle (●) with animation
├─ Upcoming: Empty circle (○)
└─ Line connecting: Solid when complete, dashed when upcoming

Mobile Version:
Shows current step only with counter: "Step 2 of 5"
```

---

## 8. Price Summary Sidebar

```
Fixed Position on Desktop (right side):

┌────────────────────────────────┐
│  YOUR WEDDING QUOTE            │
│                                │
│  Event: June 15, 2026          │
│  Guests: 150                   │
│                                │
│  ─────────────────────────     │
│  Venue              $10,000    │
│  Catering           $17,850    │
│  Beverages           $9,750    │
│  Service Fee         $5,520    │
│  Add-Ons            $11,000    │
│  ─────────────────────────     │
│  Subtotal           $54,120    │
│  Sales Tax (7.75%)   $3,923    │
│  ─────────────────────────     │
│  Subtotal           $58,043    │
│                                │
│  ★ FULL PACKAGE SAVINGS        │
│  -10% Discount     -$5,804     │
│  ═════════════════════════     │
│  TOTAL              $52,239    │
│  ═════════════════════════     │
│                                │
│  [ REQUEST QUOTE ]             │
└────────────────────────────────┘

Mobile Version:
├─ Sticky footer bar showing just total
├─ Tap to expand full breakdown
├─ Slide-up panel with all details
└─ Collapsible sections
```

---

## 9. Detailed Button Specifications

### Primary Action Buttons
```
Examples: "Next Step", "Request Quote", "Book Now"

Dimensions:
├─ Desktop: 200×50px minimum
├─ Mobile: Full width, 54px height
└─ Padding: 16px vertical, 32px horizontal

Typography:
├─ Font size: 16px (18px for primary actions)
├─ Font weight: 600 (semi-bold)
├─ Letter spacing: 0.5px
└─ Text transform: Uppercase or Sentence case

Colors:
├─ Background: Brand primary color (e.g., gold/burgundy)
├─ Text: White or high-contrast
├─ Hover: Darken by 10%
├─ Active: Darken by 15%, slight scale down
└─ Disabled: Gray, 50% opacity, no pointer

States:
├─ Loading: Spinner icon, "Processing..." text
├─ Success: Checkmark icon, "Success!" text (brief)
└─ Error: X icon, shake animation
```

### Secondary Action Buttons
```
Examples: "Previous", "Save Progress", "Start Over"

Same dimensions as primary, but:
├─ Background: Transparent or light gray
├─ Border: 2px solid gray
├─ Text: Dark gray
└─ Hover: Light background fill
```

### Toggle Selection Buttons (Proteins, Sides, Appetizers)
```
Dimensions:
├─ Desktop: 180×200px (portrait cards)
├─ Mobile: Full width, 120px height
└─ Grid gap: 16px between cards

Content Structure:
┌──────────────────────┐
│  [Image - 60% of     │
│   card height]       │
│                      │
│  Item Name           │
│  $XX/person          │
│                      │
│  [●] or [ ]          │ <- Selection indicator
└──────────────────────┘

States:
├─ Unselected:
│   ├─ Border: 2px solid light gray
│   ├─ Background: White
│   └─ Indicator: Empty circle or square
├─ Selected:
│   ├─ Border: 4px solid brand color
│   ├─ Background: Light tint of brand color
│   ├─ Indicator: Filled checkmark
│   └─ Badge: "Selected" or checkmark icon
└─ Hover:
    ├─ Shadow: 0 4px 8px rgba(0,0,0,0.1)
    └─ Transform: translateY(-2px)
```

---

## 10. Real-Time Calculation Display

### Price Update Animation
```
When any selection changes:

1. Old price fades out (100ms)
2. Brief loading indicator (spinner or dots)
3. New price fades in (100ms)
4. Highlight effect (gold background flash 300ms)

Visual Feedback:
└─ Numbers should "roll" or animate when changing
└─ Large changes (>$1000) get attention pulse effect
```

### Running Total Display
```
Position: Always visible (sticky sidebar or footer)

Format:
ESTIMATED TOTAL
  $52,239.74
  
Price changes trigger:
├─ Color pulse animation
├─ Brief highlight
└─ Subtle sound effect (optional, user-controlled)

Mobile:
┌─────────────────────────────────────────┐
│  Estimated Total: $52,239.74   [VIEW] ─┤
└─────────────────────────────────────────┘
Tap [VIEW] to expand full breakdown
```

---

## 11. Conditional UI Elements

### Full Package Discount Badge

```
Appears when eligibility conditions met:

┌─────────────────────────────────────────────┐
│  ★ FULL PACKAGE DISCOUNT ELIGIBLE!          │
│                                              │
│  You're saving 10% on your total!           │
│  Discount: $5,754.31                        │
│                                              │
│  ✓ Premium Event Cap selected               │
│  ✓ Catering package selected                │
│  ✓ Bar package selected                     │
│  ✓ 3+ add-ons selected                      │
│                                              │
│  + Wedding Planner service included FREE!   │
└─────────────────────────────────────────────┘

Visual Style:
├─ Background: Gold gradient
├─ Border: Solid gold or brand color
├─ Icon: Star or sparkle
├─ Animation: Slide down or fade in when triggered
└─ Position: Top of cart summary or between steps
```

### Capacity Warning

```
Triggers when guest count approaches venue limits:

┌─────────────────────────────────────────────┐
│  ⚠️  HIGH GUEST COUNT                       │
│                                              │
│  You've selected Single Room for 150 guests.│
│  We recommend Full Building or Premium      │
│  Event Cap for groups over 50.              │
│                                              │
│  [ UPGRADE TO FULL BUILDING ]               │
└─────────────────────────────────────────────┘

Colors: Yellow/amber warning palette
```

---

## 12. Responsive Breakpoints

### Desktop (> 1024px)
- Sidebar layout with sticky price summary
- Multi-column button grids (2-4 columns)
- Horizontal sliders with labels
- All content visible without scrolling per step

### Tablet (768px - 1024px)
- 2-column layouts for buttons
- Sidebar becomes top bar or bottom bar
- Slightly larger touch targets

### Mobile (< 768px)
- Single column layouts
- Full-width buttons
- Bottom sticky summary bar
- Expandable price breakdown
- Larger slider handles (50px)
- Vertical button stacks

---

## 13. Color & Branding Guidelines

### Recommended Color Palette

```
Primary Brand Color (Buttons, Highlights):
├─ Gold/Champagne: #D4AF37 or #C9A961
└─ Used for: Selected states, primary buttons, badges

Secondary Color (Accents):
├─ Burgundy/Wine: #722F37 or #8B4053
└─ Used for: Hover states, secondary buttons

Neutral Colors:
├─ Dark text: #2C3E50
├─ Medium gray: #7F8C8D
├─ Light gray: #ECF0F1
└─ Background: #FFFFFF or #F8F9FA

Success/Confirmation:
└─ Green: #27AE60

Warning:
└─ Amber: #F39C12

Error/Required:
└─ Red: #E74C3C
```

### Typography
```
Headings:
├─ H1 (Page title): 32px, Bold
├─ H2 (Section title): 24px, Semi-bold
├─ H3 (Subsection): 18px, Semi-bold
└─ H4 (Card title): 16px, Medium

Body:
├─ Base: 16px, Regular
├─ Small: 14px, Regular
└─ Caption: 12px, Regular

Pricing:
├─ Large totals: 32px, Bold
├─ Section subtotals: 24px, Semi-bold
├─ Line items: 16px, Regular
└─ Per-person: 14px, Medium

Font Family:
└─ Sans-serif: "Inter", "Helvetica Neue", Arial
   (or brand-specific font)
```

---

## 14. Animation & Transitions

### Standard Transitions
```
Element state changes:     200ms ease-in-out
Button hover:              150ms ease
Price updates:             300ms ease
Section expand/collapse:   400ms ease-in-out
Modal open/close:          250ms ease
Slider drag:               0ms (immediate)
Step transitions:          400ms slide/fade
```

### Micro-Interactions
```
Button click:
└─ Ripple effect from click point (Material Design style)

Selection confirmation:
└─ Checkmark draw animation (SVG path animation)

Price change:
└─ Number count-up animation (for large changes)

Full package discount trigger:
└─ Confetti or sparkle animation (brief, subtle)

Error shake:
└─ Horizontal shake 3 times (300ms total)
```

---

## 15. Icon Library

### Required Icons
```
Navigation:
├─ chevron-left (Previous)
├─ chevron-right (Next)
├─ check (Confirmation)
└─ x (Close, remove)

Form:
├─ calendar (Date picker)
├─ users (Guest count)
├─ clock (Duration)
└─ dollar-sign (Pricing)

Services:
├─ camera (Photography)
├─ music (DJ)
├─ flower (Floral)
├─ clipboard (Planning)
├─ utensils (Catering)
└─ wine-glass (Beverages)

Status:
├─ check-circle (Success, selected)
├─ alert-triangle (Warning)
├─ info (Information tooltip)
└─ star (Premium, discount)

Actions:
├─ download (PDF download)
├─ mail (Send email)
├─ save (Save progress)
└─ edit (Modify selection)

Recommended Library:
└─ Feather Icons, Heroicons, or Font Awesome
```

---

## 16. Loading & Feedback States

### Loading Indicators
```
Full page load:
└─ Centered spinner with "Loading your quote..." text

Section load:
└─ Skeleton screens showing layout structure

Button loading:
┌──────────────────────┐
│  ◌ Processing...     │  <- Spinner + text
└──────────────────────┘

Price calculation:
└─ Inline spinner next to price being calculated
```

### Success Confirmation
```
After quote submission:

┌─────────────────────────────────────────────┐
│              ✓                              │
│                                              │
│      QUOTE SUBMITTED SUCCESSFULLY!          │
│                                              │
│  Quote #WQ-2026-0123                        │
│  We've sent a copy to your email            │
│                                              │
│  Our team will contact you within 24 hours  │
│                                              │
│  [ DOWNLOAD PDF ]  [ BACK TO HOME ]         │
└─────────────────────────────────────────────┘

Animation: Check circle with draw animation
Color: Success green
```

---

## 17. Accessibility Features for Interactive Controls

### Slider Keyboard Controls
```
Keyboard Support:
├─ Left/Down Arrow: Decrease value by step
├─ Right/Up Arrow: Increase value by step
├─ Home: Jump to minimum value
├─ End: Jump to maximum value
├─ Page Up: Increase by large step (10%)
└─ Page Down: Decrease by large step (10%)

Screen Reader:
├─ Announce current value on change
├─ Announce range limits
└─ Announce step increment
```

### Button Grid Navigation
```
Keyboard Support:
├─ Tab: Navigate between buttons
├─ Space/Enter: Toggle selection
├─ Arrow keys: Navigate within grid (optional enhancement)
└─ Escape: Deselect all (if applicable)

Focus Management:
├─ Visible focus ring (3px solid)
├─ Focus follows logical tab order
└─ Focus trap within modal sections
```

---

## 18. Example Code Snippets

### Slider Implementation (React Example)

```jsx
import { useState } from 'react';

function GuestCountSlider({ value, onChange, min = 20, max = 500, step = 5 }) {
  const [guestCount, setGuestCount] = useState(value);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setGuestCount(newValue);
    onChange(newValue);
  };

  const increment = () => {
    const newValue = Math.min(guestCount + step, max);
    setGuestCount(newValue);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(guestCount - step, min);
    setGuestCount(newValue);
    onChange(newValue);
  };

  return (
    <div className="guest-count-slider">
      <label htmlFor="guest-slider">Number of Guests</label>
      
      <div className="slider-display">
        <span className="current-value">{guestCount} Guests</span>
      </div>

      <div className="slider-controls">
        <button 
          onClick={decrement} 
          disabled={guestCount <= min}
          aria-label="Decrease guest count"
        >
          -
        </button>

        <input
          id="guest-slider"
          type="range"
          min={min}
          max={max}
          step={step}
          value={guestCount}
          onChange={handleSliderChange}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={guestCount}
          aria-label="Guest count selector"
        />

        <button 
          onClick={increment} 
          disabled={guestCount >= max}
          aria-label="Increase guest count"
        >
          +
        </button>
      </div>

      <div className="slider-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <input
        type="number"
        value={guestCount}
        onChange={(e) => {
          const newValue = Math.min(Math.max(parseInt(e.target.value) || min, min), max);
          setGuestCount(newValue);
          onChange(newValue);
        }}
        min={min}
        max={max}
        className="numeric-input"
      />
    </div>
  );
}
```

### Toggle Button Component (React Example)

```jsx
function ProteinSelector({ selected, onToggle, protein }) {
  const isSelected = selected.includes(protein.id);
  const canSelect = selected.length < 2 || isSelected;

  return (
    <button
      className={`protein-card ${isSelected ? 'selected' : ''} ${!canSelect ? 'disabled' : ''}`}
      onClick={() => canSelect && onToggle(protein.id)}
      disabled={!canSelect}
      aria-pressed={isSelected}
    >
      <img src={protein.image} alt={protein.name} />
      <h3>{protein.name}</h3>
      <p className="price">${protein.pricePerPerson} per person</p>
      <p className="includes">Includes salad & dessert</p>
      
      {isSelected && (
        <div className="selection-indicator">
          <CheckIcon /> Selected
        </div>
      )}
    </button>
  );
}

function ProteinSelection({ onSelectionChange }) {
  const [selectedProteins, setSelectedProteins] = useState([]);

  const handleToggle = (proteinId) => {
    let newSelection;
    if (selectedProteins.includes(proteinId)) {
      // Remove
      newSelection = selectedProteins.filter(id => id !== proteinId);
    } else {
      // Add (if less than 2)
      if (selectedProteins.length < 2) {
        newSelection = [...selectedProteins, proteinId];
      } else {
        return; // Already have 2 selected
      }
    }
    
    setSelectedProteins(newSelection);
    onSelectionChange(newSelection);
  };

  return (
    <div className="protein-selection">
      <h2>Select 2 Proteins for Your Reception</h2>
      <p className="selection-counter">
        {selectedProteins.length} of 2 selected
        {selectedProteins.length === 2 && ' ✓'}
      </p>

      <div className="protein-grid">
        {CATERING.proteins.map(protein => (
          <ProteinSelector
            key={protein.id}
            protein={protein}
            selected={selectedProteins}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {selectedProteins.length !== 2 && (
        <p className="validation-message">
          Please select exactly 2 protein options to continue
        </p>
      )}
    </div>
  );
}
```

### Price Calculator with Tax (JavaScript)

```javascript
function calculateCompleteQuote(cartState) {
  // Get tax rate for venue location
  const taxRate = 0.0775; // Nevada County base rate
  
  // Calculate venue
  const venueCost = cartState.venueCost;
  
  // Calculate catering (average of 2 selected proteins)
  const protein1Price = CATERING.proteins.find(p => p.id === cartState.catering.proteins[0]).pricePerPerson;
  const protein2Price = CATERING.proteins.find(p => p.id === cartState.catering.proteins[1]).pricePerPerson;
  const avgMealPrice = (protein1Price + protein2Price) / 2;
  const baseCatering = avgMealPrice * cartState.guestCount;
  
  // Calculate catering add-ons
  const sidesTotal = cartState.catering.sides.length * 8 * cartState.guestCount;
  const appetizersTotal = cartState.catering.appetizers.length * 6 * cartState.guestCount;
  const cateringSubtotal = baseCatering + sidesTotal + appetizersTotal;
  
  // Calculate beverages
  const beverageTotal = cartState.beverages.package 
    ? BEVERAGES.packages.find(p => p.id === cartState.beverages.package).pricePerPerson * cartState.guestCount
    : 0;
  
  // Calculate service fee (20% on F&B)
  const serviceFee = (cateringSubtotal + beverageTotal) * 0.20;
  
  // Calculate add-ons
  const floralCost = cartState.addOns.floral?.cost || 0;
  const photographyCost = cartState.addOns.photography ? 3500 : 0;
  const djCost = cartState.addOns.dj ? 2500 : 0;
  
  // Wedding planner (free with full package)
  const isFullPackage = checkFullPackageEligibility(cartState);
  const plannerCost = (cartState.addOns.weddingPlanner && !isFullPackage) ? 2500 : 0;
  
  // Separate taxable and non-taxable
  const taxableSubtotal = 
    venueCost + 
    cateringSubtotal + 
    beverageTotal + 
    serviceFee + 
    floralCost + 
    djCost;
  
  const nonTaxableSubtotal = 
    photographyCost + 
    plannerCost;
  
  // Calculate sales tax
  const salesTax = taxableSubtotal * taxRate;
  
  // Subtotal with tax
  const subtotalWithTax = taxableSubtotal + nonTaxableSubtotal + salesTax;
  
  // Apply full package discount if eligible
  const discount = isFullPackage ? subtotalWithTax * 0.10 : 0;
  
  // Grand total
  const grandTotal = subtotalWithTax - discount;
  
  return {
    venue: venueCost,
    catering: {
      base: baseCatering,
      sides: sidesTotal,
      appetizers: appetizersTotal,
      subtotal: cateringSubtotal
    },
    beverages: beverageTotal,
    serviceFee: serviceFee,
    addOns: {
      floral: floralCost,
      photography: photographyCost,
      planner: plannerCost,
      dj: djCost,
      subtotal: floralCost + photographyCost + plannerCost + djCost
    },
    tax: {
      taxableSubtotal,
      nonTaxableSubtotal,
      rate: taxRate,
      amount: salesTax
    },
    discount: {
      eligible: isFullPackage,
      amount: discount
    },
    grandTotal: grandTotal
  };
}
```

---

## 19. Form Field Styling

### Input Fields
```css
.input-field {
  height: 48px;
  padding: 12px 16px;
  border: 2px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms;
}

.input-field:focus {
  outline: none;
  border-color: #D4AF37; /* Brand gold */
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.input-field.error {
  border-color: #E74C3C;
}

.input-field.success {
  border-color: #27AE60;
}
```

### Slider Styling
```css
.slider-input {
  width: 100%;
  height: 8px;
  background: linear-gradient(
    to right,
    #D4AF37 0%,
    #D4AF37 var(--slider-percentage),
    #E0E0E0 var(--slider-percentage),
    #E0E0E0 100%
  );
  border-radius: 4px;
  outline: none;
}

.slider-input::-webkit-slider-thumb {
  width: 32px;
  height: 32px;
  background: #D4AF37;
  border: 4px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 150ms;
}

.slider-input::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.slider-input::-webkit-slider-thumb:active {
  transform: scale(1.15);
  box-shadow: 0 0 0 8px rgba(212, 175, 55, 0.2);
}
```

### Button Styling
```css
.button-primary {
  background: #D4AF37;
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 200ms;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.button-primary:hover {
  background: #C9A02C;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.button-primary:disabled {
  background: #CCCCCC;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 20. Mobile-Specific Considerations

### Touch Targets
- Minimum size: 44×44px (Apple iOS guidelines)
- Preferred size: 48×48px (Material Design)
- Spacing: Minimum 8px between adjacent touch targets

### Slider on Mobile
- Handle size: 48×48px
- Track height: 12px (thicker than desktop)
- Haptic feedback on value change (if supported)
- Larger tap area extends 20px beyond handle

### Pull-to-Refresh
- Disable on pricing pages (prevent accidental refresh)
- Enable on quote history/list views

### Mobile-Specific UI
- Floating action button for "View Total" (expands price summary)
- Swipe gestures between steps (optional)
- Bottom sheet for expanded details
- Native date picker on iOS/Android

---

## Document End

**This UI Controls document should be used in conjunction with:**
- WEDDING_CART_SPEC.md (Main specification)
- Design mockups/wireframes
- Component library documentation
