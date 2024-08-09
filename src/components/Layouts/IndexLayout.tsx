import { useMutation } from '@tanstack/react-query';
import type { FC, RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import type { indexLayoutProps } from '@modules/indexLayoutProps';
import type { messageType } from '@modules/messageType';
import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';
import { socket } from '@variables/socket';

import { ToastContext } from '@components/Context/ToastContext';
import Footer from '@components/Footer';
import Header from '@components/Header';
import LoginForm from '@components/LoginForm';

import { setMessageCount, setToken } from '@store/Slices/userSlice';
import { setUser, setUsers } from '@store/Slices/usersSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import Multilanguage from '@utils/Multilanguage';
import { isAdmin } from '@utils/auth';
import { deleteUserAxios, getUsersAxios, updateTokenAxios } from '@utils/axios';

const IndexLayout: FC<indexLayoutProps> = ({ children }) => {
  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const dispach = useAppDispatch();
  const users = useAppSelector(state => state.users.users);

  const helpUkraine = Multilanguage({
    ukr: 'Допомогти Україні',
    eng: 'Help for Ukraine',
    dk: 'Hjælp for Ukraine',
  });

  const handleResize = () => {
    if (
      headerRef.current?.clientHeight &&
      mainRef.current &&
      footerRef.current
    ) {
      const headerHeight = headerRef.current.clientHeight;
      const footerHeight = footerRef.current.clientHeight;
      const linkHeight = linkRef?.current?.clientHeight || 0;
      mainRef.current.style.marginTop = `${linkHeight + headerHeight - 1}px`;
      mainRef.current.style.paddingBottom = `${footerHeight}px`;
      mainRef.current.style.minHeight = `calc(100dvh - ${headerHeight}px - ${footerHeight}px)`;
    }
  };

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
      dispach(setUsers(data));
    },
  });

  useEffect(() => {
    isAdmin() &&
      users?.length > 0 &&
      users?.forEach(user => {
        socket.emit('join_room', user);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    !isAdmin() && socketInit();
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

  useEffect(() => {
    isAdmin() && getUsersMutation.mutate();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContext.Provider value={toast}>
        <Link
          ref={linkRef}
          to="/HelpUkraine"
          className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-secondaryDarkYellow to-primaryDarkBlue text-center text-primaryLigth xl:hover:text-primaryOrange xl:hover:shadow-md xl:hover:shadow-primaryDarkBlue xl:hover:duration-500"
        >
          {helpUkraine}
        </Link>
        <Header ref={headerRef} />
        <main
          ref={mainRef}
          className="mt-32 min-h-dvh bg-secondaryGrey pb-24 md:pb-6"
        >
          {children}
        </main>
        <Footer ref={footerRef} />
        {!isAdmin() && <LoginForm />}
      </ToastContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default IndexLayout;
