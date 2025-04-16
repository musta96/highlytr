
import React from 'react';
import Layout from '@/components/layout/Layout';
import TopRecruits from '@/components/leaderboard/TopRecruits';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  return (
    <Layout>
      <div className="container py-16">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-highlyt-blue mr-3" />
            HighLytr Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the top international student-athletes this month, ranked by profile activity, 
            engagement, and collegiate interest.
          </p>
        </div>
        
        <div className="mb-16">
          <TopRecruits />
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">How Rankings Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-2">Scoring System</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-highlyt-blue text-white w-6 h-6 rounded flex items-center justify-center mr-2 mt-1">1</span>
                  <div>
                    <span className="font-medium">Profile Completeness:</span> Up to 100 points based on profile completion percentage
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-highlyt-blue text-white w-6 h-6 rounded flex items-center justify-center mr-2 mt-1">2</span>
                  <div>
                    <span className="font-medium">Profile Views:</span> 1 point per view (max 50 points/week)
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-highlyt-blue text-white w-6 h-6 rounded flex items-center justify-center mr-2 mt-1">3</span>
                  <div>
                    <span className="font-medium">Video Engagement:</span> 1 point per like, 5 points per share
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-highlyt-blue text-white w-6 h-6 rounded flex items-center justify-center mr-2 mt-1">4</span>
                  <div>
                    <span className="font-medium">College Interest:</span> 5 points per save, 10 points per connection request
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">Achievement Badges</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Trophy className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Rising Star</div>
                    <div className="text-sm text-gray-600">Climbed 5+ ranks within a week</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3">
                    <Trophy className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-medium">Top Scouted</div>
                    <div className="text-sm text-gray-600">Saved by 3+ coaches in 7 days</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="font-medium">All-Star</div>
                    <div className="text-sm text-gray-600">Top 3 in monthly rankings</div>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6">
                <h3 className="font-bold mb-2">Monthly Reset</h3>
                <p className="text-gray-600">Rankings are reset at the start of each month. Past winners retain their badges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
