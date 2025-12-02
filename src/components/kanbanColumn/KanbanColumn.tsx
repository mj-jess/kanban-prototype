import styles from './KanbanColumn.module.scss';

import { FaPen, FaPlus } from 'react-icons/fa6';
import { useState, type FormEvent } from 'react';

import { useAppDispatch } from '@/store';
import type { Column, Task } from '@/types';
import { editColumn } from '@/store/kanbanSlice';

import { Button, Typography } from '@/ui';
import KanbanCard from '../kanbanCard/KanbanCard';

interface Props {
    column: Column;
}

export default function KanbanColumn({ column }: Props) {
    const dispatch = useAppDispatch();

    const [error, setError] = useState('');
    const [title, setTitle] = useState(column.title);
    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(column.tasks);

    const handleEdit = (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Campo obrigatório.');
            return;
        }

        dispatch(editColumn({ id: column.id, title }));
        setIsEditing(false);
        setError('');
    };

    return (
        <div className={styles.column}>
            <div className={styles.columnHeader}>
                {!isEditing ? (
                    <Typography.h4 className={styles.title}>{title}</Typography.h4>
                ) : (
                    <form onSubmit={handleEdit} className="form-wrapper">
                        <input
                            autoFocus
                            type="text"
                            name="title"
                            value={title}
                            className="form-control"
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ height: '32px' }}
                        />

                        {error && (
                            <Typography.caption className="is-invalid">{error}</Typography.caption>
                        )}
                    </form>
                )}

                <Button
                    variant="link"
                    color="tertiary"
                    size="none"
                    onClick={() => setIsEditing(true)}
                >
                    <FaPen />
                </Button>
            </div>

            {tasks.length > 0 && (
                <div className={styles.tasks}>
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} columnId={column.id} />
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <Button fullWidth variant="ghost" color="tertiary" size="none" align="left">
                    <FaPlus />
                    <Typography.span>Adicionar uma task</Typography.span>
                </Button>
            </div>
        </div>
    );
}
