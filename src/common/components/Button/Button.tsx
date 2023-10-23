import { FC, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  children?: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  variant?: 'glass';
}

export const Button: FC<IButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  onClick,
  className,
  variant = '',
  ...otherProps
}) => {
  return (
    <button
      className={classNames(styles.button, styles[variant], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};
