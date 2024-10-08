import { useCallback, useEffect } from 'react';

import {
  setUser,
  setUsers,
  updateUserMessages,
} from '@store/Slices/usersSlice';
import type { RootState } from '@store/store';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { socket } from '@variables/socket';

import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

export const useChatDashboard = () => {
  const users = useAppSelector((state: RootState) => state.users.users);
  const dispatch = useAppDispatch();
  const socketInit = useCallback(async () => {
    socket.emit('get_users');

    socket.once('receive_users', (users: userType[]) => {
      if (users.length !== 0) {
        users.forEach(user => {
          socket.emit('join_room', user);
        });
        dispatch(setUsers(users));
      }
    });

    window.addEventListener('beforeunload', () => {
      socket.emit('offline');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.emit('online');
    socket.on('new_user_joined', (user: userType) => {
      const isUser = users.find(u => u.username === user.username);

      if (!isUser) {
        dispatch(setUser(user));
      }
      socket.emit('join_room', user);
    });

    socket.on('receive_users', (users: userType[]) => {
      if (users.length !== 0) {
        users.forEach(user => {
          socket.emit('join_room', user);
        });
        dispatch(setUsers(users));
      }
    });

    socket.on('receive_msg', (messageData: messageType) => {
      dispatch(updateUserMessages(messageData));
    });

    return (): void => {
      socket.off('receive_users');
      socket.off('new_user_joined');
      socket.off('receive_msg');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);
};
