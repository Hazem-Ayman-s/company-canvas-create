
import DashboardNav from '@/components/dashboard/DashboardNav';
import { Card } from '@/components/ui/card';
import MessageHeader from '@/components/dashboard/messages/MessageHeader';
import MessageList from '@/components/dashboard/messages/MessageList';
import { useMessages } from '@/hooks/useMessages';

const MessagesManagement = () => {
  const { messages, loading, unreadCount, updateMessagesState } = useMessages();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <div className="lg:pl-64">
        <div className="p-6 md:p-10">
          <MessageHeader unreadCount={unreadCount} />
          
          <Card className="overflow-hidden">
            <MessageList 
              messages={messages}
              loading={loading}
              onMessageUpdate={updateMessagesState}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
