import React, { type FormEvent } from 'react';
import styles from './Modal.module.scss';
import { FaX } from 'react-icons/fa6';
import { Typography } from '../typography/Typography';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onSubmit: (e: FormEvent) => void;
}

export function Modal({ isOpen, children, onClose, onSubmit }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop} onClick={onClose}>
            <form
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.(e);
                }}
            >
                {children}
            </form>
        </div>
    );
}

function Header({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className={styles.header}>
            <Typography.h3>{children}</Typography.h3>

            <FaX className={styles.closeIcon} onClick={onClose} />
        </div>
    );
}

function Body({ children }: { children: React.ReactNode }) {
    return <div className={styles.body}>{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
    return <div className={styles.footer}>{children}</div>;
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
