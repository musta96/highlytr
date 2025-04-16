
import React from 'react';
import { Link } from 'react-router-dom';
import { Medal, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeaderboardUser {
  id: string;
  name: string;
  rank: number;
  profilePic?: string;
  score: number;
  change?: number; // Position change, positive means improved rank (moved up)
}

interface LeaderboardPreviewProps {
  users: LeaderboardUser[];
  currentUserId: string;
  category?: string;
}

const LeaderboardPreview = ({ users, currentUserId, category = 'Recruiting Activity' }: LeaderboardPreviewProps) => {
  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-amber-500" />
            <h3 className="font-medium">{category} Leaderboard</h3>
          </div>
          <Badge variant="outline">This Week</Badge>
        </div>
      </div>
      
      <div className="p-0">
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`flex items-center justify-between p-3 border-b last:border-0 ${
              user.id === currentUserId ? "bg-muted/40" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium">
                {user.rank}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-muted/70 flex items-center justify-center overflow-hidden">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs">{user.name.charAt(0)}</span>
                  )}
                </div>
                <span className={`text-sm font-medium ${user.id === currentUserId ? "text-primary" : ""}`}>
                  {user.name}
                  {user.id === currentUserId && <span className="text-xs ml-1">(You)</span>}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{user.score}</span>
              {user.change !== undefined && (
                <span className={`flex items-center text-xs ${
                  user.change > 0 ? "text-green-600" : user.change < 0 ? "text-red-500" : "text-gray-500"
                }`}>
                  {user.change > 0 ? (
                    <>
                      <TrendingUp className="h-3 w-3 mr-0.5" />+{user.change}
                    </>
                  ) : user.change < 0 ? (
                    <>
                      <TrendingDown className="h-3 w-3 mr-0.5" />{user.change}
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t">
        <Button variant="ghost" size="sm" className="w-full" asChild>
          <Link to="/leaderboard">
            View Full Leaderboard
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

// Add missing Badge import
import { Badge } from '@/components/ui/badge';

export default LeaderboardPreview;
