import styles from './KanbanColumn.module.scss';

import { useState } from 'react';
import { FaPen, FaPlus } from 'react-icons/fa6';

import { useModal } from '@/hooks';
import type { Column } from '@/types';

import { Button, Typography } from '@/ui';
import ColumnTitle from './ColumnTitle';
import AddTaskModal from '../AddTaskModal';
import KanbanCard from '../kanbanCard/KanbanCard';

interface Props {
    column: Column;
}

export default function KanbanColumn({ column }: Props) {
    const { show, openModal, closeModal } = useModal();

    const [isEditing, setIsEditing] = useState(false);

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

            {column.tasks.length > 0 && (
                <div className={styles.tasks}>
                    {column.tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} columnId={column.id} />
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
