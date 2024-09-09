import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';

import type { userType } from '@modules/userType';

export type AuthUserFormProps = {
  isOpenForm: boolean;
  user: userType;
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  OpenCloseForm: () => void;
  isPending: boolean;
  usernameInput: string;
  error: string;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  type: boolean;
  setType: Dispatch<SetStateAction<boolean>>;
  userNameHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};
