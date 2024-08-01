import { useMutation } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { MdAspectRatio } from 'react-icons/md';

import type { UserChatProps } from '@modules/UserChatProps';
import type { messageType } from '@modules/messageType';
import { userChatText } from '@variables/UserChatText';
import { userLogoChat } from '@variables/userLogoChat';
import { v4 as uuidv4 } from 'uuid';

import ChatForm from '@components/ChatForm';
import FourPoints from '@components/FourPoints';
import MessagesContainer from '@components/MessagesContainer';

import {  setMessages } from '@store/Slices/userSlice';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { updateUserMessagesAxios } from '@utils/axios';
import { classes } from '@utils/classes';

const UserChat = ({
  onRollUpBtnClick,
  onBtnFullScreenClick,
  isFullScreen,
  socket,
}: UserChatProps) => {
  const user = useAppSelector(state => state.user);
  const [textarea, setTextarea] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { hello, welcome, chatTime } = userChatText();
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocusTextArea, setIsFocusTextArea] = useState(false);

  const stopTyping = () => {
    socket?.emit('stopTyping', user);
    setTimeout(() => {
      setIsFocusTextArea(false);
    }, 200);
  };

  const typing = () => {
    socket?.emit('typing', user);
  };

  const focusTextArea = () => {
    if (window.innerWidth < 1281) {
      setIsFocusTextArea(true);
    }
    if (containerRef?.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const onSendMessage = (event: KeyboardEvent<HTMLFormElement>) => {
    if (textarea.trim().length <= 0) {
      setTextarea('');
      return;
    }
    if (event.key === 'Enter' && event.ctrlKey) {
      sendMessage();
    }
  };
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textarea.trim().length <= 0) return;
    sendMessage();
  };

  const updateMessagesMutation = useMutation({
    mutationKey: ['chat', user._id],
    mutationFn: async (messageData: messageType) =>
      updateUserMessagesAxios({ messageData, userId: user._id ?? '' }),
    onSuccess: (_, variables) => {
      socket.emit('send_msg', variables);
      dispatch(setMessages(variables));
      setTextarea('');
    },
  });

  const sendMessage = async () => {
    const messageData: messageType = {
      dato: new Date().toLocaleDateString().trim(),
      username: user.username,
      roomId: user.roomId,
      time: new Date().toLocaleTimeString().trim(),
      message: textarea.trim(),
      img: userLogoChat,
      imgAlt: user.username,
      id: uuidv4(),
    };

    updateMessagesMutation.mutate(messageData);
  };

  useEffect(() => {
    socket.emit('rejoin_room', user.roomId);
  }, [socket, user.roomId]);

  useEffect(() => {
    socket.on('online', () => {
      setStatus(true);
    });
    socket.on('offline', () => {
      setStatus(false);
    });

    socket.on('receive_msg', (messageData: messageType) => {
      dispatch(setMessages(messageData));
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
  }, [dispatch, socket]);

  useEffect(() => {
    if (containerRef?.current)
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - containerRef.current.offsetHeight;
  }, [user.messages]);

  const resizeClass = useMemo(() => {
    return isFullScreen
      ? isFocusTextArea
        ? 'h-[51svh] bottom-0 left-0 right-0'
        : 'inset-0'
      : 'h-[51svh] w-72 bottom-0 right-4';
  }, [isFullScreen, isFocusTextArea]);

  return (
    <div
      className={classes([
        `fixed z-50 flex flex-col rounded bg-white px-4 py-2 shadow shadow-slate-600`,
        resizeClass,
      ])}
    >
      <button
        onClick={onBtnFullScreenClick}
        className="absolute right-11 top-[0.65rem]"
      >
        <MdAspectRatio />
      </button>
      <button
        onClick={onRollUpBtnClick}
        className="absolute right-3 top-2 aspect-square w-6 border-b border-black text-2xl"
      ></button>
      <h2>
        {hello} {user.username}!
      </h2>
      <span
        className={classes([
          `absolute left-1 top-4 aspect-square w-2 rounded-full`,
          status ? 'bg-green-600' : 'bg-gray-400',
        ])}
      ></span>
      <p>{welcome}</p>
      <p className="pb-2 text-sm text-gray-400">{chatTime}</p>
      <MessagesContainer user={user} ref={containerRef} />
      <p className="mt-auto min-h-6">
        {isTyping && (
          <>
            Serhii typing
            <FourPoints />
          </>
        )}
      </p>
      <ChatForm
        stopTyping={stopTyping}
        typing={typing}
        focusTextArea={focusTextArea}
        onSendMessage={onSendMessage}
        submitHandler={submitHandler}
        textarea={textarea}
        setTextarea={setTextarea}
      />
    </div>
  );
};

export default UserChat;
