import useFxStore from "../../store/useFxStore";
import LogButton from "../ui/LogButton";
import SendBox from "./SendBox";
import ReceiveBox from "./ReceiveBox";
import SwapButton from "./SwapButton";

export default function Converter() {
  const fromCurrency = useFxStore((state) => state.fromCurrency);
  const toCurrency = useFxStore((state) => state.toCurrency);
  const rates = useFxStore((state) => state.rates);
  const amount = useFxStore((state) => state.amount);
  const conversionLog = useFxStore((state) => state.conversionLog);
  const isFavorite = useFxStore((state) =>
    state.favorites.includes(`${fromCurrency}/${toCurrency}`),
  );
  const toggleFavorite = useFxStore((state) => state.toggleFavorite);
  const addLogEntry = useFxStore((state) => state.addLogEntry);

  const rate = rates?.[toCurrency] || 0;
  const convertedAmount = amount * rate;

  // Check if this exact pair + amount was just logged
  const isRecentlyLogged = conversionLog.some(
    (entry) =>
      entry.from === fromCurrency &&
      entry.to === toCurrency &&
      entry.amount === amount,
  );

  const handleFavoriteToggle = () => {
    toggleFavorite(`${fromCurrency}/${toCurrency}`);
  };

  const handleLogConversion = () => {
    addLogEntry({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      from: fromCurrency,
      to: toCurrency,
      amount,
      result: convertedAmount,
    });
  };

  const isDisabled = !amount || amount === 0 || !rate;

  return (
    <div className="bg-neutral-700 rounded-[20px] shadow-[0px_12px_40px_0px_rgba(0,0,0,0.40)]">
      <div className="p-3 sm:p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <div className="w-full sm:flex-1">
          <SendBox />
        </div>
        <SwapButton />
        <div className="w-full sm:flex-1">
          <ReceiveBox convertedAmount={convertedAmount} />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-neutral-500 flex flex-wrap justify-center items-center gap-3">
        <div className="text-xs font-mono text-neutral-50">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleFavoriteToggle}
            className={`px-3 py-2 rounded-lg outline outline-1 flex items-center gap-2 transition-colors font-mono text-xs font-medium tracking-wide ${
              isFavorite
                ? "bg-lime-500 outline-lime-500 text-neutral-900 hover:bg-lime-400 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)]"
                : "bg-neutral-600 outline-neutral-300 text-neutral-200 hover:bg-neutral-500 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-neutral-500"
            }`}
          >
            <span>★</span>
            <span>{isFavorite ? "FAVORITED" : "FAVORITE"}</span>
          </button>

          <LogButton
            onClick={handleLogConversion}
            disabled={isDisabled}
            logged={isRecentlyLogged && !isDisabled}
          />
        </div>
      </div>
    </div>
  );
}
