
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

const EditProjectsForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.projects.title,
    subtitle: content.projects.subtitle,
    items: [...content.projects.items],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProjectChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], [field]: value };
      return { ...prev, items: updatedItems };
    });
  };
  
  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { 
        title: '', 
        description: '', 
        image: '/placeholder.svg', 
        category: '' 
      }]
    }));
  };
  
  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('projects', formData);
    toast({
      title: "Projects section updated!",
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
          <Label htmlFor="subtitle">Section Subtitle</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Projects</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={addProject}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Project
            </Button>
          </div>
          
          {formData.items.map((project, index) => (
            <div key={index} className="p-4 border rounded-md space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Project {index + 1}</h4>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`project-title-${index}`}>Title</Label>
                <Input
                  id={`project-title-${index}`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`project-category-${index}`}>Category</Label>
                <Input
                  id={`project-category-${index}`}
                  value={project.category}
                  onChange={(e) => handleProjectChange(index, 'category', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`project-description-${index}`}>Description</Label>
                <Textarea
                  id={`project-description-${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`project-image-${index}`}>Image URL</Label>
                <Input
                  id={`project-image-${index}`}
                  value={project.image}
                  onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
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

export default EditProjectsForm;
