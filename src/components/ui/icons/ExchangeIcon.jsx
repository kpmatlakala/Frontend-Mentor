import { forwardRef } from 'react';

const ExchangeIcon = forwardRef(({ vertical = false, className = '', ...props }, ref) => {
  const iconSrc = vertical 
    ? '/assets/images/icon-exchange-vertical.svg' 
    : '/assets/images/icon-exchange.svg';
    
  return (
    <img 
      ref={ref}
      src={iconSrc} 
      alt="" 
      className={`w-5 h-5 ${className}`} 
      aria-hidden="true"
      {...props}
    />
  );
});

ExchangeIcon.displayName = 'ExchangeIcon';

export default ExchangeIcon;