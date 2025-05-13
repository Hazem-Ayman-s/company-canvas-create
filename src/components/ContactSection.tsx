
import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const { content } = useContent();
  const { title, subtitle, address, email, phone } = content.contact;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save message to Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting message:', error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-gray-900">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <a href={`mailto:${email}`} className="text-brand-600 hover:underline">{email}</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-brand-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Phone</h4>
                    <a href={`tel:${phone}`} className="text-brand-600 hover:underline">{phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-600 hover:bg-brand-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
