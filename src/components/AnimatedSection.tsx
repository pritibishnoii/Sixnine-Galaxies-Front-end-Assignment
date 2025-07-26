import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'custom';
  delay?: number;
  duration?: number;
  trigger?: string;
  customAnimation?: (element: HTMLElement) => void;
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  trigger = 'top 80%',
  customAnimation,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const getAnimationConfig = () => {
      switch (animation) {
        case 'fadeIn':
          return {
            from: { opacity: 0 },
            to: { opacity: 1, duration, ease: 'power2.out' },
          };
        case 'slideUp':
          return {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, duration, ease: 'power2.out' },
          };
        case 'slideLeft':
          return {
            from: { opacity: 0, x: -100 },
            to: { opacity: 1, x: 0, duration, ease: 'power2.out' },
          };
        case 'slideRight':
          return {
            from: { opacity: 0, x: 100 },
            to: { opacity: 1, x: 0, duration, ease: 'power2.out' },
          };
        case 'scaleIn':
          return {
            from: { opacity: 0, scale: 0.8 },
            to: { opacity: 1, scale: 1, duration, ease: 'back.out(1.7)' },
          };
        default:
          return {
            from: { opacity: 0 },
            to: { opacity: 1, duration, ease: 'power2.out' },
          };
      }
    };

    const config = getAnimationConfig();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: trigger,
        toggleActions: 'play none none reverse',
      },
    });

    if (customAnimation) {
      tl.add(() => customAnimation(element), delay);
    } else {
      tl.fromTo(element, config.from, config.to, delay);
    }

    return () => {
      tl.kill();
    };
  }, [animation, delay, duration, trigger, customAnimation]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedSection;
