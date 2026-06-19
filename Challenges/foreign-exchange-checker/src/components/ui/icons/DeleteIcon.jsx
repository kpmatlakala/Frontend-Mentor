import { forwardRef } from 'react';

const DeleteIcon = forwardRef(({ filled = false, className = '', ...props }, ref) => {
  const iconSrc = filled 
    ? '/assets/images/icon-delete-filled.svg' 
    : '/assets/images/icon-delete.svg';
    
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

DeleteIcon.displayName = 'DeleteIcon';

export default DeleteIcon;