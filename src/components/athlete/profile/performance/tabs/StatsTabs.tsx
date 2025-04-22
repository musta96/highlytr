
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsGrid } from '../components/StatsGrid';
import { AlertCircle } from 'lucide-react';
import { StatsTabsProps } from '../types';

export const StatsTabs = ({ 
  stats, 
  isEditing, 
  onUpdate, 
  onAddStat 
}: StatsTabsProps) => {
  const [category, setCategory] = useState('sport');
  
  // Filter stats by category
  const filterStatsByCategory = (cat: string) => {
    return Object.entries(stats)
      .filter(([_, stat]) => stat.category === cat || (!stat.category && cat === 'sport'))
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  };

  const sportStats = filterStatsByCategory('sport');
  const physicalStats = filterStatsByCategory('physical');
  const academicStats = filterStatsByCategory('academic');

  const renderEmpty = () => (
    <div className="text-center py-8 border-2 border-dashed rounded-lg">
      <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
      <p className="text-gray-600 font-medium">No Statistics Available</p>
      <p className="text-sm text-gray-500 mt-1 mb-4">
        Add your performance statistics to showcase your abilities
      </p>
      {isEditing && (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={onAddStat}
        >
          <Plus className="h-4 w-4" /> Add Your First Stat
        </Button>
      )}
    </div>
  );

  const isEmpty = Object.keys(stats).length === 0;

  return (
    <Tabs value={category} onValueChange={setCategory}>
      <TabsList className="grid grid-cols-3 w-full mb-4">
        <TabsTrigger value="sport">Sports</TabsTrigger>
        <TabsTrigger value="physical">Physical</TabsTrigger>
        <TabsTrigger value="academic">Academic</TabsTrigger>
      </TabsList>
      
      {isEmpty ? (
        renderEmpty()
      ) : (
        <>
          <TabsContent value="sport">
            {Object.keys(sportStats).length > 0 ? (
              <StatsGrid 
                stats={sportStats} 
                isEditing={isEditing} 
                onUpdate={onUpdate} 
              />
            ) : renderEmpty()}
          </TabsContent>
          
          <TabsContent value="physical">
            {Object.keys(physicalStats).length > 0 ? (
              <StatsGrid 
                stats={physicalStats} 
                isEditing={isEditing} 
                onUpdate={onUpdate} 
              />
            ) : renderEmpty()}
          </TabsContent>
          
          <TabsContent value="academic">
            {Object.keys(academicStats).length > 0 ? (
              <StatsGrid 
                stats={academicStats} 
                isEditing={isEditing} 
                onUpdate={onUpdate} 
              />
            ) : renderEmpty()}
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};
