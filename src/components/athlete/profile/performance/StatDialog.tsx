
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStatSuggestions, generalAthleticStats, academicStats, StatDefinition } from '@/utils/sportsStatsData';
import { StatDialogProps, AddStatFormData } from './types';
import { SportStatsTab } from './tabs/SportStatsTab';
import { PhysicalStatsTab } from './tabs/PhysicalStatsTab';
import { AcademicStatsTab } from './tabs/AcademicStatsTab';
import { StatForm } from './StatForm';

export const StatDialog: React.FC<StatDialogProps> = ({
  isOpen,
  onClose,
  onAddStat,
  primarySport,
  primaryPosition
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>('sport');
  const [selectedStat, setSelectedStat] = useState<string>('');
  const [formData, setFormData] = useState<AddStatFormData>({
    label: '',
    value: '',
    change: '',
    isPositive: true
  });

  const suggestedStats = primarySport ? getStatSuggestions(primarySport, primaryPosition) : [];

  const handleStatSelect = (stat: StatDefinition) => {
    setSelectedStat(stat.id);
    setFormData(prev => ({
      ...prev,
      label: stat.label
    }));
  };

  const handleSubmit = () => {
    const stringValue = typeof formData.value === 'number' 
      ? formData.value.toString() 
      : formData.value;
    
    const processedLabel = formData.label.trim();
    
    if (processedLabel && stringValue.trim()) {
      onAddStat({
        ...formData,
        label: processedLabel,
        value: stringValue.trim()
      });
      setFormData({ label: '', value: '', change: '', isPositive: true });
      setSelectedStat('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Performance Statistic</DialogTitle>
        </DialogHeader>
        
        <Tabs value={currentCategory} onValueChange={setCurrentCategory}>
          <TabsList className="grid grid-cols-3 mb-2">
            <TabsTrigger value="sport">Sport Stats</TabsTrigger>
            <TabsTrigger value="physical">Physical</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sport">
            <SportStatsTab
              primarySport={primarySport}
              primaryPosition={primaryPosition}
              suggestedStats={suggestedStats}
              selectedStat={selectedStat}
              onStatSelect={handleStatSelect}
            />
          </TabsContent>

          <TabsContent value="physical">
            <PhysicalStatsTab
              stats={generalAthleticStats}
              selectedStat={selectedStat}
              onStatSelect={handleStatSelect}
            />
          </TabsContent>

          <TabsContent value="academic">
            <AcademicStatsTab
              stats={academicStats}
              selectedStat={selectedStat}
              onStatSelect={handleStatSelect}
            />
          </TabsContent>
        </Tabs>

        {selectedStat && (
          <StatForm
            formData={formData}
            onChange={setFormData}
          />
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!formData.label || !formData.value}
          >
            Add Statistic
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
