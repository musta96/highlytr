
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  UserCircle, 
  Video, 
  Search, 
  MessageSquare, 
  Trophy, 
  Building, 
  Filter, 
  Users, 
  Check, 
  DollarSign 
} from 'lucide-react';

const HowItWorks = () => {
  const athleteSteps = [
    {
      icon: <UserCircle className="h-8 w-8 text-highlyt-blue" />,
      title: 'Create Your Free Profile',
      description: 'Sign up and build your personalized athletic resume. Add your name, sport, nationality, GPA, bio, and highlight videos.'
    },
    {
      icon: <Video className="h-8 w-8 text-highlyt-blue" />,
      title: 'Upload Your Highlights',
      description: 'Showcase your best performances with video uploads. Videos can be public, private, or shared only with connected users.'
    },
    {
      icon: <Search className="h-8 w-8 text-highlyt-blue" />,
      title: 'Get Discovered',
      description: 'Colleges and certified agencies use HighLytr\'s powerful filters to find talent like yours.'
    },
    {
      icon: <Trophy className="h-8 w-8 text-highlyt-blue" />,
      title: 'Track Progress',
      description: 'Use the progress tracker to complete your profile, unlock achievements, and climb our monthly "Top Recruits" leaderboard.'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-highlyt-blue" />,
      title: 'Connect & Communicate',
      description: 'Use in-platform messaging to speak directly with college staff or your agency rep.'
    }
  ];

  const collegeSteps = [
    {
      icon: <Building className="h-8 w-8 text-highlyt-blue" />,
      title: 'Register and Verify',
      description: 'Sign up with your .edu email to create a verified account. Add your college profile, available sports, and roster openings.'
    },
    {
      icon: <Filter className="h-8 w-8 text-highlyt-blue" />,
      title: 'Search for Talent',
      description: 'Use advanced filters to scout athletes by sport, GPA, graduation year, nationality, video views, and more.'
    },
    {
      icon: <Users className="h-8 w-8 text-highlyt-blue" />,
      title: 'Contact Athletes',
      description: 'Initiate secure messaging directly through the platform. Keep your scouting organized in folders.'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-highlyt-blue" />,
      title: 'Collaborate Internally',
      description: 'Invite coaching staff or admissions officers to your college account to share lists and recruit collaboratively.'
    }
  ];

  const agencySteps = [
    {
      icon: <Check className="h-8 w-8 text-highlyt-blue" />,
      title: 'Apply & Get Verified',
      description: 'Submit your agency for review and approval. Create a professional agency profile and add your roster of managed athletes.'
    },
    {
      icon: <Users className="h-8 w-8 text-highlyt-blue" />,
      title: 'Manage Athlete Profiles',
      description: 'Build and maintain athlete profiles — highlight stats, upload videos, track activity.'
    },
    {
      icon: <Search className="h-8 w-8 text-highlyt-blue" />,
      title: 'Search Colleges',
      description: 'Find the right U.S. programs for your athletes. Reach out directly to coaches and track the outreach process.'
    },
    {
      icon: <Trophy className="h-8 w-8 text-highlyt-blue" />,
      title: 'Track Placements',
      description: 'Monitor where your athletes are in the recruiting journey — from first contact to offer.'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-highlyt-blue" />,
      title: 'Only Pay on Success',
      description: 'Our agency model is results-driven: you only pay a small success fee once your athlete is successfully recruited.'
    }
  ];

  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-highlyt-blue">HighLytr</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between international athletes and U.S. college opportunities — without the hassle, barriers, or agency fees.
          </p>
        </div>

        {/* Athletes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">🧑‍🎓 For Athletes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {athleteSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Colleges Section */}
        <section className="mb-16 bg-gray-50 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">🎓 For Colleges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container">
            {collegeSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agencies Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">🧑‍💼 For Agencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {agencySteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;
