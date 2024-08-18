import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

const initialState: { users: userType[] } = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => ({
      ...state,
      users: [...state.users, action.payload],
    }),
    removeUser: (state, action: PayloadAction<string>) => ({
      ...state,
      users: [...state.users.filter(user => user._id !== action.payload)],
    }),
    setUsers: (state, action: PayloadAction<userType[]>) => ({
      ...state,
      users: action.payload,
    }),
    updateUserMessages: (state, action: PayloadAction<messageType>) => ({
      ...state,
      users: state.users.map(user => {
        if (user.roomId == action.payload.roomId) {
          return {
            ...user,
            messages: [...user.messages, action.payload],
          };
        } else {
          return user;
        }
      }),
    }),
  },
});

export const { setUser, updateUserMessages, setUsers, removeUser } =
  usersSlice.actions;
export default usersSlice.reducer;
