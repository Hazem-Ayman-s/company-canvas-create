
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Acme Inc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li><a href="#about" className="text-gray-700 hover:text-brand-600 font-medium">About Us</a></li>
            <li><a href="#projects" className="text-gray-700 hover:text-brand-600 font-medium">Projects</a></li>
            <li><a href="#contact" className="text-gray-700 hover:text-brand-600 font-medium">Contact</a></li>
          </ul>
          <Link to="/dashboard">
            <Button variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-50">
              Admin Login
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-50 md:hidden">
          <div className="container mx-auto px-4 py-8">
            <ul className="flex flex-col space-y-6">
              <li>
                <a 
                  href="#about" 
                  className="block text-lg font-medium text-gray-900 hover:text-brand-600"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="block text-lg font-medium text-gray-900 hover:text-brand-600"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="block text-lg font-medium text-gray-900 hover:text-brand-600"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="block text-lg font-medium text-brand-600"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
