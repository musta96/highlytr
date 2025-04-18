
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, GraduationCap, Activity } from 'lucide-react';
import { StatsCardHeader } from './stats/StatsCardHeader';
import { StatsCategoryContent } from './stats/StatsCategoryContent';
import { AddStatDialog } from './stats/AddStatDialog';
import { useStatsData } from './stats/useStatsData';

interface EnhancedStatsCardProps {
  className?: string;
}

const EnhancedStatsCard = ({ className }: EnhancedStatsCardProps) => {
  const [activeTab, setActiveTab] = useState('sports');
  const [isAddStatDialogOpen, setIsAddStatDialogOpen] = useState(false);
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');
  const [newStatChange, setNewStatChange] = useState('');
  const [newStatIsPositive, setNewStatIsPositive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { filteredStats, handleAddStat, handleDeleteStat } = useStatsData();
  
  const resetFormAndClose = () => {
    setNewStatLabel('');
    setNewStatValue('');
    setNewStatChange('');
    setNewStatIsPositive(true);
    setIsAddStatDialogOpen(false);
  };
  
  const handleDialogClose = () => {
    if (newStatLabel || newStatValue || newStatChange) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        resetFormAndClose();
      }
    } else {
      resetFormAndClose();
    }
  };

  const onAddStat = () => {
    handleAddStat(
      activeTab,
      newStatLabel,
      newStatValue,
      newStatChange,
      newStatIsPositive
    );
    resetFormAndClose();
  };

  // Safely get filtered stats for the current category
  const currentStats = filteredStats(activeTab) || [];
  
  // Divide stats safely
  const seasonStats = currentStats.length > 0 ? currentStats.slice(0, 6) : [];
  const careerStats = currentStats.length > 6 ? currentStats.slice(6) : [];
  
  return (
    <Card className={className}>
      <StatsCardHeader 
        isEditing={isEditing} 
        onOpenDialog={() => setIsAddStatDialogOpen(true)} 
      />
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Done Editing' : 'Edit Stats'}
          </Button>
        </div>

        <Tabs defaultValue="sports" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="sports" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Sports
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Physical
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sports" className="space-y-4">
            <StatsCategoryContent
              stats={seasonStats}
              isEditing={isEditing}
              onDelete={handleDeleteStat}
              title="Season 2024/25"
            />
            {careerStats.length > 0 && (
              <StatsCategoryContent
                stats={careerStats}
                isEditing={isEditing}
                onDelete={handleDeleteStat}
                title="Career Summary"
              />
            )}
          </TabsContent>

          <TabsContent value="academic">
            <StatsCategoryContent
              stats={filteredStats('academic')}
              isEditing={isEditing}
              onDelete={handleDeleteStat}
            />
          </TabsContent>

          <TabsContent value="physical">
            <StatsCategoryContent
              stats={filteredStats('physical')}
              isEditing={isEditing}
              onDelete={handleDeleteStat}
            />
          </TabsContent>
        </Tabs>

        <AddStatDialog 
          isOpen={isAddStatDialogOpen}
          onOpenChange={setIsAddStatDialogOpen}
          onAddStat={onAddStat}
          newStatLabel={newStatLabel}
          setNewStatLabel={setNewStatLabel}
          newStatValue={newStatValue}
          setNewStatValue={setNewStatValue}
          newStatChange={newStatChange}
          setNewStatChange={setNewStatChange}
          newStatIsPositive={newStatIsPositive}
          setNewStatIsPositive={setNewStatIsPositive}
          activeTab={activeTab}
          onClose={handleDialogClose}
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedStatsCard;
