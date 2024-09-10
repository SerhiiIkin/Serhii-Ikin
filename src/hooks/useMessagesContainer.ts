import { useEffect, useState } from 'react';
import type { ForwardedRef, MutableRefObject } from 'react';

import type { userType } from '@modules/userType';

export const useMessagesContainer = (
  ref: ForwardedRef<HTMLDivElement>,
  user: userType
) => {
  const container = (ref as MutableRefObject<HTMLDivElement>).current;
  const [isScrollBtn, setIsScrollBtn] = useState(false);
  const [messagesLength, setMessagesLength] = useState(
    0 | user?.messages?.length
  );

  const scrollToBottom = () => {
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  const handleScroll = () => {
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    if (scrollHeight - clientHeight - scrollTop > 100) {
      setIsScrollBtn(true);
    } else {
      setIsScrollBtn(false);
    }
  };

  useEffect(() => {
    if (user?.messages?.length > messagesLength) {
      scrollToBottom();
      setMessagesLength(user?.messages?.length);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.messages?.length]);

  useEffect(() => {
    container && container.addEventListener('scroll', handleScroll);

    return () => {
      container && container.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  return { container, scrollToBottom, isScrollBtn };
};
