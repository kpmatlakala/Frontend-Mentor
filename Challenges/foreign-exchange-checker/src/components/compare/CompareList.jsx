import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';
import CurrencyFlag from '../ui/icons/CurrencyFlag';
import PinButton from '../ui/icons/PinButton';

export default function CompareList() {
  const fromCurrency = useFxStore((state) => state.fromCurrency);
  const amount = useFxStore((state) => state.amount);
  const allRates = useFxStore((state) => state.allRates);
  const availableCurrencies = useFxStore((state) => state.availableCurrencies);
  const favorites = useFxStore((state) => state.favorites);
  const toggleFavorite = useFxStore((state) => state.toggleFavorite);

  // Build list of all currencies except base
  const currencyList = useMemo(() => {
    if (!availableCurrencies) return [];
    return Object.keys(availableCurrencies)
      .filter((code) => code !== fromCurrency)
      .map((code) => ({
        code,
        name: availableCurrencies[code],
      }));
  }, [availableCurrencies, fromCurrency]);

  // Build comparison data
  const comparisons = useMemo(() => {
    if (!allRates) return [];
    return currencyList.map((currency) => {
      const rate = allRates[currency.code] || 0;
      const converted = amount * rate;
      const pair = `${fromCurrency}/${currency.code}`;
      const isPinned = favorites.includes(pair);
      return {
        ...currency,
        rate,
        converted,
        pair,
        isPinned,
      };
    });
  }, [currencyList, allRates, amount, fromCurrency, favorites]);

  const handleToggleFavorite = (pair) => {
    toggleFavorite(pair);
  };

  // Empty state
  if (!amount || amount === 0) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-neutral-200 text-sm font-mono tracking-wide">MULTI-CURRENCY</span>
            <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">0 FROM {fromCurrency}</span>
          </div>
          <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">0 PAIRS</span>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">No comparison available</span>
          <p className="text-center text-neutral-200 text-sm font-mono tracking-wide max-w-[508px]">
            Enter an amount in Send above to see what your money is worth in other currencies.
          </p>
        </div>
      </div>
    );
  }

  if (!allRates) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <span className="text-neutral-200 text-sm font-mono tracking-wide">MULTI-CURRENCY</span>
            <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">
              {amount.toLocaleString()} FROM {fromCurrency}
            </span>
          </div>
          <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">Loading...</span>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">Loading exchange rates...</span>
          <p className="text-center text-neutral-200 text-sm font-mono tracking-wide max-w-[508px]">
            Fetching live rates for all currencies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <span className="text-neutral-200 text-sm font-mono tracking-wide">MULTI-CURRENCY</span>
          <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">
            {amount.toLocaleString()} FROM {fromCurrency}
          </span>
        </div>
        <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
          {comparisons.length} PAIRS
        </span>
      </div>

      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2">
        {comparisons.map((item) => (
          <CompareRow
            key={item.code}
            currency={item}
            onToggleFavorite={() => handleToggleFavorite(item.pair)}
          />
        ))}
      </div>
    </div>
  );
}

function CompareRow({ currency, onToggleFavorite }) {
  return (
    <div className="w-full h-16 px-4 py-3 bg-neutral-600 rounded-[10px] outline outline-1 outline-neutral-500 flex items-center gap-5 hover:outline-neutral-400 transition-colors">
      <CurrencyFlag currencyCode={currency.code} className="w-6 h-6 flex-shrink-0" />
      
      <div className="flex-1 flex flex-col min-w-0">
        <span className="text-neutral-50 text-sm font-mono tracking-wide">{currency.code}</span>
        <span className="text-neutral-200 text-xs font-mono tracking-wide truncate">{currency.name}</span>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
        <span className="text-neutral-50 text-base font-mono tracking-wide">
          {currency.converted.toFixed(2)}
        </span>
        <span className="text-neutral-200 text-[10px] font-mono">
          @ {currency.rate.toFixed(4)}
        </span>
      </div>

      <PinButton 
        isPinned={currency.isPinned}
        onClick={onToggleFavorite}
      />
    </div>
  );
}