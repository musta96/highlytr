
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real application, you would process form submission here
    console.log('Form submitted');
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We're here to help! Reach out to our team for assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-highlyt-gray p-4 mb-4">
              <Phone className="h-6 w-6 text-highlyt-blue" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 mb-4">Mon-Fri from 8am to 5pm</p>
            <a href="tel:+1234567890" className="text-highlyt-blue hover:underline">
              +1 (234) 567-890
            </a>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-highlyt-gray p-4 mb-4">
              <Mail className="h-6 w-6 text-highlyt-blue" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-gray-600 mb-4">We'll respond within 24 hours</p>
            <a href="mailto:support@highlytr.com" className="text-highlyt-blue hover:underline">
              support@highlytr.com
            </a>
          </Card>
          
          <Card className="flex flex-col items-center text-center p-6">
            <div className="rounded-full bg-highlyt-gray p-4 mb-4">
              <MapPin className="h-6 w-6 text-highlyt-blue" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-600 mb-4">Come visit our office</p>
            <span className="text-highlyt-blue">
              123 Athletic Ave, San Francisco, CA
            </span>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={6}
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">Send Message</Button>
            </form>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Card className="mb-4">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How do I create an account?</h3>
                <p className="text-gray-600">
                  You can create an account by clicking the "Sign up" button in the top right corner of the page and following the registration process.
                </p>
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Is HighLytr free to use?</h3>
                <p className="text-gray-600">
                  We offer both free and premium subscription plans. The free plan includes basic features, while premium plans offer additional benefits.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">How can colleges find athletes on the platform?</h3>
                <p className="text-gray-600">
                  College coaches can search for athletes using various filters including sport, position, academic achievements, and more.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
