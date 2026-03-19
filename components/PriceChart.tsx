"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Price = {
  date: string;
  close: number;
  volume: number;
  percentChange: number | null;
};

type PriceChartProps = {
  prices: Price[];
};

export default function PriceChart({ prices }: PriceChartProps) {
  const chartData = prices
    .slice(0, 30)
    .map((price) => ({
      date: price.date,
      close: price.close,
    }))
    .reverse();

  return (
    <div className="overflow-x-auto">
      <LineChart width={900} height={320} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" minTickGap={20} />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Line type="linear" dataKey="close" dot={{ r: 2 }} strokeWidth={2} />
      </LineChart>
    </div>
  );
}