
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

const Help = () => {
  // Categories of help articles
  const categories = [
    { id: 'account', label: 'Account & Profile' },
    { id: 'athletes', label: 'For Athletes' },
    { id: 'colleges', label: 'For Colleges' },
    { id: 'agencies', label: 'For Agencies' },
    { id: 'technical', label: 'Technical Support' }
  ];
  
  // Sample help articles
  const helpArticles = {
    account: [
      { id: 1, title: 'How to create an account', views: 1240 },
      { id: 2, title: 'Updating your profile information', views: 986 },
      { id: 3, title: 'Changing your password', views: 754 },
      { id: 4, title: 'Managing notification settings', views: 621 },
      { id: 5, title: 'Deleting your account', views: 543 }
    ],
    athletes: [
      { id: 6, title: 'Creating your athletic profile', views: 1567 },
      { id: 7, title: 'Uploading highlight videos', views: 1342 },
      { id: 8, title: 'Getting discovered by colleges', views: 1298 },
      { id: 9, title: 'Communicating with coaches', views: 987 },
      { id: 10, title: 'Managing your academic information', views: 876 }
    ],
    colleges: [
      { id: 11, title: 'Setting up a college profile', views: 876 },
      { id: 12, title: 'Finding athletes by criteria', views: 765 },
      { id: 13, title: 'Managing your coaching staff', views: 654 },
      { id: 14, title: 'Creating recruitment campaigns', views: 543 },
      { id: 15, title: 'Tracking athlete interactions', views: 432 }
    ],
    agencies: [
      { id: 16, title: 'Setting up an agency profile', views: 765 },
      { id: 17, title: 'Adding athletes to your roster', views: 654 },
      { id: 18, title: 'Creating marketing packages', views: 543 },
      { id: 19, title: 'Promoting athletes to colleges', views: 432 },
      { id: 20, title: 'Managing athlete relationships', views: 321 }
    ],
    technical: [
      { id: 21, title: 'Troubleshooting login issues', views: 987 },
      { id: 22, title: 'Video upload problems', views: 876 },
      { id: 23, title: 'Browser compatibility', views: 765 },
      { id: 24, title: 'Mobile app installation', views: 654 },
      { id: 25, title: 'Data synchronization issues', views: 543 }
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
            <Input placeholder="Search for help..." className="pl-10" />
            <Button className="absolute right-0 top-0 rounded-l-none">
              Search
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="account" className="mb-12">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
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
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <div className="text-sm text-gray-500">{article.views} views</div>
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="default">
              Contact Support
            </Button>
            <Button variant="outline">
              Submit a Ticket
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
