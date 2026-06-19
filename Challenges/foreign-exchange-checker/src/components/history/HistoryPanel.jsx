import HistoryStats from './HistoryStats';
import RangeSelector from './RangeSelector';
import HistoryChart from './HistoryChart';

export default function HistoryPanel() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <HistoryStats />
        <RangeSelector />
      </div>
      <HistoryChart />
    </div>
  );
}