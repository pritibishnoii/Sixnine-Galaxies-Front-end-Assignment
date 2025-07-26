import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import product from '../assets/product.svg';
import { GoPlus } from 'react-icons/go';
import { HiOutlineMinusSmall } from 'react-icons/hi2';
import { FAQ } from '../data';
import CTAButton from './CTAButton';
import headphone from '../assets/headphone.svg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const [active, setActive] = useState<number | null>(null);

  // Refs for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const productImgRef = useRef<HTMLImageElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Right side image animation
    tl.fromTo(
      rightImageRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );

    // Left content animation
    tl.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Product image animation
    tl.fromTo(
      productImgRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.7)' },
      '-=0.6'
    );

    // CTA button animation
    tl.fromTo(
      ctaButtonRef.current,
      { opacity: 0, scale: 0.8, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Button and heading animation
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.6'
    );

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    // Accordion items staggered animation
    const accordionItems = accordionRef.current?.querySelectorAll('.accordion-item');
    if (accordionItems) {
      tl.fromTo(
        accordionItems,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.6'
      );
    }

    // Floating animation for product image
    gsap.to(productImgRef.current, {
      y: -15,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Gentle rotation for CTA button
    gsap.to(ctaButtonRef.current, {
      rotation: 2,
      duration: 4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tl.kill();
      gsap.killTweensOf([productImgRef.current, ctaButtonRef.current]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animate accordion content when opening/closing
  useEffect(() => {
    if (active !== null) {
      const activeItem = document.querySelector(`[data-faq-index="${active}"]`);
      if (activeItem) {
        const content = activeItem.querySelector('.accordion-content');
        if (content) {
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
          );
        }
      }
    }
  }, [active]);

  return (
    <div
      ref={sectionRef}
      className="flex w-full flex-col items-center justify-between bg-[#FEFFF4]"
    >
      <div className="flex w-full h-max px-6 py-8 justify-between">
        {/* Right-side image */}
        <div ref={rightImageRef} className="w-1/2 flex justify-center items-center relative">
          <img ref={productImgRef} src={product} alt="girl-img" className="w-[70%]" />

          <div ref={ctaButtonRef} className="absolute bottom-5">
            <CTAButton
              bgcolor={true}
              text="24/7 We're Here
to Help You"
              icon={headphone}
            />
          </div>
        </div>

        {/* FAQ Content */}
        <div ref={leftContentRef} className="flex flex-col items-center gap-2 w-1/2">
          <div className="flex flex-col gap-4 w-[80%] h-max px-8 py-4">
            <button
              ref={buttonRef}
              className="text-sm rounded-full bg-transparent px-4 py-2 flex items-center gap-2 border border-[#2D3B36] text-[#2D3B36] w-max h-max mb-8 hover:bg-[#2D3B36] hover:text-[#FEFFF4] transition-all duration-300"
            >
              <span className="w-2 h-2 bg-[#2D3B36] rounded-full"></span>
              Frequently Asked Question
            </button>
            <h2 ref={headingRef} className="text-4xl text-[#2D3B36]">
              Answers to Your Skincare Questions, All in One Place..
            </h2>
          </div>

          {/* Accordion */}
          <div ref={accordionRef} className="flex flex-col gap-2 w-[80%] px-8">
            {FAQ.map((item, index) => (
              <div
                key={index}
                data-faq-index={index}
                className="accordion-item border border-[#2D3B36] p-4 rounded cursor-pointer transition-all duration-300 hover:bg-[#2D3B36] hover:text-[#FEFFF4] group"
                onClick={() => setActive(active === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-md text-[#2D3B36] font-semibold group-hover:text-[#FEFFF4] transition-colors duration-300">
                    {item.question}
                  </h2>
                  {active === index ? (
                    <HiOutlineMinusSmall className="text-xl transition-transform duration-300 text-[#2D3B36] group-hover:text-[#FEFFF4]" />
                  ) : (
                    <GoPlus className="text-xl transition-transform duration-300 text-[#2D3B36] group-hover:text-[#FEFFF4]" />
                  )}
                </div>
                {active === index && (
                  <div className="accordion-content overflow-hidden">
                    <p className="mt-2 text-[#2D3B36] text-sm group-hover:text-[#FEFFF4] transition-colors duration-300">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
