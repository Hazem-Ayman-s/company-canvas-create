
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const EditHeroForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.hero.title,
    subtitle: content.hero.subtitle,
    ctaText: content.hero.ctaText,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('hero', formData);
    toast({
      title: "Hero section updated!",
      description: "The changes have been saved successfully.",
    });
  };
  
  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Hero Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Hero Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ctaText">CTA Button Text</Label>
          <Input
            id="ctaText"
            name="ctaText"
            value={formData.ctaText}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Card>
  );
};

export default EditHeroForm;
