import React, { useState, useEffect } from 'react';
import image1 from "../../assets/images/image1.jpg"
import image2 from "../../assets/images/image2.jpg"
import image3 from "../../assets/images/image4.jpg"

const slides = [
  {
    src: image1,
    caption: "Caption Text",
    number: "1 / 3"
  },
  {
    src: image2,
    caption: "Caption Two", 
    number: "2 / 3"
  },
  {
    src: image3,
    caption: "Caption Three",
    number: "3 / 3"
  }
];

const AutomaticSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentSlide((prevSlide) => 
          (prevSlide + 1) % slides.length
        );
      }, 5000);
  
      return () => clearTimeout(timer);
    }, [currentSlide]);
  
    return (
      <div className="w-full relative overflow-hidden">
        <div className="relative w-full h-[50vh]">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                currentSlide === index 
                  ? 'opacity-100 z-1' 
                  : 'opacity-0 z-0'
              }`}
            >
              <div className="numbertext absolute top-4 left-4 text-white bg-black/50 px-2 py-1 rounded">
                {slide.number}
              </div>
              <img 
                src={slide.src} 
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-8 left-0 w-full text-center">
                <span className="text-white bg-black/50 px-4 py-2 rounded">
                  {slide.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
  
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <span 
              key={index} 
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSlide === index 
                  ? 'bg-white' 
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

export default AutomaticSlideshow;