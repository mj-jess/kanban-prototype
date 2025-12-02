import type { JSX, ReactNode } from 'react';
import styles from './Typography.module.scss';

type Props = {
    children: ReactNode;
    color?: 'danger';
    className?: string;
};

function createTypography(
    tag: keyof JSX.IntrinsicElements,
    variant: keyof typeof styles,
    color?: 'danger',
) {
    return ({ children, className = '' }: Props) => {
        const Tag = tag;

        return (
            <Tag className={`${styles.typography} ${styles[variant]} ${className}`}>{children}</Tag>
        );
    };
}

export const Typography = {
    h1: createTypography('h1', 'h1'),
    h2: createTypography('h2', 'h2'),
    h3: createTypography('h3', 'h3'),
    h4: createTypography('h4', 'h4'),
    p: createTypography('p', 'p'),
    span: createTypography('span', 'span'),
    small: createTypography('small', 'small'),
    label: createTypography('label', 'label'),
    caption: createTypography('span', 'caption'),
};
