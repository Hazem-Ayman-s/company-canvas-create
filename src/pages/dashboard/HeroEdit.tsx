
import DashboardNav from '@/components/dashboard/DashboardNav';
import EditHeroForm from '@/components/dashboard/EditHeroForm';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroEdit = () => {
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
            <h1 className="text-2xl font-bold mb-2">Edit Hero Section</h1>
            <p className="text-gray-600">Update the main hero section content of your landing page.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EditHeroForm />
            </div>
            
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-medium mb-4">Tips</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li>• Keep your hero title concise and impactful</li>
                  <li>• The subtitle should explain your value proposition</li>
                  <li>• Use action-oriented text for your CTA button</li>
                  <li>• Make sure text is readable on all devices</li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-medium text-sm mb-2">Preview</h4>
                  <p className="text-sm text-gray-500 mb-4">See how your hero section looks on your site:</p>
                  <Link to="/" target="_blank" className="text-brand-600 text-sm hover:underline">
                    View Live Site
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

export default HeroEdit;
