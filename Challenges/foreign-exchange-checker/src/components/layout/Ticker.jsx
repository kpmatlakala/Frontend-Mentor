export default function Ticker() {
  // Static placeholder data – will be replaced with API data later
  const pairs = [
    { pair: 'EUR/USD', rate: '1.1723', change: '-0.14%', up: false },
    { pair: 'USD/JPY', rate: '157.91', change: '+0.04%', up: true },
    { pair: 'GBP/USD', rate: '1.3575', change: '-0.22%', up: false },
    { pair: 'USD/CHF', rate: '0.9098', change: '+0.13%', up: true },
    { pair: 'EUR/GBP', rate: '0.8633', change: '+0.11%', up: true },
    { pair: 'AUD/USD', rate: '0.7208', change: '+0.08%', up: true },
    { pair: 'USD/CAD', rate: '1.3815', change: '+0.04%', up: true },
  ];

  return (
    <section aria-label="Live markets ticker" className="relative bg-neutral-700 overflow-hidden border-y border-neutral-600">
      <div className="flex items-center gap-2.5 overflow-x-auto py-3 px-4">
        {pairs.map((item, index) => (
          <span key={index} className="flex items-center gap-2.5 whitespace-nowrap text-xs font-mono">
            <span className="text-neutral-200">{item.pair}</span>
            <span className="text-neutral-50 font-medium">{item.rate}</span>
            <span className={item.up ? 'text-green-500' : 'text-red-500'}>
              {item.up ? '▲' : '▼'} {item.change}
            </span>
          </span>
        ))}
      </div>
      {/* "LIVE MARKETS" label pinned left */}
      <div className="absolute left-0 top-0 bottom-0 px-4 py-3 bg-lime-500 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full shadow-[0_0_0_2px_rgba(66,235,5,0.20)]" aria-hidden="true"></span>
        <span className="text-neutral-900 text-xs font-medium tracking-wide font-mono">LIVE MARKETS</span>
      </div>
    </section>
  );
}