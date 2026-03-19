import { formatMarketCap, formatVolume } from "@/lib/format";
import PriceChart from "@/components/PriceChart";
import Link from "next/link";
import { headers } from "next/dist/server/request/headers";

type StockOverview = {
  symbol: string;
  assetType: string;
  name: string;
  description: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCapitalization: string;
};

type Price = {
  date: string;
  close: number;
  volume: number;
  percentChange: number | null;
};

type ApiResponse = {
  overview: StockOverview;
  prices: Price[];
  error?: string;
};

export default async function StockPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = await params;

  const headerStore = await headers();
  const host = headerStore.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/stock/${symbol}`, {
    cache: "no-store",
});

  const data: ApiResponse = await response.json();

  if (!response.ok || data.error) {
    return (
      <main className="min-h-screen bg-rose-900 p-8">
        <button className="bg-white rounded-lg px-4 py-2 shadow">
        <Link 
          href="/" 
          className="text-black hover:underline">
          ← Back to Stock List
        </Link>
      </button>
        <h1 className="mb-4 text-3xl font-bold py-5">Error</h1>
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-red-600 font-semibold">Unable to load stock data</p>
          <p className="mt-2 text-black">{data.error || "This may be due to API rate limits. Please try again later."}</p>
        </div>
      </main>
    );
  }

  const { overview, prices } = data;
  
  return (
    <main className="min-h-screen bg-gray-700 p-8">
      <button className="bg-white rounded-lg px-4 py-2 shadow">
        <Link 
          href="/" 
          className="inline-block text-black hover:underline">
          ← Back to Stock List
        </Link>
      </button>
      <div className="mx-auto max-w-5xl space-y-5">
        <section className="rounded-xl bg-white p-6 shadow">
          <h1 className="mb-4 text-3xl text-black font-bold">
            {overview.name} ({overview.symbol})
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-black">
            <p><strong>Asset Type:</strong> {overview.assetType}</p>
            <p><strong>Exchange:</strong> {overview.exchange}</p>
            <p><strong>Sector:</strong> {overview.sector}</p>
            <p><strong>Industry:</strong> {overview.industry}</p>
            <p><strong>Market Cap:</strong> {formatMarketCap(overview.marketCapitalization)}</p>
          </div>

          <p className="mt-6 text-black leading-7 ">{overview.description}</p>
        </section>
        <section className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl text-black font-bold">Historical Prices</h2>

          <div className="mb-8">
            <PriceChart prices={prices} />
          </div>

          <div className="overflow-x-auto text-black">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Date</th>
                  <th className="p-3">Close</th>
                  <th className="p-3">Volume</th>
                  <th className="p-3">% Change</th>
                </tr>
              </thead>
              <tbody>
                {prices.slice(0, 10).map((price) => (
                  <tr key={price.date} className="border-b">
                    <td className="p-3">{price.date}</td>
                    <td className="p-3">${price.close.toFixed(2)}</td>
                    <td className="p-3">{formatVolume(price.volume)}</td>
                    <td className="p-3">
                      {price.percentChange !== null ? (
                        <span
                          className={
                            price.percentChange >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {price.percentChange.toFixed(2)}%
                        </span>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}