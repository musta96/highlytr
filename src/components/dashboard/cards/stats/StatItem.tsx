
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StatItemProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  onDelete?: () => void;
  editable?: boolean;
}

export const StatItem = ({ 
  label, 
  value, 
  change, 
  isPositive, 
  onDelete, 
  editable = false 
}: StatItemProps) => {
  // Always ensure we're returning a valid value for display
  const displayValue = value !== undefined && value !== null ? value : '-';
  const displayLabel = label || 'Unknown';
  
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg bg-gradient-to-br from-card to-muted/50 border border-border/50 hover:shadow-lg transition-all relative"
    >
      {editable && onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete();
          }}
          className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-500 rounded-full"
          aria-label="Delete stat"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      )}
      <div className="text-2xl font-bold text-foreground">{displayValue}</div>
      <div className="text-sm text-muted-foreground">{displayLabel}</div>
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
};
