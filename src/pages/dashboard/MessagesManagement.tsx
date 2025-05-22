
import { useEffect } from 'react';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { Card } from '@/components/ui/card';
import MessageHeader from '@/components/dashboard/messages/MessageHeader';
import MessageList from '@/components/dashboard/messages/MessageList';
import { useMessages } from '@/hooks/useMessages';
import { supabase } from '@/integrations/supabase/client';
import ContentLoadingIndicator from '@/components/ContentLoadingIndicator';

const MessagesManagement = () => {
  const { messages, loading, unreadCount, updateMessagesState } = useMessages();
  
  // Log to help with debugging
  useEffect(() => {
    console.log('Current messages in state:', messages);
    
    // Let's also check if we can directly query the database
    const checkMessages = async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*');
      
      if (error) {
        console.error('Error checking messages:', error);
      } else {
        console.log('Direct database query results:', data);
      }
    };
    
    checkMessages();
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <div className="lg:pl-64">
        <div className="p-6 md:p-10">
          <MessageHeader unreadCount={unreadCount} />
          
          <Card className="overflow-hidden">
            {loading ? (
              <ContentLoadingIndicator message="Loading messages..." className="py-10" />
            ) : (
              <MessageList 
                messages={messages}
                loading={loading}
                onMessageUpdate={updateMessagesState}
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
