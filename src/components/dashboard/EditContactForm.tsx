
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const EditContactForm = () => {
  const { content, updateContent, loading } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.contact.title,
    subtitle: content.contact.subtitle,
    address: content.contact.address,
    email: content.contact.email,
    phone: content.contact.phone,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local form state when content is loaded/changed
  useEffect(() => {
    if (!loading) {
      setFormData({
        title: content.contact.title,
        subtitle: content.contact.subtitle,
        address: content.contact.address,
        email: content.contact.email,
        phone: content.contact.phone,
      });
    }
  }, [content.contact, loading]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateContent('contact', formData);
      toast({
        title: "Contact section updated!",
        description: "The changes have been saved to the database.",
      });
    } catch (error) {
      console.error('Error updating contact section:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading content...</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Section Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Office Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : 'Save Changes'}
        </Button>
      </form>
    </Card>
  );
};

export default EditContactForm;
