import useFxStore from '../../store/useFxStore';

export default function SwapButton() {
  const fromCurrency = useFxStore(state => state.fromCurrency);
  const toCurrency = useFxStore(state => state.toCurrency);
  const setFromCurrency = useFxStore(state => state.setFromCurrency);
  const setToCurrency = useFxStore(state => state.setToCurrency);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <button
      onClick={handleSwap}
      aria-label="Swap send and receive currencies"
      className="w-12 h-12 bg-neutral-600 rounded-lg outline outline-1 outline-neutral-500 flex items-center justify-center hover:bg-neutral-500 transition-colors focus:ring-2 focus:ring-lime-500 flex-shrink-0"
    >
      {/* Desktop: horizontal exchange icon */}
      <img
        src="/assets/images/icon-exchange.svg"
        alt=""
        className="w-5 h-5 hidden sm:block"
        aria-hidden="true"
      />
      {/* Mobile: vertical exchange icon */}
      <img
        src="/assets/images/icon-exchange-vertical.svg"
        alt=""
        className="w-5 h-5 block sm:hidden"
        aria-hidden="true"
      />
    </button>
  );
}