import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, HelpCircle, X, BadgeDollarSign, Building, GraduationCap, UserCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const athletePlans = [
    {
      id: 'launch-special',
      name: 'Launch Special',
      description: 'Unlimited features for all athletes - Limited Time Offer!',
      price: '0',
      period: 'limited time',
      features: [
        'Enhanced athlete profile',
        'Unlimited video uploads',
        'Direct coach messaging',
        'Performance analytics',
        'Eligibility assessment',
        'Priority support',
        'College matching algorithm'
      ],
      buttonText: 'Get Started Now',
      highlighted: true,
      badge: 'Limited Time'
    },
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access for athletes getting started',
      price: '0',
      period: 'forever',
      features: [
        'Basic athlete profile',
        'Video uploads (1)',
        'Browse college database',
        'Community forum access',
      ],
      limitations: [
        'No direct coach messaging',
        'Limited analytics',
      ],
      buttonText: 'Coming Soon',
      highlighted: false,
      comingSoon: true
    },
    {
      id: 'pro',
      name: 'Pro Athlete',
      description: 'Advanced features for serious athletes',
      price: '9.99',
      period: 'per month',
      features: [
        'Enhanced athlete profile',
        'Unlimited video uploads',
        'Direct coach messaging',
        'Performance analytics',
        'Eligibility assessment',
        'Priority support',
        'College matching algorithm'
      ],
      buttonText: 'Coming Soon',
      highlighted: true,
      comingSoon: true
    },
    {
      id: 'premium',
      name: 'Annual Premium',
      description: 'Best value for serious athletes',
      price: '99',
      period: 'per year',
      features: [
        'All Pro features',
        'AI recruitment insights',
        'Featured profile placement',
        'Early access to new features',
        'Personalized recruitment strategy',
        'Monthly progress reports',
      ],
      buttonText: 'Coming Soon',
      highlighted: false,
      comingSoon: true
    }
  ];
  
  const collegePlans = [
    {
      id: 'launch-special',
      name: 'Launch Special',
      description: 'Complete platform access - Everything is FREE!',
      price: 'FREE',
      period: 'limited time',
      features: [
        'Full athlete database access',
        'Team management dashboard',
        'Direct athlete messaging',
        'Recruitment tracking',
        'Team collaboration tools',
        'Advanced analytics',
        'No limitations'
      ],
      buttonText: 'Get Started Now',
      highlighted: true,
      badge: 'Limited Time'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Custom solution for athletic departments',
      price: 'Contact Sales',
      period: 'custom pricing',
      features: [
        'Full platform access',
        'Advanced AI athlete matching',
        'Custom recruitment pipeline',
        'Multi-sport management',
        'Advanced analytics dashboard',
        'API integration options',
        'Dedicated account manager'
      ],
      buttonText: 'Coming Soon',
      highlighted: false,
      comingSoon: true
    }
  ];
  
  const agencyPlans = [
    {
      id: 'launch-special',
      name: 'Launch Special',
      description: 'Complete platform access - Everything is FREE!',
      price: 'FREE',
      period: 'limited time',
      features: [
        'Agency profile & verification badge',
        'Athlete portfolio management',
        'College matching tools',
        'Placement tracking dashboard',
        'Direct messaging with colleges',
        'Analytics and reporting',
        'No limitations'
      ],
      buttonText: 'Get Started Now',
      highlighted: true,
      badge: 'Limited Time'
    },
    {
      id: 'premium',
      name: 'Success-Fee Model',
      description: 'Custom solutions for established agencies',
      price: 'Contact Sales',
      period: 'custom terms',
      features: [
        'All verified features',
        'Performance-based pricing',
        'Custom contract terms',
        'Priority athlete promotion',
        'Direct line to college recruiters',
        'Enhanced analytics',
        'API access'
      ],
      buttonText: 'Coming Soon',
      highlighted: false,
      comingSoon: true
    }
  ];

  const faqs = [
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. The features listed for each plan are included with no additional charges."
    },
    {
      question: "How long is the launch special available?",
      answer: "Our launch special is available for a limited time. We recommend signing up soon to take advantage of the free access."
    },
    {
      question: "Can I upgrade or change my plan later?",
      answer: "Absolutely. We'll provide flexible options to upgrade or modify your plan as your needs change."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We'll support major credit cards and other payment methods. Details will be provided closer to the paid launch."
    }
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that's right for your athletic journey, with no hidden fees
          </p>
        </div>
        
        <Tabs defaultValue="athletes" className="mb-16">
          <div className="flex justify-center mb-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="athletes" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Athletes
              </TabsTrigger>
              <TabsTrigger value="colleges" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Colleges
              </TabsTrigger>
              <TabsTrigger value="agencies" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Agencies
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="athletes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {athletePlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col ${plan.highlighted ? 'border-highlyt-blue shadow-lg' : 'border-gray-200'}`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-highlyt-blue text-white text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      {plan.badge}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex flex-col">
                      <span className="text-xl">{plan.name}</span>
                      <div className="mt-4 flex items-end gap-1">
                        <span className="text-3xl md:text-4xl font-bold">${plan.price}</span>
                        <span className="text-gray-500 mb-1">/{plan.period}</span>
                      </div>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-highlyt-green mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.limitations && plan.limitations.map((limitation, index) => (
                        <li key={`limit-${index}`} className="flex items-start text-gray-500">
                          <X className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-highlyt-blue hover:bg-highlyt-blue-dark' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                      disabled={plan.comingSoon}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="colleges">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {collegePlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col ${plan.highlighted ? 'border-highlyt-blue shadow-lg' : 'border-gray-200'}`}
                >
                  {plan.badge && (
                    <div className="absolute top-0 right-0 bg-highlyt-blue text-white text-xs font-medium px-2 py-1 rounded-bl-lg rounded-tr-lg">
                      {plan.badge}
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex flex-col">
                      <span className="text-xl">{plan.name}</span>
                      <div className="mt-4 flex items-end gap-1">
                        <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 mb-1">{plan.period}</span>
                      </div>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-highlyt-green mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-highlyt-blue hover:bg-highlyt-blue-dark' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                      disabled={plan.comingSoon}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center text-gray-500 max-w-xl mx-auto">
              <p>Enterprise pricing varies based on institution size, number of sports, and custom requirements. Contact our sales team for a personalized quote.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="agencies">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {agencyPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative flex flex-col ${plan.highlighted ? 'border-highlyt-blue shadow-lg' : 'border-gray-200'}`}
                >
                  <CardHeader>
                    <CardTitle className="flex flex-col">
                      <span className="text-xl">{plan.name}</span>
                      <div className="mt-4 flex items-end gap-1">
                        <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-500 mb-1">{plan.period}</span>
                      </div>
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-2">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-highlyt-green mr-2 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className={`w-full ${plan.highlighted ? 'bg-highlyt-blue hover:bg-highlyt-blue-dark' : ''}`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center text-gray-500 max-w-xl mx-auto">
              <p>Our success-fee model is negotiated individually with each agency based on placement volume and athlete profile. We believe in aligning incentives for all parties involved.</p>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-16" />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 border rounded-lg">
                <h3 className="font-semibold flex items-center mb-2">
                  {faq.question}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-80">Click to expand answer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="mb-6 text-gray-600 max-w-2xl mx-auto">
            We offer tailored plans for high schools, colleges, and large recruitment agencies. 
            Contact our sales team to discuss your specific needs.
          </p>
          <Button size="lg" className="bg-highlyt-blue hover:bg-highlyt-blue-dark">Contact Sales</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
