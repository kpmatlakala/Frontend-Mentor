import { forwardRef } from 'react';

const ClearAllButton = forwardRef(({ 
  onClick, 
  disabled = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = "px-3 py-2 rounded-lg outline outline-1 flex items-center justify-center transition-all duration-200 font-mono text-xs font-normal tracking-wide";
  
  let variantClasses = '';
  
  if (disabled) {
    variantClasses = 'bg-neutral-600 outline-neutral-400 text-neutral-200 cursor-not-allowed opacity-50';
  } else {
    variantClasses = 'bg-neutral-600 outline-neutral-400 text-neutral-200 hover:bg-neutral-500 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-neutral-500';
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      CLEAR ALL
    </button>
  );
});

ClearAllButton.displayName = 'ClearAllButton';

export default ClearAllButton;