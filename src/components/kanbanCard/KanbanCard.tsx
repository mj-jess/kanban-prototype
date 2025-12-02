import styles from './KanbanCard.module.scss';
import type { Task } from '@/types';

interface Props {
    task: Task;
    isDragging?: boolean;
}

export default function KanbanCard({ task, isDragging }: Props) {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('taskId', String(task.id));
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className={`${styles.card} ${isDragging ? styles.isDragging : ''}`}
        >
            <div className={styles.title}>{task.title}</div>

            <div className={styles.meta}>#{task.id}</div>
        </div>
    );
}
