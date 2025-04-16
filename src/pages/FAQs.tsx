
import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  
  // FAQ categories
  const categories = [
    {
      id: 'general',
      title: 'General Questions',
      faqs: [
        {
          question: 'What is HighLytr?',
          answer: 'HighLytr is a digital recruitment platform that connects international high school athletes with U.S. college coaches and sports agencies. It simplifies the recruitment process, makes discovery easier, and reduces costs for all parties.'
        },
        {
          question: 'Is HighLytr free?',
          answer: 'Yes! Currently, HighLytr is free for athletes, colleges, and agencies during the launch phase. Premium features and pricing plans are planned for future release, but for now, all core functionality is accessible at no cost.'
        },
        {
          question: 'Who can use HighLytr?',
          answer: 'We support three types of users: International high school athletes (ages 14–19), College coaches and staff from U.S. institutions, and Verified sports agencies representing young athletes.'
        },
        {
          question: 'What sports does HighLytr support?',
          answer: 'We are starting with Soccer and Basketball — the two most globally popular recruitment sports — and will gradually expand to include Tennis, Track & Field, Volleyball, Swimming, and others.'
        },
        {
          question: 'How is HighLytr different from Hudl or NCSA?',
          answer: 'Unlike Hudl (highlight-focused) and NCSA (agency-based and expensive), HighLytr is designed specifically for international athletes. It offers direct access to colleges, tools to manage recruitment, and an affordable freemium model.'
        }
      ]
    },
    {
      id: 'athletes',
      title: 'For Athletes',
      faqs: [
        {
          question: 'Who can register as an athlete?',
          answer: 'Any international student-athlete aged 14–19 who is not already enrolled in a U.S. college program and wants to pursue athletic scholarships and higher education.'
        },
        {
          question: 'How do I get started?',
          answer: 'Simply sign up for free, choose the "Athlete" role, and begin completing your profile by adding basic information, videos, stats, and preferences.'
        },
        {
          question: 'What can I do on the platform?',
          answer: 'Build a public profile with academic and athletic details, upload highlight videos, search and save U.S. colleges, view coaches, connect with staff, and message them (if connected), and track profile completeness and visibility.'
        },
        {
          question: 'Do I need to be represented by an agency?',
          answer: 'Not at all! You can use HighLytr independently. If you are already represented by an agency, they can manage your profile and link it to their account.'
        },
        {
          question: 'What does "Agency Recruit" mean?',
          answer: 'If you\'re managed by a verified agency, your profile will be marked as "Agency Recruit," signaling credibility and representation to coaches.'
        },
        {
          question: 'Will it always be free?',
          answer: 'At the moment, yes! In the near future, we\'ll introduce Premium plans (Pro: $9.99/month or $99/year), but you\'ll always have access to a solid free version.'
        },
        {
          question: 'Can I share my profile?',
          answer: 'Yes. Each athlete has a unique public profile link you can share with friends, coaches, or on social media.'
        }
      ]
    },
    {
      id: 'colleges',
      title: 'For Colleges',
      faqs: [
        {
          question: 'Who can sign up as a college?',
          answer: 'Only U.S.-based college staff, coaches, or admissions officers with a valid .edu email address can create a verified college account.'
        },
        {
          question: 'What can I do on HighLytr?',
          answer: 'Search a global talent pool of international athletes, filter by sport, nationality, GPA, age, gender, and more, view profiles and highlight videos, save athletes to scouting lists, message athletes or their agencies after connecting, and collaborate with your staff on recruiting tasks.'
        },
        {
          question: 'What does a college profile include?',
          answer: 'Your page will show basic school info, sports programs offered, current roster openings, scholarship info, and coach/staff directories.'
        },
        {
          question: 'Is there a cost?',
          answer: 'Currently, HighLytr is free for colleges. In the future, we will offer quote-based annual subscription plans per sport (e.g. $10k/year/sport) — but for now, you get full access at no cost.'
        },
        {
          question: 'How do I verify my account?',
          answer: 'You must register using your college-issued .edu email address. Once verified, you\'ll have full access to athlete search and messaging features.'
        }
      ]
    },
    {
      id: 'agencies',
      title: 'For Agencies',
      faqs: [
        {
          question: 'Who can join as an agency?',
          answer: 'Any verified and legitimate sports recruitment agency that works with international athletes. Verification is required before full access is granted.'
        },
        {
          question: 'What can I do as an agency?',
          answer: 'Create and manage profiles for athletes under your representation, track athlete profile views and activity, contact college staff directly, monitor athlete placement progress, and organize athletes by sport, region, or status.'
        },
        {
          question: 'Is there a cost to join?',
          answer: 'Access is currently free. We operate a success-based model — meaning you only pay a fee if your athlete is successfully recruited via HighLytr. This fee will be agreed upon in a transparent contract.'
        },
        {
          question: 'Can I manage multiple athletes?',
          answer: 'Yes. You can create, edit, and track multiple athlete profiles from a single dashboard. Each of your athletes will be labeled with an "Agency Recruit" badge.'
        },
        {
          question: 'Can I contact colleges directly?',
          answer: 'Yes. Once your agency is verified, you can search for colleges by sport and region and initiate connections or messages.'
        },
        {
          question: 'How is success tracked?',
          answer: 'Your dashboard includes a placement funnel that tracks athletes from first contact to scholarship/offer. This will be expanded with more analytics soon.'
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
