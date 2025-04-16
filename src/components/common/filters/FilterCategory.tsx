
import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FilterCategoryProps {
  title: string;
  value: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterCategory = ({ title, value, children, defaultOpen }: FilterCategoryProps) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterCategory;
