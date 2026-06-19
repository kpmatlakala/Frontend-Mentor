import { forwardRef } from 'react';
import StarIcon from './StarIcon';

const PinButton = forwardRef(({ 
  onClick, 
  isPinned = false, 
  className = '',
  ...props 
}, ref) => {
  const baseClasses = "w-8 h-8 p-2 rounded-lg outline outline-1 flex items-center justify-center transition-all duration-200 flex-shrink-0";
  
  let variantClasses = '';
  
  if (isPinned) {
    variantClasses = 'bg-neutral-600 outline-lime-500 hover:bg-neutral-500 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-lime-500';
  } else {
    variantClasses = 'bg-neutral-600 outline-neutral-500 hover:bg-neutral-500 hover:outline-neutral-400 focus:shadow-[0px_0px_0px_4px_rgba(206,247,57,1.00)] focus:outline-neutral-500';
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <StarIcon filled={isPinned} className={isPinned ? 'text-lime-500' : 'text-neutral-50'} />
    </button>
  );
});

PinButton.displayName = 'PinButton';

export default PinButton;