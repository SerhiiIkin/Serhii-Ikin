import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useId, useState } from 'react';
import type { ChangeEventHandler, FormEvent } from 'react';

import { useLocalStorage } from '@uidotdev/usehooks';
import { v4 as uuidv4 } from 'uuid';

import { CommentContext } from '@context/CommentContext';
import { ProjectContext } from '@context/ProjectContext';

import { useAppSelector } from '@hooks/redux';

import Multilanguage from '@utils/Multilanguage';
import { createCommentAxios, createReplyAxios } from '@utils/axios';

import { userLogoChat } from '@variables/userLogoChat';

import type { CommentType } from '@modules/CommentType';

export const useCommentForm = (closeReplyForm: () => void) => {
  const queryClient = useQueryClient();
  const [userId, saveUserId] = useLocalStorage('userId', '');

  const user = useAppSelector(state => state.user);

  const [textarea, setTextarea] = useState('');
  const [textareaError, setTextareaError] = useState(false);

  const idTextarea = useId();

  const { idComment } = useContext(CommentContext);
  const { idProject } = useContext(ProjectContext);

  const placeholderTextarea = Multilanguage({
    ukr: 'Ваш коментар',
    eng: 'Your comment',
    dk: 'Din kommentar',
  });

  const createCommentMutation = useMutation({
    mutationKey: ['createComment'],
    mutationFn: createCommentAxios,
    onSuccess: () => {
      setTextarea('');
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });
  const createReplyMutation = useMutation({
    mutationKey: ['createComment'],
    mutationFn: createReplyAxios,
    onSuccess: () => {
      setTextarea('');
      closeReplyForm();
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!textarea) {
      setTextareaError(true);
      return;
    }
    const id = uuidv4();
    const idUser = uuidv4();
    setTextareaError(false);
    const newComment: CommentType = {
      _id: id,
      description: textarea,
      date: `${new Date().toLocaleTimeString('en-GB')} ${new Date().toLocaleDateString('en-GB')}`,
      likes: [],
      logo: userLogoChat,
      name: user.username || `User ${idUser}`,
      replies: [],
      isReply: false,
      idComment: id,
      userId: userId ? userId : idUser,
      idProject: idProject !== '' ? idProject : '',
    };

    const newReply: CommentType = {
      ...newComment,
      idComment,
      isReply: true,
    };
    delete newReply.replies;
    saveUserId(prev => (prev ? prev : idUser));

    idComment
      ? createReplyMutation.mutate(newReply)
      : createCommentMutation.mutate(newComment);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
    const value = e.target.value;
    setTextarea(value);
    value.length > 0 ? setTextareaError(false) : setTextareaError(true);
  };

  return {
    textarea,
    setTextarea,
    handleSubmit,
    createCommentMutation,
    textareaError,
    handleChange,
    idTextarea,
    placeholderTextarea,
  };
};
