
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, MapPin, Flag } from 'lucide-react';
import { format } from 'date-fns';

interface ProfilePreviewProps {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
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
  const initials = `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  const fullName = `${firstName || ''} ${lastName || ''}`.trim();
  
  // Generate a gradient based on the name to make the avatar unique
  const getGradientClass = () => {
    const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const gradients = [
      "bg-gradient-to-br from-blue-400 to-indigo-500",
      "bg-gradient-to-br from-green-400 to-emerald-500",
      "bg-gradient-to-br from-amber-400 to-orange-500",
      "bg-gradient-to-br from-rose-400 to-pink-500",
      "bg-gradient-to-br from-purple-400 to-violet-500",
      "bg-gradient-to-br from-cyan-400 to-sky-500",
    ];
    return gradients[hash % gradients.length];
  };

  return (
    <Card className="border overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-blue-100 to-indigo-100"></div>
      <CardHeader className="-mt-12 flex flex-col items-center pb-4">
        <Avatar className={`h-20 w-20 border-4 border-white shadow-md ${getGradientClass()}`}>
          <AvatarFallback className="text-xl font-semibold text-white">
            {initials || ''}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-2 text-center text-lg font-semibold">
          {fullName || 'Your Name'}
        </CardTitle>
        {primarySport && primaryPosition && (
          <div className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-1">
            {`${primarySport} • ${primaryPosition}`}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3 pt-0">
        {dateOfBirth && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Born {format(dateOfBirth, 'MMMM d, yyyy')}</span>
          </div>
        )}
        
        {placeOfBirth && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>From {placeOfBirth}</span>
          </div>
        )}
        
        <hr className="my-2 border-dashed border-muted" />
        
        <div className="flex justify-between text-xs text-muted-foreground pt-1">
          <span>Profile Preview</span>
          <span>Sample Data</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePreview;
