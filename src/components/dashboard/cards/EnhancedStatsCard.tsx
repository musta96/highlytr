
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, GraduationCap, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatItemProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

const StatItem = ({ label, value, change, isPositive }: StatItemProps) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/50 border border-border/50 hover:shadow-lg transition-all"
  >
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

const EnhancedStatsCard = ({ className }: EnhancedStatsCardProps) => {
  const [activeTab, setActiveTab] = useState('sports');

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Performance Statistics</CardTitle>
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
                <StatItem label="Games Played" value={28} />
                <StatItem label="Goals" value={15} change="3" isPositive={true} />
                <StatItem label="Assists" value={12} change="2" isPositive={true} />
                <StatItem label="Minutes Played" value="2,340" />
                <StatItem label="Pass Accuracy" value="89%" change="2%" isPositive={true} />
                <StatItem label="Shot Accuracy" value="76%" />
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Career Summary</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatItem label="Total Games" value={82} />
                <StatItem label="Total Goals" value={42} />
                <StatItem label="Total Assists" value={35} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Academic Performance</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatItem label="GPA" value="3.8" change="0.2" isPositive={true} />
                <StatItem label="SAT Score" value="1450" />
                <StatItem label="Class Rank" value="Top 5%" />
                <StatItem label="AP Classes" value={4} />
                <StatItem label="Honor Roll" value="Yes" />
                <StatItem label="Academic Awards" value={3} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="physical" className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Physical Attributes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatItem label="Height" value="6'2\"" />
                <StatItem label="Weight" value="175 lbs" />
                <StatItem label="Vertical Jump" value='32"' change="2" isPositive={true} />
                <StatItem label="40-yard Dash" value="4.5s" change="0.1s" isPositive={true} />
                <StatItem label="Agility Score" value="8.5/10" />
                <StatItem label="Endurance" value="92%" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedStatsCard;
