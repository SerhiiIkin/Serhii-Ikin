import { useEffect, useState } from 'react';

import type { NotificationProps } from '@modules/NotificationProps';

import { classes } from '@utils/classes';

const Notification = ({ textNotification }: NotificationProps) => {
  const [isOpenWindon, setIsOpenWindon] = useState(false);

  useEffect(() => {
    setIsOpenWindon(textNotification?.length > 0);

    setTimeout(() => {
      setIsOpenWindon(false);
    }, 6000);
  }, [textNotification]);

  const closeNotificationWindow = () => {
    setIsOpenWindon(false);
  };

  return (
    <>
      {textNotification?.length > 0 && (
        <div
          className={classes([
            'translate-display fixed -right-80 bottom-14 z-50 rounded-xl bg-primaryOrange p-4 opacity-0',
            isOpenWindon ? 'right-8 opacity-100' : '',
          ])}
        >
          <button
            onClick={closeNotificationWindow}
            type="button"
            className="absolute right-1 top-1"
          >
            X
          </button>
          <div>{textNotification}</div>
        </div>
      )}
    </>
  );
};

export default Notification;
