import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
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
import Input from '@components/Input';
import Notification from '@components/Notification';
import UserChat from '@components/UserChat';

import { setUser } from '@store/Slices/userSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import {
  createUserAxios,
  getUserAxios,
  loginAdminAxios,
  updateTokenAxios,
} from '@utils/axios';

const LoginForm = () => {
  const { loginform, placeholderForm, submitForm, errorMessage } =
    LoginFormText();
  const [notification, setNotification] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const loginName = import.meta.env.VITE_PUBLIC_MYLOGIN;
  const navigate = useNavigate();
  const [usernameInput, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFullScreenWindow, setIsFullScreenWindow] = useState(false);
  const [type, setType] = useState(true);
  const [token, setToken] = useState<tokenType>();
  const [error, setError] = useState('');
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
    mutationFn: (usernameInput: string) => createUserAxios(usernameInput),
    onSuccess: data => {
      const { newUser, message } = data;
      if (message === 'New user created') {
        localStorage.setItem('token', JSON.stringify(newUser.token));
        setIsOpenChat(true);
        setIsOpenForm(false);
        socket.emit('join_room', newUser);
        dispatch(setUser(newUser));
      }
    },
    onError: () => {
      setNotification('Error creating user');
      setError('Error creating user');
    },
  });

  const loginAdminMutation = useMutation({
    mutationFn: (data: adminDataType) => loginAdminAxios(data),
    onSuccess: data => {
      const { token } = data;
      navigate('/dashboard');
      localStorage.setItem('token', JSON.stringify(token));
    },
    onError: () => setNotification('Error logging in'),
  });

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();

    if (
      usernameInput.length < 2 ||
      (!password && usernameInput?.length >= 2) ||
      (password && usernameInput?.length < 2)
    )
      return;
    if (password)
      loginAdminMutation.mutate({ username: usernameInput, password });
    else createUserMutation.mutate(usernameInput);
  };

  const OpenCloseForm = () => {
    if (user.username.length >= 2) {
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
    if (localToken === null) return;
    if (
      new Date().getTime() > localToken.expiry &&
      localToken?.role !== 'admin'
    ) {
      localStorage.removeItem('token');
      return;
    }
    setToken(localToken);
    const users = await getUserAxios();
    const currentUser: userType = users?.find(
      (u: userType) => u.token.value === localToken.value
    );
    if (!currentUser && localToken?.role !== 'admin') {
      localStorage.removeItem('token');
      return;
    }
    dispatch(setUser(currentUser));
    await updateToken(localToken, currentUser);

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
    onError: () => setNotification('Error updating token'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notification textNotification={notification} />
      {!isOpenForm && !isOpenChat && token?.role !== 'admin' && (
        <Button
          className={`fixed bottom-24 right-4 z-20 rounded-md p-1 sm:bottom-16 md:bottom-12 md:right-6 xl:right-8`}
          onClick={OpenCloseForm}
        >
          <TbMessage className="h-6 w-6 md:h-8 md:w-8 xl:h-12 xl:w-12" />
        </Button>
      )}
      {isOpenForm && !user.username && (
        <form
          onSubmit={submitHandler}
          className="fixed bottom-5 right-4 z-20 flex flex-col rounded bg-white p-2 shadow-sm shadow-slate-500"
        >
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
              value={usernameInput}
              onChange={userNameHandler}
              className="p-2 focus-visible:outline-none"
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
            type="submit"
            className="rounded bg-blue-400 px-2 py-1 xl:hover:bg-blue-700"
          >
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
