
import DashboardNav from '@/components/dashboard/DashboardNav';
import EditContactForm from '@/components/dashboard/EditContactForm';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactEdit = () => {
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
            <h1 className="text-2xl font-bold mb-2">Edit Contact Section</h1>
            <p className="text-gray-600">Update your contact information and form settings.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EditContactForm />
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Keep your contact information up to date</li>
                  <li>• Use a friendly and inviting section title</li>
                  <li>• Make sure your email address is professional</li>
                  <li>• Include your business hours if applicable</li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-sm mb-2">Preview</h4>
                  <p className="text-sm text-gray-500 mb-4">See how your contact section looks on your site:</p>
                  <Link to="/#contact" target="_blank" className="text-brand-600 text-sm hover:underline">
                    View Live Section
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;
