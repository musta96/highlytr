
import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { optimizeImage } from '@/utils/imageOptimizer';

interface LazyVideoProps {
  videoId?: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  aspectRatio?: number;
  className?: string;
}

const LazyVideo = ({ 
  videoId, 
  videoUrl, 
  thumbnailUrl, 
  title, 
  aspectRatio = 16/9,
  className = '' 
}: LazyVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  // Extract YouTube video ID if it's a YouTube URL
  const getYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
  };
  
  const ytVideoId = isYouTube ? videoId || getYoutubeId(videoUrl) : '';
  const optimizedThumbnail = optimizeImage(thumbnailUrl);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  
  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}
    >
      <AspectRatio ratio={aspectRatio}>
        {isPlaying && isYouTube ? (
          <iframe
            src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : isPlaying && !isYouTube ? (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="absolute inset-0 w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <>
            <img 
              src={isLoaded ? optimizedThumbnail : ''}
              data-src={optimizedThumbnail}
              alt={title}
              className={`w-full h-full object-cover transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0 lazy-load'}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group cursor-pointer" onClick={handlePlayClick}>
              <div className="p-3 bg-highlyt-blue rounded-full text-white transition transform group-hover:scale-110">
                <Play className="w-8 h-8 fill-current" />
              </div>
              <div className="absolute bottom-4 left-4 text-white text-sm font-medium max-w-[80%] truncate">
                {title}
              </div>
            </div>
          </>
        )}
      </AspectRatio>
    </div>
  );
};

export default LazyVideo;
