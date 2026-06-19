import useFxStore from '../../store/useFxStore';
import ClearAllButton from '../ui/ClearAllButton';

export default function LogList() {
  const conversionLog = useFxStore(state => state.conversionLog);
  const clearLog = useFxStore(state => state.clearLog);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all conversion history?')) {
      clearLog();
    }
  };

  if (conversionLog.length === 0) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="flex justify-between items-center mb-6">
          <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">CONVERSION LOG</span>
          <div className="flex items-center gap-4">
            <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">0 LOGGED</span>
            <ClearAllButton disabled />
          </div>
        </div>
        {/* Empty state content */}
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">No conversions logged yet</span>
          <p className="text-center text-neutral-200 text-sm font-mono tracking-wide max-w-[508px]">
            Every conversion is recorded here automatically when you tap Log conversion. Your log is private to this session and this browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
      <div className="flex justify-between items-center mb-5">
        <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">CONVERSION LOG</span>
        <div className="flex items-center gap-4">
          <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
            {conversionLog.length} LOGGED
          </span>
          <ClearAllButton onClick={handleClearAll} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {conversionLog.map((entry) => (
          <LogRow key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}