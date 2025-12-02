import { useState } from 'react';

export function useModal() {
    const [show, setShow] = useState(false);

    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);
    const toggleModal = () => setShow((prev) => !prev);

    return {
        show,
        openModal,
        closeModal,
        toggleModal,
    };
}
