import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { setMessages } from '@store/Slices/userSlice';
import { updateUserMessages } from '@store/Slices/usersSlice';

import { useAppDispatch } from '@hooks/redux';

import { updateUserMessagesAxios } from '@utils/axios';

import { socket } from '@variables/socket';

import type { messageType } from '@modules/messageType';
import type { userType } from '@modules/userType';

export const useChatForm = ({
  user,
  username,
  img,
}: {
  user: userType;
  username: string;
  img: string;
}) => {
  const [textarea, setTextarea] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState(false);
  const dispatch = useAppDispatch();

  const [isFocusTextArea, setIsFocusTextArea] = useState(false);

  const functionUpdateMessages = (message: messageType) => {
    if (username === 'Serhii') {
      return dispatch(updateUserMessages(message));
    } else {
      return dispatch(setMessages(message));
    }
  };

  const stopTyping = () => {
    socket?.emit('stopTyping', user);
    setTimeout(() => {
      setIsFocusTextArea(false);
    }, 200);
  };

  const typing = () => {
    socket?.emit('typing', user);
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
      functionUpdateMessages(variables);
      setTextarea('');
    },
  });

  const sendMessage = async () => {
    const messageData: messageType = {
      dato: new Date().toLocaleDateString().trim(),
      username: username,
      roomId: user.roomId,
      time: new Date().toLocaleTimeString().trim(),
      message: textarea.trim(),
      img: img,
      imgAlt: user.username,
      id: uuidv4(),
    };

    updateMessagesMutation.mutate(messageData);
    setTextarea('');
  };

  useEffect(() => {
    socket.emit('rejoin_room', user.roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, user.roomId]);

  useEffect(() => {
    socket.on('online', () => {
      setStatus(true);
    });
    socket.on('offline', () => {
      setStatus(false);
    });

    socket.on('receive_msg', (messageData: messageType) => {
      functionUpdateMessages(messageData);
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
  }, [dispatch, socket]);

  return {
    typing,
    stopTyping,
    submitHandler,
    onSendMessage,
    isTyping,
    status,
    isFocusTextArea,
    textarea,
    setTextarea,
  };
};
