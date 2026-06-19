import useFxStore from '../../store/useFxStore';

export default function HistoryChart() {
  const fromCurrency = useFxStore(state => state.fromCurrency);
  const toCurrency = useFxStore(state => state.toCurrency);

  // For now, we show the empty state – later you'll render a chart with Recharts
  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <span className="text-neutral-50 text-base font-medium font-mono leading-5 tracking-wide">
          {fromCurrency}/{toCurrency}
        </span>
        <span className="opacity-70 text-neutral-50 text-xs font-mono leading-4 tracking-wide">
          0.8530 · MAY 14 16:00 CET
        </span>
      </div>
      <div className="py-10 flex flex-col items-center gap-4">
        <span className="text-neutral-100 text-xl font-mono">No chart data available</span>
        <p className="max-w-[508px] text-center text-neutral-200 text-sm font-mono tracking-wide">
          We couldn't load rate history for {fromCurrency}/{toCurrency} right now. This usually clears up in a minute.
        </p>
      </div>
    </div>
  );
}