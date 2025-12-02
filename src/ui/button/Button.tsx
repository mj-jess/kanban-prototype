import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'fill' | 'outline' | 'ghost' | 'link';
export type ButtonColor =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning';

export type ButtonSize = 'none' | 'sm' | 'md' | 'lg';
export type ButtonRadius = 'sm' | 'md' | 'lg' | 'full';

type ButtonProps = {
    children: ReactNode;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    radius?: ButtonRadius;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            size = 'md',
            radius = 'sm',
            variant = 'fill',
            color = 'primary',
            disabled,
            fullWidth,
            className,
            ...rest
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled}
                className={clsx(
                    styles.root,
                    styles[`color-${color}`],
                    styles[`variant-${variant}`],
                    radius && styles[`radius-${radius}`],
                    size !== 'md' && styles[`size-${size}`],
                    disabled && styles.disabled,
                    fullWidth && 'w-full',
                    className,
                )}
                {...rest}
            >
                {children}
            </button>
        );
    },
);

Button.displayName = 'Button';
