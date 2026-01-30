/**
 * Vercel Serverless Function: Calculate Pricing
 * POST /api/pricing/calculate
 *
 * Calculates pricing for a venue booking based on date and configuration
 */

const PricingEngine = require('../../src/js/pricing-engine');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    const { date, bookingType, isFullVenue, selectedFloors } = req.body;

    // Validate required fields
    if (!date) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Date is required'
      });
    }

    if (!bookingType) {
      return res.status(400).json({
        error: 'Missing required field',
        message: 'Booking type is required (full_day or half_day)'
      });
    }

    // Parse date string to Date object
    const bookingDate = new Date(date);

    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid date',
        message: 'Please provide a valid date in ISO format'
      });
    }

    // Calculate pricing using the pricing engine
    const result = PricingEngine.calculatePrice(
      bookingDate,
      bookingType,
      isFullVenue === true,
      selectedFloors || []
    );

    if (!result.success) {
      return res.status(400).json({
        error: 'Pricing calculation failed',
        message: result.error,
        details: {
          date: date,
          season: result.season,
          dayType: result.dayType,
          tier: result.tier
        }
      });
    }

    // Return successful pricing calculation
    return res.status(200).json({
      success: true,
      pricing: {
        price: result.price,
        formattedPrice: PricingEngine.formatPrice(result.price),
        bookingType: result.bookingType,
        isFullVenue: result.isFullVenue,
        date: date,
        season: result.season,
        dayType: result.dayType,
        tier: result.tier,
        tierLabel: result.tierLabel,
        tierDescription: result.tierDescription,
        breakdown: result.breakdown
      }
    });

  } catch (error) {
    console.error('Pricing calculation error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while calculating pricing',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
