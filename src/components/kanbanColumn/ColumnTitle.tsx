import { useState, type FormEvent } from 'react';
import type { Column } from '@/types';

import { kanbanActions } from '@/store/kanbanSlice';
import { useAppDispatch } from '@/store';

import { Typography } from '@/ui';

interface Props {
    column: Column;
    isEditing: boolean;
    closeEditing: () => void;
}

export default function ColumnTitle({ column, isEditing, closeEditing }: Props) {
    const dispatch = useAppDispatch();

    const [error, setError] = useState('');
    const [title, setTitle] = useState(column.title);

    const handleEdit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Campo obrigatório.');
            return;
        }

        dispatch(kanbanActions.editColumn({ id: column.id, title }));
        setError('');

        closeEditing();
    };

    if (!isEditing)
        return (
            <Typography.h4
                className="title"
                style={{ fontSize: '14px', fontWeight: 600, paddingLeft: '0.75rem' }}
            >
                {column.title}
            </Typography.h4>
        );

    return (
        <form onSubmit={handleEdit} className="form-wrapper">
            <input
                autoFocus
                type="text"
                name="title"
                value={title}
                className="form-control"
                style={{ height: '32px' }}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == 'Escape') {
                        closeEditing();
                        setError('');
                        setTitle(column.title);
                    }
                }}
            />

            {error && <Typography.caption className="is-invalid">{error}</Typography.caption>}
        </form>
    );
}
