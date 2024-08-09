import type { MouseEvent } from 'react';
import { forwardRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { btnsLanguage } from '@variables/btnsLanguage';
import { Links } from '@variables/links';
import { logoLink } from '@variables/logoLink';

import Button from '@components/Button';
import NavLink from '@components/NavLink';

import { dk, eng, ukr } from '@store/Slices/languageSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux.ts';

import { classes } from '@utils/classes';

const Header = forwardRef<HTMLElement>((_, ref) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { language } = useAppSelector(state => state.language);

  const [active, setActive] = useState(false);

  useEffect(() => {
    const browserLanguage = navigator.language;

    switch (browserLanguage) {
      case 'da':
        dispatch(dk('DK'));
        break;
      case 'da-DK':
        dispatch(dk('DK'));
        break;
      case 'en-US':
        dispatch(eng('ENG'));
        break;
      case 'uk-UA':
        dispatch(ukr('UKR'));
        break;

      default:
        dispatch(eng('ENG'));
        break;
    }
  }, [dispatch]);

  const onMenuClick = () => {
    if (window.innerWidth < 768) setActive(prev => !prev);
  };

  const onLanguageBtnClick = (event: MouseEvent<HTMLButtonElement>) => {
    const lang = event.currentTarget.dataset.lang;
    switch (lang) {
      case 'UKR':
        dispatch(ukr(lang));
        break;
      case 'ENG':
        dispatch(eng(lang));
        break;
      case 'DK':
        dispatch(dk(lang));
        break;
    }
  };

  return (
    <header
      ref={ref}
      className="fixed left-0 top-6 z-50 flex min-h-20 w-full items-center justify-between bg-gradient-to-b from-primaryDarkBlue to-secondaryGrey px-2 py-4 text-primaryLigth sm:px-10 md:grid md:grid-cols-3 md:grid-rows-1"
    >
      <Link to="/">
        <img
          className="max-h-20 max-w-20 rounded"
          loading="lazy"
          src={logoLink}
          width={80}
          height={80}
          alt="logo"
        />
      </Link>
      <nav
        onClick={onMenuClick}
        className={classes([
          active
            ? 'fixed left-0 top-0 grid h-full w-full place-items-center overflow-y-auto bg-slate-400 text-4xl transition-all duration-700'
            : 'fixed left-[-100vw] top-[-100vh] min-w-max md:static md:flex md:justify-self-center',
        ])}
      >
        {Links().map(({ to, children }, index) => {
          return location.pathname !== to ? (
            <NavLink key={index} to={to}>
              {children}
            </NavLink>
          ) : (
            <span
              key={index}
              className={classes([
                'relative mr-2 text-primaryOrange last:mr-0',
                'after:absolute after:bottom-[-10px] after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-primaryLigth after:to-primaryOrange after:content-[""] after:md:bottom-[-2px]',
              ])}
            >
              {children}
            </span>
          );
        })}
      </nav>

      <div className="justify-self-end">
        {btnsLanguage().map(btn => (
          <Button
            aria-label={`Change language to ${btn}`}
            type="button"
            key={btn}
            onClick={onLanguageBtnClick}
            data-lang={btn}
            disabled={language === btn}
            className={classes([
              'mr-2 rounded-2xl bg-transparent p-2 last:mr-0',
              language === btn ? 'bg-primaryOrange' : '',
            ])}
          >
            {btn}
          </Button>
        ))}
      </div>

      <Button
        onClick={onMenuClick}
        aria-label="Open menu"
        type="button"
        className={classes([
          'relative m-1 block h-8 w-8 bg-transparent md:hidden',
          'before:absolute before:left-0 before:top-[2px] before:h-[3px] before:w-full before:rounded before:bg-primaryDark before:duration-500 before:content-[""]',
          'after:duration-50 after:absolute after:bottom-[2px] after:left-0 after:h-[3px] after:w-full after:rounded after:bg-primaryDark after:content-[""]',
          active
            ? 'z-30 before:top-4 before:rotate-90 after:bottom-[8px] after:left-[43%] after:w-[70%] after:rotate-[-45deg]'
            : '',
        ])}
      >
        <span
          className={classes([
            `absolute left-0 h-[3px] w-full rounded bg-primaryDark duration-500 content-[""]`,
            active ? 'left-[-13%] top-[22px] w-[70%] rotate-[45deg]' : '',
          ])}
        ></span>
      </Button>
    </header>
  );
});

export default Header;
