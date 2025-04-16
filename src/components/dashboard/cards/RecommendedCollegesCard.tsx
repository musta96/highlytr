
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';

const RecommendedCollegesCard = () => {
  return (
    <>
      <h2 className="text-xl font-bold mt-4">Colleges You May Like</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-32 bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                University Logo {i}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">University {String.fromCharCode(64 + i)}</h3>
                  <p className="text-sm text-muted-foreground">Basketball, Division I</p>
                </div>
                <Badge variant="secondary">98% Match</Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="w-full">View</Button>
                <Button size="sm" className="w-full">Connect</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-2">
        <Button variant="ghost" asChild>
          <Link to="/dashboard/colleges/search">
            View More Colleges
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default RecommendedCollegesCard;
