export default function MarketingLoading() {
  return (
    <div
      className="mx-auto max-w-[90rem] animate-pulse px-4 py-16 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading"
    >
      <div className="h-4 w-24 rounded bg-white/10" />
      <div className="mt-6 h-10 w-2/3 max-w-md rounded bg-white/10" />
      <div className="mt-4 h-4 w-full max-w-lg rounded bg-white/5" />
      <div className="mt-4 h-4 w-5/6 max-w-lg rounded bg-white/5" />
    </div>
  );
}
