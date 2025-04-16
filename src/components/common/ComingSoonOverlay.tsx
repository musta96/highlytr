
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComingSoonOverlayProps {
  title?: string;
  description?: string;
  onPreview?: () => void;
  showPreviewButton?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const ComingSoonOverlay: React.FC<ComingSoonOverlayProps> = ({
  title = 'Coming Soon!',
  description = 'We\'re working on bringing you this feature. Stay tuned!',
  onPreview,
  showPreviewButton = true,
  icon = <CalendarClock className="h-8 w-8" />,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 z-10 bg-soft-purple/10 flex flex-col items-center justify-center text-center rounded-xl ${className}`}>
      <div className="inline-flex items-center justify-center p-3 bg-highlyt-blue/20 text-highlyt-blue rounded-full mb-4">
        {icon}
      </div>
      
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-dark-charcoal">
        {title}
      </h3>
      
      <p className="text-lg text-gray-600 max-w-md mb-6 px-4">
        {description}
      </p>
      
      {showPreviewButton && onPreview && (
        <Button 
          variant="outline" 
          onClick={onPreview}
          className="mb-4"
        >
          Preview Feature
        </Button>
      )}
    </div>
  );
};

export default ComingSoonOverlay;
