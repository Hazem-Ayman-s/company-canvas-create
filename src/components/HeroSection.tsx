
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { content } = useContent();
  const { title, subtitle, ctaText } = content.hero;

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-up">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {subtitle}
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <Button size="lg" className="bg-white text-brand-600 hover:bg-white/90 text-lg px-8 py-6">
              {ctaText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
