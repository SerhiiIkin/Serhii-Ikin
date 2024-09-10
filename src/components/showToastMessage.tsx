import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { messageType } from '@modules/messageType';

export const showToastMessage = (messageData: messageType) => {
  const ToastMessage: FC<messageType> = ({ message, username, roomId }) => {
    return (
      <Link to={`/dashboard/chat/${roomId}`}>
        {username} : {message}
      </Link>
    );
  };
  return <ToastMessage {...messageData} />;
};
