import styles from './KanbanColumn.module.scss';
import KanbanCard from '../kanbanCard/KanbanCard';
import type { Task, Column } from '@/types';
import { Typography } from '@/ui';

interface Props {
    column: Column;
    onTaskOrderChange: (tasks: Task[]) => void;
    onTaskMove: (targetColumnId: string, task: Task) => void;
}

export default function KanbanColumn({ column, onTaskMove, onTaskOrderChange }: Props) {
    return (
        <div className={styles.column}>
            <Typography.h4 className={styles.columnHeader}>{column.title}</Typography.h4>

            <div className={styles.cardList}>
                {column.tasks.map((t) => (
                    <KanbanCard key={t.id} task={t} />
                ))}
            </div>
        </div>
    );
}
