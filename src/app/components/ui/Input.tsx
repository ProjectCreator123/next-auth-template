'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '', 
    label, 
    error, 
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    type = 'text',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);

    React.useEffect(() => {
      if (type === 'password') {
        setInputType(showPassword ? 'text' : 'password');
      } else {
        setInputType(type);
      }
    }, [type, showPassword]);

    const baseClasses = 'w-full rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      default: 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
      filled: 'border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:bg-white dark:focus:bg-gray-800 focus:border-gray-300 dark:focus:border-gray-600'
    };

    const paddingClasses = leftIcon || rightIcon || type === 'password' 
      ? leftIcon ? 'pl-10 pr-4 py-2.5' : 'pl-4 pr-10 py-2.5'
      : 'px-4 py-2.5';

    const errorClasses = error 
      ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
      : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${errorClasses} ${className}`;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={classes}
            {...props}
          />
          
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
          
          {rightIcon && type !== 'password' && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
