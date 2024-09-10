import Chat from '@components/Chat';
import SideBar from '@components/SideBar';
import Title from '@components/Title';

import { useChatDashboard } from '@hooks/useChatDashboard';

const ChatDashboard = () => {
  useChatDashboard();
  return (
    <section className="min-h-[70dvh]">
      <Title typeTitle="h1"> Chat dashboard </Title>
      <div className="flex max-h-[calc(50dvh)] flex-col gap-2 sm:flex-row">
        <SideBar />
        <Chat />
      </div>
    </section>
  );
};

export default ChatDashboard;
