import { configureStore } from '@reduxjs/toolkit';
import issueReducer from './features/issue-slice';
import userReducer from './features/user-slice';
import listReducer from './features/list-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    issueReducer,
    userReducer,
    listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useIssueSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useUserSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useListSelector: TypedUseSelectorHook<RootState> = useSelector;
