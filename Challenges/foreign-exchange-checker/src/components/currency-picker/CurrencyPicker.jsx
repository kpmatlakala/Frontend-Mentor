import { useState, useEffect, useRef } from "react";
import useFxStore from "../../store/useFxStore";
import CurrencyFlag from "../ui/icons/CurrencyFlag";
import SearchIcon from "../ui/icons/SearchIcon";

const POPULAR_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "CHF",
  "AUD", "CAD", "CNY", "INR", "BRL",
];

export default function CurrencyPicker({
  context,
  onClose,
  align = "left", // keep left by default
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const searchInputRef = useRef(null);
  const pickerRef = useRef(null);

  const fromCurrency = useFxStore((state) => state.fromCurrency);
  const toCurrency = useFxStore((state) => state.toCurrency);
  const setFromCurrency = useFxStore((state) => state.setFromCurrency);
  const setToCurrency = useFxStore((state) => state.setToCurrency);
  const availableCurrencies = useFxStore((state) => state.availableCurrencies);

  const selectedCurrency = context === "send" ? fromCurrency : toCurrency;

  // Load currencies
  useEffect(() => {
    if (availableCurrencies && Object.keys(availableCurrencies).length > 0) {
      const list = Object.entries(availableCurrencies).map(([code, name]) => ({
        code,
        name,
      }));
      setCurrencies(list);
    } else {
      // fallback
      const fallback = [
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
      ];
      setCurrencies(fallback);
    }
  }, [availableCurrencies]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSelect = (currencyCode) => {
    if (context === "send") {
      setFromCurrency(currencyCode);
    } else {
      setToCurrency(currencyCode);
    }
    onClose();
  };

  const filtered = currencies.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popular = filtered.filter((c) => POPULAR_CURRENCIES.includes(c.code));
  const others = filtered.filter((c) => !POPULAR_CURRENCIES.includes(c.code));

  // ✅ Always left‑aligned – use `left-0` regardless of `align`
  const positionClass = align === "right" ? "right-0" : "left-0";

  return (
    <div
      ref={pickerRef}
      className={`absolute z-50 top-full mt-2 w-80 bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden ${positionClass}`}
    >
      <div className="w-80 max-h-[400px] bg-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-neutral-700">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
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

        {/* Lists */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
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

          {filtered.length === 0 && (
            <div className="py-8 text-center text-neutral-400 text-sm font-mono">
              No currencies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CurrencyItem({ currency, isSelected, onSelect }) {
  return (
    <li
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
        isSelected ? "bg-neutral-700" : "hover:bg-neutral-700"
      }`}
      onClick={onSelect}
      role="option"
      aria-selected={isSelected}
    >
      <CurrencyFlag currencyCode={currency.code} className="w-6 h-6 flex-shrink-0" />
      <span className="text-neutral-50 text-sm font-mono">{currency.code}</span>
      <span className="text-neutral-400 text-sm font-mono flex-1 truncate">{currency.name}</span>
      {isSelected && (
        <img
          src="/assets/images/icon-check.svg"
          alt=""
          className="w-4 h-4"
          aria-hidden="true"
        />
      )}
    </li>
  );
}