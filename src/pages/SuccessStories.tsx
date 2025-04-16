
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Quote, MapPin, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Maria Rodriguez",
      from: "Brazil",
      sport: "Volleyball",
      college: "University of California, Los Angeles",
      image: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff",
      quote: "HighLytr connected me with my dream school. I'm now playing Division I volleyball on a full scholarship!",
      background: "I'd been playing volleyball since I was 8 years old in São Paulo. I always dreamed of competing at the highest level, but didn't know how to connect with U.S. colleges until I found HighLytr."
    },
    {
      id: 2,
      name: "Sven Eriksson",
      from: "Sweden",
      sport: "Soccer",
      college: "Ohio State University",
      image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781",
      quote: "As an international student, I thought U.S. college sports were out of reach. HighLytr made the impossible possible.",
      background: "Growing up in Stockholm, I played for my local club while focusing on academics. HighLytr helped me find a program that valued both my athletic abilities and academic goals."
    },
    {
      id: 3,
      name: "Coach Sarah Thompson",
      from: "United States",
      role: "Women's Soccer Coach",
      college: "Pacific University",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
      quote: "HighLytr revolutionized our international recruitment. We've found amazing talent we would have missed through traditional channels.",
      background: "Before HighLytr, international recruitment was costly and time-consuming. Now we can directly connect with athletes worldwide who match our program needs."
    },
  ];

  return (
    <Layout>
      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real athletes, real colleges, real success. Discover how HighLytr helps connect international talent with U.S. college opportunities.
          </p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <div key={story.id}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                <div className="md:w-1/2">
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-6">
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{story.from}</span>
                    {story.sport && (
                      <>
                        <span className="mx-2">•</span>
                        <Trophy className="h-4 w-4" />
                        <span>{story.sport}</span>
                      </>
                    )}
                  </div>
                  
                  <h2 className="text-3xl font-bold">{story.name}</h2>
                  <div>
                    <div className="text-highlyt-blue font-medium">
                      {story.role || "Student-Athlete"}
                    </div>
                    <div className="font-medium">{story.college}</div>
                  </div>
                  
                  <blockquote className="border-l-4 border-highlyt-blue pl-4 italic">
                    "{story.quote}"
                  </blockquote>
                  
                  <p className="text-gray-600">{story.background}</p>
                </div>
              </div>
              
              {index < stories.length - 1 && (
                <Separator className="my-16" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold text-center mb-6">More Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-gray-300 mb-2" />
                <p className="italic mb-4">
                  "Thanks to HighLytr, I received multiple scholarship offers from Division II schools."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Yuki Tanaka</p>
                    <p className="text-sm text-gray-500">Tennis, Japan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-gray-300 mb-2" />
                <p className="italic mb-4">
                  "As a small agency, HighLytr has allowed us to compete with the big players in athlete placement."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">James Wilson</p>
                    <p className="text-sm text-gray-500">Elite Sports Agency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-gray-300 mb-2" />
                <p className="italic mb-4">
                  "The quality of tennis prospects we've found through HighLytr has elevated our entire program."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Coach David Miller</p>
                    <p className="text-sm text-gray-500">Georgetown University</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 bg-highlyt-blue text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Success Story Today</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of athletes, colleges, and agencies already connecting on HighLytr.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white" asChild>
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
