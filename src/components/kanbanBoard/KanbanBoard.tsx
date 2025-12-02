import styles from './KanbanBoard.module.scss';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { useKanbanStore } from '@/store/useKanbanStore';
import { Button } from '@/ui';
import { FaPlus } from 'react-icons/fa6';
import { useModal } from '@/hooks';
import AddColumnModal from '../AddColumnModal';

export default function KanbanBoard() {
    const { show, openModal, closeModal } = useModal();
    const { columns, updateTaskOrder, moveTask, addColumn } = useKanbanStore();

    const handleAddColumn = (fields: { id: string; title: string }) => {
        console.log('adding column', fields);
        addColumn({ ...fields, tasks: [] });
        closeModal();
    };

    return (
        <div className={styles.board}>
            <div className={styles.columns}>
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        onTaskOrderChange={(tasks) => updateTaskOrder(column.id, tasks)}
                        onTaskMove={(target, task) => moveTask(column.id, target, task)}
                    />
                ))}
            </div>

            <div>
                <Button onClick={openModal}>
                    <FaPlus /> Add Column
                </Button>

                <AddColumnModal
                    show={show}
                    closeModal={closeModal}
                    onSubmit={(fields) => handleAddColumn(fields)}
                />
            </div>
        </div>
    );
}
