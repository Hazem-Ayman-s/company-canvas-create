
import { useContent } from '@/context/ContentContext';
import { Card, CardContent } from '@/components/ui/card';
import ContentLoadingIndicator from './ContentLoadingIndicator';

const AboutSection = () => {
  const { content, loading } = useContent();
  
  if (loading) {
    return (
      <section id="about" className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <ContentLoadingIndicator />
        </div>
      </section>
    );
  }
  
  const { title, description, vision, values } = content.about;

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600 mb-8">{description}</p>
          <p className="text-lg text-gray-800 font-medium">{vision}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((value, index) => (
            <Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-brand-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
