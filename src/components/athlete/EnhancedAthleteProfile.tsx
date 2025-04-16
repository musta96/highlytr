
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  UserPlus,
  Bookmark,
  Heart,
  Share2,
  Trophy,
  MessageCircle,
  FileText,
  Download,
  Eye
} from 'lucide-react';

// Mock data for the athlete profile
const mockAthlete = {
  id: '1',
  name: 'Marco Rossi',
  verified: true,
  age: 18,
  nationality: 'Italy',
  city: 'Milan',
  sport: 'Soccer',
  position: 'Forward',
  graduationYear: 2025,
  profileImage: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
  coverVideo: 'https://example.com/video1.mp4',
  coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1470',
  highlights: [
    { id: '1', title: 'Game Winner', url: 'https://example.com/highlight1.mp4', thumbnail: 'https://images.unsplash.com/photo-1631194758628-71ec7c35137e?q=80&w=1374' },
    { id: '2', title: 'Season Highlights', url: 'https://example.com/highlight2.mp4', thumbnail: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1449' },
    { id: '3', title: 'Skills Demo', url: 'https://example.com/highlight3.mp4', thumbnail: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1470' }
  ],
  stats: {
    height: '6\'2"',
    weight: '175 lbs',
    gpa: 3.8,
    goals: 25,
    assists: 12,
    speed: '4.5s'
  },
  skills: ['Speed', 'Vision', 'Finishing'],
  story: "I've been playing soccer since I was 5 years old. My passion for the game started when my father took me to see AC Milan play. Since then, I've been dedicated to improving my skills and reaching the highest level possible. I hope to play professionally one day and represent my country in international competitions.",
  lifestyle: [
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=1470',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470',
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1449'
  ],
  academicScores: {
    sat: 1350,
    toefl: 105
  },
  engagement: {
    views: 78,
    savedBy: 7,
    followedBy: 12
  }
};

const EnhancedAthleteProfile = () => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [isCoachView, setIsCoachView] = useState(false);
  
  return (
    <div className="flex flex-col space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <img 
          src={mockAthlete.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover opacity-70"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
          <div className="flex items-end space-x-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden">
                <img 
                  src={mockAthlete.profileImage} 
                  alt={mockAthlete.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {mockAthlete.verified && (
                <div className="absolute bottom-0 right-0 bg-highlyt-blue text-white h-6 w-6 rounded-full flex items-center justify-center border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-white">
              <h1 className="text-2xl font-bold">{mockAthlete.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{mockAthlete.sport}</span>
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{mockAthlete.position}</span>
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">Class of {mockAthlete.graduationYear}</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <span>{mockAthlete.city}, {mockAthlete.nationality}</span>
                <span>•</span>
                <span>{mockAthlete.age} years old</span>
              </div>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Connect
            </Button>
            <Button size="sm" variant="secondary" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-white/20 border-transparent text-white hover:bg-white/30 hover:text-white">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      {/* Coach View Toggle */}
      <div className="flex justify-end">
        <label className="flex items-center cursor-pointer">
          <span className="text-sm mr-2">Coach View</span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={isCoachView}
              onChange={() => setIsCoachView(!isCoachView)}
            />
            <div className={`block w-10 h-6 rounded-full transition-colors ${
              isCoachView ? 'bg-highlyt-blue' : 'bg-gray-300'
            }`}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
              isCoachView ? 'translate-x-4' : ''
            }`}></div>
          </div>
        </label>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Stats & Info */}
        <div className="space-y-6">
          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">Athlete Stats</h3>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Height</p>
                <p className="font-semibold">{mockAthlete.stats.height}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Weight</p>
                <p className="font-semibold">{mockAthlete.stats.weight}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">GPA</p>
                <p className="font-semibold">{mockAthlete.stats.gpa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Goals</p>
                <p className="font-semibold">{mockAthlete.stats.goals}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Assists</p>
                <p className="font-semibold">{mockAthlete.stats.assists}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">40yd Speed</p>
                <p className="font-semibold">{mockAthlete.stats.speed}</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50">
              <Button variant="ghost" size="sm" className="w-full">View Full Stats</Button>
            </div>
          </div>
          
          {/* Academic Scores */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">Academic Scores</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-sm text-gray-500">SAT Score</p>
                <p className="font-semibold">{mockAthlete.academicScores.sat}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">TOEFL Score</p>
                <p className="font-semibold">{mockAthlete.academicScores.toefl}</p>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-50 flex justify-between">
              <Button variant="ghost" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                View CV
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>
          </div>
          
          {/* Engagement Tracker - Only visible in coach view */}
          {isCoachView && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg">Engagement</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-gray-500" />
                    Profile views this week
                  </span>
                  <span className="font-semibold">{mockAthlete.engagement.views}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Bookmark className="h-4 w-4 mr-2 text-gray-500" />
                    Saved by coaches
                  </span>
                  <span className="font-semibold">{mockAthlete.engagement.savedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm flex items-center">
                    <Trophy className="h-4 w-4 mr-2 text-gray-500" />
                    Followed by agencies
                  </span>
                  <span className="font-semibold">{mockAthlete.engagement.followedBy}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Middle & Right Columns Combined - Highlights & About */}
        <div className="md:col-span-2 space-y-6">
          {/* Video Reel / Highlights */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg">Highlights</h3>
              <Button size="sm">Upload New Highlight</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Video Player */}
              <div className="md:col-span-2 aspect-video bg-black">
                <div className="w-full h-full flex items-center justify-center text-white">
                  {/* This would be a video player in a real app */}
                  <div className="text-center">
                    <div className="mb-2">Video Player Placeholder</div>
                    <h4 className="font-medium">{mockAthlete.highlights[activeHighlight]?.title}</h4>
                  </div>
                </div>
              </div>
              
              {/* Highlight Selection */}
              <div className="border-l">
                <div className="p-3 text-sm font-medium">All Highlights</div>
                <div className="divide-y">
                  {mockAthlete.highlights.map((highlight, index) => (
                    <div 
                      key={highlight.id}
                      onClick={() => setActiveHighlight(index)}
                      className={`p-3 flex gap-3 cursor-pointer ${activeHighlight === index ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      <div className="w-20 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={highlight.thumbnail} 
                          alt={highlight.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{highlight.title}</h4>
                        <div className="flex items-center mt-1 space-x-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" /> 24
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="h-3 w-3 mr-1" /> 3
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Top Skills */}
            <div className="p-4 border-t bg-gray-50">
              <div className="text-sm font-medium mb-2">Top Skills</div>
              <div className="flex gap-2">
                {mockAthlete.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-highlyt-blue/10 text-highlyt-blue rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* About / Story Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="font-bold text-lg">Why I Play</h3>
            </div>
            <div className="p-5">
              <p className="text-gray-700 whitespace-pre-line">{mockAthlete.story}</p>
            </div>
            
            {/* Lifestyle Photos */}
            <div className="px-5 pb-5">
              <h4 className="text-sm font-medium mb-3">Lifestyle</h4>
              <div className="grid grid-cols-3 gap-3">
                {mockAthlete.lifestyle.map((photo, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                    <img 
                      src={photo} 
                      alt="Athlete lifestyle" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Share */}
            <div className="px-5 py-3 bg-gray-50 flex justify-between">
              <div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAthleteProfile;
