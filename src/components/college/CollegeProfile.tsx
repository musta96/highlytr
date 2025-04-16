
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  ExternalLink, 
  MapPin, 
  Award, 
  Users, 
  BookOpen, 
  Building, 
  User,
  Share2,
  Bookmark,
  Mail
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

// Mock data for college profile
const mockCollege = {
  id: '1',
  name: 'Riverside University',
  verified: true,
  location: 'Chicago, Illinois',
  division: 'NCAA Division I',
  conference: 'Big Ten Conference',
  foundedYear: 1892,
  enrollmentSize: 32000,
  logoImage: 'https://images.unsplash.com/photo-1599408684896-c43901908358?q=80&w=1470',
  coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1470',
  description: 'Riverside University is committed to academic and athletic excellence. Our sports programs have a rich history of success, with multiple national championships and a strong focus on student-athlete development.',
  sportsPrograms: [
    { id: '1', name: 'Men\'s Basketball', division: 'Division I', needsPositions: ['Point Guard', 'Center'] },
    { id: '2', name: 'Women\'s Soccer', division: 'Division I', needsPositions: ['Forward', 'Goalkeeper'] },
    { id: '3', name: 'Baseball', division: 'Division I', needsPositions: ['Pitcher'] },
    { id: '4', name: 'Swimming', division: 'Division I', needsPositions: ['Freestyle', 'Butterfly'] },
    { id: '5', name: 'Track & Field', division: 'Division I', needsPositions: ['Long Distance'] }
  ],
  coaches: [
    { id: '1', name: 'Robert Johnson', title: 'Head Basketball Coach', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374', sport: 'Basketball' },
    { id: '2', name: 'Maria Rodriguez', title: 'Head Soccer Coach', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471', sport: 'Soccer' },
    { id: '3', name: 'James Wilson', title: 'Head Swimming Coach', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1476', sport: 'Swimming' }
  ],
  admissionInfo: {
    acceptanceRate: '68%',
    averageGPA: 3.6,
    averageSAT: 1280,
    applicationDeadline: 'January 15, 2025',
    athleticScholarships: true
  }
};

const CollegeProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex flex-col space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <img 
          src={mockCollege.coverImage} 
          alt={`${mockCollege.name} campus`} 
          className="w-full h-full object-cover opacity-70"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
          <div className="flex items-end space-x-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src={mockCollege.logoImage} 
                  alt={mockCollege.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {mockCollege.verified && (
                <div className="absolute bottom-0 right-0 bg-highlyt-blue text-white h-6 w-6 rounded-full flex items-center justify-center border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-white">
              <h1 className="text-2xl font-bold">{mockCollege.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{mockCollege.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">{mockCollege.division}</Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">{mockCollege.conference}</Badge>
              </div>
            </div>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            <Button size="sm" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Contact
            </Button>
            <Button size="sm" variant="secondary" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-white/20 border-transparent text-white hover:bg-white/30 hover:text-white">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
          <TabsTrigger value="admissions">Admissions</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">About {mockCollege.name}</h2>
            <p className="text-gray-700">{mockCollege.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Founded</h3>
                <p className="text-lg font-semibold">{mockCollege.foundedYear}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Enrollment</h3>
                <p className="text-lg font-semibold">{mockCollege.enrollmentSize.toLocaleString()} students</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Athletic Division</h3>
                <p className="text-lg font-semibold">{mockCollege.division}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Conference</h3>
                <p className="text-lg font-semibold">{mockCollege.conference}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2">
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg">Featured Programs</h3>
              </div>
              <div className="p-5 space-y-4">
                {mockCollege.sportsPrograms.slice(0, 3).map(program => (
                  <div key={program.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h4 className="font-semibold">{program.name}</h4>
                      <p className="text-sm text-muted-foreground">{program.division}</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
                <div className="pt-3">
                  <Button variant="ghost" onClick={() => setActiveTab('programs')} className="w-full">
                    View All Programs
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg">Contact Information</h3>
              </div>
              <div className="p-5 space-y-4">
                <Button variant="outline" className="w-full gap-2">
                  <Mail className="h-4 w-4" />
                  Email Admissions
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Athletic Department
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Visit Official Website
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Sports Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCollege.sportsPrograms.map(program => (
                <div key={program.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4 border-b">
                    <h3 className="font-semibold">{program.name}</h3>
                    <p className="text-sm text-muted-foreground">{program.division}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {program.needsPositions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Recruiting Needs</h4>
                        <div className="flex flex-wrap gap-2">
                          {program.needsPositions.map((position, idx) => (
                            <Badge key={idx} variant="outline">{position}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Program Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Coaches Tab */}
        <TabsContent value="coaches" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Coaching Staff</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCollege.coaches.map(coach => (
                <div key={coach.id} className="border rounded-lg overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={coach.image} 
                      alt={coach.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg">{coach.name}</h3>
                    <p className="text-muted-foreground">{coach.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">Sport: {coach.sport}</p>
                    <div className="mt-auto pt-4">
                      <Button className="w-full">View Profile</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Admissions Tab */}
        <TabsContent value="admissions" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Admissions Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Acceptance Rate</h3>
                <p className="text-lg font-semibold">{mockCollege.admissionInfo.acceptanceRate}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Average GPA</h3>
                <p className="text-lg font-semibold">{mockCollege.admissionInfo.averageGPA}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Average SAT</h3>
                <p className="text-lg font-semibold">{mockCollege.admissionInfo.averageSAT}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Application Deadline</h3>
                <p className="text-lg font-semibold">{mockCollege.admissionInfo.applicationDeadline}</p>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg mb-3">Athletic Scholarships</h3>
            <p className="text-gray-700 mb-6">
              {mockCollege.admissionInfo.athleticScholarships 
                ? 'Athletic scholarships are available for qualified student-athletes. Scholarship amounts vary by sport and individual merit.' 
                : 'This institution does not offer athletic scholarships.'}
            </p>
            
            <div className="bg-highlyt-blue/10 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-highlyt-blue mb-1">Interested in applying?</h3>
                <p className="text-gray-700 mb-4 md:mb-0">Contact the admissions office to learn more about the process.</p>
              </div>
              <Button className="whitespace-nowrap">Contact Admissions</Button>
            </div>
          </div>
        </TabsContent>
        
        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">How do I express interest in a sports program?</h3>
                <p className="text-gray-700">
                  You can express interest by contacting the coaching staff directly through our platform, or by attending one of our recruiting events. Many coaches also accept highlight videos and athletic resumes.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">What athletic scholarships are available?</h3>
                <p className="text-gray-700">
                  Scholarship availability varies by sport. NCAA Division I programs typically offer more scholarship opportunities than Division II or III. Contact the specific program coach for detailed information.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Do you have walk-on opportunities?</h3>
                <p className="text-gray-700">
                  Yes, many of our teams offer walk-on opportunities for student athletes. These positions are competitive, and we recommend contacting the coaching staff in advance to learn about tryout dates.
                </p>
              </div>
              
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">What are the academic requirements for athletes?</h3>
                <p className="text-gray-700">
                  Student-athletes must maintain good academic standing with a minimum GPA of 2.5. NCAA eligibility requirements also apply to all varsity athletes.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can international students participate in athletics?</h3>
                <p className="text-gray-700">
                  Yes, we welcome international student-athletes. International students must meet both academic and athletic eligibility requirements, and may need to provide additional documentation.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeProfile;
