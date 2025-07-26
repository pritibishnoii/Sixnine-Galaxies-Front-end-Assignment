import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gril from '../assets/gril2.svg';
import star from '../assets/star.svg';
import CTAButton from './CTAButton';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const girlImageRef = useRef<HTMLImageElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);
  const featureItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featuresRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Main heading animation
    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Left content animation
    tl.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    // Right content animation
    tl.fromTo(
      rightContentRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Girl image animation
    tl.fromTo(
      girlImageRef.current,
      { opacity: 0, scale: 0.8, rotation: -5 },
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

    // Staggered animation for feature items
    const featureItems = featureItemsRef.current.filter(Boolean);
    tl.fromTo(
      featureItems,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.2,
      },
      '-=0.6'
    );

    // Floating animation for the girl image
    gsap.to(girlImageRef.current, {
      y: -15,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    // Gentle rotation for the CTA button
    gsap.to(ctaButtonRef.current, {
      rotation: 2,
      duration: 4,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });

    return () => {
      // Cleanup animations
      tl.kill();
      gsap.killTweensOf([girlImageRef.current, ctaButtonRef.current]);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const addToFeatureItemsRef = (el: HTMLDivElement | null) => {
    if (el && !featureItemsRef.current.includes(el)) {
      featureItemsRef.current.push(el);
    }
  };

  return (
    <div
      ref={featuresRef}
      className="flex w-full flex-col items-center justify-between bg-[#FEFFF4]"
    >
      {/* Main Heading */}
      <h2
        ref={headingRef}
        className="text-xl md:text-3xl text-[#2D3B36] w-full md:w-[80%] px-4 md:px-5 py-8 md:py-12 leading-8 md:leading-12 text-center md:text-left"
      >
        Experience the ultimate in skincare with our expertly formulated products, crafted to
        nourish, protect, and rejuvenate your skin. Combining the finest natural ingredients with
        advanced science, our collection ensures every skin type can achieve a radiant, healthy
        glow. Embrace your beauty with confidence every day. Experience the ultimate in skincare
        with our expertly formulated products, crafted to nourish, protect, and rejuvenate your
        skin.
      </h2>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row w-full h-max px-4 md:px-6 py-6 md:py-8 justify-between gap-8 md:gap-0">
        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="flex flex-col items-center gap-2 w-full md:w-1/2 order-2 md:order-1"
        >
          <div className="flex flex-col gap-4 w-full md:w-[80%] h-max px-4 md:px-8 py-4">
            <button className="text-sm rounded-full bg-transparent px-4 py-2 flex items-center gap-2 border border-[#2D3B36] text-[#2D3B36] w-max h-max mb-6 md:mb-8 hover:bg-[#2D3B36] hover:text-[#FEFFF4] transition-all duration-300">
              <span className="w-2 h-2 bg-[#2D3B36] rounded-full"></span>
              Why Our Products
            </button>
            <h2 className="text-2xl md:text-4xl text-[#2D3B36] text-center md:text-left">
              YOUR SKIN DESERVES THE BEST CARE.
            </h2>

            <p className="text-sm text-[#2D3B36] text-center md:text-left">
              Discover a curated collection of skincare products designed to rejuvenate, protect,
              and pamper your skin. Explore our rage crafted with love backed by science, and
              inspired by nature.
            </p>
          </div>

          {/* Feature Items */}
          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[80%] px-4 md:px-8 py-4">
            <div ref={addToFeatureItemsRef} className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl text-[#2D3B36] font-semibold text-center md:text-left">
                <span className="pr-2 md:pr-4">01</span> Bio Ingredients
              </h2>
              <p className="text-sm text-[#2D3B36] px-4 md:px-12 text-center md:text-left">
                Get naturally beautiful and transform with our bio ingredients creams for healthy,
                radiant skin.
              </p>
            </div>
            <div ref={addToFeatureItemsRef} className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl text-[#2D3B36] font-semibold text-center md:text-left">
                <span className="pr-2 md:pr-4">02</span> Everything Natural
              </h2>
              <p className="text-sm text-[#2D3B36] px-4 md:px-12 text-center md:text-left">
                Pure ingredients for pure skin. The Perfect solution for your skin care needs.
              </p>
            </div>
            <div ref={addToFeatureItemsRef} className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl text-[#2D3B36] font-semibold text-center md:text-left">
                <span className="pr-2 md:pr-4">03</span> All Handmade
              </h2>
              <p className="text-sm text-[#2D3B36] px-4 md:px-12 text-center md:text-left">
                Made with love and care. Just for you. Give your skin the tender loving care it
                deserves.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content - Image and CTA */}
        <div
          ref={rightContentRef}
          className="w-full md:w-1/2 flex justify-center items-center relative order-1 md:order-2"
        >
          <img ref={girlImageRef} src={gril} alt="gril-img" className="w-[80%] md:w-[70%]" />

          <div ref={ctaButtonRef} className="absolute bottom-6 md:bottom-10 right-4 md:right-50">
            <CTAButton bgcolor={true} text="Best Skin Care Product Award Wining." icon={star} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
