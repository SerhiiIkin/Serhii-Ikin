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
      classNameContainer="flex flex-col gap-y-2"
      className="basis-2/3 sm:basis-full"
    >
      {currentUser?.username ? (
        <Title typeTitle="h2">Chat with {currentUser.username}</Title>
      ) : (
        <Title typeTitle="h2" className="text-center">
          Choose user
        </Title>
      )}
      {currentUser && (
        <MessagesContainer
          containerClasses="max-h-[25dvh] sm:max-h-[40dvh]"
          user={currentUser}
          ref={containerRef}
        />
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
          classNameForm="fixed sm:bottom-20 bottom-28 z-20 left-2  w-[calc(100dvw-20px)]"
          user={currentUser}
          username={admin.username}
          img={myLogoChat}
        />
      )}
    </SectionLayout>
  );
};

export default Chat;
