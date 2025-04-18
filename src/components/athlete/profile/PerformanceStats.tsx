
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  TrendingUp, 
  AlertCircle,
  Plus,
  ChevronRight,
  X,
  Check
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatStatValue, getStatColor } from '@/utils/statsFormatter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  getStatSuggestions, 
  generalAthleticStats,
  academicStats,
  StatDefinition 
} from '@/utils/sportsStatsData';
import { useAuth } from '@/hooks/auth';

interface PerformanceStatsProps {
  profile: any;
  isEditing: boolean;
}

const PerformanceStats = ({ profile, isEditing }: PerformanceStatsProps) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Record<string, any>>({});
  const [isAddStatDialogOpen, setIsAddStatDialogOpen] = useState(false);
  const [newStatType, setNewStatType] = useState<string>("");
  const [newStatValue, setNewStatValue] = useState<string>("");
  const [newStatLabel, setNewStatLabel] = useState<string>("");
  const [currentStatCategory, setCurrentStatCategory] = useState<string>("sport");
  
  // Get suggested stats based on the athlete's primary sport and position
  const primarySport = profile?.primary_sport;
  const primaryPosition = profile?.primary_position;
  const suggestedStats = primarySport ? 
    getStatSuggestions(primarySport, primaryPosition) : [];
  
  // Load stats from profile or localStorage
  useEffect(() => {
    let loadedStats: Record<string, any> = {};
    
    // First check if profile has athlete_stats (from Supabase)
    if (profile?.athlete_stats && Object.keys(profile.athlete_stats).length > 0) {
      loadedStats = profile.athlete_stats;
    }
    // Then check if profile has stats directly (from mock data)
    else if (profile?.stats && Object.keys(profile.stats).length > 0) {
      loadedStats = profile.stats;
    } 
    // If not available, try to get from localStorage (for dashboard integration)
    else if (user?.id) {
      const savedStats = localStorage.getItem(`athlete-stats-${user.id}`);
      
      if (savedStats) {
        try {
          // Convert array format from localStorage to object format
          const statsArray = JSON.parse(savedStats);
          statsArray.forEach((stat: any) => {
            loadedStats[stat.id] = {
              label: stat.label,
              value: stat.value,
              change: stat.change,
              isPositive: stat.isPositive,
              category: stat.category
            };
          });
        } catch (err) {
          console.error('Error parsing stats from localStorage', err);
        }
      }
    }
    
    setStats(loadedStats);
  }, [profile, user]);
  
  const handleAddStat = () => {
    if (!newStatType || !newStatValue) return;
    
    // Create a new stat object
    const updatedStats = {
      ...stats,
      [newStatType]: {
        value: Number(newStatValue) || newStatValue,
        label: newStatLabel || newStatType,
      }
    };
    
    // Update the profile stats
    if (profile.setProfile) {
      profile.setProfile((prev: any) => ({
        ...prev,
        athlete_stats: updatedStats
      }));
    }
    
    setStats(updatedStats);
    
    // Save to localStorage too for dashboard integration
    if (user?.id) {
      try {
        // Convert to array format for localStorage
        const statsArray = Object.entries(updatedStats).map(([id, data]: [string, any]) => ({
          id,
          category: data.category || currentStatCategory,
          label: data.label,
          value: data.value,
          change: data.change,
          isPositive: data.isPositive
        }));
        
        localStorage.setItem(`athlete-stats-${user.id}`, JSON.stringify(statsArray));
      } catch (err) {
        console.error('Error saving stats to localStorage', err);
      }
    }
    
    // Reset form and close dialog
    setNewStatType("");
    setNewStatValue("");
    setNewStatLabel("");
    setIsAddStatDialogOpen(false);
  };
  
  const handleStatSelect = (statDefinition: StatDefinition) => {
    setNewStatType(statDefinition.id);
    setNewStatLabel(statDefinition.label);
  };
  
  if (!profile) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl">
            <BarChart className="h-5 w-5 mr-2" />
            Performance Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-xl">
            <BarChart className="h-5 w-5 mr-2" />
            Performance Statistics
          </CardTitle>
          {isEditing && (
            <Dialog open={isAddStatDialogOpen} onOpenChange={setIsAddStatDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs">
                  <Plus className="h-4 w-4 mr-1" /> Add Stat
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add Performance Statistic</DialogTitle>
                  <DialogDescription>
                    Add a new statistic to showcase your athletic performance.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs value={currentStatCategory} onValueChange={setCurrentStatCategory} className="mt-2">
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
                                newStatType === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => handleStatSelect(stat)}
                            >
                              <div className="font-medium">{stat.label}</div>
                              {stat.description && (
                                <div className="text-xs text-gray-500">{stat.description}</div>
                              )}
                              {newStatType === stat.id && (
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
                    <div className="text-sm text-muted-foreground mb-2">
                      Physical attributes and performance metrics:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {generalAthleticStats.map((stat) => (
                        <div 
                          key={stat.id} 
                          className={`p-2 text-sm rounded-md cursor-pointer border ${
                            newStatType === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleStatSelect(stat)}
                        >
                          <div className="font-medium">{stat.label}</div>
                          {stat.unit && <div className="text-xs text-gray-500">Unit: {stat.unit}</div>}
                          {newStatType === stat.id && (
                            <div className="flex items-center text-primary text-xs mt-1">
                              <Check className="h-3 w-3 mr-1" /> Selected
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="academic" className="space-y-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Academic performance metrics:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {academicStats.map((stat) => (
                        <div 
                          key={stat.id} 
                          className={`p-2 text-sm rounded-md cursor-pointer border ${
                            newStatType === stat.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleStatSelect(stat)}
                        >
                          <div className="font-medium">{stat.label}</div>
                          {newStatType === stat.id && (
                            <div className="flex items-center text-primary text-xs mt-1">
                              <Check className="h-3 w-3 mr-1" /> Selected
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="grid gap-4 py-4">
                  {newStatType && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="statLabel" className="text-right">
                          Label
                        </Label>
                        <Input
                          id="statLabel"
                          value={newStatLabel}
                          onChange={(e) => setNewStatLabel(e.target.value)}
                          className="col-span-3"
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
                        />
                      </div>
                    </>
                  )}
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddStatDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddStat} disabled={!newStatType || !newStatValue}>
                    Add Statistic
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(stats).length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {Object.entries(stats).map(([key, stat]: [string, any]) => (
              <TooltipProvider key={key}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="bg-gray-50 p-4 rounded-lg text-center transition-all hover:shadow-md hover:bg-gray-100 cursor-pointer group">
                      <div className="flex items-center justify-center mb-1">
                        <p className={`text-2xl sm:text-3xl font-bold ${getStatColor(stat.value)}`}>
                          {formatStatValue(stat.value)}
                        </p>
                        {stat.trend && (
                          <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-800">
                        {stat.label || key}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-semibold">{stat.label || key}</p>
                      {stat.description && (
                        <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ) : (
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
                onClick={() => setIsAddStatDialogOpen(true)}
              >
                <Plus className="h-4 w-4" /> Add Your First Stat
              </Button>
            )}
          </div>
        )}
        
        {!isEditing && Object.keys(stats).length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-4 text-gray-600 hover:text-gray-800"
          >
            View Detailed Statistics <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;
