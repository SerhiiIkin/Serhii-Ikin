import { type FC, Suspense } from 'react';
import { Link } from 'react-router-dom';

import type { indexLayoutProps } from '@modules/indexLayoutProps';

import Header from '@components/Header';
import Loader from '@components/Loader';

import Multilanguage from '@utils/Multilanguage';

const IndexLayout: FC<indexLayoutProps> = ({ children }) => {
  const helpUkraine = Multilanguage({
    ukr: 'Допомогти Україні',
    eng: 'Help for Ukraine',
    dk: 'Hjælp for Ukraine',
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Link
        to="/HelpUkraine"
        className="fixed left-0 top-0 z-10 w-full bg-gradient-to-b from-primaryLigthYellow to-primaryDarkBlue text-center text-primaryLigth xl:hover:text-primaryDarkBlue xl:hover:shadow-md xl:hover:shadow-primaryDarkBlue xl:hover:duration-500"
      >
        {helpUkraine}
      </Link>
      <Header />
      <main className="flex-1 pt-20">
        <Suspense
          fallback={
            <Loader
              size="large"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          }
        >
          {children}
        </Suspense>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default IndexLayout;
