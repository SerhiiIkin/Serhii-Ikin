import { IoIosSend } from 'react-icons/io';

import Button from '@components/Button';
import Textarea from '@components/Textarea';

import { useChatForm } from '@hooks/useChatForm';

import { classes } from '@utils/classes';

import type { ChatFormProps } from '@modules/ChatFormProps';

const ChatForm = ({
  classNameForm,
  user,
  username,
  img,
  focusTextArea,
}: ChatFormProps) => {
  const {
    onSendMessage,
    submitHandler,
    textarea,
    setTextarea,
    typing,
    stopTyping,
  } = useChatForm({ user, username, img });

  return (
    <form
      onSubmit={submitHandler}
      onKeyDown={onSendMessage}
      className={classes(['relative', classNameForm ?? ''])}
    >
      <Textarea
        title="Ctrl + Enter for send message"
        autoFocus
        onFocus={focusTextArea}
        onKeyDown={typing}
        stopTyping={stopTyping}
        value={textarea}
        onChange={e => setTextarea(e.target.value)}
        className="mt-2 w-full resize-none rounded p-2 outline outline-neutral-400"
      />
      <Button
        type="submit"
        className="absolute bottom-0 right-0 z-10 cursor-pointer bg-transparent p-3 text-primaryOrange disabled:cursor-not-allowed xl:hover:bg-transparent xl:hover:text-secondaryRed disabled:xl:text-primaryOrange disabled:xl:hover:bg-transparent"
      >
        <IoIosSend />
      </Button>
    </form>
  );
};

export default ChatForm;
