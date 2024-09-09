import { TbMessage } from 'react-icons/tb';

import Button from '@components/Button';

import { classes } from '@utils/classes';

import type { AuthButtonProps } from '@modules/AuthButtonProps';

const AuthButton = ({
  isOpenForm,
  isOpenChat,
  user,
  token,
  OpenCloseForm,
}: AuthButtonProps) => {
  return (
    <>
      {!isOpenForm && !isOpenChat && token?.role !== 'admin' && (
        <Button
          aria-label="open chat menu"
          className={classes([
            `fixed bottom-32 right-4 z-20 rounded-md p-1 md:bottom-12 md:right-6 xl:right-8`,
          ])}
          onClick={OpenCloseForm}
        >
          {user.newMessageCount > 0 && (
            <div className="absolute -left-6 -top-6 min-h-8 min-w-8 animate-bounce rounded-full bg-primaryDarkBlue p-2 text-sm">
              {user.newMessageCount}
            </div>
          )}
          <TbMessage className="h-6 w-6 md:h-8 md:w-8 xl:h-12 xl:w-12" />
        </Button>
      )}
    </>
  );
};

export default AuthButton;
