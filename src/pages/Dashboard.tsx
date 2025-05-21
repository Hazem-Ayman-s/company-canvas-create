
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { supabase } from '@/integrations/supabase/client';
import { Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .select('id')
          .eq('read', false);
          
        if (error) {
          throw error;
        }
        
        setUnreadCount(data?.length || 0);
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchUnreadMessages();
    }
  }, [isAuthenticated]);

  // Don't render the dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <div className="lg:pl-64">
        <div className="p-6 md:p-10">
          <header className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to your content management dashboard.</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium mb-2">Edit Content</h2>
              <p className="text-gray-600 mb-4">Update your website content in real-time.</p>
              <ul className="space-y-2 text-sm">
                <li className="text-brand-600 hover:underline">
                  <a href="/dashboard/content/hero">Edit Hero Section</a>
                </li>
                <li className="text-brand-600 hover:underline">
                  <a href="/dashboard/content/about">Edit About Section</a>
                </li>
                <li className="text-brand-600 hover:underline">
                  <a href="/dashboard/content/projects">Edit Projects</a>
                </li>
                <li className="text-brand-600 hover:underline">
                  <a href="/dashboard/content/contact">Edit Contact Information</a>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium mb-2">Recent Updates</h2>
              <p className="text-gray-600 mb-4">View your recent content changes.</p>
              <div className="space-y-4 text-sm">
                <div className="pb-2 border-b border-gray-100">
                  <p className="text-gray-900">Hero section updated</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
                <div className="pb-2 border-b border-gray-100">
                  <p className="text-gray-900">New project added</p>
                  <p className="text-gray-500 text-xs">Yesterday</p>
                </div>
                <div className="pb-2 border-b border-gray-100">
                  <p className="text-gray-900">Contact info changed</p>
                  <p className="text-gray-500 text-xs">3 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-medium mb-2">Quick Links</h2>
              <p className="text-gray-600 mb-4">Useful shortcuts to help manage your site.</p>
              <ul className="space-y-2 text-sm">
                <li className="text-brand-600 hover:underline">
                  <a href="/" target="_blank" rel="noopener noreferrer">View Website</a>
                </li>
                <li className="text-brand-600 hover:underline">
                  <a href="/dashboard/pages">Manage Pages</a>
                </li>
                <li className="text-brand-600 hover:underline flex items-center gap-2">
                  <a href="/dashboard/messages">Check Messages</a>
                  {!isLoading && unreadCount > 0 && (
                    <Badge variant="destructive" className="px-2 py-0.5 text-xs">
                      <Mail className="h-3 w-3 mr-1" />
                      {unreadCount} new
                    </Badge>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
