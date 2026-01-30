/**
 * Vercel Serverless Function: Check Availability
 * GET /api/availability/check?date=YYYY-MM-DD
 *
 * Checks if a specific date is available for booking
 */

const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are accepted'
    });
  }

  try {
    const { date } = req.query;

    // Validate required fields
    if (!date) {
      return res.status(400).json({
        error: 'Missing required parameter',
        message: 'Date parameter is required (format: YYYY-MM-DD)'
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({
        error: 'Invalid date format',
        message: 'Date must be in YYYY-MM-DD format'
      });
    }

    // Parse and validate date
    const checkDate = new Date(date);
    if (isNaN(checkDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid date',
        message: 'Please provide a valid date'
      });
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      return res.status(200).json({
        available: false,
        reason: 'Date is in the past',
        date: date
      });
    }

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured');
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Database connection not configured'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if date is blocked by admin
    const { data: blockedDate, error: blockedError } = await supabase
      .from('blocked_dates')
      .select('*')
      .eq('blocked_date', date)
      .single();

    if (blockedError && blockedError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (not an error in this case)
      console.error('Error checking blocked dates:', blockedError);
      throw blockedError;
    }

    if (blockedDate) {
      return res.status(200).json({
        available: false,
        reason: blockedDate.reason || 'Date is not available',
        date: date
      });
    }

    // Check if date already has a confirmed booking
    const { data: existingBooking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_date', date)
      .eq('status', 'confirmed')
      .single();

    if (bookingError && bookingError.code !== 'PGRST116') {
      console.error('Error checking bookings:', bookingError);
      throw bookingError;
    }

    if (existingBooking) {
      return res.status(200).json({
        available: false,
        reason: 'Date already booked',
        date: date
      });
    }

    // Check for pending bookings (less than 15 minutes old)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { data: pendingBooking, error: pendingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('booking_date', date)
      .eq('status', 'pending')
      .gte('created_at', fifteenMinutesAgo)
      .single();

    if (pendingError && pendingError.code !== 'PGRST116') {
      console.error('Error checking pending bookings:', pendingError);
      throw pendingError;
    }

    if (pendingBooking) {
      return res.status(200).json({
        available: false,
        reason: 'Date has a pending booking',
        date: date
      });
    }

    // Date is available
    return res.status(200).json({
      available: true,
      date: date
    });

  } catch (error) {
    console.error('Availability check error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      message: 'An error occurred while checking availability',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
