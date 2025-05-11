
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
import { ArrowLeft, Eye, Trash2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const messagesData = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    message: "I'm interested in your e-commerce solutions. Can you provide more information?",
    date: "2023-05-10T14:30:00",
    read: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    message: "We're looking for a partner to help with our website redesign project. What's your availability?",
    date: "2023-05-09T09:15:00",
    read: false
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@business.net",
    message: "Do you offer maintenance services for existing websites? Our site needs some updates.",
    date: "2023-05-08T16:45:00",
    read: false
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@startup.io",
    message: "I'd like to discuss a potential mobile app project. Please let me know when we can talk.",
    date: "2023-05-07T11:20:00",
    read: true
  },
  {
    id: 5,
    name: "James Taylor",
    email: "james@enterprise.org",
    message: "Can you provide a quote for a custom CRM system? We need something tailored to our industry.",
    date: "2023-05-06T13:10:00",
    read: true
  }
];

const MessagesManagement = () => {
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
                <span className="bg-red-100 text-red-800 text-xs rounded-full px-2 py-1 mr-2">
                  2 Unread
                </span>
              </div>
            </div>
            <p className="text-gray-600">Manage messages from your contact form.</p>
          </header>
          
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Name</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messagesData.map((message) => (
                  <TableRow key={message.id} className={!message.read ? "bg-blue-50" : ""}>
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
                      {formatDate(message.date)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reply">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Delete">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
