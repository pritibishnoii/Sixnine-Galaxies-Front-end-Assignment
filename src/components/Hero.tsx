import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import product from '../assets/skincareproduct.svg';
import skincareText from '../assets/skincare.svg';
import gril from '../assets/gril.svg';
import plum from '../assets/plum.svg';
import CTAButton from './CTAButton';

const Hero = () => {
  const grilRef = useRef(null);
  const ctaRef = useRef(null);
  const headingRef = useRef(null);
  const shopBtnRef = useRef(null);
  const skincareRef = useRef(null);
  const textRef = useRef(null);
  const productImgRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.from(ctaRef.current, { y: 50, opacity: 0 }, '-=0.6')
      .from(productImgRef.current, { y: 100, opacity: 0 }, '-=0.5')
      .from(headingRef.current, { x: 100, opacity: 0 }, '-=0.5')
      .from(textRef.current, { x: -50, opacity: 0 }, '-=0.6')
      .from(shopBtnRef.current, { scale: 0.8, opacity: 0 }, '-=0.5')
      .from(skincareRef.current, { y: 100, opacity: 0 }, '-=0.6')
      .to(grilRef.current, { y: 700, opacity: 1 }, '-=0.4');
  }, []);

  return (
    <div className="w-full h-max bg-[#EFF5E1] overflow-hidden">
      {/* girl image */}
      <div className="relative">
        <img
          ref={grilRef}
          src={gril}
          alt="gril-img"
          className="w-60 md:w-90 absolute bottom-2 left-1/2 -translate-x-1/2 z-10"
        />

        {/* CTA Button */}
        <div ref={ctaRef} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-100">
          <CTAButton
            bgcolor={false}
            text="While giving you an invigorating cleansing experience."
            icon={plum}
          />
        </div>
      </div>

      {/* Top Section */}
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-6 md:py-12 gap-6 md:gap-0">
          {/* Mobile: Text appears first */}
          <p
            ref={textRef}
            className="text-sm text-[#2D3B36] w-full md:w-60 indent-0 md:indent-18 text-center md:text-left order-1 md:order-1"
          >
            Transform your skincare routine with premium products that restore, protect, and enhance
            your natural glow every day.
          </p>

          {/* Mobile: Heading appears second */}
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-[#2D3B36] uppercase text-center order-2 md:order-2"
          >
            Glow <br />
            Natur- <br />
            ally
          </h1>

          {/* Mobile: Product image appears third */}
          <div className="w-32 md:w-40 order-3 md:order-3">
            <img src={product} alt="product-img" ref={productImgRef} className="w-full h-auto" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-8 md:gap-12 pt-8 md:pt-[100px]">
          {/* Mobile: Center the button */}
          <div className="flex justify-center md:justify-start">
            <button
              ref={shopBtnRef}
              className="rounded-full text-sm bg-[#2D3B36] text-[#EFF5E1] w-auto md:w-30 px-6 md:px-4 py-3 md:py-2 cursor-pointer whitespace-nowrap ml-0 md:ml-12 hover:bg-[#1a2520] transition-colors duration-300"
            >
              Shop Now
            </button>
          </div>

          {/* Mobile: Adjust skincare text size */}
          <div className="w-full px-4 md:px-0">
            <img
              ref={skincareRef}
              src={skincareText}
              alt="skincare-text"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
