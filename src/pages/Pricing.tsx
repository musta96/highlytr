
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, HelpCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Pricing = () => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access for athletes getting started',
      price: '0',
      period: 'forever',
      features: [
        'Basic athlete profile',
        'Browse college database',
        'Limited video uploads (1)',
        'Community forum access',
      ],
      limitations: [
        'No direct coach messaging',
        'Limited analytics',
      ],
      buttonText: 'Get Started',
      highlighted: false
    },
    {
      id: 'pro',
      name: 'Pro Athlete',
      description: 'Everything you need to get recruited',
      price: '24.99',
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
      buttonText: 'Start Free Trial',
      highlighted: true,
      badge: 'Most Popular'
    },
    {
      id: 'team',
      name: 'Team',
      description: 'For coaches and recruitment agencies',
      price: '99',
      period: 'per month',
      features: [
        'Multiple athlete management',
        'Advanced recruiting tools',
        'Team analytics dashboard',
        'Bulk messaging to colleges',
        'Custom branding',
        'API access',
        'Dedicated account manager',
      ],
      buttonText: 'Contact Sales',
      highlighted: false
    }
  ];
  
  const faqs = [
    {
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade, downgrade or cancel your plan at any time. Changes will take effect on your next billing cycle.'
    },
    {
      question: 'Is there a contract or commitment?',
      answer: 'No, all our plans are month-to-month. You can cancel anytime without penalty.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, including Visa, Mastercard, and American Express. We also offer PayPal as a payment option.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take security seriously. All data is encrypted and we never share your personal information with third parties without your consent.'
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
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
                      <span className="h-5 w-5 mr-2">×</span>
                      <span>{limitation}</span>
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

        <Separator className="my-16" />

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Button size="lg">Contact Sales</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
