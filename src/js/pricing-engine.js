/**
 * Pricing Engine for Stone House Venue
 * Calculates pricing based on date, season, day type, and booking options
 */

class PricingEngine {
  /**
   * Pricing tiers based on the pricing matrix
   */
  static PRICING_TIERS = {
    peak_weekend: {
      full_day: 9000,
      half_day_per_floor: null, // Not available for peak weekends
      label: 'Peak Weekend',
      description: 'Fall & Spring, Friday to Sunday'
    },
    off_peak_weekend_or_peak_weekday: {
      full_day: 6000,
      half_day_per_floor: 2000,
      label: 'Off-Peak Weekend / Peak Weekday',
      description: 'Off-peak weekends or peak season weekdays'
    },
    off_peak_weekday: {
      full_day: 5000,
      half_day_per_floor: 2500,
      label: 'Off-Peak Weekday',
      description: 'Winter & Summer, Monday to Wednesday'
    }
  };

  /**
   * Available venue floors/spaces
   */
  static AVAILABLE_FLOORS = [
    { id: 'parlour', name: 'The Parlour', capacity: 100, level: 'Ground Floor' },
    { id: 'lounge', name: 'The Lounge', capacity: 50, level: 'Ground Floor' },
    { id: 'great-hall', name: 'The Great Hall', capacity: 100, level: 'Ground Floor' },
    { id: 'courtyard', name: 'The Courtyard', capacity: 130, level: 'Outdoor' },
    { id: 'cavern', name: 'The Cavern', capacity: 30, level: 'Lower Level' },
    { id: 'showroom', name: 'The Showroom', capacity: 300, level: 'Upper Floor' },
    { id: 'suite', name: 'The Suite', capacity: 10, level: 'Upper Floor' }
  ];

  /**
   * Determine the season for a given date
   * @param {Date} date - The date to check
   * @returns {string} 'spring', 'summer', 'fall', or 'winter'
   */
  static getSeason(date) {
    const month = date.getMonth(); // 0-11

    // Spring: March (2), April (3), May (4)
    if ([2, 3, 4].includes(month)) return 'spring';

    // Summer: June (5), July (6), August (7)
    if ([5, 6, 7].includes(month)) return 'summer';

    // Fall: September (8), October (9), November (10)
    if ([8, 9, 10].includes(month)) return 'fall';

    // Winter: December (11), January (0), February (1)
    if ([11, 0, 1].includes(month)) return 'winter';
  }

  /**
   * Determine if a date is a weekend or weekday
   * Weekend = Friday (5), Saturday (6), Sunday (0)
   * Weekday = Monday (1) through Thursday (4)
   * @param {Date} date - The date to check
   * @returns {string} 'weekend' or 'weekday'
   */
  static getDayType(date) {
    const day = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday

    // Friday (5), Saturday (6), Sunday (0) = Weekend
    if (day === 0 || day === 5 || day === 6) {
      return 'weekend';
    }

    // Monday (1) through Thursday (4) = Weekday
    return 'weekday';
  }

  /**
   * Determine the pricing tier based on season and day type
   * @param {Date} date - The date to check
   * @returns {string} Pricing tier identifier
   */
  static getPricingTier(date) {
    const season = this.getSeason(date);
    const dayType = this.getDayType(date);

    // Peak Weekend: Fall/Spring + Weekend (Fri-Sun)
    if ((season === 'fall' || season === 'spring') && dayType === 'weekend') {
      return 'peak_weekend';
    }

    // Off-Peak Weekend OR Peak Weekday
    // This tier covers:
    // 1. Winter/Summer + Weekend (Fri-Sun)
    // 2. Fall/Spring + Weekday (Mon-Thu)
    if ((season === 'winter' || season === 'summer') && dayType === 'weekend') {
      return 'off_peak_weekend_or_peak_weekday';
    }
    if ((season === 'fall' || season === 'spring') && dayType === 'weekday') {
      return 'off_peak_weekend_or_peak_weekday';
    }

    // Off-Peak Weekday: Winter/Summer + Weekday (Mon-Thu)
    if ((season === 'winter' || season === 'summer') && dayType === 'weekday') {
      return 'off_peak_weekday';
    }

    // Fallback (should never reach here)
    return 'off_peak_weekday';
  }

  /**
   * Calculate the price for a booking
   * @param {Date} date - The booking date
   * @param {string} bookingType - 'full_day' or 'half_day'
   * @param {boolean} isFullVenue - True if booking entire venue
   * @param {Array<string>} selectedFloors - Array of floor IDs (for individual floor bookings)
   * @returns {Object} Pricing result with price, tier info, and any errors
   */
  static calculatePrice(date, bookingType, isFullVenue, selectedFloors = []) {
    // Get pricing tier for the date
    const tierKey = this.getPricingTier(date);
    const tier = this.PRICING_TIERS[tierKey];
    const season = this.getSeason(date);
    const dayType = this.getDayType(date);

    // Validation: Peak weekends only allow full venue bookings
    if (tierKey === 'peak_weekend' && !isFullVenue) {
      return {
        success: false,
        error: 'Individual floors are not available for peak weekend dates. Full venue booking required.',
        date: date,
        season: season,
        dayType: dayType,
        tier: tierKey,
        tierLabel: tier.label
      };
    }

    // Full venue booking
    if (isFullVenue) {
      return {
        success: true,
        price: tier.full_day,
        bookingType: 'full_day',
        isFullVenue: true,
        date: date,
        season: season,
        dayType: dayType,
        tier: tierKey,
        tierLabel: tier.label,
        tierDescription: tier.description,
        breakdown: {
          baseRate: tier.full_day,
          venueType: 'Full Venue',
          duration: 'Full Day (12+ hours)'
        }
      };
    }

    // Individual floor booking
    if (bookingType === 'half_day') {
      const pricePerFloor = tier.half_day_per_floor;

      if (pricePerFloor === null) {
        return {
          success: false,
          error: 'Half-day individual floor bookings are not available for this date.',
          date: date,
          season: season,
          dayType: dayType,
          tier: tierKey,
          tierLabel: tier.label
        };
      }

      if (!selectedFloors || selectedFloors.length === 0) {
        return {
          success: false,
          error: 'Please select at least one floor for your booking.',
          date: date,
          season: season,
          dayType: dayType,
          tier: tierKey,
          tierLabel: tier.label
        };
      }

      const totalPrice = pricePerFloor * selectedFloors.length;

      // Get floor names for breakdown
      const floorDetails = selectedFloors.map(floorId => {
        const floor = this.AVAILABLE_FLOORS.find(f => f.id === floorId);
        return floor ? floor.name : floorId;
      });

      return {
        success: true,
        price: totalPrice,
        bookingType: 'half_day',
        isFullVenue: false,
        date: date,
        season: season,
        dayType: dayType,
        tier: tierKey,
        tierLabel: tier.label,
        tierDescription: tier.description,
        breakdown: {
          pricePerFloor: pricePerFloor,
          floorCount: selectedFloors.length,
          floors: floorDetails,
          duration: 'Half Day (up to 6 hours)'
        }
      };
    }

    // Full day individual floors (use full_day rate)
    if (bookingType === 'full_day' && !isFullVenue) {
      return {
        success: true,
        price: tier.full_day,
        bookingType: 'full_day',
        isFullVenue: false,
        date: date,
        season: season,
        dayType: dayType,
        tier: tierKey,
        tierLabel: tier.label,
        tierDescription: tier.description,
        breakdown: {
          baseRate: tier.full_day,
          venueType: 'Selected Floors',
          duration: 'Full Day (12+ hours)',
          note: 'Full day bookings use venue rate regardless of floor selection'
        }
      };
    }

    // Fallback error
    return {
      success: false,
      error: 'Invalid booking configuration. Please check your selections.',
      date: date,
      season: season,
      dayType: dayType
    };
  }

  /**
   * Get pricing information for a date range (useful for calendar display)
   * @param {Date} startDate - Start of date range
   * @param {Date} endDate - End of date range
   * @returns {Array<Object>} Array of date pricing information
   */
  static getPricingForDateRange(startDate, endDate) {
    const results = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const tierKey = this.getPricingTier(currentDate);
      const tier = this.PRICING_TIERS[tierKey];

      results.push({
        date: new Date(currentDate),
        season: this.getSeason(currentDate),
        dayType: this.getDayType(currentDate),
        tier: tierKey,
        tierLabel: tier.label,
        fullDayPrice: tier.full_day,
        halfDayPerFloor: tier.half_day_per_floor,
        allowsIndividualFloors: tier.half_day_per_floor !== null
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return results;
  }

  /**
   * Format price for display
   * @param {number} price - Price in dollars
   * @returns {string} Formatted price string
   */
  static formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  /**
   * Validate a booking configuration
   * @param {Object} bookingData - Booking configuration to validate
   * @returns {Object} Validation result
   */
  static validateBooking(bookingData) {
    const { date, bookingType, isFullVenue, selectedFloors } = bookingData;

    // Validate date
    if (!(date instanceof Date) || isNaN(date)) {
      return { valid: false, error: 'Invalid date provided' };
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return { valid: false, error: 'Cannot book dates in the past' };
    }

    // Validate booking type
    if (!['full_day', 'half_day'].includes(bookingType)) {
      return { valid: false, error: 'Invalid booking type' };
    }

    // Try to calculate price (will return errors if configuration is invalid)
    const result = this.calculatePrice(date, bookingType, isFullVenue, selectedFloors);

    if (!result.success) {
      return { valid: false, error: result.error };
    }

    return { valid: true, pricing: result };
  }
}

// Export for use in Node.js (backend) and browser (frontend)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PricingEngine;
} else if (typeof window !== 'undefined') {
  window.PricingEngine = PricingEngine;
}
