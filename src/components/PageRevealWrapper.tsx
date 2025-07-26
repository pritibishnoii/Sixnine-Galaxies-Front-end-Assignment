import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel from './Carousel';
import { CAROUSEL_PRODUCTS } from '../data';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const btns = ['NEW ARRIVAL', 'CLEANSING', 'ACNE FIGHTER', 'ANTI AGGING'];

const PageRevealWrapper = () => {
  const [activeBtn, setActiveBtn] = useState(0);

  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Filter products by category
  const filteredProducts = CAROUSEL_PRODUCTS.filter(
    (product) => product.category === btns[activeBtn]
  );

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Heading animation with text reveal effect
    const heading = headingRef.current;
    if (heading) {
      const words = heading.textContent?.split(' ') || [];
      heading.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
      const wordSpans = heading.querySelectorAll('.word');

      tl.fromTo(
        wordSpans,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      );
    }

    // Buttons container animation
    tl.fromTo(
      buttonsContainerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Individual buttons staggered animation
    const buttons = buttonsContainerRef.current?.querySelectorAll('button');
    if (buttons) {
      tl.fromTo(
        buttons,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.3'
      );
    }

    // Carousel animation
    tl.fromTo(
      carouselRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.2'
    );

    // Add hover animations for buttons
    const buttonElements = buttonsContainerRef.current?.querySelectorAll('button');
    if (buttonElements) {
      buttonElements.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
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

    // Add click animation for active button
    const handleButtonClick = (index: number) => {
      setActiveBtn(index);

      // Animate the clicked button
      const clickedButton = buttonsContainerRef.current?.querySelectorAll('button')[index];
      if (clickedButton) {
        gsap.fromTo(
          clickedButton,
          { scale: 0.95 },
          { scale: 1, duration: 0.2, ease: 'back.out(1.7)' }
        );
      }

      // Animate carousel transition
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          { opacity: 0.7, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
        );
      }
    };

    // Store the handler for cleanup
    const buttonClickHandlers = buttonElements
      ? Array.from(buttonElements).map((button, index) => {
          const handler = () => handleButtonClick(index);
          button.addEventListener('click', handler);
          return { button, handler };
        })
      : [];

    return () => {
      tl.kill();
      gsap.killTweensOf([buttonsContainerRef.current, carouselRef.current]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      // Clean up event listeners
      buttonClickHandlers.forEach(({ button, handler }) => {
        button.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#FEFFF4] mt-16 md:mt-[100px] overflow-hidden">
      <div className="flex flex-col gap-4 md:gap-5 items-center justify-center py-8 md:py-12 px-4 md:px-0">
        {/* Heading */}
        <h1
          ref={headingRef}
          className="text-2xl md:text-4xl text-[#2D3B36] w-full md:w-1/3 text-center leading-8 md:leading-12 font-semibold"
        >
          Feel Beautiful Inside and Out with Every Product.
        </h1>

        {/* Buttons Container */}
        <div
          ref={buttonsContainerRef}
          className="flex flex-wrap gap-3 md:gap-4 w-full justify-center px-2 md:px-0"
        >
          {btns.map((btn, index) => (
            <button
              key={index}
              className={`rounded-full px-4 md:px-6 py-2 text-xs md:text-sm cursor-pointer border border-[#2D3B36] text-[#2D3B36] transition-all duration-300 hover:bg-[#2D3B36] hover:text-[#FEFFF4] whitespace-nowrap font-medium shadow-sm ${
                activeBtn === index
                  ? 'bg-[#2D3B36] text-[#FEFFF4] border-none shadow-md'
                  : 'border border-[#2D3B36] text-[#2D3B36] hover:shadow-md'
              }`}
              onClick={() => setActiveBtn(index)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Section */}
      <div ref={carouselRef}>
        <Carousel products={filteredProducts} startIdx={0} visibleCount={3} />
      </div>
    </div>
  );
};

export default PageRevealWrapper;
