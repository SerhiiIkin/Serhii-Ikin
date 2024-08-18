import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export const useHandleResize = () => {
  const linkRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    linkRef,
    headerRef,
    footerRef,
    mainRef,
  };
};
