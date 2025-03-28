import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent,  useId, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { MdDelete, MdDone } from 'react-icons/md';
import { TiCancel } from 'react-icons/ti';

import { useLocalStorage } from '@uidotdev/usehooks';
import { v4 as uuidv4 } from 'uuid';

import { CommentContext } from '@context/CommentContext';

import Button from '@components/Button';
import { CommentOrReply } from '@components/CommentOrReply';
import PopUpReplyForm from '@components/PopUpReplyForm';
import Textarea from '@components/Textarea';

import {
  deleteCommentAxios,
  deleteReplyAxios,
  updateCommentAxios,
  updateReplyAxios,
} from '@utils/axios';
import { classes } from '@utils/classes';

import type { CommentType } from '@modules/CommentType';

export const Comment = (comment: CommentType) => {
  const {
    _id,
    logo,
    name,
    description,
    date,
    likes: commentLikes,
    replies,
    isReply,
    idComment,
    idProject,
    userId: commentUserId,
  } = comment;

  const id = useId();
  const idUser = uuidv4();
  const queryClient = useQueryClient();
  const [userId, saveUserId] = useLocalStorage(
    'userId',
    commentUserId || idUser
  );

  const [editMode, setEditMode] = useState(false);
  const [descriptionTextArea, setDescriptionTextArea] = useState(description);
  const [likes, setLikes] = useState(commentLikes);
  const [checkboxLike, setCheckboxLike] = useState(
    commentLikes.includes(userId) || false
  );

  const removeCommentMutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: deleteCommentAxios,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });
  const removeReplyMutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: deleteReplyAxios,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });

  const updateCommentMutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: updateCommentAxios,
    onSuccess: () => {
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });
  const updateReplyMutation = useMutation({
    mutationKey: ['comment'],
    mutationFn: updateReplyAxios,
    onSuccess: () => {
      setEditMode(false);
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });

  const removeComment = () => {
    isReply
      ? removeReplyMutation.mutate({
          id: idProject as string,
          idComment: idComment as string,
          idReply: _id as string,
        })
      : removeCommentMutation.mutate({
          id: idProject as string,
          idComment: idComment as string,
        });
  };

  const editComment = () => {
    setEditMode(prev => !prev);
  };

  const updateComment = () => {
    isReply
      ? updateReplyMutation.mutate({
          data: { ...comment, description: descriptionTextArea },
        })
      : updateCommentMutation.mutate({
          data: { ...comment, description: descriptionTextArea },
        });
  };

  const handleLikeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const currentUserId = userId ? userId : idUser;

    setCheckboxLike(event.target.checked);
    saveUserId(currentUserId);
    setLikes(
      checked
        ? [...likes, currentUserId]
        : likes.filter(like => like !== userId)
    );
    isReply
      ? updateReplyMutation.mutate({
          data: {
            ...comment,
            likes: checked
              ? [...likes, currentUserId]
              : likes.filter(like => like !== userId),
          },
        })
      : updateCommentMutation.mutate({
          data: {
            ...comment,
            likes: checked
              ? [...likes, currentUserId]
              : likes.filter(like => like !== userId),
          },
        });
  };

  return (
    <CommentContext.Provider
      value={{ isReply, idComment, idProject: idProject ?? '' }}
    >
      <CommentOrReply>
        <div className={'relative grid gap-2 py-4'}>
          {isReply && (
            <div className="absolute -left-8 top-0 -z-0 h-8 w-8 rounded-bl-full border-b border-l border-secondaryRed"></div>
          )}
          <div className="grid justify-between gap-1 sm:flex">
            <img
              src={logo}
              alt={name}
              className="row-start-1 h-10 w-10 rounded-full"
            />
            <label className={classes(['relative col-span-2 grow'])}>
              {editMode ? (
                <Textarea
                  value={descriptionTextArea}
                  onChange={event => setDescriptionTextArea(event.target.value)}
                  className={classes([
                    'w-full',
                    editMode ? '' : 'bg-transparent outline-0',
                  ])}
                />
              ) : (
                <span className="inline-block py-3">{descriptionTextArea}</span>
              )}

              {editMode && (
                <div className="absolute right-5 top-1/2 flex -translate-y-1/2 gap-5">
                  <Button onClick={updateComment}>
                    <MdDone />
                  </Button>
                  <Button onClick={() => setEditMode(prev => !prev)}>
                    <TiCancel />
                  </Button>
                </div>
              )}
            </label>
            <p className="row-start-1 justify-self-end">{date}</p>
          </div>
          {commentUserId == userId && (
            <div className="flex gap-5">
              <Button onClick={editComment}>
                <FaRegEdit />
              </Button>
              <Button onClick={removeComment}>
                <MdDelete />
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-5">
          <label
            htmlFor={id}
            className="group inline-flex cursor-pointer items-center gap-2"
          >
            <input
              checked={checkboxLike}
              onChange={handleLikeChange}
              id={id}
              className="peer hidden"
              type="checkbox"
            />
            {likes.length}
            <FcLike className="h-8 w-8 group-hover:xl:animate-pulse [&_path]:fill-white [&_path]:duration-500 peer-checked:[&_path]:fill-secondaryRed group-hover:[&_path]:xl:fill-primaryOrange" />
          </label>
          <PopUpReplyForm />
        </div>
        {replies &&
          replies.length > 0 &&
          replies?.map(reply => <Comment key={reply._id} {...reply} />)}
      </CommentOrReply>
    </CommentContext.Provider>
  );
};
