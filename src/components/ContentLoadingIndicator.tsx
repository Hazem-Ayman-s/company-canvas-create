
import { Loader2 } from 'lucide-react';

interface ContentLoadingIndicatorProps {
  message?: string;
  className?: string;
}

const ContentLoadingIndicator = ({ 
  message = "Loading content...", 
  className = "min-h-[200px]"
}: ContentLoadingIndicatorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Loader2 className="h-10 w-10 animate-spin text-brand-600 mb-4" />
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default ContentLoadingIndicator;
