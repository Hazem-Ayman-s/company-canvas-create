
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, MousePointer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Hidden admin access through secret key combination
  const handleLogoClick = (e: React.MouseEvent) => {
    // Only trigger if Alt + Shift + A is pressed while clicking
    if (e.altKey && e.shiftKey) {
      e.preventDefault();
      window.location.href = '/login';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2 hover-glow"
          onClick={handleLogoClick} // Adding the secret click handler
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center hover-scale">
            <span className="text-primary-foreground font-bold text-xl">A</span>
          </div>
          <span className="font-bold text-xl text-foreground">Acme Inc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            <li>
              <a href="#about" className="text-foreground hover-underline hover-glow font-medium">
                About Us
              </a>
            </li>
            <li>
              <a href="#projects" className="text-foreground hover-underline hover-glow font-medium">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="text-foreground hover-underline hover-glow font-medium">
                Contact
              </a>
            </li>
          </ul>
          
          {/* Hidden admin tooltip - only visible on hover */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="w-8 h-8 flex items-center justify-center cursor-default">
                <MousePointer className="w-5 h-5 text-foreground/30 hover:text-foreground/70 transition-colors" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 glass-morphism">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Admin Access</h4>
                <p className="text-xs text-muted-foreground">
                  Hold Alt + Shift while clicking the logo to access admin login.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
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
        <div className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-sm z-50 md:hidden">
          <div className="container mx-auto px-4 py-8">
            <ul className="flex flex-col space-y-6">
              <li>
                <a 
                  href="#about" 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
