import { createContext } from 'react';

import { io } from 'socket.io-client';

import type { ChatContextType } from '@modules/ChatContextType';

export const ChatContext = createContext<ChatContextType>({
  socket: io(import.meta.env.VITE_PUBLIC_SERVER),
});
