import type { messageType } from '@modules/messageType';
import type { tokenType } from '@modules/tokenType';

export type userType = {
  username: string;
  newMessageCount: number;
  roomId: string;
  messages: messageType[];
  role: string;
  _id?: string;
  token: tokenType;
};
