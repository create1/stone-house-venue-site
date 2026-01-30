# Supabase Setup Instructions

This document guides you through setting up the Supabase database for the Stone House booking system.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Enter project details:
   - **Name**: Stone House Bookings
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to your users
5. Click "Create new project" and wait for setup to complete (2-3 minutes)

## Step 2: Create Database Tables

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy and paste the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_date DATE NOT NULL UNIQUE,
  booking_type VARCHAR(20) CHECK (booking_type IN ('full_day', 'half_day')),
  is_full_venue BOOLEAN DEFAULT false,
  selected_floors JSONB,
  season VARCHAR(10),
  day_type VARCHAR(10),
  pricing_tier VARCHAR(30),
  total_price DECIMAL(10, 2),
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  event_type VARCHAR(100),
  guest_count INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create blocked_dates table
CREATE TABLE blocked_dates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocked_date DATE NOT NULL UNIQUE,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index on booking_date for faster queries
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_blocked_dates_date ON blocked_dates(blocked_date);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some test blocked dates (optional)
INSERT INTO blocked_dates (blocked_date, reason) VALUES
  ('2026-12-25', 'Christmas Day - Venue Closed'),
  ('2026-01-01', 'New Years Day - Venue Closed');
```

4. Click **"Run"** to execute the SQL
5. You should see "Success. No rows returned" message

## Step 3: Configure Row Level Security (RLS)

For production security, you should enable RLS. For now, we'll keep it simple:

1. In SQL Editor, run this query:

```sql
-- Enable RLS on tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service key to read/write everything
CREATE POLICY "Service role can do everything on bookings"
  ON bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on blocked_dates"
  ON blocked_dates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow public to read availability (for calendar display)
CREATE POLICY "Anyone can check availability"
  ON bookings
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can check blocked dates"
  ON blocked_dates
  FOR SELECT
  TO anon
  USING (true);
```

## Step 4: Get Your API Credentials

1. Go to **Settings** (left sidebar) → **API**
2. You'll see your project credentials:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **Project API keys**:
     - `anon` / `public` key: Used for client-side calls
     - `service_role` key: Used for server-side calls (KEEP SECRET!)

3. Copy these values and add them to your `.env.local` file:

```bash
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...  (your anon key)
SUPABASE_SERVICE_KEY=eyJhbGc... (your service_role key)
```

## Step 5: Test the Connection

You can test your database connection using the Supabase dashboard:

1. Go to **Table Editor** (left sidebar)
2. You should see your `bookings` and `blocked_dates` tables
3. Try inserting a test record:
   - Click on `blocked_dates` table
   - Click **"Insert row"**
   - Set `blocked_date` to a future date
   - Set `reason` to "Test"
   - Click **"Save"**

4. If successful, you can delete the test record

## Step 6: Optional - Create Admin User

If you want to create an admin interface later, you can set up Supabase Auth:

1. Go to **Authentication** (left sidebar)
2. Go to **Policies** and enable email authentication
3. Create your admin user account

For now, you can skip this step and add it later.

## Troubleshooting

### Error: "relation 'bookings' does not exist"
- Make sure you ran the SQL query in Step 2
- Check that there are no syntax errors in the SQL

### Error: "permission denied for table bookings"
- Make sure you ran the RLS policies in Step 3
- Verify you're using the `service_role` key in your `.env.local`

### Connection timeout errors
- Check that your Supabase project is active
- Verify the URL and keys are correct in `.env.local`

## Next Steps

After completing this setup:

1. ✅ Database tables created
2. ✅ API credentials configured
3. ✅ Ready to test API endpoints

You can now test your API endpoints:

```bash
# Test pricing calculation
curl -X POST http://localhost:8080/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{"date":"2026-06-15","bookingType":"full_day","isFullVenue":true}'

# Test availability check
curl http://localhost:8080/api/availability/check?date=2026-06-15
```

## Production Deployment

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add all the environment variables from your `.env.local` file
4. Make sure to mark `SUPABASE_SERVICE_KEY` and `STRIPE_SECRET_KEY` as **Secret**
5. Redeploy your application

---

**Security Note**: Never commit your `.env.local` file or share your `service_role` key publicly!
