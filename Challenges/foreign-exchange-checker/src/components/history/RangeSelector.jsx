import useFxStore from '../../store/useFxStore';

export default function RangeSelector() {
  const chartRange = useFxStore(state => state.chartRange);
  const setChartRange = useFxStore(state => state.setChartRange);

  const ranges = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: '3M', value: '3m' },
    { label: '1Y', value: '1y' },
    { label: '5Y', value: '5y' },
  ];

  return (
    <div className="p-0.5 bg-neutral-700 rounded-lg flex flex-wrap">
      {ranges.map((range) => {
        const isActive = chartRange === range.value;
        return (
          <button
            key={range.value}
            onClick={() => setChartRange(range.value)}
            className={`px-4 py-3 rounded-[16px] text-xs font-mono leading-4 tracking-wide transition-colors focus:ring-2 focus:ring-lime-500 ${
              isActive 
                ? 'bg-neutral-500 text-neutral-50' 
                : 'text-neutral-200 hover:bg-neutral-600'
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}