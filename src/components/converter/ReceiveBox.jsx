import { useState } from 'react';
import useFxStore from '../../store/useFxStore';
import CurrencyPicker from '../currency-picker/CurrencyPicker';
import CurrencyFlag from '../ui/icons/CurrencyFlag';
import ChevronDownIcon from '../ui/icons/ChevronDownIcon';

export default function ReceiveBox({ convertedAmount = 0 }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const toCurrency = useFxStore((state) => state.toCurrency);

  return (
    <div className="flex-1 p-5 bg-neutral-600 rounded-2xl outline outline-1 outline-neutral-500 flex flex-col gap-5">
      <label htmlFor="receive-amount" className="text-sm text-neutral-100 font-mono tracking-wide">
        RECEIVE
      </label>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <output id="receive-amount" className="text-lime-500 text-3xl sm:text-4xl font-bold font-mono">
            {convertedAmount.toFixed(2)}
          </output>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className="px-2.5 py-2 bg-neutral-500 rounded-lg outline outline-1 outline-neutral-400 flex items-center gap-2 hover:bg-neutral-400 transition-colors focus:ring-2 focus:ring-lime-500"
          >
            <CurrencyFlag currencyCode={toCurrency} className="w-5 h-5" />
            <span className="text-sm font-mono text-neutral-50">{toCurrency}</span>
            <ChevronDownIcon className="w-3 h-3" />
          </button>

          {isPickerOpen && (
            <CurrencyPicker
              context="receive"
              onClose={() => setIsPickerOpen(false)}
              align="right"
            />
          )}
        </div>
      </div>
    </div>
  );
}