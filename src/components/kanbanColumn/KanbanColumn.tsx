import styles from './KanbanColumn.module.scss';

import { useCallback, useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa6';

import { useModal } from '@/hooks';
import type { Column } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store';
import { Button, Typography } from '@/ui';
import ColumnTitle from './ColumnTitle';
import AddTaskModal from '../AddTaskModal';
import KanbanTask from '../kanbanTask/KanbanTask';
import { kanbanActions } from '@/store/kanbanSlice';

import taskStyles from '../kanbanTask/KanbanTask.module.scss';

interface Props {
    column: Column;
}

export default function KanbanColumn({ column }: Props) {
    const dispatch = useAppDispatch();
    const { show, openModal, closeModal } = useModal();

    const draggingTaskId = useAppSelector((s) => s.kanban.draggingTaskId);

    const [isEditing, setIsEditing] = useState(false);

    const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);

    const handleDragOverColumn = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!draggingTaskId) return;
            if (placeholderIndex !== column.tasks.length) {
                setPlaceholderIndex(column.tasks.length);
            }
        },
        [column.tasks.length, draggingTaskId, placeholderIndex],
    );

    const handleDragLeaveColumn = useCallback((e: React.DragEvent) => {
        setPlaceholderIndex(null);
    }, []);

    const handleDropOnColumn = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const taskId = e.dataTransfer.getData('taskId') || draggingTaskId;
            const fromColumn = e.dataTransfer.getData('fromColumn');

            if (!taskId || !fromColumn) {
                setPlaceholderIndex(null);
                dispatch(kanbanActions.setDraggingTask(null));
                return;
            }

            const destIndex = placeholderIndex ?? column.tasks.length;

            dispatch(
                kanbanActions.moveTaskWithIndex({
                    fromColumnId: fromColumn,
                    toColumnId: column.id,
                    taskId,
                    destinationIndex: destIndex,
                }),
            );

            setPlaceholderIndex(null);
            dispatch(kanbanActions.setDraggingTask(null));
        },
        [dispatch, column.id, column.tasks.length, draggingTaskId, placeholderIndex],
    );

    const handleDragOverOnTask = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!draggingTaskId) return;

        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        const clientY = e.clientY;

        const destIndex = clientY < midY ? index : index + 1;

        if (placeholderIndex !== destIndex) {
            setPlaceholderIndex(destIndex);
        }
    };

    return (
        <div
            className={styles.column}
            onDragOver={handleDragOverColumn}
            onDrop={handleDropOnColumn}
            onDragLeave={handleDragLeaveColumn}
        >
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

            <ul className={styles.tasks}>
                {column.tasks.map((task, i) => (
                    <li key={task.id}>
                        {placeholderIndex === i && draggingTaskId && (
                            <div className={taskStyles.taskPlaceholder} />
                        )}

                        <div onDragOver={handleDragOverOnTask(i)}>
                            <KanbanTask task={task} index={i} columnId={column.id} />
                        </div>
                    </li>
                ))}

                {placeholderIndex === column.tasks.length && draggingTaskId && (
                    <div className={taskStyles.taskPlaceholder} />
                )}
            </ul>

            <div className={styles.footer}>
                <Button
                    fullWidth
                    variant="ghost"
                    color="tertiary"
                    size="none"
                    align="left"
                    onClick={openModal}
                >
                    <FaPlus />
                    <Typography.span>Adicionar uma task</Typography.span>
                </Button>
            </div>

            <AddTaskModal columnId={column.id} show={show} closeModal={closeModal} />
        </div>
    );
}
