import useFxStore from '../../store/useFxStore';

export default function HistoryEmpty() {
  const fromCurrency = useFxStore(state => state.fromCurrency);
  const toCurrency = useFxStore(state => state.toCurrency);

  return (
    <div className="py-10 flex flex-col items-center gap-4">
      <span className="text-neutral-100 text-xl font-mono">No chart data available</span>
      <p className="max-w-[508px] text-center text-neutral-200 text-sm font-mono tracking-wide">
        We couldn't load rate history for {fromCurrency}/{toCurrency} right now. This usually clears up in a minute.
      </p>
    </div>
  );
}