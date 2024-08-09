import { useMutation } from '@tanstack/react-query';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { TbMessage } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import type { adminDataType } from '@modules/adminDataType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';
import { LoginFormText } from '@variables/LoginFormText';
import { socket } from '@variables/socket';

import Button from '@components/Button';
import { ToastContext } from '@components/Context/ToastContext';
import Input from '@components/Input';
import Loader from '@components/Loader';
import UserChat from '@components/UserChat';

import { resetMessageCount, setUser } from '@store/Slices/userSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import {
  createUserAxios,
  deleteUserAxios,
  getUsersAxios,
  loginAdminAxios,
  updateTokenAxios,
} from '@utils/axios';
import { classes } from '@utils/classes';

const LoginForm = () => {
  const { loginform, placeholderForm, submitForm, errorMessage } =
    LoginFormText();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const loginName = import.meta.env.VITE_PUBLIC_MYLOGIN;
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
  const letters = /^[A-Za-zØøÅåÆæ\s]+$/;

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
    } else if (password) {
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
    if (letters.test(value) || value === '') {
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
  }, [dispatch, socketInit]);

  return (
    <>
      {!isOpenForm && !isOpenChat && token?.role !== 'admin' && (
        <Button
          aria-label="open chat menu"
          className={classes([
            `fixed bottom-24 right-4 z-20 rounded-md p-1 sm:bottom-16 md:bottom-12 md:right-6 xl:right-8`,
          ])}
          onClick={OpenCloseForm}
        >
          {user.newMessageCount > 0 && (
            <div className="absolute -left-6 -top-6 min-h-8 min-w-8 animate-bounce rounded-full bg-primaryDarkBlue p-2 text-sm">
              {user.newMessageCount}
            </div>
          )}
          <TbMessage className="h-6 w-6 md:h-8 md:w-8 xl:h-12 xl:w-12" />
        </Button>
      )}
      {isOpenForm && !user.username && (
        <form
          onSubmit={submitHandler}
          className={classes([
            'fixed bottom-5 right-4 z-20 flex flex-col rounded bg-white p-2 shadow-sm shadow-slate-500',
          ])}
        >
          {isLoading && (
            <Loader className="absolute inset-0 z-30 h-full w-full bg-primaryLigth [&_div]:absolute [&_div]:left-1/3 [&_div]:top-1/3" />
          )}

          <h2>{loginform}</h2>
          <Button
            onClick={OpenCloseForm}
            type="button"
            className="absolute right-2 top-2 bg-transparent p-0 text-primaryDarkBlue hover:text-red-400"
          >
            <IoCloseCircleSharp />
          </Button>
          <label className="relative pb-6">
            <Input
              autoFocus
              disabled={isPending}
              value={usernameInput}
              onChange={userNameHandler}
              className="p-2 focus-visible:outline-none disabled:cursor-not-allowed"
              type="text"
              placeholder={placeholderForm}
            />
            <span className="absolute bottom-1 left-0 text-sm text-secondaryRed">
              {error && errorMessage}
            </span>
          </label>
          {usernameInput === loginName && (
            <label className="relative" htmlFor="password">
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-none p-2 outline-none focus-visible:outline-none"
                type={type ? 'password' : 'text'}
                placeholder="password"
                autoComplete="true"
              />
              <span
                onClick={() => setType(prev => !prev)}
                className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                <FaEye />
              </span>
            </label>
          )}

          <Button
            disabled={isPending}
            type="submit"
            className={classes([
              'relative rounded px-2 py-1 xl:hover:bg-primaryDarkBlue',
              'disabled:cursor-not-allowed disabled:bg-secondaryRed disabled:text-secondaryGrey disabled:hover:xl:bg-secondaryRed disabled:xl:hover:text-primaryLigth',
            ])}
          >
            {isPending && (
              <Loader size="little" className="absolute -top-5 right-16" />
            )}
            {submitForm}
          </Button>
        </form>
      )}
      {isOpenChat && (
        <UserChat
          socket={socket}
          isFullScreen={isFullScreen}
          onBtnFullScreenClick={onBtnFullScreenClick}
          onRollUpBtnClick={onRollUpBtnClick}
        />
      )}
    </>
  );
};

export default LoginForm;
