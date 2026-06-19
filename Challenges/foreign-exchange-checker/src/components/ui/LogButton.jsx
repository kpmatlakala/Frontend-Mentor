import { forwardRef } from 'react';

const LogButton = forwardRef(({ 
  onClick, 
  disabled = false, 
  logged = false, 
  className = '', 
  ...props 
}, ref) => {
  // Determine styles based on state
  const baseClasses = "px-3 py-2 rounded-lg outline outline-1 flex items-center justify-center gap-2 transition-all duration-200 font-mono text-xs font-medium tracking-wide";
  
  let variantClasses = '';
  
  if (disabled) {
    variantClasses = 'outline-neutral-300 text-neutral-200 cursor-not-allowed bg-transparent';
  } else if (logged) {
    variantClasses = 'bg-lime-500 outline-lime-500 text-neutral-900 hover:bg-lime-400 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-lime-500';
  } else {
    variantClasses = 'outline-lime-500 text-neutral-50 bg-transparent hover:bg-lime-800 hover:outline-lime-500 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-lime-500';
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {logged && (
        <span className="w-3 h-3 flex items-center justify-center" aria-hidden="true">
          ★
        </span>
      )}
      <span>{logged ? 'LOGGED' : 'LOG CONVERSION'}</span>
    </button>
  );
});

LogButton.displayName = 'LogButton';

export default LogButton;