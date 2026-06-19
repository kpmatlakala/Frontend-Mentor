import useFxStore from '../../store/useFxStore';

export default function HistoryStats() {
  // These will come from your API later – using placeholder data
  const stats = {
    open: 0.8516,
    last: 0.8530,
    change: 0.0014,
    changePercent: 0.16,
    isPositive: true,
  };

  return (
    <div className="flex flex-1 flex-wrap gap-4">
      <div className="w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">OPEN</div>
        <div className="text-neutral-50 text-xl font-mono leading-6">{stats.open.toFixed(4)}</div>
      </div>
      <div className="w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">LAST</div>
        <div className="text-neutral-50 text-xl font-mono leading-6">{stats.last.toFixed(4)}</div>
      </div>
      <div className="w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">CHANGE</div>
        <div className={`text-xl font-mono leading-6 ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stats.isPositive ? '+' : ''}{stats.change.toFixed(4)}
        </div>
      </div>
      <div className="w-36 px-5 py-3 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="opacity-70 text-neutral-50 text-sm font-mono tracking-wide">% CHANGE</div>
        <div className={`text-xl font-mono leading-6 ${stats.isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {stats.isPositive ? '▲' : '▼'} {stats.isPositive ? '+' : ''}{stats.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}