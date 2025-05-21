
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';

// Default content structure (for TypeScript typing)
interface ContentType {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  about: {
    title: string;
    description: string;
    vision: string;
    values: {
      title: string;
      description: string;
    }[];
  };
  projects: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      image: string;
      category: string;
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    email: string;
    phone: string;
  };
}

// Default content (used as fallback if database fetch fails)
const defaultContent: ContentType = {
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
    subtitle: "Have a project in mind? We love to hear from you.",
    address: "123 Business Avenue, Suite 200, San Francisco, CA 94103",
    email: "info@acmeinc.com",
    phone: "(555) 123-4567"
  }
};

// Create the content context
interface ContentContextType {
  content: ContentType;
  updateContent: (section: string, data: any) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Provider component
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch content from Supabase
  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('website_content')
        .select('section_name, content');
      
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        // Convert array of section objects to a single content object
        const contentFromDb: Partial<ContentType> = {};
        
        data.forEach((item) => {
          const sectionName = item.section_name as keyof ContentType;
          contentFromDb[sectionName] = item.content as any;
        });
        
        // Merge with default content to ensure all fields exist even if some sections are missing in DB
        setContent({
          ...defaultContent,
          ...contentFromDb
        });
      }
    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to load content from database. Using default content instead.");
      // Fall back to default content (already in state)
      toast({
        variant: "destructive",
        title: "Content loading error",
        description: "Failed to load content from database. Using default content instead."
      });
    } finally {
      setLoading(false);
    }
  };

  // Load content from Supabase on mount
  useEffect(() => {
    fetchContent();
  }, []);

  // Update content in Supabase
  const updateContent = async (section: string, data: any) => {
    try {
      // Update state first for immediate UI feedback
      setContent(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof ContentType],
          ...data
        }
      }));
      
      // Update database
      const { error } = await supabase
        .from('website_content')
        .update({ content: data, updated_at: new Date().toISOString() })
        .eq('section_name', section);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Content updated",
        description: `${section} section has been successfully updated.`
      });
    } catch (err: any) {
      console.error("Error updating content:", err);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message || "Failed to update content in the database."
      });
      
      // Refresh content to ensure UI consistency
      fetchContent();
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, loading, error }}>
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
