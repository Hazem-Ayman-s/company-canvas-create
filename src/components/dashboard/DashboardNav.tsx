
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Home,
  Layout,
  FileText,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const DashboardNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { 
      icon: Layout, 
      label: 'Content', 
      children: [
        { label: 'Hero Section', path: '/dashboard/content/hero' },
        { label: 'About Us', path: '/dashboard/content/about' },
        { label: 'Projects', path: '/dashboard/content/projects' },
        { label: 'Contact', path: '/dashboard/content/contact' },
      ]
    },
    { icon: FileText, label: 'Pages', path: '/dashboard/pages' },
    { icon: Mail, label: 'Messages', path: '/dashboard/messages' },
  ];

  const handleLogout = () => {
    // In a real app, you would handle logout here
    navigate('/');
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`bg-sidebar fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-xl text-sidebar-foreground">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item, index) => (
                item.children ? (
                  <li key={index}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        >
                          <span className="flex items-center">
                            <item.icon className="mr-2 h-5 w-5" />
                            {item.label}
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="ml-6 mt-1 space-y-1">
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <Link
                                to={child.path}
                                className="block py-2 px-3 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-md"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
                ) : (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center py-2 px-3 text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardNav;
