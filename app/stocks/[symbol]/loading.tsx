export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="mb-4 text-3xl font-bold animate-bounce">
          📈
        </div>
        <p className="text-gray-600">Loading stock data...</p>
      </div>
    </main>
  );
}