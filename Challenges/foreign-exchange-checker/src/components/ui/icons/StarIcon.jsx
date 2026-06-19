import { forwardRef } from 'react';

const StarIcon = forwardRef(({ filled = false, className = '', ...props }, ref) => {
  const iconSrc = filled 
    ? '/assets/images/icon-star-filled.svg' 
    : '/assets/images/icon-star.svg';
    
  return (
    <img 
      ref={ref}
      src={iconSrc} 
      alt="" 
      className={`w-4 h-4 ${className}`} 
      aria-hidden="true"
      {...props}
    />
  );
});

StarIcon.displayName = 'StarIcon';

export default StarIcon;