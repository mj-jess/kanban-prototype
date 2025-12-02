import type { Column, Task } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface KanbanState {
    columns: Column[];
    draggingTaskId: string | null;
}

const initialState: KanbanState = {
    columns: [],
    draggingTaskId: null,
};

export const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setColumns(state: KanbanState, action: PayloadAction<Column[]>) {
            state.columns = action.payload;
        },

        addColumn(state: KanbanState, action: PayloadAction<{ id: string; title: string }>) {
            state.columns.push({ ...action.payload, tasks: [] });
        },

        editColumn(state: KanbanState, action: PayloadAction<{ id: string; title: string }>) {
            const col = state.columns.find((c) => c.id === action.payload.id);

            if (col) {
                col.title = action.payload.title;
            }
        },

        removeColumn(state: KanbanState, action: PayloadAction<string>) {
            state.columns = state.columns.filter((col) => col.id !== action.payload);
        },

        setDraggingTask: (state, action: PayloadAction<string | null>) => {
            state.draggingTaskId = action.payload;
        },

        addTask: (
            state: KanbanState,
            action: PayloadAction<{ columnId: string; title: string }>,
        ) => {
            const col = state.columns.find((c) => c.id === action.payload.columnId);

            if (col) {
                col.tasks.push({
                    status: 'to-do',
                    id: crypto.randomUUID(),
                    title: action.payload.title,
                });
            }
        },

        editTask: (state: KanbanState, action: PayloadAction<{ columnId: string; task: Task }>) => {
            const col = state.columns.find((c) => c.id === action.payload.columnId);

            if (col) {
                const index = col.tasks.findIndex((t) => t.id === action.payload.task.id);

                if (index !== -1) {
                    col.tasks[index] = action.payload.task;
                }
            }
        },

        moveTaskWithIndex: (
            state,
            action: PayloadAction<{
                fromColumnId: string;
                toColumnId: string;
                taskId: string;
                destinationIndex: number; // O índice exato onde será inserida
            }>,
        ) => {
            const { fromColumnId, toColumnId, taskId, destinationIndex } = action.payload;

            const fromCol = state.columns.find((c) => c.id === fromColumnId);
            const toCol = state.columns.find((c) => c.id === toColumnId);

            if (!fromCol || !toCol) return;

            // 1. Encontra e remove a tarefa da coluna de origem
            const taskIndex = fromCol.tasks.findIndex((t) => t.id === taskId);
            if (taskIndex === -1) return;

            const [movedTask] = fromCol.tasks.splice(taskIndex, 1);

            // 2. Insere a tarefa na coluna de destino no índice correto
            // Se for a mesma coluna e a tarefa estiver sendo movida para uma posição anterior
            // O splice já removeu o elemento, então o destinationIndex é preciso.
            toCol.tasks.splice(destinationIndex, 0, movedTask);
        },
    },
});

export const kanbanActions = kanbanSlice.actions;
export default kanbanSlice.reducer;
