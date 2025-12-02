import { configureStore, combineReducers } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanSlice';

const rootReducer = combineReducers({
    kanban: kanbanReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
