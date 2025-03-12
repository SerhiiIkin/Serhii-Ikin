import { useContext } from 'react';
import { MdOutlineReply } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';

import { CommentContext } from '@context/CommentContext';

import Button from '@components/Button';
import CommentForm from '@components/CommentForm';

import { usePopUpReplyForm } from '@hooks/usePopUpReplyForm';

const PopUpReplyForm = () => {
  const { dialogRef, openReplyForm, closeReplyForm } = usePopUpReplyForm();
  const { isReply } = useContext(CommentContext);

  return (
    <>
      <div className="relative inline-block">
        {!isReply && (
          <Button onClick={openReplyForm}>
            <MdOutlineReply />
          </Button>
        )}
        <dialog
          ref={dialogRef}
          onClick={closeReplyForm}
          className="translate-display -top-1/2 left-14 z-20 w-max max-w-lg rounded-md bg-secondaryGrey p-2 shadow-xl shadow-secondaryGrey outline outline-1 outline-primaryOrange"
        >
          <div onClick={e => e.stopPropagation()} className="grid">
            <button
              onClick={closeReplyForm}
              type="button"
              className="mb-2 justify-self-end"
            >
              <SlClose className="xl:hover:text-primaryOrange" />
            </button>
            <CommentForm closeReplyForm={closeReplyForm} />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default PopUpReplyForm;
