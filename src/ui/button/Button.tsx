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
export type TextAlign = 'left' | 'center' | 'right' | 'justify';

type ButtonProps = {
    children: ReactNode;
    size?: ButtonSize;
    align?: TextAlign;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    color?: ButtonColor;
    radius?: ButtonRadius;
    variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            size = 'md',
            radius = 'md',
            variant = 'fill',
            align = 'center',
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
                    align && styles[`align-${align}`],
                    radius && styles[`radius-${radius}`],
                    size !== 'md' && styles[`size-${size}`],
                    disabled && styles.disabled,
                    fullWidth && styles['w-full'],
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
