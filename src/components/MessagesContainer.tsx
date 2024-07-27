import { forwardRef, useEffect } from 'react';
import type { MutableRefObject } from 'react';

import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

import Message from '@components/Message';

const MessagesContainer = forwardRef<HTMLDivElement, { user: userType }>(
  ({ user }, ref) => {
    useEffect(() => {
      if ((ref as MutableRefObject<HTMLDivElement>)?.current)
        (ref as MutableRefObject<HTMLDivElement>).current.scrollTop = (
          ref as MutableRefObject<HTMLDivElement>
        ).current.scrollHeight;
    }, [ref, user.messages]);

    return (
      <div ref={ref} className="overflow-y-auto">
        {user?.messages.map((msg: messageType) => (
          <Message key={msg.id} msg={msg} />
        ))}
      </div>
    );
  }
);

export default MessagesContainer;
