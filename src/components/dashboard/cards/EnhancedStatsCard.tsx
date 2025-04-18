
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, GraduationCap, Activity, Plus } from 'lucide-react';
import { StatItem } from './stats/StatItem';
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
    
    // Reset form values after adding
    setNewStatLabel('');
    setNewStatValue('');
    setNewStatChange('');
    setNewStatIsPositive(true);
  };

  // Safely get filtered stats for the current category
  const currentStats = filteredStats(activeTab) || [];
  const seasonStats = currentStats.slice(0, 6);
  const careerStats = currentStats.slice(6);
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Performance Statistics</CardTitle>
          <div className="flex gap-2">
            {isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Done Editing
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit Stats
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm"
              onClick={() => setIsAddStatDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Stat
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
            <div>
              <h4 className="text-sm font-medium mb-3">Season 2024/25</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {seasonStats.length > 0 ? (
                  seasonStats.map(stat => (
                    <StatItem 
                      key={stat.id}
                      label={stat.label} 
                      value={stat.value} 
                      change={stat.change} 
                      isPositive={stat.isPositive}
                      editable={isEditing}
                      onDelete={() => handleDeleteStat(stat.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-4 text-muted-foreground">
                    No sports stats added yet.
                  </div>
                )}
              </div>
            </div>
            
            {careerStats.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Career Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {careerStats.map(stat => (
                    <StatItem 
                      key={stat.id}
                      label={stat.label} 
                      value={stat.value} 
                      change={stat.change} 
                      isPositive={stat.isPositive}
                      editable={isEditing}
                      onDelete={() => handleDeleteStat(stat.id)}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Academic Performance</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredStats('academic').length > 0 ? (
                  filteredStats('academic').map(stat => (
                    <StatItem 
                      key={stat.id}
                      label={stat.label} 
                      value={stat.value} 
                      change={stat.change} 
                      isPositive={stat.isPositive}
                      editable={isEditing}
                      onDelete={() => handleDeleteStat(stat.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-4 text-muted-foreground">
                    No academic stats added yet.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="physical" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Physical Attributes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredStats('physical').length > 0 ? (
                  filteredStats('physical').map(stat => (
                    <StatItem 
                      key={stat.id}
                      label={stat.label} 
                      value={stat.value} 
                      change={stat.change} 
                      isPositive={stat.isPositive}
                      editable={isEditing}
                      onDelete={() => handleDeleteStat(stat.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-4 text-muted-foreground">
                    No physical stats added yet.
                  </div>
                )}
              </div>
            </div>
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
