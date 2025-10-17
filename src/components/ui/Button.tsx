import { ButtonHTMLAttributes, ReactNode } from 'react';
import { THEME_COLORS } from '../../constants/game';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseClasses = 'font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: `bg-[${THEME_COLORS.buttonPrimary}] text-white hover:bg-[${THEME_COLORS.buttonHover}] focus:ring-[${THEME_COLORS.buttonPrimary}]`,
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200',
    outline: `border-2 border-[${THEME_COLORS.buttonPrimary}] text-[${THEME_COLORS.buttonPrimary}] hover:bg-[${THEME_COLORS.buttonPrimary}] hover:text-white focus:ring-[${THEME_COLORS.buttonPrimary}]`,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;