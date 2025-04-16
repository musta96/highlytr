
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Trophy, User, School, Building } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const LandingPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Your athletic career<br />
                <span className="text-highlyt-blue">starts here</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect athletes with colleges and sports agencies through 
                video highlights and smart matchmaking.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="px-8">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
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
          <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Athletes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <User size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Athletes</h3>
                <p className="text-muted-foreground mb-4">
                  Showcase your skills, connect with colleges, and take control of your athletic future.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register?type=athlete">Create Athlete Profile</Link>
                </Button>
              </div>
            </div>
            
            {/* Colleges */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <School size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Colleges</h3>
                <p className="text-muted-foreground mb-4">
                  Discover talented athletes that match your program's needs and streamline recruitment.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register?type=college">Register Your College</Link>
                </Button>
              </div>
            </div>
            
            {/* Agencies */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 bg-highlyt-blue/10 flex items-center justify-center">
                <Building size={64} className="text-highlyt-blue" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Agencies</h3>
                <p className="text-muted-foreground mb-4">
                  Represent athletes effectively and build stronger connections with collegiate programs.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register?type=agency">Register Your Agency</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 rounded-full bg-highlyt-blue/20 flex items-center justify-center mb-4">
                <Star className="text-highlyt-blue" size={24} />
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
              <Link to="/register">Join HighLytr Today <ArrowRight className="ml-2" size={16} /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial cards would go here */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-muted">
              <p className="italic mb-4">
                "HighLytr helped me connect with coaches I never would have reached otherwise. Now I'm playing Division I!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">Basketball Player</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-muted">
              <p className="italic mb-4">
                "Our recruitment process has been streamlined significantly. We've found amazing talent through HighLytr."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Coach Sarah Miller</p>
                  <p className="text-sm text-muted-foreground">State University</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-muted">
              <p className="italic mb-4">
                "As an agency, HighLytr has revolutionized how we connect our athletes with the right opportunities."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Michael Torres</p>
                  <p className="text-sm text-muted-foreground">Elite Sports Agency</p>
                </div>
              </div>
            </div>
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
          <Button asChild size="lg" variant="secondary" className="px-8">
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
