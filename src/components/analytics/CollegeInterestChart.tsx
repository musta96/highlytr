
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { getCollegeInterestData } from '@/services/analyticsService';

interface CollegeInterestChartProps {
  dateRange: '7d' | '30d' | '90d' | '1y';
}

const CollegeInterestChart = ({ dateRange }: CollegeInterestChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const collegeData = getCollegeInterestData(dateRange);
  const divisionData = [
    { name: 'Division I', value: 45 },
    { name: 'Division II', value: 30 },
    { name: 'Division III', value: 15 },
    { name: 'NAIA', value: 10 }
  ];

  const COLORS = ['hsl(var(--primary))', 'rgba(234, 88, 12, 0.8)', 'rgba(22, 163, 74, 0.8)', 'rgba(79, 70, 229, 0.8)'];
  
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
    return (
      <g>
        <path 
          d={props.arc.path} 
          fill={fill} 
          stroke={fill}
          strokeWidth={activeIndex === props.index ? 2 : 0}
          opacity={activeIndex === props.index ? 1 : 0.8}
        />
      </g>
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>College Interest by Region</CardTitle>
          <CardDescription>
            Geographic breakdown of interested colleges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={collegeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {collegeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} colleges`, 'Count']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Interest by Division</CardTitle>
          <CardDescription>
            Breakdown by NCAA division and athletic association
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={divisionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {divisionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-2">Top Interested Programs</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Stanford University</span>
                  <Badge variant="outline">D1</Badge>
                </div>
                <span className="text-sm font-medium">High Interest</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">UCLA</span>
                  <Badge variant="outline">D1</Badge>
                </div>
                <span className="text-sm font-medium">Medium Interest</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">University of Michigan</span>
                  <Badge variant="outline">D1</Badge>
                </div>
                <span className="text-sm font-medium">Medium Interest</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeInterestChart;
