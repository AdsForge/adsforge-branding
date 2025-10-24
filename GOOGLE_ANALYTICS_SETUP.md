# Google Analytics Setup Guide

## ✅ What's Already Done

The following files have been created and configured:

1. **`src/components/GoogleAnalytics.tsx`** - Component that loads Google Analytics scripts
2. **`src/app/layout.tsx`** - Updated to include the GoogleAnalytics component
3. **`src/lib/analytics.ts`** - Utility functions for tracking custom events

## 🔧 What You Need to Do

### Step 1: Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click on **Admin** (gear icon in the bottom left)
4. Create a new property or select an existing one:
   - Click **+ Create Property**
   - Enter your website name (e.g., "AdsForge Landing")
   - Select timezone and currency
   - Click **Next**
5. Set up a data stream:
   - Select **Web**
   - Enter your website URL: `https://adsforge.ai`
   - Enter stream name: "AdsForge Website"
   - Click **Create stream**
6. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add Environment Variable

Create a `.env.local` file in the root of your project:

```bash
# In your terminal, run:
touch .env.local
```

Add the following to `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID from Step 1.

**Important:** `.env.local` is already in your `.gitignore`, so your Measurement ID won't be committed to Git.

### Step 3: Restart Your Development Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it:
pnpm dev
```

### Step 4: Verify It's Working

1. Open your website in a browser
2. Open Chrome DevTools (F12 or right-click > Inspect)
3. Go to the **Network** tab
4. Filter by "gtag" or "google-analytics"
5. You should see requests being sent to Google Analytics
6. Alternatively, go to Google Analytics > Reports > Realtime to see your visit

## 📊 Using Custom Event Tracking

You can track custom events using the utilities in `src/lib/analytics.ts`:

### Example: Track Waitlist Signup

```typescript
import { analytics } from "@/lib/analytics";

function handleWaitlistSubmit(email: string) {
  // ... your submission logic ...

  // Track the event
  analytics.trackWaitlistSignup(email);
}
```

### Example: Track Button Clicks

```typescript
import { analytics } from "@/lib/analytics";

function MyButton() {
  return (
    <button
      onClick={() => {
        analytics.trackButtonClick("Get Started", "Hero Section");
        // ... your button logic ...
      }}
    >
      Get Started
    </button>
  );
}
```

### Available Tracking Functions

- `analytics.trackButtonClick(buttonName, location?)` - Track button clicks
- `analytics.trackFormSubmit(formName)` - Track form submissions
- `analytics.trackWaitlistSignup(email)` - Track waitlist signups
- `analytics.trackExternalLink(url, linkText?)` - Track external link clicks
- `analytics.trackError(errorMessage, errorLocation?)` - Track errors
- `trackPageView(url)` - Track page views (for client-side navigation)

## 🔍 Where to See Your Data

After setup, you can view your analytics data at:
[https://analytics.google.com/](https://analytics.google.com/)

Key reports to check:

- **Realtime** - See current visitors
- **Acquisition** - See where visitors come from
- **Engagement** - See what pages visitors view
- **Events** - See custom events you've tracked

## 🚀 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variable in your hosting platform:

   - Variable name: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - Variable value: Your Measurement ID (e.g., `G-XXXXXXXXXX`)

2. Deploy your site

3. Verify tracking is working in production by:
   - Visiting your live site
   - Checking Google Analytics Realtime report

## 🔒 Privacy Considerations

Make sure to:

- Update your Privacy Policy to mention Google Analytics
- Consider implementing cookie consent (GDPR compliance)
- Review Google Analytics data retention settings

## 📝 Next Steps

1. Set up conversion goals in Google Analytics
2. Configure custom events for important user actions
3. Set up reports and dashboards
4. Consider integrating Google Tag Manager for more advanced tracking

---

**Need help?** Check the [Google Analytics documentation](https://support.google.com/analytics)
