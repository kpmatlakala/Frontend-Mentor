import { useMemo } from 'react';
import useFxStore from '../../store/useFxStore';
import ClearAllButton from '../ui/ClearAllButton';
import DeleteIcon from '../ui/icons/DeleteIcon';

export default function LogList() {
  const conversionLog = useFxStore((state) => state.conversionLog);
  const clearLog = useFxStore((state) => state.clearLog);
  const deleteLogEntry = useFxStore((state) => state.deleteLogEntry);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all conversion history?')) {
      clearLog();
    }
  };

  // Format relative time (e.g., "20M", "34M", "1H", "2H", "4H", "13 May")
  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}M`;
    if (hours < 24) return `${hours}H`;
    if (days < 7) return `${days}D`;
    return new Date(timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (conversionLog.length === 0) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
        <div className="flex justify-between items-center mb-6">
          <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">
            CONVERSION LOG
          </span>
          <div className="flex items-center gap-4">
            <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
              0 LOGGED
            </span>
            <ClearAllButton disabled />
          </div>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">
            No conversions logged yet
          </span>
          <p className="max-w-[740px] text-center text-neutral-200 text-sm font-mono tracking-wide">
            Every conversion is recorded here automatically when you tap LOG CONVERSION.
            Your log is private to this session and this browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600">
      <div className="flex justify-between items-center mb-5">
        <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">
          CONVERSION LOG
        </span>
        <div className="flex items-center gap-4">
          <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
            {conversionLog.length} LOGGED
          </span>
          <ClearAllButton onClick={handleClearAll} />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {conversionLog.map((entry) => (
          <LogRow
            key={entry.id}
            entry={entry}
            onDelete={() => deleteLogEntry(entry.id)}
            getRelativeTime={getRelativeTime}
          />
        ))}
      </div>
    </div>
  );
}

function LogRow({ entry, onDelete, getRelativeTime }) {
  return (
    <div className="w-full h-auto sm:h-16 px-3 sm:px-4 py-2 sm:py-3 bg-neutral-600 rounded-[10px] outline outline-1 outline-neutral-500 flex items-center gap-4 hover:outline-neutral-400 transition-colors">
      {/* Time */}
      <div className="w-16 flex-shrink-0">
        <span className="text-neutral-200 text-sm font-mono tracking-wide">
          {getRelativeTime(entry.timestamp)}
        </span>
      </div>

      {/* Pair */}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <span className="text-neutral-50 text-sm font-mono tracking-wide">
          {entry.from}
        </span>
        <span className="text-neutral-200 text-xs font-mono" aria-hidden="true">
          arrow-right
        </span>
        <span className="text-neutral-50 text-sm font-mono tracking-wide">
          {entry.to}
        </span>
      </div>

      {/* Amounts */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <span className="text-neutral-100 text-base font-mono tracking-wide">
          {entry.amount.toLocaleString()}
        </span>
        <span className="text-lime-500 text-base font-mono tracking-wide">
          {entry.result.toLocaleString()}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="w-8 h-8 p-2 rounded-lg outline outline-1 outline-neutral-500 bg-neutral-600 flex items-center justify-center flex-shrink-0 hover:outline-neutral-400 transition-colors"
        aria-label="Delete log entry"
      >
        <DeleteIcon className="w-4 h-4" />
      </button>
    </div>
  );
}