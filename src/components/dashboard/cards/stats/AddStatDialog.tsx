
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AddStatDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStat: () => void;
  newStatLabel: string;
  setNewStatLabel: (value: string) => void;
  newStatValue: string;
  setNewStatValue: (value: string) => void;
  newStatChange: string;
  setNewStatChange: (value: string) => void;
  newStatIsPositive: boolean;
  setNewStatIsPositive: (value: boolean) => void;
  activeTab: string;
  onClose: () => void;
}

export const AddStatDialog: React.FC<AddStatDialogProps> = ({
  isOpen,
  onOpenChange,
  onAddStat,
  newStatLabel,
  setNewStatLabel,
  newStatValue,
  setNewStatValue,
  newStatChange,
  setNewStatChange,
  newStatIsPositive,
  setNewStatIsPositive,
  activeTab,
  onClose,
}) => {
  // Handle adding stats safely
  const handleAddStat = () => {
    if (newStatLabel && newStatLabel.trim() && newStatValue && newStatValue.trim()) {
      onAddStat();
    }
  };
  
  const categoryTitle = activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : 'New';
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open && onClose) {
        onClose();
      } else {
        onOpenChange(open);
      }
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New {categoryTitle} Stat</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statLabel" className="text-right">
              Label
            </Label>
            <Input
              id="statLabel"
              value={newStatLabel || ''}
              onChange={(e) => setNewStatLabel(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Goals, GPA, Weight"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statValue" className="text-right">
              Value
            </Label>
            <Input
              id="statValue"
              value={newStatValue || ''}
              onChange={(e) => setNewStatValue(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 15, 3.8, 175 lbs"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statChange" className="text-right">
              Change
            </Label>
            <Input
              id="statChange"
              value={newStatChange || ''}
              onChange={(e) => setNewStatChange(e.target.value)}
              className="col-span-3"
              placeholder="Optional, e.g., 2, 0.2"
            />
          </div>
          {newStatChange && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="statTrend" className="text-right">
                Trend
              </Label>
              <Select 
                value={newStatIsPositive ? "positive" : "negative"}
                onValueChange={(value) => setNewStatIsPositive(value === "positive")}
              >
                <SelectTrigger id="statTrend" className="col-span-3">
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positive (improving)</SelectItem>
                  <SelectItem value="negative">Negative (declining)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button 
              type="button" 
              onClick={handleAddStat} 
              disabled={!newStatLabel?.trim() || !newStatValue?.trim()}
            >
              Add Stat
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
