import { useEffect, useMemo, useRef, useState } from 'react';

import { resetMessageCount } from '@store/Slices/userSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { socket } from '@variables/socket';

export const useUserChat = (isFullScreen: boolean) => {
  const user = useAppSelector(state => state.user);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocusTextArea, setIsFocusTextArea] = useState(false);

  const focusTextArea = () => {
    dispatch(resetMessageCount());
    if (window.innerWidth < 1281) {
      setIsFocusTextArea(true);
    }

    if (containerRef?.current)
      containerRef.current.scrollTo({
        top: containerRef?.current.scrollHeight,
        behavior: 'smooth',
      });
  };

  const blurTextArea = () => {
    setIsFocusTextArea(false);
  };

  useEffect(() => {
    socket.on('online', () => {
      setStatus(true);
    });
    socket.on('offline', () => {
      setStatus(false);
    });

    socket.on('typing', () => {
      setIsTyping(true);
    });

    socket.on('stopTyping', () => {
      setIsTyping(false);
    });

    return (): void => {
      socket.off('stopTyping');
      socket.off('typing');
      socket.off('online');
      socket.off('offline');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

  const resizeClass = useMemo(() => {
    if (isFocusTextArea && isFullScreen)
      return ' top-1/2 left-0 bottom-0  right-0';
    if (isFullScreen) return 'inset-0';

    return 'h-[51svh] w-72 bottom-0  right-4';
  }, [isFocusTextArea, isFullScreen]);

  return {
    resizeClass,
    user,
    containerRef,
    isTyping,
    focusTextArea,
    status,
    dispatch,
    isFocusTextArea,
    blurTextArea,
  };
};
