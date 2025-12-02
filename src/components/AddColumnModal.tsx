import { useKanbanStore } from '@/store/useKanbanStore';
import { Button, Modal, Typography } from '@/ui';
import { useMemo, useState } from 'react';

interface Props {
    show: boolean;
    closeModal: () => void;
    onSubmit: (form: { id: string; title: string }) => void;
}

export default function AddColumnModal({ show, closeModal, onSubmit }: Props) {
    const { columns } = useKanbanStore();

    const columnNames = useMemo(() => columns.map((column) => column.id.toLowerCase()), [columns]);

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [validation, setValidation] = useState({ title: '', id: '' });

    const validateId = (id: string) => {
        if (id.trim() === '') {
            setValidation((p) => ({
                ...p,
                id: id.trim() === '' ? 'Identificação é obrigatório.' : '',
            }));
        } else if (columnNames.includes(id.toLowerCase())) {
            setValidation((p) => ({ ...p, id: 'Identificação já existe.' }));
        } else {
            setValidation((p) => ({ ...p, id: '' }));
        }
    };

    const validateTitle = (title: string) => {
        setValidation((p) => ({ ...p, title: title.trim() === '' ? 'Nome é obrigatório.' : '' }));
    };

    const disabled = useMemo(() => {
        if (!isDirty) return true;
        if (!id.trim() || !title.trim()) return true;

        return validation.id !== '' || validation.title !== '';
    }, [isDirty, validation, id, title]);

    return (
        <Modal
            isOpen={show}
            onClose={closeModal}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ id, title });

                setId('');
                setTitle('');
                setValidation({ title: '', id: '' });
                setIsDirty(false);
            }}
        >
            <Modal.Header onClose={closeModal}>Adicionar nova Coluna</Modal.Header>

            <Modal.Body>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-1)',
                    }}
                >
                    <Typography.label>Identificação</Typography.label>
                    <input
                        autoFocus
                        type="text"
                        name="key"
                        value={id}
                        className="form-control"
                        onChange={(e) => {
                            setId(e.target.value);
                            validateId(e.target.value);
                            setIsDirty(true);
                        }}
                    />
                    {validation.id && (
                        <Typography.caption className="is-invalid">
                            {validation.id}
                        </Typography.caption>
                    )}
                </div>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-1)',
                    }}
                >
                    <Typography.label>Nome</Typography.label>

                    <input
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
