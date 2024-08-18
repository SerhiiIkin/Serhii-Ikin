import { useMutation } from '@tanstack/react-query';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import SectionLayout from '@layouts/SectionLayout';

import { ChatContext } from '@context/ChatContext';

import ChatForm from '@components/ChatForm';
import FourPoints from '@components/FourPoints';
import MessagesContainer from '@components/MessagesContainer';
import Title from '@components/Title';

import { updateUserMessages } from '@store/Slices/usersSlice';
import type { RootState } from '@store/store';

import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { updateUserMessagesAxios } from '@utils/axios';

import { myLogoChat } from '@variables/myLogoChat';

import type { ChatContextType } from '@modules/ChatContextType';
import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

const Chat = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
  const admin = useAppSelector(state => state.admin);
  const currentUser = useMemo(() => {
    return users.find(user => user._id === id);
  }, [id, users]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const { socket } = useContext<ChatContextType>(ChatContext);

  const [textarea, setTextarea] = useState('');

  const updateMessagesMutation = useMutation({
    mutationKey: ['chat', currentUser?._id],
    mutationFn: updateUserMessagesAxios,
    onSuccess: (_, variables) => {
      socket.emit('send_msg', variables.messageData);
      dispatch(updateUserMessages(variables.messageData));
    },
  });

  const stopTyping = () => {
    socket?.emit('stopTyping', currentUser);
  };

  const typing = () => {
    socket?.emit('typing', currentUser);
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

  const sendMessage = async () => {
    const messageData: messageType = {
      dato: new Date().toLocaleDateString().trim(),
      username: admin.username,
      roomId: currentUser?.roomId || '',
      time: new Date().toLocaleTimeString().trim(),
      message: textarea.trim(),
      img: myLogoChat,
      imgAlt: currentUser?.username || '',
      id: uuidv4(),
    };

    updateMessagesMutation.mutate({
      messageData,
      userId: currentUser?._id || '',
    });
    setTextarea('');
  };

  useEffect(() => {
    socket.on('typing', (data: userType) => {
      if (data.roomId === currentUser?.roomId) {
        setIsCurrentUser(true);
        setIsTyping(true);
      } else {
        setIsCurrentUser(false);
      }
    });

    socket.on('stopTyping', () => {
      setIsTyping(false);
    });

    return (): void => {
      socket.off('typing');
    };
  }, [socket, currentUser]);

  return (
    <SectionLayout
      classNameContainer="flex flex-col gap-y-2 h-[calc(100dvh-500px)]  sm:h-[calc(100dvh-350px)]"
      className="col-span-5 sm:row-start-1"
    >
      {currentUser?.username ? (
        <Title typeTitle="h2">Chat with {currentUser.username}</Title>
      ) : (
        <Title typeTitle="h2" className="text-center">
          Choose user
        </Title>
      )}
      {currentUser && (
        <MessagesContainer user={currentUser} ref={containerRef} />
      )}
      <p className="animation-typing mt-auto min-h-6">
        {isTyping && isCurrentUser && (
          <>
            {currentUser?.username} typing
            <FourPoints />
          </>
        )}
      </p>
      {currentUser && (
        <ChatForm
          classNameForm="fixed container  xl:bottom-9 bottom-20 z-10  w-[calc(100dvw-20px)] sm:w-4/5"
          stopTyping={stopTyping}
          typing={typing}
          onSendMessage={onSendMessage}
          submitHandler={submitHandler}
          textarea={textarea}
          setTextarea={setTextarea}
        />
      )}
    </SectionLayout>
  );
};

export default Chat;
