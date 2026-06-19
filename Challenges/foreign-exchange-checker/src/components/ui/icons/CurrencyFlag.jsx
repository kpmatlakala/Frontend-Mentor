import { forwardRef } from 'react';

const CurrencyFlag = forwardRef(({ currencyCode, className = '', ...props }, ref) => {
  // Handle special cases where the file name might not match the currency code
  const normalizedCode = currencyCode.toLowerCase();
  
  // Map specific currency codes to their flag file names if different
  // For example: "EUR" → "eu.webp", "GBP" → "gb.webp", "USD" → "us.webp"
  const flagMap = {
    'eur': 'eu.webp',
    'gbp': 'gb.webp',
    'usd': 'us.webp',
    'jpy': 'jp.webp',
    'chf': 'ch.webp',
    'aud': 'au.webp',
    'cad': 'ca.webp',
    'cny': 'cn.webp',
  };
  
  const flagFile = flagMap[normalizedCode] || `${normalizedCode}.webp`;
  const flagPath = `/assets/images/flags/${flagFile}`;
  
  return (
    <img 
      ref={ref}
      src={flagPath}
      alt=""
      className={`w-6 h-6 rounded-full ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
});

CurrencyFlag.displayName = 'CurrencyFlag';

export default CurrencyFlag;