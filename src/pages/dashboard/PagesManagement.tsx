
import DashboardNav from '@/components/dashboard/DashboardNav';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PagesManagement = () => {
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
            <h1 className="text-2xl font-bold mb-2">Page Management</h1>
            <p className="text-gray-600">Manage additional pages for your website.</p>
          </header>
          
          <div className="mb-6">
            <Button className="bg-brand-600 hover:bg-brand-700">Add New Page</Button>
          </div>
          
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Home</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">Your main landing page</p>
              <div className="flex items-center mt-4 text-xs text-gray-500">
                <span className="bg-green-100 text-green-800 rounded-full px-2 py-1">Published</span>
                <span className="ml-4">Last updated: 2 days ago</span>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">About Us</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">Detailed information about your company</p>
              <div className="flex items-center mt-4 text-xs text-gray-500">
                <span className="bg-green-100 text-green-800 rounded-full px-2 py-1">Published</span>
                <span className="ml-4">Last updated: 1 week ago</span>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Privacy Policy</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">Your website's privacy policy</p>
              <div className="flex items-center mt-4 text-xs text-gray-500">
                <span className="bg-green-100 text-green-800 rounded-full px-2 py-1">Published</span>
                <span className="ml-4">Last updated: 3 months ago</span>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Terms of Service</h3>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              <p className="text-gray-600 mt-2 text-sm">Legal terms and conditions</p>
              <div className="flex items-center mt-4 text-xs text-gray-500">
                <span className="bg-amber-100 text-amber-800 rounded-full px-2 py-1">Draft</span>
                <span className="ml-4">Last updated: 2 months ago</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesManagement;
