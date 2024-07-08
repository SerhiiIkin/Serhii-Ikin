import type { messageType } from '@modules/messageType';

export type userType = {
  username: string;
  roomId: string;
  messages: messageType[];
  id?: string;
  token: {
    value: string;
    expiry: number;
    message: string;
  };
};
