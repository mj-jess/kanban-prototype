import styles from './KanbanTask.module.scss';

import type { Task } from '@/types';
import { useModal } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store';

import { Button, Modal, Typography } from '@/ui';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { useState } from 'react';
import { kanbanActions } from '@/store/kanbanSlice';

interface Props {
    task: Task;
    columnId: string;
}

export default function KanbanTask({ task, columnId }: Props) {
    const dispatch = useAppDispatch();
    const { show, openModal, closeModal } = useModal();
    const column = useAppSelector((state) => state.kanban.columns.find((c) => c.id === columnId));

    const [desc, setDesc] = useState(task.description || '');
    const [isEditingDesc, setIsEditingDesc] = useState(false);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('taskId', String(task.id));
        e.dataTransfer.setData('fromColumn', columnId);
    };

    const handleDragEnd = () => {};

    const handleEditTask = () => {
        dispatch(
            kanbanActions.editTask({
                columnId,
                task: {
                    ...task,
                    description: desc,
                },
            }),
        );

        setDesc('');
        setIsEditingDesc(false);
    };

    return (
        <>
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className={styles.task}
                onClick={openModal}
            >
                <Typography.p className={styles.title}>{task.title}</Typography.p>
            </div>

            <Modal
                isOpen={show}
                onClose={closeModal}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className={styles.taskModal}
            >
                <Modal.Header onClose={closeModal}>{column?.title}</Modal.Header>

                <Modal.Body>
                    <Typography.h4>{task.title}</Typography.h4>

                    <div className={styles.descriptionWrapper}>
                        <Typography.p className={styles.description}>
                            <HiMiniBars3BottomLeft />
                            Descrição
                        </Typography.p>

                        <Button
                            type="button"
                            color="tertiary"
                            onClick={() => setIsEditingDesc(true)}
                        >
                            Editar
                        </Button>
                    </div>

                    <div>
                        {!isEditingDesc ? (
                            <Typography.span>{task?.description}</Typography.span>
                        ) : (
                            <div className="form-wrapper">
                                <textarea
                                    autoFocus
                                    rows={3}
                                    className="form-control"
                                    defaultValue={task.description}
                                    onChange={(e) => setDesc(e.target.value)}
                                    placeholder="Adicione uma descrição mais detalhada..."
                                ></textarea>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 'var(--space-2)',
                                        marginTop: 'var(--space-2)',
                                    }}
                                >
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        color="tertiary"
                                        onClick={() => setIsEditingDesc(false)}
                                    >
                                        Cancelar
                                    </Button>

                                    <Button type="button" onClick={handleEditTask}>
                                        Salvar
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
