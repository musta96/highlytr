import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Check } from 'lucide-react';
import { getStatSuggestions, generalAthleticStats, academicStats, StatDefinition } from '@/utils/sportsStatsData';
import { StatDialogProps, AddStatFormData } from './types';

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

  const suggestedStats = primarySport ? 
    getStatSuggestions(primarySport, primaryPosition) : [];

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
    const processedValue = stringValue.trim();

    if (processedLabel && processedValue) {
      onAddStat({
        ...formData,
        label: processedLabel,
        value: processedValue
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
          
          <TabsContent value="sport" className="space-y-4">
            {primarySport ? (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Suggested statistics for {primaryPosition ? `${primaryPosition} in ${primarySport}` : primarySport}:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {suggestedStats.map((stat: StatDefinition) => (
                    <div 
                      key={stat.id} 
                      className={`p-2 text-sm rounded-md cursor-pointer border ${
                        selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleStatSelect(stat)}
                    >
                      <div className="font-medium">{stat.label}</div>
                      {stat.description && (
                        <div className="text-xs text-gray-500">{stat.description}</div>
                      )}
                      {selectedStat === stat.id && (
                        <div className="flex items-center text-primary text-xs mt-1">
                          <Check className="h-3 w-3 mr-1" /> Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <AlertCircle className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  To see suggested stats, first add your primary sport in your profile.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="physical" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">Physical attributes and performance metrics:</div>
            <div className="grid grid-cols-2 gap-2">
              {generalAthleticStats.map((stat) => (
                <div 
                  key={stat.id} 
                  className={`p-2 text-sm rounded-md cursor-pointer border ${
                    selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleStatSelect(stat)}
                >
                  <div className="font-medium">{stat.label}</div>
                  {stat.unit && <div className="text-xs text-gray-500">Unit: {stat.unit}</div>}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div className="text-sm text-muted-foreground mb-2">Academic performance metrics:</div>
            <div className="grid grid-cols-2 gap-2">
              {academicStats.map((stat) => (
                <div 
                  key={stat.id} 
                  className={`p-2 text-sm rounded-md cursor-pointer border ${
                    selectedStat === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleStatSelect(stat)}
                >
                  <div className="font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid gap-4 py-4">
          {selectedStat && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="statLabel" className="text-right">Label</Label>
                <Input
                  id="statLabel"
                  value={formData.label}
                  onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="statValue" className="text-right">Value</Label>
                <Input
                  id="statValue"
                  value={formData.value}
                  onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="statChange" className="text-right">Change</Label>
                <Input
                  id="statChange"
                  value={formData.change}
                  onChange={(e) => setFormData(prev => ({ ...prev, change: e.target.value }))}
                  className="col-span-3"
                  placeholder="Optional"
                />
              </div>
              {formData.change && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="trend" className="text-right">Trend</Label>
                  <Select
                    value={formData.isPositive ? "positive" : "negative"}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, isPositive: value === "positive" }))}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select trend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive (improving)</SelectItem>
                      <SelectItem value="negative">Negative (declining)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </>
          )}
        </div>

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
