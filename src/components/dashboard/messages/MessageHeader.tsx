
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface MessageHeaderProps {
  unreadCount: number;
}

const MessageHeader = ({ unreadCount }: MessageHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default MessageHeader;
