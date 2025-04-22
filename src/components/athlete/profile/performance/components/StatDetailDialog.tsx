
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { StatDetailItem } from '../types';

interface StatDetailProps {
  isOpen: boolean;
  onClose: () => void;
  statKey: string;
  stat: any;
  onUpdate: (key: string, newValue: any) => void;
  isEditing: boolean;
}

export const StatDetailDialog: React.FC<StatDetailProps> = ({
  isOpen,
  onClose,
  statKey,
  stat,
  onUpdate,
  isEditing
}) => {
  const [details, setDetails] = useState<StatDetailItem[]>(stat.details || []);
  const [newDetail, setNewDetail] = useState({ date: '', value: '', notes: '' });

  const handleAddDetail = () => {
    if (newDetail.date && newDetail.value) {
      const updatedDetails = [...details, { ...newDetail, id: Date.now() }];
      setDetails(updatedDetails);
      setNewDetail({ date: '', value: '', notes: '' });
      
      // Update the total value based on all details
      const totalValue = updatedDetails.reduce((sum, detail) => {
        const numValue = parseFloat(detail.value.toString());
        return isNaN(numValue) ? sum : sum + numValue;
      }, 0);
      
      onUpdate(statKey, {
        ...stat,
        value: totalValue,
        details: updatedDetails,
      });
    }
  };

  const handleRemoveDetail = (id: number) => {
    const updatedDetails = details.filter((detail) => detail.id !== id);
    setDetails(updatedDetails);
    
    // Update the total value based on remaining details
    const totalValue = updatedDetails.reduce((sum, detail) => {
      const numValue = parseFloat(detail.value.toString());
      return isNaN(numValue) ? sum : sum + numValue;
    }, 0);
    
    onUpdate(statKey, {
      ...stat,
      value: totalValue,
      details: updatedDetails,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{stat.label} Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-lg font-semibold">
            Total: {stat.value}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Notes</TableHead>
                {isEditing && <TableHead className="w-[100px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {details.length > 0 ? (
                details.map((detail: any) => (
                  <TableRow key={detail.id}>
                    <TableCell>{detail.date}</TableCell>
                    <TableCell>{detail.value}</TableCell>
                    <TableCell>{detail.notes}</TableCell>
                    {isEditing && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveDetail(detail.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={isEditing ? 4 : 3} className="text-center py-4 text-muted-foreground">
                    No details added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {isEditing && (
            <div className="flex gap-2 items-end">
              <div className="grid gap-2">
                <Input
                  type="date"
                  value={newDetail.date}
                  onChange={(e) => setNewDetail({ ...newDetail, date: e.target.value })}
                  placeholder="Date"
                />
              </div>
              <div className="grid gap-2">
                <Input
                  type="number"
                  value={newDetail.value}
                  onChange={(e) => setNewDetail({ ...newDetail, value: e.target.value })}
                  placeholder="Value"
                />
              </div>
              <div className="grid gap-2 flex-1">
                <Input
                  value={newDetail.notes}
                  onChange={(e) => setNewDetail({ ...newDetail, notes: e.target.value })}
                  placeholder="Notes"
                />
              </div>
              <Button onClick={handleAddDetail}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
