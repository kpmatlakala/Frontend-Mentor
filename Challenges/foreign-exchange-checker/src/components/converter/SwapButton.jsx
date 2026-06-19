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
      className="w-12 h-12 bg-neutral-600 rounded-lg outline outline-1 outline-neutral-500 flex items-center justify-center hover:bg-neutral-500 transition-colors focus:ring-2 focus:ring-lime-500"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 12L8 16L4 20" stroke="#E8E8EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 8L12 4L16 0" stroke="#E8E8EA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 18L14 18" stroke="#E8E8EA" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 2L6 2" stroke="#E8E8EA" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </button>
  );
}