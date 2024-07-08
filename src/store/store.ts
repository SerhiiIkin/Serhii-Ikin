import { configureStore } from '@reduxjs/toolkit';

import languageReducer from './Slices/languageSlice';
import userSlice from './Slices/userSlice';
import usersSlice from './Slices/usersSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    user: userSlice,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
