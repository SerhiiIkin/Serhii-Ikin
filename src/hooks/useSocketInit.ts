import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { setMessageCount, setToken, setUser } from '@store/Slices/userSlice';
import { setUsers } from '@store/Slices/usersSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { isAdmin } from '@utils/auth';
import { deleteUserAxios, getUsersAxios, updateTokenAxios } from '@utils/axios';

import { socket } from '@variables/socket';

import type { messageType } from '@modules/messageType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';

export const useSocketInit = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);

  const removeUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (_id: string) => deleteUserAxios(_id),
    onSuccess: () => {
      localStorage.removeItem('token');
    },
    onError: () => toast.error('Error deleting user'),
  });

  const socketInit = useCallback(async () => {
    const localToken: tokenType = JSON.parse(localStorage.getItem('token')!);
    if (localToken === null) {
      return;
    }
    const users = await getUsersAxios();
    const currentUser = users.find(
      (u: userType) => u.token.value === localToken.value
    );

    if (
      new Date().getTime() > localToken.expiry &&
      localToken?.role !== 'admin' &&
      currentUser
    ) {
      removeUserMutation.mutate(currentUser._id ?? '');
      return;
    }
    setToken(localToken);

    if (!currentUser && localToken?.role !== 'admin') {
      localStorage.removeItem('token');
      return;
    }
    if (currentUser) {
      socket.emit('join_room', currentUser);
      dispatch(setUser(currentUser));

      updateToken(localToken, currentUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTokenMutatuion = useMutation({
    mutationFn: (id: string) => updateTokenAxios(id),
    onSuccess: data => {
      const { message } = data;
      if (message === 'Users token was updated!') {
        localStorage.setItem('token', JSON.stringify(data.updatedUser.token));
      }
    },
    onError: () => toast.error('Error updating token'),
  });

  const updateToken = async (localToken: tokenType, currentUser: userType) => {
    if (!localToken) return;

    if (localToken?.expiry) {
      updateTokenMutatuion.mutate(currentUser?._id ?? '');
    }
  };

  const getUsersMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: getUsersAxios,
    onSuccess: data => {
      dispatch(setUsers(data));
    },
  });

  useEffect(() => {
    if (isAdmin()) {
      users?.length > 0 &&
        users?.forEach(user => {
          socket.emit('join_room', user);
        });
      getUsersMutation.mutate();
    } else {
      socketInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('newMessage', (messageData: messageType) => {
      !isAdmin() && dispatch(setMessageCount());

      isAdmin() &&
        toast.success(`${messageData.username}: ${messageData.message}`);
    });

    return (): void => {
      socket.off('newMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
};
