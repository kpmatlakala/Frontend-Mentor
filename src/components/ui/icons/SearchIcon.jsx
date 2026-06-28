import { forwardRef } from 'react';

const SearchIcon = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <img 
      ref={ref}
      src="/assets/images/icon-search.svg" 
      alt="" 
      className={`w-4 h-4 ${className}`} 
      aria-hidden="true"
      {...props}
    />
  );
});

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;