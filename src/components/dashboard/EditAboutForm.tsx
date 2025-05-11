
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

const EditAboutForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.about.title,
    description: content.about.description,
    vision: content.about.vision,
    values: [...content.about.values],
  });
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('about', formData);
    toast({
      title: "About section updated!",
      description: "The changes have been saved successfully.",
    });
  };
  
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
        
        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
    </Card>
  );
};

export default EditAboutForm;
