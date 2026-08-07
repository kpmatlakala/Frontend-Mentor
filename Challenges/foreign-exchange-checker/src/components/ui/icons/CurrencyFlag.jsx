import { useState } from 'react';
import { forwardRef } from 'react';

const CurrencyFlag = forwardRef(({ currencyCode, className = '', ...props }, ref) => {
  const [hasError, setHasError] = useState(false);

  // Use the first two letters of the ISO code as the country code
  const countryCode = currencyCode.slice(0, 2).toLowerCase();
  const flagPath = `/assets/images/flags/${countryCode}.webp`;

  const handleError = () => {
    setHasError(true);
  };

  // If the flag failed to load, show a fallback
  if (hasError) {
    return (
      <div
        className={`w-6 h-6 rounded-full bg-neutral-500 flex items-center justify-center text-[10px] font-mono text-neutral-50 font-bold flex-shrink-0 ${className}`}
        title={currencyCode}
        aria-hidden="true"
      >
        {currencyCode.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={flagPath}
      alt=""
      className={`w-6 h-6 rounded-full object-cover flex-shrink-0 ${className}`}
      aria-hidden="true"
      onError={handleError}
      {...props}
    />
  );
});

CurrencyFlag.displayName = 'CurrencyFlag';

export default CurrencyFlag;