
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Placeholder feed data
const placeholderFeed = [
  {
    id: 1,
    type: 'highlight',
    author: {
      name: 'Michael Jordan',
      role: 'Basketball Player',
      avatar: '/placeholder.svg'
    },
    content: 'Just uploaded my latest highlight reel! Check it out and let me know what you think.',
    video: '/placeholder.svg',
    timestamp: '2h ago',
    likes: 245,
    comments: 37
  },
  {
    id: 2,
    type: 'article',
    author: {
      name: 'Coach Stevens',
      role: 'College Recruiter',
      avatar: '/placeholder.svg'
    },
    content: 'New article: "10 Things College Recruiters Look For In Highlight Videos" - A must-read for all aspiring athletes looking to get noticed by top programs.',
    image: '/placeholder.svg',
    timestamp: '5h ago',
    likes: 189,
    comments: 24
  },
  {
    id: 3,
    type: 'highlight',
    author: {
      name: 'Emma Thompson',
      role: 'Soccer Player',
      avatar: '/placeholder.svg'
    },
    content: 'Game-winning goal from yesterday\'s championship! Still can\'t believe we pulled it off.',
    video: '/placeholder.svg',
    timestamp: '1d ago',
    likes: 352,
    comments: 48
  },
  {
    id: 4,
    type: 'news',
    author: {
      name: 'Sports Central',
      role: 'News Outlet',
      avatar: '/placeholder.svg'
    },
    content: 'Breaking: NCAA announces new eligibility rules for transfer athletes. These changes will impact recruiting for the upcoming season.',
    image: '/placeholder.svg',
    timestamp: '1d ago',
    likes: 127,
    comments: 56
  },
  {
    id: 5,
    type: 'highlight',
    author: {
      name: 'Jamal Williams',
      role: 'Football Player',
      avatar: '/placeholder.svg'
    },
    content: 'Highlights from my senior year. Excited to see where this journey takes me next!',
    video: '/placeholder.svg',
    timestamp: '2d ago',
    likes: 289,
    comments: 32
  }
];

const FeedItem = ({ item }: { item: any }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={item.author.avatar} alt={item.author.name} />
          <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{item.author.name}</span>
          <span className="text-xs text-muted-foreground">{item.author.role} • {item.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{item.content}</p>
        
        {/* Media content */}
        {item.type === 'highlight' ? (
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
            {/* This would be a video player in a real app */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button variant="secondary" size="sm" className="bg-black/50 text-white">
                Play Highlight
              </Button>
            </div>
            <img src={item.video} alt="Video thumbnail" className="w-full h-full object-cover" />
          </div>
        ) : (
          item.image && (
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <img src={item.image} alt="Post image" className="w-full h-full object-cover" />
            </div>
          )
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
            <span>{liked ? item.likes + 1 : item.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{item.comments}</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSaved(!saved)}
        >
          <Bookmark 
            className="h-4 w-4" 
            fill={saved ? "currentColor" : "none"} 
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

const SocialFeed = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter posts based on active tab
  const filteredPosts = activeTab === 'all' 
    ? placeholderFeed
    : placeholderFeed.filter(post => post.type === activeTab);

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="all" className="w-full mb-6" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="highlight" className="flex-1">Highlights</TabsTrigger>
          <TabsTrigger value="article" className="flex-1">Articles</TabsTrigger>
          <TabsTrigger value="news" className="flex-1">News</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredPosts.map(post => (
            <FeedItem key={post.id} item={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="highlight" className="mt-6">
          {filteredPosts.map(post => (
            <FeedItem key={post.id} item={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="article" className="mt-6">
          {filteredPosts.map(post => (
            <FeedItem key={post.id} item={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="news" className="mt-6">
          {filteredPosts.map(post => (
            <FeedItem key={post.id} item={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialFeed;
