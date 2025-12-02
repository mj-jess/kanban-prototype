import { KanbanContext } from '@/context';
import { useContext } from 'react';

export const useKanban = () => useContext(KanbanContext)!;
