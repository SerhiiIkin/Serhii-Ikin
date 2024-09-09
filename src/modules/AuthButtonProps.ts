import type { tokenType } from '@modules/tokenType';
import type { userType } from '@modules/userType';

export type AuthButtonProps = {
  isOpenForm: boolean;
  isOpenChat: boolean;
  user: userType;
  token: tokenType;
  OpenCloseForm: () => void;
};
