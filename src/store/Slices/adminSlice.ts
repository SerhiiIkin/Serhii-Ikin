import type { userType } from '@modules/userType';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: userType = {
  username: 'Serhii',
  _id: '26091992',
  roomId: '1',
  messages: [],
  role: 'admin',

  token: {
    value: '',
    expiry: 0,
    message: '',
    role: 'admin',
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => ({
      ...state,
      roomId: action.payload,
    }),
  },
});

export const { setRoomId } = adminSlice.actions;
export default adminSlice.reducer;
