import React, { useState, useEffect } from 'react';
import './SlideShow.css';
import image1 from '../../../assets/images/image1.jpg';
import image2 from '../../../assets/images/image2.jpg';
import image3 from '../../../assets/images/image3.jpg';

const SlideShow = () => {
  const slides = [
    {
      title: "GIFT AS TIMELESS AS LOVE",
      subtitle: "Enjoy 5% off* on gift cards | Promo Code: AIWEDDING05",
      buttonText: "Buy Now",
      image: image1
    },
    {
      title: "DISCOVER NEW HORIZONS",
      subtitle: "Special fares to international destinations",
      buttonText: "Book Now",
      image: image2
    },
    {
      title: "LUXURY IN THE SKIES",
      subtitle: "Experience premium class travel",
      buttonText: "Learn More",
      image: image3
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const handleSlideChange = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''} ${
            isAnimating ? 'animating' : ''
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={`slide-content ${index === currentSlide ? 'active' : ''}`}>
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <button className="slide-button">{slide.buttonText}</button>
          </div>
        </div>
      ))}

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;