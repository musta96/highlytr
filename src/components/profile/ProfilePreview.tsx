
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Calendar, MapPin, User2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ProfilePreviewProps {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | null;
  placeOfBirth: string;
  primarySport: string;
  primaryPosition: string;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({ 
  firstName, 
  lastName, 
  dateOfBirth, 
  placeOfBirth,
  primarySport,
  primaryPosition
}) => {
  const initials = firstName && lastName 
    ? `${firstName.charAt(0)}${lastName.charAt(0)}` 
    : '?';
  
  const age = dateOfBirth 
    ? Math.floor((new Date().getTime() - new Date(dateOfBirth).getTime()) / 31536000000)
    : null;

  return (
    <Card className="overflow-hidden border-2 border-primary/10 shadow-lg transition-all hover:shadow-primary/10 animate-scale-in">
      <div className="h-20 bg-gradient-to-r from-primary/40 to-secondary/40"></div>
      <CardContent className="pt-0 relative">
        <div className="flex justify-center -mt-10">
          <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
        
        <div className="mt-4 text-center space-y-1">
          <h3 className="font-bold text-xl">{firstName || '?'} {lastName || '?'}</h3>
          
          <div className="flex items-center justify-center gap-1 text-muted-foreground">
            <Award className="h-4 w-4" />
            <span className="text-sm">
              {primarySport || '?'}{primaryPosition ? ` - ${primaryPosition}` : ''}
            </span>
          </div>
          
          {(age || placeOfBirth) && (
            <div className="flex items-center justify-center gap-2 mt-2 text-sm">
              {age && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{age} years old</span>
                </div>
              )}
              
              {placeOfBirth && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{placeOfBirth}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-6 px-2 py-3 bg-muted/50 rounded-md">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Profile Preview</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;
