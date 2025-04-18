
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, GraduationCap, Activity, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/auth';
import { supabase } from '@/integrations/supabase/client';

interface StatItemProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  onDelete?: () => void;
  editable?: boolean;
}

const StatItem = ({ label, value, change, isPositive, onDelete, editable = false }: StatItemProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/50 border border-border/50 hover:shadow-lg transition-all relative"
  >
    {editable && onDelete && (
      <button 
        onClick={onDelete}
        className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-500 rounded-full"
        aria-label="Delete stat"
      >
        <X className="h-3 w-3" />
      </button>
    )}
    <div className="text-2xl font-bold text-foreground">{value}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
    {change && (
      <div className={cn(
        "text-xs mt-1 flex items-center gap-1",
        isPositive ? "text-green-500" : "text-red-500"
      )}>
        {isPositive ? '↑' : '↓'} {change}
      </div>
    )}
  </motion.div>
);

interface EnhancedStatsCardProps {
  className?: string;
}

interface Stat {
  id: string;
  category: string;
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

const EnhancedStatsCard = ({ className }: EnhancedStatsCardProps) => {
  const [activeTab, setActiveTab] = useState('sports');
  const [isAddStatDialogOpen, setIsAddStatDialogOpen] = useState(false);
  const [newStatLabel, setNewStatLabel] = useState('');
  const [newStatValue, setNewStatValue] = useState('');
  const [newStatChange, setNewStatChange] = useState('');
  const [newStatIsPositive, setNewStatIsPositive] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  
  const [stats, setStats] = useState<Stat[]>(() => {
    // First try to load from localStorage with user-specific key
    const userId = user?.id;
    const userSpecificKey = userId ? `athlete-stats-${userId}` : 'athlete-stats';
    const savedStats = localStorage.getItem(userSpecificKey);
    
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    
    // Fall back to default stats if no saved stats exist
    return [
      { id: '1', category: 'sports', label: 'Games Played', value: 28 },
      { id: '2', category: 'sports', label: 'Goals', value: 15, change: '3', isPositive: true },
      { id: '3', category: 'sports', label: 'Assists', value: 12, change: '2', isPositive: true },
      { id: '4', category: 'sports', label: 'Minutes Played', value: '2,340' },
      { id: '5', category: 'sports', label: 'Pass Accuracy', value: '89%', change: '2%', isPositive: true },
      { id: '6', category: 'sports', label: 'Shot Accuracy', value: '76%' },
      { id: '7', category: 'sports', label: 'Total Games', value: 82 },
      { id: '8', category: 'sports', label: 'Total Goals', value: 42 },
      { id: '9', category: 'sports', label: 'Total Assists', value: 35 },
      
      { id: '10', category: 'academic', label: 'GPA', value: '3.8', change: '0.2', isPositive: true },
      { id: '11', category: 'academic', label: 'SAT Score', value: '1450' },
      { id: '12', category: 'academic', label: 'Class Rank', value: 'Top 5%' },
      { id: '13', category: 'academic', label: 'AP Classes', value: 4 },
      { id: '14', category: 'academic', label: 'Honor Roll', value: 'Yes' },
      { id: '15', category: 'academic', label: 'Academic Awards', value: 3 },
      
      { id: '16', category: 'physical', label: 'Height', value: "6'2\"" },
      { id: '17', category: 'physical', label: 'Weight', value: '175 lbs' },
      { id: '18', category: 'physical', label: 'Vertical Jump', value: '32"', change: '2', isPositive: true },
      { id: '19', category: 'physical', label: '40-yard Dash', value: '4.5s', change: '0.1s', isPositive: true },
      { id: '20', category: 'physical', label: 'Agility Score', value: '8.5/10' },
      { id: '21', category: 'physical', label: 'Endurance', value: '92%' },
    ];
  });

  useEffect(() => {
    // Update localStorage with the current stats
    if (user?.id) {
      localStorage.setItem(`athlete-stats-${user.id}`, JSON.stringify(stats));
      
      // Also update the stats in the athlete's profile in Supabase
      const updateProfileStats = async () => {
        try {
          // Convert stats array to object format expected by PerformanceStats
          const statsObject: Record<string, any> = {};
          
          stats.forEach(stat => {
            statsObject[stat.id] = {
              label: stat.label,
              value: stat.value,
              change: stat.change,
              isPositive: stat.isPositive,
              category: stat.category
            };
          });
          
          // Update the profile with the stats as a jsonb field called athlete_stats
          // instead of trying to add a stats column that doesn't exist
          const { error } = await supabase
            .from('profiles')
            .update({
              // Don't include stats directly as it's not in the profile table columns
              // Instead, we'll store it as athlete_stats
              athlete_stats: statsObject
            })
            .eq('id', user.id);
            
          if (error) {
            console.error('Error updating stats in profile:', error);
          }
        } catch (err) {
          console.error('Failed to update profile stats:', err);
        }
      };
      
      // Uncomment this when ready to integrate with Supabase
      // updateProfileStats();
    } else {
      // Fallback to non-user-specific storage
      localStorage.setItem('athlete-stats', JSON.stringify(stats));
    }
  }, [stats, user]);

  const handleAddStat = () => {
    if (!newStatLabel.trim() || !newStatValue.trim()) {
      toast.error('Please provide both a label and value for the stat');
      return;
    }

    const newStat: Stat = {
      id: Date.now().toString(),
      category: activeTab,
      label: newStatLabel,
      value: newStatValue,
      change: newStatChange || undefined,
      isPositive: newStatChange ? newStatIsPositive : undefined
    };

    setStats([...stats, newStat]);
    toast.success(`Added ${newStatLabel} to your ${activeTab} stats`);
    
    // Don't close the dialog automatically so user can add multiple stats
    // Just reset the form fields
    setNewStatLabel('');
    setNewStatValue('');
    setNewStatChange('');
    setNewStatIsPositive(true);
  };

  const handleDeleteStat = (id: string) => {
    setStats(stats.filter(stat => stat.id !== id));
    toast.success('Stat removed successfully');
  };

  const filteredStats = (category: string) => {
    return stats.filter(stat => stat.category === category);
  };
  
  const handleDialogClose = () => {
    // Only close if there are no unsaved changes
    if (newStatLabel || newStatValue || newStatChange) {
      if (confirm("You have unsaved changes. Are you sure you want to close?")) {
        resetFormAndClose();
      }
    } else {
      resetFormAndClose();
    }
  };
  
  const resetFormAndClose = () => {
    setNewStatLabel('');
    setNewStatValue('');
    setNewStatChange('');
    setNewStatIsPositive(true);
    setIsAddStatDialogOpen(false);
  };

  return (
    <Card className={cn("w-full", className)}>
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
                {filteredStats('sports').slice(0, 6).map(stat => (
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
            
            {filteredStats('sports').length > 6 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Career Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredStats('sports').slice(6).map(stat => (
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
                {filteredStats('academic').map(stat => (
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
          </TabsContent>

          <TabsContent value="physical" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Physical Attributes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredStats('physical').map(stat => (
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
          </TabsContent>
        </Tabs>

        <Dialog open={isAddStatDialogOpen} onOpenChange={setIsAddStatDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Stat</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="statLabel" className="text-right">
                  Label
                </Label>
                <Input
                  id="statLabel"
                  value={newStatLabel}
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
                  value={newStatValue}
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
                  value={newStatChange}
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
            </div>
            <DialogFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button type="button" onClick={handleAddStat} disabled={!newStatLabel || !newStatValue}>
                  Add Stat
                </Button>
                <Button type="button" onClick={resetFormAndClose} variant="default">
                  Done
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EnhancedStatsCard;
