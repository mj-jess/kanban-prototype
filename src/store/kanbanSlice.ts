import type { Column, Task } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface KanbanState {
    columns: Column[];
}

const initialState: KanbanState = {
    columns: [],
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

        updateTaskOrder: (
            state: KanbanState,
            action: PayloadAction<{ columnId: string; tasks: Task[] }>,
        ) => {
            const col = state.columns.find((c) => c.id === action.payload.columnId);

            if (col) {
                col.tasks = action.payload.tasks;
            }
        },

        moveTask: (
            state: KanbanState,
            action: PayloadAction<{ from: string; to: string; task: Task }>,
        ) => {
            const { from, to, task } = action.payload;
            const toCol = state.columns.find((c) => c.id === to);
            const fromCol = state.columns.find((c) => c.id === from);

            if (!fromCol || !toCol) return;

            fromCol.tasks = fromCol.tasks.filter((t) => t.id !== task.id);
            toCol.tasks.push(task);
        },
    },
});

export const kanbanActions = kanbanSlice.actions;
export default kanbanSlice.reducer;
