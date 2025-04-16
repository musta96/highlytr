
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  ExternalLink, 
  MapPin, 
  Users, 
  Trophy,
  Globe,
  CheckCircle,
  PhoneCall,
  Mail,
  Calendar,
  FileText,
  Share2,
  Bookmark,
  Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Mock data for agency profile
const mockAgency = {
  id: '1',
  name: 'Elite Sports Management',
  verified: true,
  location: 'New York, NY',
  founded: 2010,
  languages: ['English', 'Spanish', 'French'],
  logo: 'https://images.unsplash.com/photo-1599408684896-c43901908358?q=80&w=1470',
  coverImage: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470',
  description: 'Elite Sports Management is a full-service sports agency dedicated to representing top athletic talent across various sports. We focus on holistic athlete development, career management, and securing optimal opportunities for our clients.',
  sports: ['Basketball', 'Soccer', 'Baseball', 'Tennis', 'Golf'],
  representedAthletes: [
    { 
      id: '1', 
      name: 'Marcus Johnson', 
      sport: 'Basketball', 
      image: 'https://images.unsplash.com/photo-1610973053414-95417a4dd6a5?q=80&w=1374',
      position: 'Point Guard',
      achievements: ['College All-American', 'State Champion']
    },
    { 
      id: '2', 
      name: 'Sofia Garcia', 
      sport: 'Soccer', 
      image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=1374',
      position: 'Forward',
      achievements: ['National Team Player', 'Conference MVP']
    },
    { 
      id: '3', 
      name: 'Tyler Williams', 
      sport: 'Baseball', 
      image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1470',
      position: 'Pitcher',
      achievements: ['Perfect Game Top 100', 'Regional Champion']
    },
    { 
      id: '4', 
      name: 'Aisha Chen', 
      sport: 'Tennis', 
      image: 'https://images.unsplash.com/photo-1613679074971-91fc27180061?q=80&w=1374',
      position: 'Singles',
      achievements: ['Junior National Finalist', 'State Champion']
    }
  ],
  services: [
    'Contract Negotiation',
    'Career Development',
    'College Placement',
    'Brand Building',
    'Endorsement Opportunities',
    'Legal Support'
  ],
  stats: {
    athletesPlaced: 120,
    collegeScholarships: 85,
    professionalContracts: 35
  },
  testimonials: [
    {
      id: '1',
      name: 'Jason Rodriguez',
      quote: 'Elite Sports Management transformed my career. They secured me a full scholarship to my dream school and have been by my side every step of the way.',
      position: 'Basketball Player at Stanford University'
    },
    {
      id: '2',
      name: 'Emma Thompson',
      quote: 'The team at Elite truly cares about their athletes. They focus not just on athletic development but academic success and personal growth too.',
      position: 'Soccer Player, USC'
    }
  ],
  team: [
    {
      id: '1',
      name: 'David Chang',
      title: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470',
      bio: 'Former professional athlete with 15+ years of experience in sports management.'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Head of Athlete Development',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374',
      bio: 'Specializes in athlete performance and collegiate recruiting.'
    },
    {
      id: '3',
      name: 'Michael Lee',
      title: 'Legal Counsel',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374',
      bio: 'Sports law expert with experience in contract negotiation.'
    }
  ]
};

const AgencyProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex flex-col space-y-8">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
        <img 
          src={mockAgency.coverImage} 
          alt={`${mockAgency.name} cover`} 
          className="w-full h-full object-cover opacity-70"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
          <div className="flex items-end space-x-5">
            <div className="relative">
              <div className="h-24 w-24 rounded-lg border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                <img 
                  src={mockAgency.logo} 
                  alt={mockAgency.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {mockAgency.verified && (
                <div className="absolute bottom-0 right-0 bg-highlyt-blue text-white h-6 w-6 rounded-full flex items-center justify-center border-2 border-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-white">
              <h1 className="text-2xl font-bold">{mockAgency.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{mockAgency.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">Established {mockAgency.founded}</Badge>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30">{mockAgency.sports.length} Sports</Badge>
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
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="athletes">Athletes</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="team">Our Team</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">About {mockAgency.name}</h2>
            <p className="text-gray-700">{mockAgency.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Athletes Placed</h3>
                <p className="text-2xl font-semibold">{mockAgency.stats.athletesPlaced}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">College Scholarships</h3>
                <p className="text-2xl font-semibold">{mockAgency.stats.collegeScholarships}</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium text-muted-foreground">Professional Contracts</h3>
                <p className="text-2xl font-semibold">{mockAgency.stats.professionalContracts}</p>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Sports Covered</h3>
              <div className="flex flex-wrap gap-2">
                {mockAgency.sports.map((sport, idx) => (
                  <Badge key={idx} className="bg-highlyt-blue/10 text-highlyt-blue hover:bg-highlyt-blue/20">
                    {sport}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {mockAgency.languages.map((language, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-sm text-gray-700">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {language}
                    {idx < mockAgency.languages.length - 1 && <span className="mx-2">•</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2">
              <div className="p-5 border-b">
                <h3 className="font-bold text-lg">Featured Athletes</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockAgency.representedAthletes.slice(0, 4).map(athlete => (
                    <div key={athlete.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={athlete.image} alt={athlete.name} />
                        <AvatarFallback>{athlete.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{athlete.name}</h4>
                        <p className="text-sm text-muted-foreground">{athlete.sport} - {athlete.position}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button variant="ghost" onClick={() => setActiveTab('athletes')} className="w-full">
                    View All Athletes
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
                  Email Agency
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Request Call
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Athletes Tab */}
        <TabsContent value="athletes" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className="text-xl font-bold">Represented Athletes</h2>
              <div className="mt-3 md:mt-0">
                <Button variant="outline" size="sm">
                  Filter Athletes
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgency.representedAthletes.map(athlete => (
                <div key={athlete.id} className="border rounded-lg overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={athlete.image} 
                      alt={athlete.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{athlete.name}</h3>
                    <p className="text-sm text-muted-foreground">{athlete.sport} - {athlete.position}</p>
                    
                    {athlete.achievements && (
                      <div className="mt-3">
                        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Achievements</h4>
                        <div className="space-y-1">
                          {athlete.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <Trophy className="h-3 w-3 text-amber-500" />
                              <span className="text-xs">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button className="w-full mt-4">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline">Load More Athletes</Button>
            </div>
          </div>
        </TabsContent>
        
        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Our Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockAgency.services.map((service, idx) => (
                <div key={idx} className="border rounded-lg p-4 flex">
                  <div className="h-10 w-10 rounded-full bg-highlyt-blue/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-highlyt-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Professional {service.toLowerCase()} services tailored to each athlete's unique needs and goals.
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Testimonials</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockAgency.testimonials.map(testimonial => (
                  <div key={testimonial.id} className="bg-white p-4 rounded-lg shadow relative">
                    <div className="absolute -top-3 -left-3 h-6 w-6 bg-highlyt-blue text-white rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3" />
                    </div>
                    <p className="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockAgency.team.map(member => (
                <div key={member.id} className="text-center">
                  <div className="mb-4 relative mx-auto">
                    <div className="h-32 w-32 rounded-full overflow-hidden mx-auto">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-highlyt-blue mb-2">{member.title}</p>
                  <p className="text-sm text-gray-700">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-highlyt-blue/10 rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-highlyt-blue mb-2">Join Our Team</h3>
            <p className="mb-4">We're always looking for talented individuals passionate about sports management.</p>
            <Button>View Career Opportunities</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgencyProfile;
