
import React from 'react';
import CheckIcon from '../icons/CheckIcon';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <label className="relative flex items-center">
        <input type="checkbox" ref={ref} className="peer sr-only" {...props} />
        <div className={`
          h-5 w-5 rounded-sm border-2 border-primary 
          ring-offset-background focus-visible:outline-none focus-visible:ring-2 
          focus-visible:ring-ring focus-visible:ring-offset-2 
          disabled:cursor-not-allowed disabled:opacity-50 
          peer-checked:bg-primary peer-checked:text-primary-foreground
          transition-colors duration-200
          flex items-center justify-center
          ${className}
        `}>
          <CheckIcon className="h-4 w-4 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
