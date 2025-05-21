
import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Trash2, Plus, Loader2 } from 'lucide-react';

const EditProjectsForm = () => {
  const { content, updateContent, loading } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.projects.title,
    subtitle: content.projects.subtitle,
    items: [...content.projects.items],
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local form state when content is loaded/changed
  useEffect(() => {
    if (!loading) {
      setFormData({
        title: content.projects.title,
        subtitle: content.projects.subtitle,
        items: [...content.projects.items],
      });
    }
  }, [content.projects, loading]);
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateContent('projects', formData);
      toast({
        title: "Projects section updated!",
        description: "The changes have been saved to the database.",
      });
    } catch (error) {
      console.error('Error updating projects section:', error);
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

export default EditProjectsForm;
