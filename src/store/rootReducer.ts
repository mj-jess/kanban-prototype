import { combineReducers } from '@reduxjs/toolkit';
import kanbanReducer from './kanbanSlice';

const rootReducer = combineReducers({
    kanban: kanbanReducer,
});

export default rootReducer;
