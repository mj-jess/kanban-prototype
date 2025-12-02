import styles from './KanbanColumn.module.scss';

import { useAppDispatch } from '@/store';
import type { Column, Task } from '@/types';
import { moveTask, updateTaskOrder } from '@/store/kanbanSlice';

import { Button, Typography } from '@/ui';
import KanbanCard from '../kanbanCard/KanbanCard';
import { FaPen, FaPlus } from 'react-icons/fa6';
import { useState } from 'react';

interface Props {
    column: Column;
}

export default function KanbanColumn({ column }: Props) {
    const dispatch = useAppDispatch();

    const [tasks, setTasks] = useState<Task[]>(column.tasks);

    const handleOrderChange = (tasks: Task[]) => {
        dispatch(updateTaskOrder({ columnId: column.id, tasks }));
    };

    const handleMoveTask = (targetColumnId: string, task: Task) => {
        dispatch(moveTask({ from: column.id, to: targetColumnId, task }));
    };

    const addTask = () => {
        setTasks((p) => [...p, { id: crypto.randomUUID(), title: '', description: '' }]);
    };

    return (
        <div className={styles.column}>
            <div className={styles.columnHeader}>
                <Typography.h4 className={styles.title}>{column.title}</Typography.h4>

                <Button variant="link" color="tertiary" size="none">
                    <FaPen />
                </Button>
            </div>

            {tasks.length > 0 && (
                <div className={styles.tasks}>
                    {tasks.map((task) => (
                        <KanbanCard
                            key={task.id}
                            task={task}
                            columnId={column.id}
                            onMove={handleMoveTask}
                            onOrderChange={handleOrderChange}
                        />
                    ))}
                </div>
            )}

            <div className={styles.footer}>
                <Button
                    fullWidth
                    variant="ghost"
                    color="tertiary"
                    size="none"
                    align="left"
                    onClick={addTask}
                >
                    <FaPlus />
                    <Typography.span>Adicionar uma task</Typography.span>
                </Button>
            </div>
        </div>
    );
}
