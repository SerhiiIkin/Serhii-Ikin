import type { messageType } from '@modules/messageType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: userType = {
  username: '',
  roomId: '',
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
  },
});

export const { setUser, setMessages, setToken } = userSlice.actions;
export default userSlice.reducer;
