import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';
import type { usersType } from '@modules/usersType';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState: usersType = {
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

export const { setUser, updateUserMessages, setUsers } = usersSlice.actions;
export default usersSlice.reducer;
