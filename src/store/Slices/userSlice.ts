import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { messageType } from '@modules/messageType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';

const initialState: userType = {
  username: '',
  roomId: '',
  newMessageCount: 0,
  messages: [],

  role: 'user',
  _id: '',
  token: {
    value: '',
    expiry: 0,
    message: '',
    role: 'user',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<userType>) => ({
      ...state,
      ...action.payload,
    }),
    setToken: (state, action: PayloadAction<tokenType>) => ({
      ...state,
      token: action.payload,
    }),

    setMessages: (state, action: PayloadAction<messageType>) => ({
      ...state,
      messages: [...state.messages, action.payload],
    }),

    setMessageCount: state => ({
      ...state,
      newMessageCount: state.newMessageCount + 1,
    }),
    resetMessageCount: state => ({
      ...state,
      newMessageCount: 0,
    }),
  },
});

export const {
  setUser,
  setMessages,
  setToken,
  setMessageCount,
  resetMessageCount,
} = userSlice.actions;
export default userSlice.reducer;
