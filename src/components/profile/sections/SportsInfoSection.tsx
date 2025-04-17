
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SportsInfoSectionProps {
  form: UseFormReturn<any>;
}

const SportsInfoSection: React.FC<SportsInfoSectionProps> = ({ form }) => {
  const [primarySport, setPrimarySport] = useState('');
  const [secondarySport, setSecondarySport] = useState('');

  const sportPositions = {
    soccer: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Striker', 'Winger', 'Other'],
    basketball: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center', 'Other'],
    baseball: ['Pitcher', 'Catcher', 'First Base', 'Second Base', 'Third Base', 'Shortstop', 'Outfield', 'Other'],
    football: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End', 'Offensive Line', 'Defensive Line', 'Linebacker', 'Cornerback', 'Safety', 'Kicker', 'Punter', 'Other'],
    volleyball: ['Outside Hitter', 'Opposite', 'Middle Blocker', 'Setter', 'Libero', 'Other'],
    tennis: ['Singles Player', 'Doubles Specialist', 'Other'],
    swimming: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Individual Medley', 'Other'],
    track: ['Sprinter', 'Middle Distance', 'Long Distance', 'Hurdler', 'Jumper', 'Thrower', 'Other'],
    other: ['Not Specified'],
  };

  const sportsList = [
    'Soccer',
    'Basketball',
    'Baseball',
    'Football',
    'Volleyball', 
    'Tennis',
    'Swimming',
    'Track',
    'Gymnastics',
    'Hockey',
    'Rugby',
    'Lacrosse',
    'Golf',
    'Wrestling',
    'Other'
  ];

  const getSportKey = (sportName: string) => {
    return sportName.toLowerCase();
  };

  const getPositionsForSport = (sport: string) => {
    const sportKey = getSportKey(sport);
    return sportPositions[sportKey as keyof typeof sportPositions] || sportPositions.other;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Sport Information</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="primarySport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Sport</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setPrimarySport(value);
                    // Reset position when sport changes
                    form.setValue('primaryPosition', '');
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your main sport" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sportsList.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primaryPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Position</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!primarySport}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={primarySport ? "Select position" : "Select sport first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {primarySport && getPositionsForSport(primarySport).map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="secondarySport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Sport (Optional)</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSecondarySport(value);
                    // Reset position when sport changes
                    form.setValue('secondaryPosition', '');
                  }}
                  value={field.value || 'none'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select another sport (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {sportsList.map((sport) => (
                      <SelectItem key={sport} value={sport}>
                        {sport}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secondaryPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secondary Position (Optional)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || 'none'}
                  disabled={!secondarySport || secondarySport === 'none'}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={secondarySport && secondarySport !== 'none' ? "Select position" : "Select sport first"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {secondarySport && secondarySport !== 'none' && getPositionsForSport(secondarySport).map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SportsInfoSection;
