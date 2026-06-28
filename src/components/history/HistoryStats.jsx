import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';

export default function HistoryStats() {
  const historyData = useFxStore((state) => state.historyData);

  const stats = useMemo(() => {
    if (!historyData || historyData.length === 0) {
      return {
        open: 0,
        last: 0,
        change: 0,
        changePercent: 0,
        isPositive: true,
      };
    }

    const first = historyData[0]?.rate || 0;
    const last = historyData[historyData.length - 1]?.rate || 0;
    const change = last - first;
    const changePercent = first !== 0 ? (change / first) * 100 : 0;

    return {
      open: first,
      last: last,
      change: change,
      changePercent: changePercent,
      isPositive: change >= 0,
    };
  }, [historyData]);

  // Loading state (no data yet)
  if (!historyData || historyData.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 w-full">
        {['OPEN', 'LAST', 'CHANGE', '% CHANGE'].map((label) => (
          <div key={label} className="col-span-1 sm:w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
            <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">{label}</div>
            <div className="text-neutral-50 text-xl font-mono leading-6">—</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 w-full">
      {/* OPEN */}
      <div className="col-span-1 sm:w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">OPEN</div>
        <div className="text-neutral-50 text-xl font-mono leading-6">{stats.open.toFixed(4)}</div>
      </div>
      {/* LAST */}
      <div className="col-span-1 sm:w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">LAST</div>
        <div className="text-neutral-50 text-xl font-mono leading-6">{stats.last.toFixed(4)}</div>
      </div>
      {/* CHANGE */}
      <div className="col-span-1 sm:w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">CHANGE</div>
        <div className={`text-xl font-mono leading-6 ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stats.isPositive ? '+' : ''}{stats.change.toFixed(4)}
        </div>
      </div>
      {/* % CHANGE */}
      <div className="col-span-1 sm:w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">% CHANGE</div>
        <div className={`text-xl font-mono leading-6 ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stats.isPositive ? '▲' : '▼'} {stats.isPositive ? '+' : ''}{stats.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}