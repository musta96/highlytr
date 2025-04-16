
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Rocket, 
  VideoIcon, 
  ChartIcon, 
  MessageCircle, 
  Star, 
  CheckCircle 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="bg-highlyt-blue/10 p-3 rounded-full inline-block mb-4">
      <Icon className="h-8 w-8 text-highlyt-blue" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ForAthletes = () => {
  const athleteFeatures = [
    {
      icon: Rocket,
      title: "Create Your Free Profile",
      description: "Build a standout digital resume that catches college scouts' eyes."
    },
    {
      icon: VideoIcon,
      title: "Showcase Your Highlights",
      description: "Upload your best performances and let your skills speak volumes."
    },
    {
      icon: ChartIcon,
      title: "Track Your Progress",
      description: "Monitor your visibility and climb the Top Recruits leaderboard."
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Connect directly with colleges and agencies through our platform."
    }
  ];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-highlyt-blue/10 to-highlyt-green/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Your Gateway to U.S. College Sports
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              HighLytr empowers international athletes to showcase their talents and connect directly with U.S. college coaches.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg" className="animate-pulse-glow hover:shadow-xl">
                  <Star className="mr-2" /> Start Your Journey
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {athleteFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>

          <div className="mt-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Why Athletes Love HighLytr
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle, text: "No Agency Fees" },
                  { icon: CheckCircle, text: "Global Opportunities" },
                  { icon: CheckCircle, text: "Direct Coach Access" }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center justify-center gap-3">
                    <Icon className="text-highlyt-green h-6 w-6" />
                    <span className="text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForAthletes;
