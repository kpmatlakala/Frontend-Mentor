import { forwardRef } from 'react';

const ChevronDownIcon = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <img 
      ref={ref}
      src="/assets/images/icon-chevron-down.svg" 
      alt="" 
      className={`w-3 h-3 ${className}`} 
      aria-hidden="true"
      {...props}
    />
  );
});

ChevronDownIcon.displayName = 'ChevronDownIcon';

export default ChevronDownIcon;