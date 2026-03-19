# Stock Dashboard

## Overview
This is a stock dashboard built with Next.js and the Alpha Vantage API.  
Users can view company information and historical stock prices.

## Features
- Displays 30 stock tickers
- Company overview (name, sector, market cap, etc.)
- Historical price data with percentage change
- Line chart visualization of recent prices
- Responsive UI with Tailwind CSS
- Loading and error states

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Alpha Vantage API (rate limited)

## API Limitations

This project uses the free tier of the Alpha Vantage API, which is limited to 25 requests per day and approximately 1 request per second.

To handle this, the application includes:
- Error handling for rate limit responses
- Graceful fallback messaging when data cannot be loaded
- Reduced data fetching (limited historical data)

During development, not all stocks could be tested continuously due to these limits, but the application is designed to handle real-world API constraints reliably.

## Environment Variables

This project requires an Alpha Vantage API key.

1. Go to https://www.alphavantage.co/support/#api-key to get a free API key

2. Create a `.env.local` file in the root of the project:

3. Add the following line:
ALPHA_VANTAGE_API_KEY=your_api_key_here

4. ALPHA_VANTAGE_API_KEY=your_api_key_here

```bash
npm install
npm run dev
