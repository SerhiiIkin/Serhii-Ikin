import { useEffect, useMemo, useRef, useState } from 'react';

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
    if (window.innerWidth < 1281) {
      setIsFocusTextArea(true);
    }
    if (containerRef?.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
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
      socket.off('receive_msg');
      socket.off('typing');
      socket.off('online');
      socket.off('offline');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, dispatch]);

  const resizeClass = useMemo(() => {
    return isFullScreen
      ? isFocusTextArea
        ? 'h-[51svh] bottom-0 left-0 right-0'
        : 'inset-0'
      : 'h-[51svh] w-72 bottom-0 right-4';
  }, [isFullScreen, isFocusTextArea]);

  return {
    resizeClass,
    user,
    containerRef,
    isTyping,
    focusTextArea,
    status,
  };
};
