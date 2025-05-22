
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Message } from '@/components/dashboard/messages/MessageList';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      console.log('Fetched messages:', data);
      setMessages(data || []);
      setUnreadCount(data?.filter(msg => !msg.read).length || 0);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        variant: "destructive",
        title: "Error loading messages",
        description: "There was a problem loading your messages.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const updateMessagesState = (updatedMessages: Message[], newUnreadCount: number) => {
    setMessages(updatedMessages);
    setUnreadCount(newUnreadCount);
  };

  return {
    messages,
    loading,
    unreadCount,
    updateMessagesState
  };
};
