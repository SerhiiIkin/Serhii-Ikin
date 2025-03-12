import { useCallback, useEffect, useRef } from 'react';

export const usePopUpReplyForm = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openReplyForm = useCallback(() => {
    dialogRef.current?.show();
  }, []);

  const closeReplyForm = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeReplyForm();
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, []);

  return {
    dialogRef,
    openReplyForm,
    closeReplyForm,
  };
};
