import styles from './KanbanBoard.module.scss';
import KanbanColumn from '../kanbanColumn/KanbanColumn';

import { Button } from '@/ui';
import { FaPlus } from 'react-icons/fa6';
import { useModal } from '@/hooks';

import { useAppSelector } from '@/store';

import AddColumnModal from '../AddColumnModal';

export default function KanbanBoard() {
    const columns = useAppSelector((state) => state.kanban.columns);

    const { show, openModal, closeModal } = useModal();

    return (
        <div className={styles.board}>
            {columns.length > 0 &&
                columns.map((column) => <KanbanColumn key={column.id} column={column} />)}

            <div className={styles.addColumnBtn}>
                <Button
                    color="primary"
                    variant="outline"
                    onClick={openModal}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    <FaPlus /> Adicionar coluna
                </Button>

                <AddColumnModal show={show} closeModal={closeModal} />
            </div>
        </div>
    );
}
