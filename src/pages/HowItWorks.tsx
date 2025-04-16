
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
  DollarSign,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-highlyt-blue">HighLytr</span> Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bridging the gap between international athletes and U.S. college opportunities — without the hassle, barriers, or agency fees.
          </p>
        </div>

        {/* Athletes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="inline-flex items-center">
              🧑‍🎓 <span className="ml-2">For Athletes</span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {athleteSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center hover:shadow-md transition-all 
                  hover:-translate-y-1 hover:shadow-lg hover-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex justify-center transform transition-transform hover:scale-110">{step.icon}</div>
                <div className="relative">
                  <div className="absolute -top-8 -left-3 text-4xl font-bold opacity-10 text-highlyt-blue">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2 hover-underline-animation">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/for-athletes">
              <Button className="mt-4 group">
                Learn More About Athlete Process
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Colleges Section */}
        <section className="mb-16 bg-gray-50 py-16 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="inline-flex items-center">
              🎓 <span className="ml-2">For Colleges</span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container">
            {collegeSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center hover-glow hover-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex justify-center bg-gray-50 p-3 rounded-full w-16 h-16 items-center mx-auto transition-transform hover:rotate-12">{step.icon}</div>
                <div className="relative">
                  <div className="absolute -top-8 -left-3 text-4xl font-bold opacity-10 text-highlyt-blue">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-lg mb-2 hover-underline-animation">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/for-colleges">
              <Button variant="outline" className="mt-4 group">
                Learn More About College Process
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Agencies Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="inline-flex items-center">
              🧑‍💼 <span className="ml-2">For Agencies</span>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {agencySteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm text-center relative overflow-hidden hover-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 right-0 bg-highlyt-blue text-white px-2 py-1 text-xs font-bold rounded-bl">
                  Step {index + 1}
                </div>
                <div className="mb-4 flex justify-center">
                  <div className="p-3 rounded-full bg-highlyt-blue/10 transition-all hover:bg-highlyt-blue/20">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 hover-underline-animation">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/for-agencies">
              <Button variant="outline" className="mt-4 group">
                Learn More About Agency Process
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Why It Works Section */}
        <section className="mt-16 bg-gradient-blue-green text-white p-8 rounded-lg animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">🌍 Why It Works</h2>
            <ul className="space-y-4">
              <li className="flex items-start hover-card p-3 bg-white/10 rounded-lg">
                <Check className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>No middlemen. No overpriced agencies.</span>
              </li>
              <li className="flex items-start hover-card p-3 bg-white/10 rounded-lg">
                <Check className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>Built for international athletes, first.</span>
              </li>
              <li className="flex items-start hover-card p-3 bg-white/10 rounded-lg">
                <Check className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>Smart tools that make recruiting easy, fair, and direct.</span>
              </li>
              <li className="flex items-start hover-card p-3 bg-white/10 rounded-lg">
                <Check className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>All-in-one platform — profiles, videos, messages, discovery.</span>
              </li>
              <li className="flex items-start hover-card p-3 bg-white/10 rounded-lg">
                <Check className="h-6 w-6 mr-3 flex-shrink-0" />
                <span>Free for everyone during launch phase.</span>
              </li>
            </ul>
            <div className="text-center mt-8">
              <Link to="/register">
                <Button variant="secondary" size="lg" className="animate-pulse-glow">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HowItWorks;
