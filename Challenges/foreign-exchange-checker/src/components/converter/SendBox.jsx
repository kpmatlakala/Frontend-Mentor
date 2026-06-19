import { useState } from 'react';
import useFxStore from '../../store/useFxStore';
import CurrencyPicker from '../currency-picker/CurrencyPicker';
import CurrencyFlag from '../ui/icons/CurrencyFlag';
import ChevronDownIcon from '../ui/icons/ChevronDownIcon';

export default function SendBox() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const amount = useFxStore(state => state.amount);
  const fromCurrency = useFxStore(state => state.fromCurrency);
  const setAmount = useFxStore(state => state.setAmount);

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/,/g, '');
    const num = parseFloat(raw);
    if (!isNaN(num)) setAmount(num);
  };

  return (
    <div className="flex-1 p-5 bg-neutral-600 rounded-2xl outline outline-1 outline-neutral-500 flex flex-col gap-5">
      <label htmlFor="send-amount" className="text-sm text-neutral-100 font-mono tracking-wide">
        SEND
      </label>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <input
            type="text"
            id="send-amount"
            inputMode="decimal"
            value={amount.toLocaleString()}
            onChange={handleAmountChange}
            className="text-4xl font-bold font-mono bg-transparent border-b border-neutral-600 w-28 focus:border-lime-500 outline-none transition-colors text-neutral-50"
          />
        </div>
        <button
          onClick={() => setIsPickerOpen(true)}
          className="px-2.5 py-2 bg-neutral-500 rounded-lg outline outline-1 outline-neutral-400 flex items-center gap-2 hover:bg-neutral-400 transition-colors focus:ring-2 focus:ring-lime-500"
        >
          <CurrencyFlag currencyCode={fromCurrency} className="w-5 h-5" />
          <span className="text-sm font-mono text-neutral-50">{fromCurrency}</span>
          <ChevronDownIcon className="w-3 h-3" />
        </button>
      </div>

      {isPickerOpen && (
        <CurrencyPicker context="send" onClose={() => setIsPickerOpen(false)} />
      )}
    </div>
  );
}