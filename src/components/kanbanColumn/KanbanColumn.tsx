import styles from './KanbanColumn.module.scss';

import { useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa6';

import { useAppDispatch } from '@/store';
import type { Column, Task } from '@/types';

import { Button, Typography } from '@/ui';
import KanbanCard from '../kanbanCard/KanbanCard';
import ColumnTitle from './ColumnTitle';

interface Props {
    column: Column;
}

export default function KanbanColumn({ column }: Props) {
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [tasks, setTasks] = useState<Task[]>(column.tasks);

    return (
        <div className={styles.column}>
            <div className={styles.columnHeader}>
                <ColumnTitle
                    column={column}
                    isEditing={isEditing}
                    closeEditing={() => setIsEditing(false)}
                />

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
