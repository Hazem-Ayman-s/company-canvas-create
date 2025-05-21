
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2, Loader2 } from 'lucide-react';

const EditAboutForm = () => {
  const { content, updateContent, loading } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.about.title,
    description: content.about.description,
    vision: content.about.vision,
    values: [...content.about.values],
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local form state when content is loaded/changed
  useEffect(() => {
    if (!loading) {
      setFormData({
        title: content.about.title,
        description: content.about.description,
        vision: content.about.vision,
        values: [...content.about.values],
      });
    }
  }, [content.about, loading]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleValueChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedValues = [...prev.values];
      updatedValues[index] = { ...updatedValues[index], [field]: value };
      return { ...prev, values: updatedValues };
    });
  };
  
  const addValue = () => {
    setFormData(prev => ({
      ...prev,
      values: [...prev.values, { title: '', description: '' }]
    }));
  };
  
  const removeValue = (index: number) => {
    setFormData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateContent('about', formData);
      toast({
        title: "About section updated!",
        description: "The changes have been saved to the database.",
      });
    } catch (error) {
      console.error('Error updating about section:', error);
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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vision">Vision Statement</Label>
          <Textarea
            id="vision"
            name="vision"
            value={formData.vision}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Company Values</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addValue}
            >
              Add Value
            </Button>
          </div>
          
          {formData.values.map((value, index) => (
            <div key={index} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Value {index + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeValue(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`value-title-${index}`}>Title</Label>
                <Input
                  id={`value-title-${index}`}
                  value={value.title}
                  onChange={(e) => handleValueChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`value-desc-${index}`}>Description</Label>
                <Textarea
                  id={`value-desc-${index}`}
                  value={value.description}
                  onChange={(e) => handleValueChange(index, 'description', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
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

export default EditAboutForm;
