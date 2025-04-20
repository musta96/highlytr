
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddStatFormData } from './types';

interface StatFormProps {
  formData: AddStatFormData;
  onChange: (formData: AddStatFormData) => void;
}

export const StatForm: React.FC<StatFormProps> = ({ formData, onChange }) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="statLabel" className="text-right">Label</Label>
        <Input
          id="statLabel"
          value={formData.label}
          onChange={(e) => onChange({ ...formData, label: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="statValue" className="text-right">Value</Label>
        <Input
          id="statValue"
          value={formData.value}
          onChange={(e) => onChange({ ...formData, value: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="statChange" className="text-right">Change</Label>
        <Input
          id="statChange"
          value={formData.change}
          onChange={(e) => onChange({ ...formData, change: e.target.value })}
          className="col-span-3"
          placeholder="Optional"
        />
      </div>
      {formData.change && (
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="trend" className="text-right">Trend</Label>
          <Select
            value={formData.isPositive ? "positive" : "negative"}
            onValueChange={(value) => onChange({ ...formData, isPositive: value === "positive" })}
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
  );
};
