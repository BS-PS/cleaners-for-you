import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses = {
  primary: 'bg-navy text-white hover:bg-navy-dark active:bg-navy-dark',
  secondary: 'bg-cgreen text-white hover:bg-cgreen-dark',
  outline: 'border border-navy text-navy bg-white hover:bg-navy-light',
  ghost: 'text-cmuted hover:bg-cbg',
  danger: 'bg-cred text-white hover:opacity-90',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-btn',
  md: 'px-4 py-2.5 text-sm rounded-btn',
  lg: 'px-6 py-3 text-sm rounded-btn',
};

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn('font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed', variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
