import type { Socket } from 'socket.io-client';

export type UserChatProps = {
  onRollUpBtnClick?: () => void;
  onBtnFullScreenClick?: () => void;
  isFullScreen?: boolean;
  socket: Socket;
};
