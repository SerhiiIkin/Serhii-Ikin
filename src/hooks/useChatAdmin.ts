import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { RootState } from '@store/store';

import { useAppSelector } from '@hooks/redux';

import { socket } from '@variables/socket';

import type { userType } from '@modules/userType';

export const useChatAdmin = () => {
  const { id } = useParams();

  const users = useAppSelector((state: RootState) => state.users.users);
  const admin = useAppSelector(state => state.admin);
  const currentUser = useMemo(() => {
    return users.find(user => user.roomId === id);
  }, [id, users]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    socket.on('typing', (data: userType) => {
      if (data.roomId === currentUser?.roomId) {
        setIsCurrentUser(true);
        setIsTyping(true);
      } else {
        setIsCurrentUser(false);
      }
    });

    socket.on('stopTyping', () => {
      setIsTyping(false);
    });

    return (): void => {
      socket.off('typing');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, currentUser]);

  return {
    admin,
    currentUser,
    containerRef,
    isTyping,
    isCurrentUser,
  };
};
