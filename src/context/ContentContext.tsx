
import React, { createContext, useContext, useState, useEffect } from 'react';

// Default content
const defaultContent = {
  hero: {
    title: "Innovate. Transform. Succeed.",
    subtitle: "We build cutting-edge solutions that help businesses grow and thrive in the digital age.",
    ctaText: "Get Started",
  },
  about: {
    title: "About Acme Inc",
    description: "Founded in 2010, Acme Inc has been at the forefront of technological innovation for over a decade. We specialize in creating custom software solutions that address complex business challenges and drive meaningful results for our clients.",
    vision: "Our vision is to empower businesses through technology, making digital transformation accessible and impactful for organizations of all sizes.",
    values: [
      { title: "Innovation", description: "We constantly explore new ideas and technologies to deliver cutting-edge solutions." },
      { title: "Quality", description: "We are committed to excellence in everything we do, from code to customer service." },
      { title: "Integrity", description: "We operate with transparency and honesty in all our business relationships." },
      { title: "Collaboration", description: "We believe in the power of teamwork and partnership with our clients." }
    ]
  },
  projects: {
    title: "Our Projects",
    subtitle: "Discover our innovative solutions that have helped businesses transform and grow.",
    items: [
      {
        title: "E-Commerce Platform",
        description: "A comprehensive online shopping solution with advanced inventory management and payment processing capabilities.",
        image: "/placeholder.svg",
        category: "Web Development"
      },
      {
        title: "Financial Analytics Dashboard",
        description: "Real-time data visualization tool for financial institutions to monitor market trends and make informed decisions.",
        image: "/placeholder.svg",
        category: "Data Analytics"
      },
      {
        title: "Healthcare Management System",
        description: "Integrated solution for hospitals to streamline patient records, appointments, and billing processes.",
        image: "/placeholder.svg",
        category: "Healthcare IT"
      },
      {
        title: "Smart Home IoT Application",
        description: "Mobile app to control and monitor connected home devices with advanced automation features.",
        image: "/placeholder.svg",
        category: "IoT Solutions"
      }
    ]
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have a project in mind? We'd love to hear from you.",
    address: "123 Business Avenue, Suite 200, San Francisco, CA 94103",
    email: "info@acmeinc.com",
    phone: "(555) 123-4567"
  }
};

// Create the content context
interface ContentContextType {
  content: typeof defaultContent;
  updateContent: (section: string, data: any) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState(defaultContent);

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('siteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (e) {
        console.error('Failed to parse saved content:', e);
      }
    }
  }, []);

  // Update content and save to localStorage
  const updateContent = (section: string, data: any) => {
    setContent(prev => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          ...data
        }
      };
      
      // Save to localStorage
      localStorage.setItem('siteContent', JSON.stringify(updated));
      
      return updated;
    });
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook for using the content context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
