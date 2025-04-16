
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Target, 
  Megaphone, 
  Rocket, 
  ArrowRight, 
  CheckCircle2,
  Users,
  Trophy,
  BarChart3
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const About = () => {
  return (
    <Layout>
      <div className="hero-pattern bg-fixed">
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-highlyt-blue-dark to-highlyt-blue text-white py-20"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">About HighLytr</h1>
              <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                The LinkedIn for international student-athletes — connecting talent with opportunity.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="container py-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Our Mission */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20"
            >
              <Card className="overflow-hidden shadow-xl border-none">
                <div className="bg-gradient-to-br from-highlyt-blue-dark via-highlyt-blue to-highlyt-green p-1">
                  <CardContent className="bg-white p-8 sm:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                      <div className="w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center bg-highlyt-blue bg-opacity-10">
                        <Globe className="w-12 h-12 md:w-16 md:h-16 text-highlyt-blue" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-highlyt-blue-dark">We believe talent is everywhere, but opportunity isn't.</h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                          Every year, thousands of international athletes miss the chance to study and compete in the U.S. 
                          because they lack the connections, resources, or visibility to be recruited. 
                          The current system is outdated, fragmented, and often unaffordable — 
                          with high agency fees and limited access to universities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.section>

            {/* How HighLytr Changes That */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-20"
            >
              <div className="text-center mb-10">
                <h2 className="inline-flex items-center text-3xl font-bold">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlyt-blue to-highlyt-green">HighLytr Changes That</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-highlyt-blue to-highlyt-green mx-auto mt-4"></div>
              </div>

              <Card className="bg-white shadow-lg overflow-hidden">
                <CardContent className="p-8">
                  <p className="text-xl font-medium text-center mb-10 max-w-3xl mx-auto">
                    We make the recruiting process simple, transparent, and direct.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-16 h-16 rounded-full bg-highlyt-blue-dark bg-opacity-10 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-highlyt-blue" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-highlyt-blue-dark">Athletes</h3>
                      <p className="text-gray-600">
                        Create professional profiles with videos, stats, academic info, and achievements — all in one place.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-16 h-16 rounded-full bg-highlyt-blue-dark bg-opacity-10 flex items-center justify-center mb-4">
                        <Trophy className="h-8 w-8 text-highlyt-blue" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-highlyt-blue-dark">Coaches</h3>
                      <p className="text-gray-600">
                        Search, discover, and connect directly with the talent you're looking for.
                      </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <div className="w-16 h-16 rounded-full bg-highlyt-blue-dark bg-opacity-10 flex items-center justify-center mb-4">
                        <BarChart3 className="h-8 w-8 text-highlyt-blue" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-highlyt-blue-dark">Agencies</h3>
                      <p className="text-gray-600">
                        Manage your athletes and expand your reach more efficiently.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* Our Vision */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-20"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3">
                  <div className="w-full aspect-square rounded-full bg-gradient-to-br from-highlyt-blue via-highlyt-green to-highlyt-blue-dark flex items-center justify-center">
                    <div className="w-4/5 h-4/5 rounded-full bg-white flex items-center justify-center">
                      <Globe className="h-20 w-20 text-highlyt-blue" />
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold mb-6 text-highlyt-blue-dark">Our Vision</h2>
                  <Card className="shadow-lg border-t-4 border-t-highlyt-green">
                    <CardContent className="p-8">
                      <p className="text-lg leading-relaxed">
                        We're starting with Italy and soccer — but our vision is global.
                        We aim to become the go-to platform for international recruiting across all sports and regions.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.section>

            {/* Our Mission */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-highlyt-blue-dark">Our Mission Is Clear</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-highlyt-blue to-highlyt-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10 group-hover:text-white transition-colors duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-highlyt-blue bg-opacity-10 group-hover:bg-white group-hover:bg-opacity-20 p-3 rounded-full mb-5 transition-colors duration-300">
                        <Target className="h-10 w-10 text-highlyt-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Democratize</h3>
                      <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                        Access to college sports opportunities for every talented athlete regardless of background.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-highlyt-green to-highlyt-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10 group-hover:text-white transition-colors duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-highlyt-blue bg-opacity-10 group-hover:bg-white group-hover:bg-opacity-20 p-3 rounded-full mb-5 transition-colors duration-300">
                        <Megaphone className="h-10 w-10 text-highlyt-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Eliminate Barriers</h3>
                      <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                        Break down the obstacles that keep international talent from connecting with opportunities.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-highlyt-blue-dark to-highlyt-green opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10 group-hover:text-white transition-colors duration-300">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-highlyt-blue bg-opacity-10 group-hover:bg-white group-hover:bg-opacity-20 p-3 rounded-full mb-5 transition-colors duration-300">
                        <Rocket className="h-10 w-10 text-highlyt-blue group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Help Athletes</h3>
                      <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                        Get seen, get recruited, and change their lives through the power of sport and education.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* Call to Action */}
            <motion.section 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-highlyt-blue-dark to-highlyt-blue opacity-90"></div>
                <div className="relative z-10 p-10 md:p-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">More Than a Tool — A Movement</h2>
                  
                  <div className="mb-8">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-highlyt-green mt-1 mr-3 flex-shrink-0" />
                        <p className="text-white text-lg">
                          If you're an athlete with a dream, we're here to amplify your talent.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-highlyt-green mt-1 mr-3 flex-shrink-0" />
                        <p className="text-white text-lg">
                          If you're a coach searching for international talent, we connect you directly.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-highlyt-green mt-1 mr-3 flex-shrink-0" />
                        <p className="text-white text-lg">
                          If you're a partner looking to shape the future of recruiting — join our movement.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button asChild size="lg" className="bg-white text-highlyt-blue-dark hover:bg-gray-100 hover:text-highlyt-blue font-medium text-lg px-8 py-6">
                      <Link to="/register" className="flex items-center">
                        Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-medium text-lg px-8 py-6">
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
