import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import rightA from '../assets/rightA.svg';
import leftA from '../assets/leftA.svg';
import Carousel from './Carousel';
import { CAROUSEL_PRODUCTS } from '../data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ProductCarousel() {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;
  const total = CAROUSEL_PRODUCTS.length;

  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(total - visibleCount, prev + 1));
  };

  const canGoPrev = startIdx > 0;
  const canGoNext = startIdx < total - visibleCount;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Header container animation
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Heading animation with text reveal effect
    const heading = headingRef.current;
    if (heading) {
      const words = heading.textContent?.split(' ') || [];
      heading.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
      const wordSpans = heading.querySelectorAll('.word');

      tl.fromTo(
        wordSpans,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
        '-=0.3'
      );
    }

    // Navigation buttons animation
    tl.fromTo(
      navigationRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.6'
    );

    // Individual navigation buttons staggered animation
    const navButtons = navigationRef.current?.querySelectorAll('button');
    if (navButtons) {
      tl.fromTo(
        navButtons,
        { opacity: 0, scale: 0.8, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }

    // Carousel animation
    tl.fromTo(
      carouselRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.3'
    );

    // Add hover animations for navigation buttons
    const navButtonElements = navigationRef.current?.querySelectorAll('button');
    if (navButtonElements) {
      navButtonElements.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.1,
            duration: 0.2,
            ease: 'back.out(1.7)',
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      });
    }

    // Add hover animation for the main button
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          y: -2,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    }

    // Add click animations for navigation buttons
    const handleNavClick = (direction: 'prev' | 'next') => {
      const button = direction === 'prev' ? navButtonElements?.[0] : navButtonElements?.[1];
      if (button) {
        gsap.fromTo(
          button,
          { scale: 0.9, rotation: direction === 'prev' ? -5 : 5 },
          { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }

      // Animate carousel transition
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0.8, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    };

    // Store the handlers for cleanup
    const navClickHandlers = navButtonElements
      ? [
          { button: navButtonElements[0], handler: () => handleNavClick('prev') },
          { button: navButtonElements[1], handler: () => handleNavClick('next') },
        ]
      : [];

    navClickHandlers.forEach(({ button, handler }) => {
      button.addEventListener('click', handler);
    });

    // Floating animation for navigation buttons
    if (navButtonElements) {
      gsap.to(navButtonElements, {
        y: -3,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([navButtonElements, buttonRef.current, carouselRef.current]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clean up event listeners
      navClickHandlers.forEach(({ button, handler }) => {
        button.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex w-full h-max flex-col px-4 md:px-6 pt-8 md:pt-12 bg-[#FEFFF4] overflow-hidden"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 w-full px-4 md:px-12 py-8 md:py-12"
      >
        {/* Button - Mobile: Top, Desktop: Left */}
        <button
          ref={buttonRef}
          className="text-sm rounded-full bg-transparent px-4 py-2 flex items-center gap-2 border border-[#2D3B36] text-[#2D3B36] w-max h-max hover:bg-[#2D3B36] hover:text-[#FEFFF4] transition-all duration-300 font-medium shadow-sm order-1 md:order-1"
        >
          <span className="w-2 h-2 bg-[#2D3B36] rounded-full"></span>
          Why Our Products
        </button>

        {/* Heading - Mobile: Middle, Desktop: Center */}
        <h2
          ref={headingRef}
          className="text-2xl md:text-4xl text-[#2D3B36] w-full md:w-1/3 text-center leading-8 md:leading-12 font-semibold order-2 md:order-2"
        >
          Skincare That Brings Out Your Natural Radiance.
        </h2>

        {/* Navigation - Mobile: Bottom, Desktop: Right */}
        <div ref={navigationRef} className="flex gap-6 md:gap-8 order-3 md:order-3">
          <button
            className="w-12 h-12 md:w-10 md:h-10 border border-[#2D3B36] rounded-full flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2D3B36] hover:scale-110 transition-all duration-300 shadow-md"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous products"
          >
            <img
              src={leftA}
              alt="leftA"
              className="w-6 h-6 md:w-5 md:h-5 text-[#2D3B36] hover:text-white transition-colors duration-300"
            />
          </button>
          <button
            className="w-12 h-12 md:w-10 md:h-10 bg-[#2D3B36] rounded-full flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all duration-300 shadow-md"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next products"
          >
            <img src={rightA} alt="rightA" className="w-6 h-6 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <div ref={carouselRef} className="px-2 md:px-0">
        <Carousel products={CAROUSEL_PRODUCTS} startIdx={startIdx} visibleCount={visibleCount} />
      </div>
    </div>
  );
}
