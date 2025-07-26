import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bg from '../assets/img3.svg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ImageTextOverlay = () => {
  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Container animation
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    );

    // Image animation with parallax effect
    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      '-=0.8'
    );

    // Content container animation
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
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
        '-=0.6'
      );
    }

    // Button animation
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Parallax effect for the image on scroll
    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Floating animation for the button
    gsap.to(buttonRef.current, {
      y: -5,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Add hover animations
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    }

    // Add hover effect for the entire container
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseenter', () => {
        gsap.to(imageRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out',
        });
      });

      containerRef.current.addEventListener('mouseleave', () => {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        });
      });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf([buttonRef.current, imageRef.current]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#FEFFF4] flex justify-center items-center w-full h-max mb-12 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="w-[80%] relative px-12 pt-12 rounded-lg flex justify-center items-center cursor-pointer"
      >
        <img
          ref={imageRef}
          src={bg}
          alt="bg-img"
          className="w-full h-full object-cover rounded-lg transition-transform duration-600"
        />

        <div className="bg-[#000] opacity-30 absolute bottom-0 left-0 w-[90%] ml-12 h-50 blur-md object-cover rounded-lg"></div>

        <div
          ref={contentRef}
          className="absolute top-70 left-0 w-full h-full flex flex-col items-center justify-center gap-6 px-8"
        >
          <h2
            ref={headingRef}
            className="text-[#FEFFF4] text-4xl text-center w-1/3 font-semibold leading-tight"
          >
            Feel Beautiful Inside and Out with Every Product.
          </h2>

          <button
            ref={buttonRef}
            className="bg-[#FEFFF4] text-[#2D3B36] rounded-full px-6 py-2 text-sm hover:bg-transparent hover:text-[#FEFFF4] hover:border-2 hover:border-[#FEFFF4] cursor-pointer transition-all duration-300 font-medium shadow-lg"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageTextOverlay;
