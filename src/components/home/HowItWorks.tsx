
import React from 'react';
import { UserCircle, Building, MessageSquare, Medal } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserCircle className="h-8 w-8" />,
      title: 'Create Your Profile',
      description: 'Build a complete athlete profile with videos, stats, academic achievements, and personal information.'
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: 'Connect with Colleges',
      description: 'Explore U.S. college programs and directly reach out to coaches that match your athletic goals.'
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Communicate Directly',
      description: 'Message coaches and program staff directly through our platform—no agencies or middlemen required.'
    },
    {
      icon: <Medal className="h-8 w-8" />,
      title: 'Secure Opportunities',
      description: 'Receive scholarship offers, official visits, and admission support directly from interested institutions.'
    }
  ];

  return (
    <section className="py-16 bg-highlyt-gray" id="how-it-works">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2 mb-4">How HighLytr Works</h2>
          <p className="text-gray-600">
            Our platform simplifies the college recruiting process for international athletes, making it more accessible and affordable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm relative">
              <div className="bg-highlyt-blue text-white w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -right-4">
                {index + 1}
              </div>
              <div className="text-highlyt-blue mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
