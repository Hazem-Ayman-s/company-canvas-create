
import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, Trash2, Mail, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ContentLoadingIndicator from '@/components/ContentLoadingIndicator';

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  onMessageUpdate: (updatedMessages: Message[], newUnreadCount: number) => void;
}

const MessageList = ({ messages, loading, onMessageUpdate }: MessageListProps) => {
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleReadStatus = async (id: string, currentReadStatus: boolean) => {
    setSavingIds(prev => {
      const updated = new Set(prev);
      updated.add(id);
      return updated;
    });

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: !currentReadStatus })
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state via parent
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, read: !currentReadStatus } : msg
      );
      
      const newUnreadCount = updatedMessages.filter(msg => !msg.read).length;
      
      onMessageUpdate(updatedMessages, newUnreadCount);
      
      toast({
        title: currentReadStatus ? "Message marked as unread" : "Message marked as read",
        description: `The message has been marked as ${currentReadStatus ? 'unread' : 'read'}.`,
      });
    } catch (error) {
      console.error('Error updating message:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was a problem updating the message status.",
      });
    } finally {
      setSavingIds(prev => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update state through parent component
      const deletedMessage = messages.find(msg => msg.id === id);
      const updatedMessages = messages.filter(msg => msg.id !== id);
      
      const newUnreadCount = deletedMessage && !deletedMessage.read
        ? updatedMessages.filter(msg => !msg.read).length
        : updatedMessages.filter(msg => !msg.read).length;
      
      onMessageUpdate(updatedMessages, newUnreadCount);
      
      toast({
        title: "Message deleted",
        description: "The message has been deleted.",
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: "There was a problem deleting the message.",
      });
    }
  };

  if (loading) {
    return <ContentLoadingIndicator message="Loading messages..." className="py-10" />;
  }

  if (!messages || messages.length === 0) {
    return <div className="py-8 text-center text-gray-500">No messages found</div>;
  }

  console.log('Rendering messages:', messages);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Read</TableHead>
          <TableHead className="w-[180px]">Name</TableHead>
          <TableHead>Message</TableHead>
          <TableHead className="w-[150px]">Date</TableHead>
          <TableHead className="w-[120px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((message) => (
          <TableRow key={message.id} className={!message.read ? "bg-blue-50" : ""}>
            <TableCell>
              <Checkbox 
                checked={message.read}
                onCheckedChange={() => toggleReadStatus(message.id, message.read)}
                disabled={savingIds.has(message.id)}
              />
            </TableCell>
            <TableCell className="font-medium">
              <div>
                {!message.read && (
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                )}
                {message.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">{message.email}</div>
            </TableCell>
            <TableCell className="max-w-sm truncate">
              {message.message}
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {formatDate(message.created_at)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                {savingIds.has(message.id) ? (
                  <Button variant="ghost" size="icon" disabled>
                    <Check className="h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    title={message.read ? "Mark as Unread" : "Mark as Read"}
                    onClick={() => toggleReadStatus(message.id, message.read)}
                  >
                    <Eye className={`h-4 w-4 ${message.read ? 'text-gray-400' : 'text-blue-500'}`} />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="Reply"
                  onClick={() => window.location.href = `mailto:${message.email}?subject=Re: Your Message&body=Hello ${message.name},%0D%0A%0D%0AThank you for your message:%0D%0A%0D%0A"${message.message}"%0D%0A%0D%0A`}
                >
                  <Mail className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="Delete"
                  onClick={() => deleteMessage(message.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MessageList;
