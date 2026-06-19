import { useState, useEffect, useRef } from "react";
import useFxStore from "../../store/useFxStore";
import CurrencyFlag from '../ui/icons/CurrencyFlag';
import SearchIcon from '../ui/icons/SearchIcon';
import ChevronDownIcon from '../ui/icons/ChevronDownIcon';

// You'll import this from your API later
const POPULAR_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CHF",
  "AUD",
  "CAD",
  "CNY",
];

export default function CurrencyPicker({ context, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const searchInputRef = useRef(null);

  // Get the currently selected currency for this context
  const fromCurrency = useFxStore((state) => state.fromCurrency);
  const toCurrency = useFxStore((state) => state.toCurrency);
  const setFromCurrency = useFxStore((state) => state.setFromCurrency);
  const setToCurrency = useFxStore((state) => state.setToCurrency);

  const selectedCurrency = context === "send" ? fromCurrency : toCurrency;

  // Focus search on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle click outside (on backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Handle currency selection
  const handleSelect = (currencyCode) => {
    if (context === "send") {
      setFromCurrency(currencyCode);
    } else {
      setToCurrency(currencyCode);
    }
    onClose();
  };

  // Filter currencies based on search
  const filteredCurrencies = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Split into popular and other
  const popular = filteredCurrencies.filter((c) =>
    POPULAR_CURRENCIES.includes(c.code),
  );
  const others = filteredCurrencies.filter(
    (c) => !POPULAR_CURRENCIES.includes(c.code),
  );

  // Temporary mock data (replace with API fetch)
  const mockCurrencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "BRL", name: "Brazilian Real" },
    // ... add more from your Figma export
  ];

  useEffect(() => {
    // Replace with actual API call
    setCurrencies(mockCurrencies);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-[400px] max-h-[500px] bg-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        <div className="p-4 border-b border-neutral-700">
          <div className="relative">
            {/* Search icon – if you have one */}
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            >
              🔍
            </span>

            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-transparent text-neutral-50 rounded-lg pl-9 pr-4 py-2 outline outline-1 transition-all duration-200 font-mono text-sm placeholder:text-neutral-400 focus:outline-lime-500 ${
                searchQuery
                  ? "outline-neutral-600 text-neutral-50"
                  : "outline-neutral-600 text-neutral-200"
              }`}
              placeholder="Search currencies..."
              autoComplete="off"
              aria-label="Search currencies"
            />
          </div>
        </div>

        {/* Currency Lists */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Popular Group */}
          {popular.length > 0 && (
            <div>
              <div className="flex justify-between px-3 py-1 text-xs text-neutral-400 font-mono">
                <span>POPULAR</span>
                <span>{popular.length}</span>
              </div>
              <ul className="space-y-1" role="listbox">
                {popular.map((currency) => (
                  <CurrencyItem
                    key={currency.code}
                    currency={currency}
                    isSelected={currency.code === selectedCurrency}
                    onSelect={() => handleSelect(currency.code)}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* Other Currencies Group */}
          {others.length > 0 && (
            <div>
              <div className="flex justify-between px-3 py-1 text-xs text-neutral-400 font-mono">
                <span>OTHER CURRENCIES</span>
                <span>{others.length}</span>
              </div>
              <ul className="space-y-1" role="listbox">
                {others.map((currency) => (
                  <CurrencyItem
                    key={currency.code}
                    currency={currency}
                    isSelected={currency.code === selectedCurrency}
                    onSelect={() => handleSelect(currency.code)}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* No results */}
          {filteredCurrencies.length === 0 && (
            <div className="py-8 text-center text-neutral-400 text-sm">
              No currencies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Currency Item Component
function CurrencyItem({ currency, isSelected, onSelect }) {
  return (
    <li 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
      }`}
      onClick={onSelect}
      role="option"
      aria-selected={isSelected}
    >
      <CurrencyFlag currencyCode={currency.code} className="w-6 h-6" />
      <span className="text-neutral-50 text-sm font-mono">{currency.code}</span>
      <span className="text-neutral-400 text-sm font-mono flex-1">{currency.name}</span>
      {isSelected && (
        <img 
          src="/assets/images/icon-check.svg" 
          alt="" 
          className="w-4 h-4 text-lime-500" 
          aria-hidden="true"
        />
      )}
    </li>
  );
}
