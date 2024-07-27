import { createContext } from 'react';

import type { ChatContextType } from '@modules/ChatContextType';
import { io } from 'socket.io-client';

export const ChatContext = createContext<ChatContextType>({
  socket: io(import.meta.env.VITE_PUBLIC_SERVER),
});
