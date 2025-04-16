
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="h2 mb-4">What Our Community Says</h2>
          <p className="text-gray-600">
            Real stories from athletes who have transformed their careers.
          </p>
        </div>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {[1, 2, 3].map((_, index) => (
              <CarouselItem key={index} className="flex justify-center items-center">
                <div className="bg-gray-100 rounded-xl h-64 w-full max-w-2xl flex items-center justify-center">
                  <p className="text-gray-500 text-center">Testimonial coming soon</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
