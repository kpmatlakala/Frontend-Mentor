import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';

// Popular pairs to show in ticker
const TICKER_PAIRS = [
  { from: 'USD', to: 'EUR' },
  { from: 'USD', to: 'JPY' },
  { from: 'USD', to: 'GBP' },
  { from: 'USD', to: 'CHF' },
  { from: 'EUR', to: 'GBP' },
  { from: 'USD', to: 'AUD' },
  { from: 'USD', to: 'CAD' },
];

export default function Ticker() {
  const rates = useFxStore(state => state.rates);
  const availableCurrencies = useFxStore(state => state.availableCurrencies);

  // Build ticker items from rates
  const tickerItems = useMemo(() => {
    if (!rates) return [];

    return TICKER_PAIRS.map(({ from, to }) => {
      const rate = rates?.[to] || 0;
      // Mock 24h change – we'll compute from history later
      const change = (Math.random() * 2 - 1) * 0.5;
      const isPositive = change >= 0;
      return {
        pair: `${from}/${to}`,
        rate: rate,
        change: isPositive ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`,
        isPositive,
      };
    }).filter(item => item.rate > 0); // Only show pairs with valid rates
  }, [rates]);

  if (tickerItems.length === 0) {
    return (
      <section aria-label="Live markets ticker" className="relative bg-neutral-700 overflow-hidden border-y border-neutral-600">
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

  return (
    <section aria-label="Live markets ticker" className="relative bg-neutral-700 overflow-hidden border-y border-neutral-600">
      <div className="flex items-center gap-2.5 overflow-x-auto py-3 px-4">
        {tickerItems.map((item, index) => (
          <span key={index} className="flex items-center gap-2.5 whitespace-nowrap text-xs font-mono px-2">
            <span className="text-neutral-200">{item.pair}</span>
            <span className="text-neutral-50 font-medium">{item.rate.toFixed(4)}</span>
            <span className={item.isPositive ? 'text-green-500' : 'text-red-500'}>
              {item.isPositive ? '▲' : '▼'} {item.change}
            </span>
          </span>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 px-4 py-3 bg-lime-500 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full shadow-[0_0_0_2px_rgba(66,235,5,0.20)]" aria-hidden="true" />
        <span className="text-neutral-900 text-xs font-medium tracking-wide font-mono">LIVE MARKETS</span>
      </div>
    </section>
  );
}