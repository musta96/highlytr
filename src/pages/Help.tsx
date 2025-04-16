
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ArrowRight, BookOpen, CheckCircle, FileText, ShieldCheck, Zap } from 'lucide-react';

const Help = () => {
  // Categories of help articles
  const categories = [
    { id: 'account', label: 'Account & Profile', icon: <ShieldCheck className="h-5 w-5" /> },
    { id: 'athletes', label: 'For Athletes', icon: <Zap className="h-5 w-5" /> },
    { id: 'colleges', label: 'For Colleges', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'agencies', label: 'For Agencies', icon: <FileText className="h-5 w-5" /> },
    { id: 'technical', label: 'Technical Support', icon: <CheckCircle className="h-5 w-5" /> }
  ];
  
  // More detailed help articles
  const helpArticles = {
    account: [
      { 
        id: 1, 
        title: 'How to create an account', 
        description: 'Step-by-step guide for creating your HighLytr account securely',
        views: 1240 
      },
      { 
        id: 2, 
        title: 'Updating your profile information', 
        description: 'Learn how to keep your profile details current and complete',
        views: 986 
      },
      { 
        id: 3, 
        title: 'Changing your password', 
        description: 'Instructions for updating your password and securing your account',
        views: 754 
      },
      { 
        id: 4, 
        title: 'Managing notification settings', 
        description: 'Customize which alerts and updates you receive from HighLytr',
        views: 621 
      },
      { 
        id: 5, 
        title: 'Deleting your account', 
        description: 'How to remove your information from our platform if needed',
        views: 543 
      }
    ],
    athletes: [
      { 
        id: 6, 
        title: 'Creating your athletic profile', 
        description: 'Tips for building an impressive athletic profile that stands out',
        views: 1567 
      },
      { 
        id: 7, 
        title: 'Uploading highlight videos', 
        description: 'Best practices for sharing your best moments with coaches',
        views: 1342 
      },
      { 
        id: 8, 
        title: 'Getting discovered by colleges', 
        description: 'Strategies to increase your visibility to college recruiters',
        views: 1298 
      },
      { 
        id: 9, 
        title: 'Communicating with coaches', 
        description: 'Etiquette and tips for effective communication with coaches',
        views: 987 
      },
      { 
        id: 10, 
        title: 'Managing your academic information', 
        description: 'How to present your academic achievements alongside athletic abilities',
        views: 876 
      }
    ],
    colleges: [
      { 
        id: 11, 
        title: 'Setting up a college profile', 
        description: 'Create an appealing profile to attract potential recruits',
        views: 876 
      },
      { 
        id: 12, 
        title: 'Finding athletes by criteria', 
        description: 'Using filters to discover athletes who match your program needs',
        views: 765 
      },
      { 
        id: 13, 
        title: 'Managing your coaching staff', 
        description: 'Adding and organizing your coaching team on the platform',
        views: 654 
      },
      { 
        id: 14, 
        title: 'Creating recruitment campaigns', 
        description: 'Setting up targeted outreach to potential recruits',
        views: 543 
      },
      { 
        id: 15, 
        title: 'Tracking athlete interactions', 
        description: 'Monitoring and managing communications with prospects',
        views: 432 
      }
    ],
    agencies: [
      { 
        id: 16, 
        title: 'Setting up an agency profile', 
        description: 'Best practices for agency representation on HighLytr',
        views: 765 
      },
      { 
        id: 17, 
        title: 'Adding athletes to your roster', 
        description: 'How to connect with and represent athletes on the platform',
        views: 654 
      },
      { 
        id: 18, 
        title: 'Creating marketing packages', 
        description: 'Developing effective promotional materials for your athletes',
        views: 543 
      },
      { 
        id: 19, 
        title: 'Promoting athletes to colleges', 
        description: 'Strategies for highlighting your athletes to college recruiters',
        views: 432 
      },
      { 
        id: 20, 
        title: 'Managing athlete relationships', 
        description: 'Building and maintaining strong partnerships with your athletes',
        views: 321 
      }
    ],
    technical: [
      { 
        id: 21, 
        title: 'Troubleshooting login issues', 
        description: 'Solutions for common account access problems',
        views: 987 
      },
      { 
        id: 22, 
        title: 'Video upload problems', 
        description: 'Fixing issues with uploading highlight reels and videos',
        views: 876 
      },
      { 
        id: 23, 
        title: 'Browser compatibility', 
        description: 'Supported browsers and troubleshooting display issues',
        views: 765 
      },
      { 
        id: 24, 
        title: 'Mobile app installation', 
        description: 'Guide for downloading and setting up the HighLytr mobile app',
        views: 654 
      },
      { 
        id: 25, 
        title: 'Data synchronization issues', 
        description: 'Resolving problems with profile data not updating properly',
        views: 543 
      }
    ]
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to get the most out of HighLytr
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search for help articles..." className="pl-10" />
            <Button className="absolute right-0 top-0 rounded-l-none">
              Search
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="account" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {helpArticles[category.id as keyof typeof helpArticles].map(article => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <a href={`/help/article/${article.id}`} className="block">
                        <h3 className="font-semibold text-lg mb-2 text-highlyt-blue">{article.title}</h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{article.views} views</span>
                          <span className="text-sm text-highlyt-blue flex items-center gap-1">
                            Read more <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="bg-highlyt-gray rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is always ready to assist you with any questions or issues.
          </p>
          <Button variant="default">
            Contact Support
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
