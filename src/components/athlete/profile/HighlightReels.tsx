
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Youtube } from 'lucide-react';

interface HighlightReelsProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const HighlightReels = ({ profile, isEditing }: HighlightReelsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Highlight Reels</span>
          {isEditing && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
              <Button variant="outline" size="sm">
                <Youtube className="h-4 w-4 mr-2" />
                Link YouTube
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.highlights.map((highlight: any) => (
            <div key={highlight.id} className="group relative rounded-lg overflow-hidden">
              <img 
                src={highlight.thumbnail} 
                alt={highlight.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white font-medium">{highlight.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <Button variant="default" size="sm">
                    Watch
                  </Button>
                  {isEditing && (
                    <Button variant="destructive" size="sm">
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightReels;
