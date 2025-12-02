import KanbanBoard from '@/components/kanbanBoard/KanbanBoard';
import { KanbanProvider } from '@/context/kanban/KanbanProvider';

export default function Kanban() {
    return (
        <KanbanProvider>
            <KanbanBoard />
        </KanbanProvider>
    );
}
