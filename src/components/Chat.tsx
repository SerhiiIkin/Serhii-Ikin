import SectionLayout from '@layouts/SectionLayout';

import ChatForm from '@components/ChatForm';
import FourPoints from '@components/FourPoints';
import MessagesContainer from '@components/MessagesContainer';
import Title from '@components/Title';

import { useChatAdmin } from '@hooks/useChatAdmin';

import { myLogoChat } from '@variables/myLogoChat';

const Chat = () => {
  const { admin, currentUser, containerRef, isTyping, isCurrentUser } =
    useChatAdmin();

  return (
    <SectionLayout
      classNameContainer="flex flex-col gap-y-2 h-[calc(100dvh-500px)]  sm:h-[calc(100dvh-350px)]"
      className="col-span-5 sm:row-start-1"
    >
      {currentUser?.username ? (
        <Title typeTitle="h2">Chat with {currentUser.username}</Title>
      ) : (
        <Title typeTitle="h2" className="text-center">
          Choose user
        </Title>
      )}
      {currentUser && (
        <MessagesContainer user={currentUser} ref={containerRef} />
      )}
      <p className="animation-typing mt-auto min-h-6">
        {isTyping && isCurrentUser && (
          <>
            {currentUser?.username} typing
            <FourPoints />
          </>
        )}
      </p>
      {currentUser && (
        <ChatForm
          classNameForm="fixed container  xl:bottom-9 bottom-20 z-10  w-[calc(100dvw-20px)] sm:w-4/5"
          user={currentUser}
          username={admin.username}
          img={myLogoChat}
        />
      )}
    </SectionLayout>
  );
};

export default Chat;
