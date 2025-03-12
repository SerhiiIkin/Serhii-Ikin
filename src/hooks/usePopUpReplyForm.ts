import { useEffect, useRef } from 'react';

export const usePopUpReplyForm = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openReplyForm = () => {
    dialogRef.current?.show();
  };

  const closeReplyForm = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeReplyForm();
      }
    };

    dialogRef.current?.addEventListener('keydown', keyDownHandler);

    return () =>
      dialogRef.current?.removeEventListener('keydown', keyDownHandler);
  }, []);

  return {
    dialogRef,
    openReplyForm,
    closeReplyForm,
  };
};
