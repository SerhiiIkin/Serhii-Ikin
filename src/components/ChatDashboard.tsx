import Chat from '@components/Chat';
import SideBar from '@components/SideBar';
import Title from '@components/Title';

import { useChatDashboard } from '@hooks/useChatDashboard';

const ChatDashboard = () => {
  useChatDashboard();
  return (
    <>
      <Title typeTitle="h1"> Chat dashboard </Title>
      <div className="grid grid-cols-1 sm:grid-cols-6">
        <SideBar />
        <Chat />
      </div>
    </>
  );
};

export default ChatDashboard;
