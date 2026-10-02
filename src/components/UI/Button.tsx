import type { ComponentPropsWithoutRef } from 'react';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  textOnly?: boolean;
}

export default function Button({
  children,
  textOnly,
  className = '',
  ...props
}: ButtonProps) {
  const baseClass = textOnly ? 'text-button' : 'button';
  const cssClasses = `${baseClass} ${className}`;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}