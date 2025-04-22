
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatsTabsProps } from '../types';
import { StatTooltip } from '../components/StatTooltip';

export const StatsTabs = ({ 
  stats, 
  isEditing,
  onUpdate,
  onAddStat
}: StatsTabsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  
  const groupedStats: Record<string, Record<string, any>> = {
    sport: {},
    physical: {},
    academic: {}
  };
  
  // Group stats by category
  Object.entries(stats).forEach(([key, stat]) => {
    const category = stat.category || 'sport';
    if (!groupedStats[category]) {
      groupedStats[category] = {};
    }
    groupedStats[category][key] = stat;
  });

  return (
    <Tabs defaultValue="all" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Stats</TabsTrigger>
          <TabsTrigger value="sport">Sport</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>
        
        {isEditing && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs flex items-center"
            onClick={onAddStat}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Stat
          </Button>
        )}
      </div>

      <TabsContent value="all">
        {Object.keys(stats).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(stats).map(([key, stat]) => (
              <StatTooltip
                key={key}
                statKey={key}
                stat={stat}
                isEditing={isEditing}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">No Statistics Available</p>
            <p className="text-sm text-gray-500 mt-1 mb-4">
              Add performance statistics to showcase your abilities
            </p>
          </div>
        )}
      </TabsContent>

      {Object.entries(groupedStats).map(([category, categoryStats]) => (
        <TabsContent key={category} value={category}>
          {Object.keys(categoryStats).length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {Object.entries(categoryStats).map(([key, stat]) => (
                <StatTooltip
                  key={key}
                  statKey={key}
                  stat={stat}
                  isEditing={isEditing}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 font-medium">No {category} Statistics</p>
              <p className="text-sm text-gray-500 mt-1">
                Add {category} statistics to showcase your abilities
              </p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
