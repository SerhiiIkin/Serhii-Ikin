import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { ToastContext } from '@context/ToastContext';

import AuthSection from '@components/AuthSection';
import ButtonScrollToTop from '@components/ButtonScrollToTop';
import Footer from '@components/Footer';
import Header from '@components/Header';

import { useHandleResize } from '@hooks/useHandleResize';
import { useSocketInit } from '@hooks/useSocketInit';

import Multilanguage from '@utils/Multilanguage';
import { isAdmin } from '@utils/auth';

import type { indexLayoutProps } from '@modules/indexLayoutProps';

const IndexLayout: FC<indexLayoutProps> = ({ children }) => {
  const { linkRef, headerRef, footerRef, mainRef } = useHandleResize();
  useSocketInit();

  const helpUkraine = Multilanguage({
    ukr: 'Допомогти Україні',
    eng: 'Help for Ukraine',
    dk: 'Hjælp for Ukraine',
  });

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
          className="mt-32 min-h-[calc(100dvh-8rem)] bg-secondaryGrey pb-28 sm:pb-24"
        >
          {children}
        </main>
        <Footer ref={footerRef} />
        {!isAdmin() && <AuthSection />}
      </ToastContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        rtl={false}
        pauseOnHover
        theme="dark"
      />
      <ButtonScrollToTop />
    </>
  );
};

export default IndexLayout;
