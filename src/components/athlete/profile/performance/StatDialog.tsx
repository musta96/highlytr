
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
        value: stringValue.trim(),
        category: currentCategory
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
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                Select a statistic to add to your profile
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {suggestedStats.map(stat => (
                  <div 
                    key={stat.id}
                    onClick={() => handleStatSelect(stat)}
                    className={`p-2 rounded border cursor-pointer ${selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  >
                    <p className="font-medium text-sm">{stat.label}</p>
                    {stat.description && <p className="text-xs text-muted-foreground">{stat.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="physical">
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                Select a physical attribute to add to your profile
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'height', label: 'Height', unit: 'cm/ft' },
                  { id: 'weight', label: 'Weight', unit: 'kg/lbs' },
                  { id: 'vertical_jump', label: 'Vertical Jump', unit: 'in/cm' },
                  { id: 'speed', label: '40-yard Dash', unit: 'seconds' },
                  { id: 'strength', label: 'Bench Press', unit: 'kg/lbs' },
                  { id: 'endurance', label: 'Endurance', unit: 'score' }
                ].map(stat => (
                  <div 
                    key={stat.id}
                    onClick={() => handleStatSelect(stat)}
                    className={`p-2 rounded border cursor-pointer ${selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  >
                    <p className="font-medium text-sm">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">Unit: {stat.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="academic">
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                Select an academic metric to add to your profile
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gpa', label: 'GPA' },
                  { id: 'sat', label: 'SAT Score' },
                  { id: 'act', label: 'ACT Score' },
                  { id: 'class_rank', label: 'Class Rank' },
                  { id: 'ap_classes', label: 'AP Classes' },
                  { id: 'honors', label: 'Honors' }
                ].map(stat => (
                  <div 
                    key={stat.id}
                    onClick={() => handleStatSelect(stat)}
                    className={`p-2 rounded border cursor-pointer ${selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  >
                    <p className="font-medium text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {selectedStat && (
          <div className="space-y-4 pt-4 border-t mt-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Label:</div>
              <input 
                type="text" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.label} 
                onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))} 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Value:</div>
              <input 
                type="text" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.value} 
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))} 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">Change:</div>
              <input 
                type="text" 
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.change} 
                onChange={(e) => setFormData(prev => ({ ...prev, change: e.target.value }))} 
                placeholder="Optional (e.g., +5, -2)"
              />
            </div>
            
            {formData.change && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right text-sm font-medium">Trend:</div>
                <div className="col-span-3 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={formData.isPositive} 
                      onChange={() => setFormData(prev => ({ ...prev, isPositive: true }))} 
                    />
                    <span className="text-sm">Positive</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={!formData.isPositive} 
                      onChange={() => setFormData(prev => ({ ...prev, isPositive: false }))} 
                    />
                    <span className="text-sm">Negative</span>
                  </label>
                </div>
              </div>
            )}
          </div>
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
