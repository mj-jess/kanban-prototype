import { useState } from 'react';
import type { Task } from '@/types';
import type { ReactNode } from 'react';
import { KanbanContext } from './context';

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'Estudar React', status: 'todo' },
        { id: 4, title: 'Prototipo kanban', status: 'todo' },
        { id: 2, title: 'Criar API', status: 'doing' },
        { id: 3, title: 'Deployar projeto', status: 'done' },
    ]);

    const moveTask = (id: number, newStatus: Task['status']) => {
        setTasks((prev) =>
            prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task)),
        );
    };

    return <KanbanContext.Provider value={{ tasks, moveTask }}>{children}</KanbanContext.Provider>;
};
