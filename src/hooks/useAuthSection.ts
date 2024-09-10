import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContext } from '@context/ToastContext';

import { resetMessageCount, setUser } from '@store/Slices/userSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import {
  createUserAxios,
  deleteUserAxios,
  getUsersAxios,
  loginAdminAxios,
  updateTokenAxios,
} from '@utils/axios';

import { LoginFormText } from '@variables/LoginFormText';
import { RegExpLetters } from '@variables/RegExpLetters';
import { socket } from '@variables/socket';

import type { adminDataType } from '@modules/adminDataType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';

export const useAuthSection = () => {
  const { errorMessage } = LoginFormText();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();
  const toast = useContext(ToastContext);

  const [usernameInput, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFullScreenWindow, setIsFullScreenWindow] = useState(false);
  const [type, setType] = useState(true);
  const [token, setToken] = useState<tokenType>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const onRollUpBtnClick = () => {
    setIsFullScreen(false);
    setIsOpenChat(false);
  };

  const onBtnFullScreenClick = () => {
    setIsFullScreen(prev => !prev);
    setIsFullScreenWindow(prev => !prev);
  };

  const createUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (usernameInput: string) => createUserAxios(usernameInput),
    onSuccess: data => {
      const { newUser, message } = data;
      if (message === 'New user created') {
        localStorage.setItem('token', JSON.stringify(newUser.token));
        setToken(newUser.token);
        setIsOpenChat(true);
        setIsOpenForm(false);
        socket.emit('join_room', newUser);
        dispatch(setUser(newUser));
      }
      setIsPending(false);
    },
    onError: () => {
      toast.error('Error creating user');
      setError('Error creating user');
    },
  });

  const removeUserMutation = useMutation({
    mutationKey: ['users'],
    mutationFn: (_id: string) => deleteUserAxios(_id),
    onSuccess: () => {
      localStorage.removeItem('token');
      setIsLoading(false);
    },
    onError: () => toast.error('Error deleting user'),
  });

  const loginAdminMutation = useMutation({
    mutationFn: (data: adminDataType) => loginAdminAxios(data),
    onSuccess: data => {
      const { token } = data;
      navigate('/dashboard');
      localStorage.setItem('token', JSON.stringify(token));
      setIsPending(false);
      toast.success('Success logging in');
    },
    onError: () => {
      toast.error('Error logging in');
      setIsPending(false);
    },
  });

  const submitHandler = async (event: FormEvent) => {
    setIsPending(true);
    event.preventDefault();

    if (usernameInput.length < 2) {
      setError(errorMessage);
      setIsPending(false);
    } else if (usernameInput.length >= 2 && !password) {
      createUserMutation.mutate(usernameInput);
    } else if (usernameInput.length >= 2 && password) {
      loginAdminMutation.mutate({ username: usernameInput, password });
    }
  };

  const OpenCloseForm = () => {
    if (user.username.length >= 2) {
      socket.emit('get_user', token);
      dispatch(resetMessageCount());
      if (isFullScreenWindow) {
        setIsFullScreen(true);
      }
      setIsOpenChat(true);
    } else {
      setIsOpenForm(prev => !prev);
    }
  };

  const socketInit = useCallback(async () => {
    setIsLoading(false);
    const localToken: tokenType = JSON.parse(localStorage.getItem('token')!);
    if (localToken === null) {
      setIsLoading(false);
      return;
    }
    const users = await getUsersAxios();
    const currentUser: userType = users?.find(
      (u: userType) => u.token.value === localToken.value
    );

    if (
      new Date().getTime() > localToken.expiry &&
      localToken?.role !== 'admin'
    ) {
      removeUserMutation.mutate(currentUser._id ?? '');
      return;
    }
    setToken(localToken);

    if (!currentUser && localToken?.role !== 'admin') {
      localStorage.removeItem('token');
      return;
    }
    dispatch(setUser(currentUser));
    setIsLoading(false);
    updateToken(localToken, currentUser);

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

  const userNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (RegExpLetters.test(value) || value === '') {
      setUsername(event.target.value);
    }
  };

  useEffect(() => {
    socketInit();
    socket.on('current_user', (currentUser: userType) => {
      dispatch(setUser(currentUser));
    });

    return () => {
      socket.off('current_user');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isOpenForm,
    isOpenChat,
    user,
    token,
    OpenCloseForm,
    submitHandler,
    userNameHandler,
    isLoading,
    isPending,
    usernameInput,
    error,
    password,
    setPassword,
    type,
    setType,
    isFullScreen,
    onBtnFullScreenClick,
    onRollUpBtnClick,
  };
};
