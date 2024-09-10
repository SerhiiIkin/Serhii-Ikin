import { forwardRef } from 'react';
import { FaArrowDown } from 'react-icons/fa';

import Message from '@components/Message';

import { useMessagesContainer } from '@hooks/useMessagesContainer';

import { classes } from '@utils/classes';

import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

const MessagesContainer = forwardRef<
  HTMLDivElement,
  { user: userType; containerClasses?: string }
>(({ user, containerClasses }, ref) => {
  const { scrollToBottom, isScrollBtn } = useMessagesContainer(ref, user);

  return (
    <div
      className={classes(['relative overflow-y-auto', containerClasses ?? ''])}
      ref={ref}
    >
      {user?.messages?.map((msg: messageType, i) => (
        <Message key={i} msg={msg} />
      ))}
      {isScrollBtn && (
        <FaArrowDown
          className="sticky bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-primaryDarkBlue xl:hover:text-primaryOrange"
          onClick={scrollToBottom}
        />
      )}
    </div>
  );
});

export default MessagesContainer;
