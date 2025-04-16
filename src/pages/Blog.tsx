
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'How to Create a Standout Athlete Profile',
      excerpt: 'Tips and tricks to make your athletic profile shine to college recruiters.',
      date: 'April 10, 2025',
      author: 'Coach Thompson',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'The Recruitment Process: What to Expect',
      excerpt: 'A step-by-step guide to the college sports recruitment journey.',
      date: 'April 3, 2025',
      author: 'Sarah Johnson',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'International Athletes: Navigating NCAA Requirements',
      excerpt: 'Understanding eligibility and requirements for international student-athletes.',
      date: 'March 25, 2025',
      author: 'Miguel Rodriguez',
      image: '/placeholder.svg'
    }
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HighLytr Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and stories to help athletes navigate their athletic journey
          </p>
        </div>
        
        <Separator className="my-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{post.date} • {post.author}</div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a href={`/blog/${post.id}`} className="text-highlyt-blue font-medium hover:underline">
                  Read more →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
