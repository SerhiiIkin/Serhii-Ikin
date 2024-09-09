import { MdAspectRatio } from 'react-icons/md';

import ChatForm from '@components/ChatForm';
import FourPoints from '@components/FourPoints';
import MessagesContainer from '@components/MessagesContainer';

import { useUserChat } from '@hooks/useUserChat';

import { classes } from '@utils/classes';

import { userChatText } from '@variables/UserChatText';
import { userLogoChat } from '@variables/userLogoChat';

import type { UserChatProps } from '@modules/UserChatProps';

const UserChat = ({
  onRollUpBtnClick,
  onBtnFullScreenClick,
  isFullScreen,
  isOpenChat,
}: UserChatProps) => {
  const { hello, welcome, chatTime } = userChatText();
  const { resizeClass, user, containerRef, isTyping, focusTextArea, status } =
    useUserChat(isFullScreen);

  return (
    <>
      {isOpenChat && (
        <div
          className={classes([
            `fixed z-50 flex flex-col rounded bg-white px-4 py-2 shadow shadow-slate-600`,
            resizeClass,
          ])}
        >
          <button
            onClick={onBtnFullScreenClick}
            className="absolute right-11 top-[0.65rem]"
          >
            <MdAspectRatio />
          </button>
          <button
            onClick={onRollUpBtnClick}
            className="absolute right-3 top-2 aspect-square w-6 border-b border-black text-2xl"
          ></button>
          <h2>
            {hello} {user.username}!
          </h2>
          <span
            className={classes([
              `absolute left-1 top-4 aspect-square w-2 rounded-full`,
              status ? 'bg-green-600' : 'bg-gray-400',
            ])}
          ></span>
          <p>{welcome}</p>
          <p className="pb-2 text-sm text-gray-400">{chatTime}</p>
          <MessagesContainer user={user} ref={containerRef} />
          <p className="mt-auto min-h-6">
            {isTyping && (
              <>
                Serhii typing
                <FourPoints />
              </>
            )}
          </p>
          <ChatForm
            user={user}
            username={user.username}
            img={userLogoChat}
            focusTextArea={focusTextArea}
          />
        </div>
      )}
    </>
  );
};

export default UserChat;
