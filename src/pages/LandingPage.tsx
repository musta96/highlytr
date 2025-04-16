
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Trophy, User, School, Building, Video, CheckCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <span className="text-highlyt-blue">Light Up Your Future</span><br />
                Athletic Career
              </h1>
              <p className="text-xl text-muted-foreground">
                Connecting international athletes with U.S. colleges through 
                video highlights and smart matchmaking.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
                <p className="text-sm text-gray-600">
                  Trusted by <span className="font-semibold">200+</span> athletes and <span className="font-semibold">50+</span> colleges
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full w-full rounded-lg overflow-hidden shadow-xl">
                <AspectRatio ratio={16/9}>
                  <img 
                    src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1170" 
                    alt="Athletes in action" 
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">HighLytr For Everyone</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Athletes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <User size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">For Athletes</h3>
                <p className="text-muted-foreground mb-4">
                  Showcase your skills, connect with colleges, and take control of your athletic future.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link to="/for-athletes">Learn More</Link>
                </Button>
              </div>
            </div>
            
            {/* Colleges */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <School size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">For Colleges</h3>
                <p className="text-muted-foreground mb-4">
                  Discover talented athletes that match your program's needs and streamline recruitment.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link to="/for-colleges">Learn More</Link>
                </Button>
              </div>
            </div>
            
            {/* Agencies */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <Building size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">For Agencies</h3>
                <p className="text-muted-foreground mb-4">
                  Represent athletes effectively and build stronger connections with collegiate programs.
                </p>
                <Button asChild variant="default" className="w-full">
                  <Link to="/for-agencies">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why HighLytr?</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            The most comprehensive platform for international athlete recruitment
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-highlyt-blue/20 flex items-center justify-center mb-4">
                <Video className="text-highlyt-blue" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Highlight Videos</h3>
              <p className="text-muted-foreground">
                Upload, organize, and share your best athletic moments in stunning quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-highlyt-blue/20 flex items-center justify-center mb-4">
                <Shield className="text-highlyt-blue" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Profiles</h3>
              <p className="text-muted-foreground">
                Trust in our verification process for authentic connections between athletes and institutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-highlyt-blue/20 flex items-center justify-center mb-4">
                <Trophy className="text-highlyt-blue" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-muted-foreground">
                Our algorithm connects athletes with colleges that match their skills and aspirations.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/how-it-works">How It Works <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Athletes Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Athletes</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Discover some of our talented athletes looking to compete at the collegiate level
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={`https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=250`} 
                    alt="Athlete" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold">Alex Johnson</h3>
                    <p className="text-white/80 text-sm">Soccer • Forward</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link to="/athletes">View All Athletes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Real athletes who found their perfect collegiate match through HighLytr
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e" 
                  alt="Success story" 
                  className="w-full object-cover aspect-video"
                />
              </div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <blockquote className="text-xl italic">
                "HighLytr helped me connect with coaches I never would have reached otherwise. Now I'm playing Division I!"
              </blockquote>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-bold">Maria Rodriguez</p>
                  <p className="text-sm text-gray-600">Volleyball, UCLA</p>
                </div>
              </div>
              <Button asChild className="mt-4">
                <Link to="/success-stories">Read More Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Teaser */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How HighLytr Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-highlyt-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as an athlete, college, or agency and build your comprehensive profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-highlyt-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">2. Showcase Your Talent</h3>
              <p className="text-gray-600">
                Athletes upload highlight videos, colleges showcase their programs, agencies present their services.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-highlyt-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-highlyt-blue" />
              </div>
              <h3 className="font-bold text-xl mb-2">3. Make Connections</h3>
              <p className="text-gray-600">
                Connect directly through our platform and turn potential into opportunity.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/how-it-works">Learn More About Our Process</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-highlyt-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to elevate your game?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join thousands of athletes, colleges, and agencies already on HighLytr.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="px-8">
              <Link to="/register">Get Started Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white">
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
