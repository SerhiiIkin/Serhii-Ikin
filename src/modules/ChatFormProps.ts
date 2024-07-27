import type {
  ComponentPropsWithoutRef,
  Dispatch,
  FormEvent,
  KeyboardEvent,
} from 'react';

export interface ChatFormProps extends ComponentPropsWithoutRef<'form'> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  onSendMessage: (event: KeyboardEvent<HTMLFormElement>) => void;
  textarea: string;
  setTextarea: Dispatch<React.SetStateAction<string>>;
  focusTextArea?: () => void;
  typing: () => void;
  stopTyping: () => void;
  classNameForm?: string;
}
