import { STOCKS } from "@/lib/stocks";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-700 p-8">
      <h1 className="mb-2 text-4xl text-white font-bold text-center">Stock History Viewer</h1>
      <p className="mb-8 text-lg text-white text-center">
        Select a stock to view company information and historical prices.
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {STOCKS.map((stock) => (
          <li key={stock.symbol}>
            <Link
              href={`/stocks/${stock.symbol}`}
              className="block rounded-xl bg-emerald-700 p-5 shadow transition hover:shadow-lg"
            >
              <div className="text-xl font-semibold">{stock.symbol}</div>
              <div className="text-gray-800">{stock.name}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
