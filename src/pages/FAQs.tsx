
import React from 'react';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const FAQs = () => {
  // FAQ categories
  const categories = [
    {
      id: 'general',
      title: 'General Questions',
      faqs: [
        {
          question: 'What is HighLytr?',
          answer: 'HighLytr is a platform that connects international high school athletes with U.S. college coaches and sports programs. We help talented athletes showcase their skills and get discovered by colleges that match their athletic and academic goals.'
        },
        {
          question: 'Is HighLytr free to use?',
          answer: 'We offer both free and premium tiers. The free tier allows athletes to create basic profiles, while our premium plans provide enhanced visibility, advanced features, and priority support.'
        },
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button at the top right of the page. Follow the registration process, verify your email, and set up your profile.'
        },
        {
          question: 'Which sports are supported on HighLytr?',
          answer: 'We currently support a wide range of sports including basketball, soccer, volleyball, tennis, swimming, track and field, baseball, softball, and many more. We regularly add new sports based on demand.'
        }
      ]
    },
    {
      id: 'athletes',
      title: 'For Athletes',
      faqs: [
        {
          question: 'How do I make my profile stand out to colleges?',
          answer: 'Complete all sections of your profile, including athletic achievements, academic information, and personal statement. Upload high-quality highlight videos and keep your statistics updated. Regularly engage with the platform by responding to messages promptly.'
        },
        {
          question: 'What information should I include in my athletic profile?',
          answer: 'Include your sport, position, key statistics, competition history, notable achievements, training history, and physical attributes. Also add academic information like GPA, test scores, and intended major.'
        },
        {
          question: 'How can I contact college coaches?',
          answer: 'Once you\'ve created your profile, you can search for colleges and coaches that match your interests. Our messaging system allows you to send introduction messages and respond to inquiries from interested coaches.'
        },
        {
          question: 'What types of videos should I upload?',
          answer: 'Upload highlight reels that showcase your best plays, as well as game footage that demonstrates your overall skill level. Include videos that highlight your specific position skills and athletic abilities.'
        }
      ]
    },
    {
      id: 'colleges',
      title: 'For Colleges',
      faqs: [
        {
          question: 'How can our college find athletes on HighLytr?',
          answer: 'Our advanced search filters allow you to search for athletes based on specific criteria like sport, position, physical attributes, academic performance, and geographic location.'
        },
        {
          question: 'Can multiple coaches from the same college have access?',
          answer: 'Yes, our college plans allow multiple coaches and staff members to access the platform under the same institutional account. Each user can have their own login credentials and preferences.'
        },
        {
          question: 'How do we verify our college account?',
          answer: 'We verify all college accounts through an institutional email address and additional documentation. This process ensures that only legitimate college representatives can access athlete information.'
        },
        {
          question: 'What tools do colleges have for tracking prospects?',
          answer: 'Our platform provides tools for saving prospects, creating recruitment lists, tracking communication history, making notes, and setting reminders for follow-ups.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Find answers to common questions about using HighLytr
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search FAQs..." className="pl-10" />
            <Button className="absolute right-0 top-0 rounded-l-none">
              Search
            </Button>
          </div>
        </div>
        
        {categories.map(category => (
          <div key={category.id} className="mb-10">
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`${category.id}-item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
        
        <div className="bg-highlyt-gray rounded-lg p-8 text-center mt-12">
          <h2 className="text-xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
