import { useAppDispatch } from '@/store';
import { addColumn } from '@/store/kanbanSlice';
import { Button, Modal, Typography } from '@/ui';
import { useMemo, useState } from 'react';

interface Props {
    show: boolean;
    closeModal: () => void;
}

export default function AddColumnModal({ show, closeModal }: Props) {
    const dispatch = useAppDispatch();

    const [title, setTitle] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [validation, setValidation] = useState({ title: '' });

    const validateTitle = (value: string) => {
        setValidation((p) => ({
            ...p,
            title: !value.trim() ? 'Nome é obrigatório.' : '',
        }));
    };

    const disabled = useMemo(() => {
        if (!isDirty) return true;
        if (!title.trim()) return true;

        return !!validation.title;
    }, [isDirty, title, validation]);

    const resetModal = () => {
        closeModal();
        setTitle('');
        setIsDirty(false);
        setValidation({ title: '' });
    };

    return (
        <Modal
            isOpen={show}
            onClose={resetModal}
            onSubmit={() => {
                dispatch(addColumn({ id: crypto.randomUUID(), title }));
                resetModal();
            }}
        >
            <Modal.Header onClose={closeModal}>Adicionar nova Coluna</Modal.Header>

            <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <Typography.label>Nome</Typography.label>

                    <input
                        autoFocus
                        type="text"
                        name="title"
                        value={title}
                        className="form-control"
                        onChange={(e) => {
                            setTitle(e.target.value);
                            validateTitle(e.target.value);
                            setIsDirty(true);
                        }}
                    />

                    {validation.title && (
                        <Typography.caption className="is-invalid">
                            {validation.title}
                        </Typography.caption>
                    )}
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
