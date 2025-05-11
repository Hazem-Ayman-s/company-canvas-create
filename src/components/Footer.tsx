
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Acme Inc</span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              We create innovative solutions to transform how businesses operate and engage with their customers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-600" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-600" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-600 hover:text-brand-600">About Us</a></li>
              <li><a href="#projects" className="text-gray-600 hover:text-brand-600">Projects</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-brand-600">Contact Us</a></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-brand-600">Admin</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">123 Business Avenue</p>
              <p className="mb-2">Suite 200</p>
              <p className="mb-2">San Francisco, CA 94103</p>
              <p className="mb-2">Email: info@acmeinc.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            &copy; {currentYear} Acme Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
