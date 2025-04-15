
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'Soccer Player',
    university: 'Stanford University',
    quote: 'HighLytr helped me connect with coaches I would never have reached otherwise. I received a full scholarship to my dream school!',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
  },
  {
    id: 2,
    name: 'Coach Sarah Williams',
    role: 'Head Soccer Coach',
    university: 'University of California',
    quote: 'HighLytr has transformed our international recruiting process. We can now discover talented athletes without expensive scouting trips.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: 3,
    name: 'Giulia Ricci',
    role: 'Soccer Player',
    university: 'University of Michigan',
    quote: 'As an Italian athlete, I struggled to get noticed by U.S. colleges until I joined HighLytr. Now I'm playing Division I soccer!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
            <p className="text-xs text-highlyt-blue">{testimonial.university}</p>
          </div>
        </div>
        <div className="text-highlyt-blue">
          <Quote className="h-6 w-6" />
        </div>
      </div>
      <p className="text-gray-700 italic">{testimonial.quote}</p>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2 mb-4">What Our Community Says</h2>
          <p className="text-gray-600">
            HighLytr is changing how international athletes connect with U.S. college programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
