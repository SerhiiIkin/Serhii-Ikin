import type { FC, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import type { indexLayoutProps } from '@modules/indexLayoutProps';

import Footer from '@components/Footer';
import Header from '@components/Header';
import LoginForm from '@components/LoginForm';

import Multilanguage from '@utils/Multilanguage';

const IndexLayout: FC<indexLayoutProps> = ({ children }) => {
  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

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
      mainRef.current.style.minHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

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
        className="bg-gradient-to-b from-primaryLigthBlue to-primaryGreen"
      >
        {children}
      </main>
      <Footer ref={footerRef} />
      <LoginForm />
    </>
  );
};

export default IndexLayout;
