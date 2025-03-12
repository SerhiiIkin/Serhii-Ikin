import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';

import { CommentContext } from '@context/CommentContext';

import Button from '@components/Button';
import { CommentOrReply } from '@components/CommentOrReply';
import PopUpReplyForm from '@components/PopUpReplyForm';

import { deleteCommentAxios, deleteReplyAxios } from '@utils/axios';

import type { CommentType } from '@modules/CommentType';

export const Comment = ({
  _id,
  logo,
  name,
  description,
  date,
  likes,
  replies,
  isReply,
  idComment,
  idProject,
}: CommentType) => {
  const id = useId();
  const queryClient = useQueryClient();

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

  const editComment = () => {};

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
            <p className="col-span-2 grow">{description}</p>
            <p className="row-start-1 justify-self-end">{date}</p>
          </div>
          <div>
            <Button onClick={editComment} className="mr-2">
              <FaRegEdit />
            </Button>
            <Button onClick={removeComment}>
              <MdDelete />
            </Button>
          </div>
        </div>
        <label
          htmlFor={id}
          className="group mr-2 inline-flex cursor-pointer items-center gap-2"
        >
          <input id={id} className="peer hidden" type="checkbox" />
          {likes}
          <FcLike className="[&_path]:fill-white [&_path]:duration-500 peer-checked:[&_path]:fill-secondaryRed group-hover:[&_path]:xl:fill-primaryOrange" />
        </label>
        <PopUpReplyForm />
        {replies &&
          replies.length > 0 &&
          replies?.map(reply => <Comment key={reply._id} {...reply} />)}
      </CommentOrReply>
    </CommentContext.Provider>
  );
};
