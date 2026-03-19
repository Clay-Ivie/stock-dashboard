import { NextResponse } from "next/server";

function safe(value?: string) {
  return value && value.trim() !== "" ? value : "N/A";
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await params;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing API key" },
      { status: 500 }
    );
  }
  const overviewResponse = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`
  );
  const overviewData = await overviewResponse.json();

  if (overviewData.Note || overviewData.Information) {
    return NextResponse.json(
      { error: overviewData.Note || overviewData.Information },
      { status: 429 }
    );
  }

  if (!overviewData.Symbol) {
    return NextResponse.json(
      { error: "Unable to load company overview" },
      { status: 400 }
    );
  }

  await sleep(1200);

  const priceResponse = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
  );
  const priceData = await priceResponse.json();

  if (priceData.Note || priceData.Information) {
    return NextResponse.json(
      { error: priceData.Note || priceData.Information },
      { status: 429 }
    );
  }

  const timeSeries = priceData["Time Series (Daily)"] || {};

  if (!timeSeries) {
    return NextResponse.json(
      { error: "Unable to load price history" },
      { status: 400 }
    );
  }

  // Extract only required fields
  const overview = {
    symbol: safe(overviewData.Symbol),
    assetType: safe(overviewData.AssetType),
    name: safe(overviewData.Name),
    description: safe(overviewData.Description),
    exchange: safe(overviewData.Exchange),
    sector: safe(overviewData.Sector),
    industry: safe(overviewData.Industry),
    marketCapitalization: safe(overviewData.MarketCapitalization),
  };
  

  const dates = Object.keys(timeSeries).sort((a, b) => b.localeCompare(a)); // Sort dates in descending order

  const prices = dates.slice(0,30).map((date, index) => {
    const currentDay = timeSeries[date];
    const previousDay = timeSeries[dates[index + 1]];
  
    const close = Number(currentDay["4. close"]);
    const volume = Number(currentDay["5. volume"]);
    const previousClose = previousDay ? Number(previousDay["4. close"]) : null;

    const percentChange = 
      previousClose && previousClose !== 0
        ? ((close - previousClose) / previousClose) * 100
        : null;

    return {
      date,
      close,
      volume,
      percentChange,
    };
  });

  return NextResponse.json({ overview, prices, });
}