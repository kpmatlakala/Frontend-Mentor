import { useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useFxStore from '../../store/useFxStore';

export default function HistoryChart() {
  const fromCurrency = useFxStore(state => state.fromCurrency);
  const toCurrency = useFxStore(state => state.toCurrency);
  const chartRange = useFxStore(state => state.chartRange);
  const historyData = useFxStore(state => state.historyData);
  const isLoading = useFxStore(state => state.isLoading);
  const error = useFxStore(state => state.error);
  const fetchHistory = useFxStore(state => state.fetchHistory);

  // Fetch history when pair or range changes
  useEffect(() => {
    fetchHistory(chartRange);
  }, [fromCurrency, toCurrency, chartRange, fetchHistory]);

  // Format dates for X-axis
  const formatXAxis = (dateStr) => {
    const date = new Date(dateStr);
    if (chartRange === '1d') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    if (chartRange === '1w' || chartRange === '1m') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Format Y-axis values
  const formatYAxis = (value) => {
    return value.toFixed(4);
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-800 border border-neutral-600 rounded-lg p-3 shadow-lg">
          <p className="text-neutral-200 text-xs font-mono">{label}</p>
          <p className="text-lime-500 text-sm font-mono font-bold">
            {payload[0].value.toFixed(4)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Loading state
  if (isLoading && !historyData) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-neutral-50 text-base font-medium font-mono">
            {fromCurrency}/{toCurrency}
          </span>
          <span className="opacity-70 text-neutral-50 text-xs font-mono">Loading...</span>
        </div>
        <div className="h-64 flex items-center justify-center">
          <span className="text-neutral-400 font-mono text-sm">Loading chart data...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-neutral-50 text-base font-medium font-mono">
            {fromCurrency}/{toCurrency}
          </span>
          <span className="opacity-70 text-neutral-50 text-xs font-mono">—</span>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">No chart data available</span>
          <p className="max-w-[508px] text-center text-neutral-200 text-sm font-mono">
            We couldn't load rate history for {fromCurrency}/{toCurrency} right now. This usually clears up in a minute.
          </p>
        </div>
      </div>
    );
  }

  // No data
  if (!historyData || historyData.length === 0) {
    return (
      <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-neutral-50 text-base font-medium font-mono">
            {fromCurrency}/{toCurrency}
          </span>
          <span className="opacity-70 text-neutral-50 text-xs font-mono">—</span>
        </div>
        <div className="py-10 flex flex-col items-center gap-4">
          <span className="text-neutral-100 text-xl font-mono">No chart data available</span>
          <p className="max-w-[508px] text-center text-neutral-200 text-sm font-mono">
            We couldn't load rate history for {fromCurrency}/{toCurrency} right now. This usually clears up in a minute.
          </p>
        </div>
      </div>
    );
  }

  // Calculate domain for Y-axis (min/max with padding)
  const rates = historyData.map(d => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const padding = (maxRate - minRate) * 0.1 || 0.001;

  // Get latest rate and timestamp
  const latest = historyData[historyData.length - 1];
  const latestDate = new Date(latest.date);

  return (
    <div className="p-5 bg-neutral-700 rounded-2xl outline outline-1 outline-neutral-600 flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <span className="text-neutral-50 text-base font-medium font-mono tracking-wide">
          {fromCurrency}/{toCurrency}
        </span>
        <span className="opacity-70 text-neutral-50 text-xs font-mono tracking-wide">
          {latest.rate.toFixed(4)} · {latestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div className="w-full h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={historyData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/* Grid lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2E2E2E"
              vertical={false}
            />
            
            {/* X-Axis */}
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fill: '#9D9D9D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#2E2E2E' }}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            
            {/* Y-Axis */}
            <YAxis
              domain={[minRate - padding, maxRate + padding]}
              tickFormatter={formatYAxis}
              tick={{ fill: '#9D9D9D', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#2E2E2E' }}
              tickLine={false}
              width={60}
              orientation="left"
            />
            
            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CEF739" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#CEF739" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {/* Area (filled) */}
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#CEF739"
              strokeWidth={2}
              fill="url(#limeGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#CEF739', stroke: '#0A0A0A', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}