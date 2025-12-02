import type { Column, Task } from '@/types';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kanban-data';

export function useKanbanStore() {
    const [columns, setColumns] = useState<Column[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    }, [columns]);

    const addTask = (columnId: string, task: Task) => {
        setColumns((prev) =>
            prev.map((col) =>
                col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col,
            ),
        );
    };

    const updateTaskOrder = (columnId: string, tasks: Task[]) => {
        setColumns((prev) => prev.map((col) => (col.id === columnId ? { ...col, tasks } : col)));
    };

    const moveTask = (from: string, to: string, task: Task) => {
        setColumns((prev) => {
            const newState = prev.map((col) => ({
                ...col,
                tasks: col.tasks.filter((t) => t.id !== task.id),
            }));

            return newState.map((col) =>
                col.id === to ? { ...col, tasks: [...col.tasks, task] } : col,
            );
        });
    };

    const addColumn = (column: Column) => {
        setColumns((prev) => [...prev, column]);
    };

    return {
        columns,
        addColumn,
        addTask,
        moveTask,
        updateTaskOrder,
    };
}
