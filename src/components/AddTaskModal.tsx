import { useMemo, useState } from 'react';
import { useAppDispatch } from '@/store';

import { Button, Modal, Typography } from '@/ui';
import { kanbanActions } from '@/store/kanbanSlice';

interface Props {
    show: boolean;
    columnId: string;
    closeModal: () => void;
}

export default function AddTaskModal({ columnId, show, closeModal }: Props) {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [isDirty, setIsDirty] = useState(false);

    const disabled = useMemo(() => {
        if (!isDirty) return true;
        if (!title.trim()) return true;

        return !!error;
    }, [isDirty, title, error]);

    const resetModal = () => {
        closeModal();
        setTitle('');
        setIsDirty(false);
        setError('');
    };

    return (
        <Modal
            isOpen={show}
            onClose={closeModal}
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(kanbanActions.addTask({ columnId, title }));
                resetModal();
            }}
        >
            <Modal.Header onClose={closeModal}>Adicionar nova Tarefa</Modal.Header>
            <Modal.Body>
                <div className="form-wrapper">
                    <Typography.label>Nome</Typography.label>

                    <input
                        autoFocus
                        type="text"
                        name="title"
                        value={title}
                        className="form-control"
                        onChange={(e) => {
                            const value = e.target.value;

                            setIsDirty(true);
                            setTitle(value);
                            setError(!value.trim() ? 'Nome é obrigatório.' : '');
                        }}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" variant="ghost" color="tertiary" onClick={closeModal}>
                    Cancelar
                </Button>

                <Button type="submit" color="success" disabled={disabled}>
                    Adicionar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
