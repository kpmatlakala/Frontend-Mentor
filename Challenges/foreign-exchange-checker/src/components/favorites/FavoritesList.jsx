import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';
import PinButton from '../ui/icons/PinButton';

export default function FavoritesList() {
  const favorites = useFxStore(state => state.favorites);
  const rates = useFxStore(state => state.rates);
  const toggleFavorite = useFxStore(state => state.toggleFavorite);
  const setFromCurrency = useFxStore(state => state.setFromCurrency);
  const setToCurrency = useFxStore(state => state.setToCurrency);

  // Build favorite items from stored pairs
  const favoriteItems = useMemo(() => {
    return favorites.map(pair => {
      const [from, to] = pair.split('/');
      const rate = rates?.[to] || 0;
      // Mock 24h change – we'll compute from history later
      const change = (Math.random() * 2 - 1) * 0.5;
      const isPositive = change >= 0;
      
      return {
        pair,
        from,
        to,
        rate,
        change: isPositive ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`,
        isPositive,
      };
    });
  }, [favorites, rates]);

  const handleLoadPair = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
  };

  if (favoriteItems.length === 0) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="flex justify-between items-center mb-6">
          <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">PINNED PAIRS</span>
          <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">0 FAVORITES</span>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">No pinned pairs yet</span>
          <p className="text-center text-neutral-200 text-sm font-mono tracking-wide max-w-[508px]">
            Pin a pair to track its rate here. Tap the star icon on any conversion or comparison row.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
      <div className="flex justify-between items-center mb-5">
        <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">PINNED PAIRS</span>
        <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
          {favoriteItems.length} FAVORITES
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {favoriteItems.map((item) => (
          <FavoriteRow
            key={item.pair}
            item={item}
            onLoad={() => handleLoadPair(item.from, item.to)}
            onUnpin={() => toggleFavorite(item.pair)}
          />
        ))}
      </div>
    </div>
  );
}

function FavoriteRow({ item, onLoad, onUnpin }) {
  return (
    <div 
      className="w-full px-4 py-3 bg-neutral-600 rounded-[10px] outline outline-1 outline-neutral-500 flex items-center gap-5 cursor-pointer hover:outline-neutral-400 transition-colors"
      onClick={onLoad}
    >
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-neutral-50 text-sm font-mono tracking-wide">{item.from}</span>
        <span className="text-neutral-400 text-xs" aria-hidden="true">→</span>
        <span className="text-neutral-50 text-sm font-mono tracking-wide">{item.to}</span>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
        <span className="text-neutral-50 text-base font-mono tracking-wide">
          {item.rate.toFixed(4)}
        </span>
        <span className={`text-[10px] font-mono ${item.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {item.isPositive ? '▲' : '▼'} {item.change}
        </span>
      </div>

      <PinButton isPinned={true} onClick={onUnpin} />
    </div>
  );
}