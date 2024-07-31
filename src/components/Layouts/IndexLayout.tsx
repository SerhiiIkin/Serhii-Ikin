import type { FC, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import type { indexLayoutProps } from '@modules/indexLayoutProps';
import type { messageType } from '@modules/messageType';
import { socket } from '@variables/socket';

import Footer from '@components/Footer';
import Header from '@components/Header';
import LoginForm from '@components/LoginForm';
import Notification from '@components/Notification';

import { setMessageCount } from '@store/Slices/userSlice';

import { useAppDispatch } from '@hooks/redux';

import Multilanguage from '@utils/Multilanguage';
import { isAdmin } from '@utils/auth';

const IndexLayout: FC<indexLayoutProps> = ({ children }) => {
  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const [notification, setNotification] = useState('');
  const dispach = useAppDispatch();

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

  useEffect(() => {
    socket.on('receive_msg', (messageData: messageType) => {
      dispach(setMessageCount());
      setNotification(`New message from  ${messageData.username}`);
    });
    window.addEventListener('resize', handleResize);
    return () => {
      socket.off('receive_msg');
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispach]);

  return (
    <>
      <Link
        ref={linkRef}
        to="/HelpUkraine"
        className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-primaryLigthYellow to-primaryDarkBlue text-center text-primaryLigth xl:hover:text-primaryDarkBlue xl:hover:shadow-md xl:hover:shadow-primaryDarkBlue xl:hover:duration-500"
      >
        {helpUkraine}
      </Link>
      <Header ref={headerRef} />
      <main
        ref={mainRef}
        className="mt-32 min-h-dvh bg-gradient-to-b from-primaryLigthBlue to-primaryGreen pb-24 md:pb-6"
      >
        {children}
      </main>
      <Footer ref={footerRef} />
      {!isAdmin() && <LoginForm />}
      <Notification textNotification={notification} />
    </>
  );
};

export default IndexLayout;
