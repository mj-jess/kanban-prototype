import { createContext } from 'react';
import type { Task } from '@/types';

interface KanbanContextProps {
    tasks: Task[];
    moveTask: (id: number, status: Task['status']) => void;
}

export const KanbanContext = createContext<KanbanContextProps | undefined>(undefined);
