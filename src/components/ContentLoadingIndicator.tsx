
import { Loader2 } from 'lucide-react';

const ContentLoadingIndicator = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <Loader2 className="h-10 w-10 animate-spin text-brand-600 mb-4" />
      <p className="text-gray-500">Loading content...</p>
    </div>
  );
};

export default ContentLoadingIndicator;
