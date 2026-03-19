export function formatMarketCap(value: string): string {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return "N/A";
  }

  if (num >= 1_000_000_000_000) {
    return `$${(num / 1_000_000_000_000).toFixed(2)}T`;
  }

  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }

  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }

  return `$${num.toLocaleString()}`;
}

export function formatVolume(value: number): string {
  return value.toLocaleString();
}