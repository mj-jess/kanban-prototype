// KanbanCard.tsx
import styles from './KanbanCard.module.scss';
import type { Task } from '@/types';
import { useAppDispatch } from '@/store';
// import { startDragTask } from '@/store/kanbanSlice';

interface Props {
    task: Task;
    columnId: string;
}

export default function KanbanCard({ task, columnId }: Props) {
    const dispatch = useAppDispatch();

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('taskId', String(task.id));
        e.dataTransfer.setData('fromColumn', columnId);

        // dispatch(startDragTask({ taskId: task.id, columnId }));
    };

    const handleDragEnd = () => {
        // dispatch(startDragTask(null));
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={styles.card}
        >
            <div className={styles.title}>{task.title}</div>
            <div className={styles.meta}>#{task.id}</div>
        </div>
    );
}
