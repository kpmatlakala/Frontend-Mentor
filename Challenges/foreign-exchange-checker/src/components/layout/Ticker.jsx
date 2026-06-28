import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';

// Pairs to show – you can extend this list
const TICKER_PAIRS = [
  { from: 'USD', to: 'EUR' },
  { from: 'USD', to: 'JPY' },
  { from: 'USD', to: 'GBP' },
  { from: 'USD', to: 'CHF' },
  { from: 'EUR', to: 'GBP' },
  { from: 'USD', to: 'AUD' },
  { from: 'USD', to: 'CAD' },
  { from: 'USD', to: 'NZD' },
  { from: 'USD', to: 'TRY' },
  { from: 'EUR', to: 'JPY' },
];

export default function Ticker() {
  const rates = useFxStore((state) => state.rates);

  const tickerItems = useMemo(() => {
    if (!rates) return [];

    return TICKER_PAIRS.map(({ from, to }) => {
      const rate = rates?.[to] || 0;
      // 24h change mock – you can replace with real historical data later
      const change = (Math.random() * 2 - 1) * 0.5;
      const isPositive = change >= 0;
      return {
        pair: `${from}/${to}`,
        rate,
        change: isPositive ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`,
        isPositive,
      };
    }).filter((item) => item.rate > 0);
  }, [rates]);

  if (tickerItems.length === 0) {
    return (
      <section
        aria-label="Live markets ticker"
        className="relative bg-neutral-700 overflow-hidden border-y border-neutral-600"
      >
        <div className="flex items-center gap-2.5 overflow-x-auto py-3 px-4">
          <span className="text-neutral-400 text-xs font-mono">Loading markets...</span>
        </div>
        <div className="absolute left-0 top-0 bottom-0 px-4 py-3 bg-lime-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full shadow-[0_0_0_2px_rgba(66,235,5,0.20)]" aria-hidden="true" />
          <span className="text-neutral-900 text-xs font-medium tracking-wide font-mono">LIVE MARKETS</span>
        </div>
      </section>
    );
  }

  // Duplicate items to create seamless loop
  const duplicatedItems = [...tickerItems, ...tickerItems];

  return (
    <section
      aria-label="Live markets ticker"
      className="relative bg-neutral-700 overflow-hidden border-y border-neutral-600"
    >
      <div className="flex items-center gap-2.5 py-3 px-4 overflow-hidden">
        <div className="ticker-scroll flex items-center gap-2.5 whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <span key={index} className="flex items-center gap-2.5 text-xs font-mono px-2">
              <span className="text-neutral-200">{item.pair}</span>
              <span className="text-neutral-50 font-medium">{item.rate.toFixed(4)}</span>
              <span className={item.isPositive ? 'text-green-500' : 'text-red-500'}>
                {item.isPositive ? '▲' : '▼'} {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Fixed "LIVE MARKETS" label */}
      <div className="absolute left-0 top-0 bottom-0 px-4 py-3 bg-lime-500 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full shadow-[0_0_0_2px_rgba(66,235,5,0.20)]" aria-hidden="true" />
        <span className="text-neutral-900 text-xs font-medium tracking-wide font-mono">LIVE MARKETS</span>
      </div>
    </section>
  );
}