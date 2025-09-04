import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aditya Sharma',
    location: 'New Delhi',
    text: 'The voice-guided tour of Brihadeeswara Temple was extraordinary. The depth of historical information and cultural context really brought the temple to life. I learned so much more than I would have with a traditional guidebook.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    location: 'Barcelona, Spain',
    text: 'As a non-Indian tourist, the multilingual support was invaluable. Being able to switch between English and Spanish made my experience in Tamil Nadu so much more immersive and enjoyable.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: 3,
    name: 'Priya Venkatesh',
    location: 'Bangalore',
    text: 'The chatbot was incredibly helpful when I had specific questions about architectural details at Mahabalipuram. It provided instant, detailed responses that enriched my understanding of the site.',
    rating: 4,
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg'
  },
  {
    id: 4,
    name: 'James Wilson',
    location: 'London, UK',
    text: 'The personalized recommendations based on my interests were spot on. The app suggested visiting Chettinad Palace, which wasn\'t even on my radar, and it ended up being one of the highlights of my trip.',
    rating: 5,
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg'
  }
];

const TestimonialSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  const nextTestimonial = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
    setAutoplay(false);
  };
  
  const prevTestimonial = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
    setAutoplay(false);
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoplay) {
      interval = setInterval(() => {
        setCurrent(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
      }, 7000);
    }
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  return (
    <div className="relative max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 rounded-xl p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              {testimonials[current].image ? (
                <img 
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary-800 flex items-center justify-center text-2xl font-bold">
                  {testimonials[current].name.charAt(0)}
                </div>
              )}
              <div className="absolute -top-2 -left-2 bg-white rounded-full p-1 text-primary-700">
                <Quote size={18} />
              </div>
            </div>
          </div>
          
          <p className="text-lg md:text-xl italic mb-6 text-neutral-100">
            "{testimonials[current].text}"
          </p>
          
          <div>
            <h4 className="font-bold text-white">{testimonials[current].name}</h4>
            <p className="text-neutral-300">{testimonials[current].location}</p>
          </div>
          
          <div className="flex justify-center mt-4">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-accent-400"
              >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full"
      >
        <ChevronRight size={24} />
      </button>
      
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              setAutoplay(false);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === current ? 'bg-white scale-125' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;