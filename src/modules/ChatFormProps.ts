import type { ComponentPropsWithoutRef } from 'react';


import type { userType } from '@modules/userType';

export interface ChatFormProps extends ComponentPropsWithoutRef<'form'> {
  classNameForm?: string;
  user: userType;
  username: string;
  img: string;
  focusTextArea?: () => void;
  blurTextArea?: () => void;
}
