import { configureStore } from '@reduxjs/toolkit';

import adminSlice from '@store/Slices/adminSlice';
import languageReducer from '@store/Slices/languageSlice';
import userSlice from '@store/Slices/userSlice';
import usersSlice from '@store/Slices/usersSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    user: userSlice,
    users: usersSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
