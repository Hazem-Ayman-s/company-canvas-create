
import DashboardNav from '@/components/dashboard/DashboardNav';
import EditAboutForm from '@/components/dashboard/EditAboutForm';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutEdit = () => {
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
            <h1 className="text-2xl font-bold mb-2">Edit About Section</h1>
            <p className="text-gray-600">Update the About Us section content of your landing page.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EditAboutForm />
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Share your company's story and mission</li>
                  <li>• Highlight what makes your company unique</li>
                  <li>• Keep your values clear and memorable</li>
                  <li>• Use simple language that resonates with your audience</li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-sm mb-2">Preview</h4>
                  <p className="text-sm text-gray-500 mb-4">See how your about section looks on your site:</p>
                  <Link to="/#about" target="_blank" className="text-brand-600 text-sm hover:underline">
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

export default AboutEdit;
