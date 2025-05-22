
import { useState, useEffect } from 'react';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Eye, Trash2, Mail, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import ContentLoadingIndicator from '@/components/ContentLoadingIndicator';

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
};

const MessagesManagement = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());
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
      
      // Update local state
      setMessages(prev => 
        prev.map(msg => 
          msg.id === id ? { ...msg, read: !currentReadStatus } : msg
        )
      );
      
      setUnreadCount(prev => currentReadStatus ? prev + 1 : Math.max(0, prev - 1));
      
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
      
      // Update state to remove the deleted message
      const deletedMessage = messages.find(msg => msg.id === id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      
      if (deletedMessage && !deletedMessage.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <div className="lg:pl-64">
        <div className="p-6 md:p-10">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Messages</h1>
              <div className="flex items-center">
                {unreadCount > 0 && (
                  <span className="bg-red-100 text-red-800 text-xs rounded-full px-2 py-1 mr-2">
                    {unreadCount} Unread
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600">Manage messages from your contact form.</p>
          </header>
          
          <Card className="overflow-hidden">
            {loading ? (
              <ContentLoadingIndicator message="Loading messages..." className="py-10" />
            ) : messages.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No messages found</div>
            ) : (
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
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
