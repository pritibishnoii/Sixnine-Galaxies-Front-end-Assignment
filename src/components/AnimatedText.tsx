import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register TextPlugin
gsap.registerPlugin(TextPlugin);

interface AnimatedTextProps {
  children: string;
  className?: string;
  animation?: 'typewriter' | 'reveal' | 'split' | 'fadeInWords' | 'bounce' | 'wave';
  speed?: number;
  delay?: number;
  repeat?: boolean;
  trigger?: 'onMount' | 'onScroll';
  triggerElement?: string;
}

const AnimatedText = ({
  children,
  className = '',
  animation = 'typewriter',
  speed = 0.05,
  delay = 0,
  repeat = false,
  trigger = 'onMount',
  triggerElement,
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const createAnimation = () => {
      switch (animation) {
        case 'typewriter':
          return gsap.fromTo(
            element,
            { text: '' },
            {
              text: children,
              duration: children.length * speed,
              ease: 'none',
              delay,
            }
          );

        case 'reveal':
          return gsap.fromTo(
            element,
            { clipPath: 'inset(0 100% 0 0)' },
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 1.5,
              ease: 'power2.out',
              delay,
            }
          );

        case 'split': {
          // Split text into characters and animate each
          const chars = children.split('').map((char) => (char === ' ' ? '\u00A0' : char));
          element.innerHTML = chars.map((char) => `<span>${char}</span>`).join('');
          const spans = element.querySelectorAll('span');

          return gsap.fromTo(
            spans,
            { opacity: 0, y: 50, rotationX: -90 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
              stagger: 0.05,
              delay,
            }
          );
        }

        case 'fadeInWords': {
          // Split text into words and animate each
          const words = children.split(' ').map((word) => `<span class="word">${word}</span>`);
          element.innerHTML = words.join(' ');
          const wordSpans = element.querySelectorAll('.word');

          return gsap.fromTo(
            wordSpans,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.2,
              delay,
            }
          );
        }

        case 'bounce': {
          const bounceChars = children.split('').map((char) => (char === ' ' ? '\u00A0' : char));
          element.innerHTML = bounceChars.map((char) => `<span>${char}</span>`).join('');
          const bounceSpans = element.querySelectorAll('span');

          return gsap.fromTo(
            bounceSpans,
            { opacity: 0, y: -50, scale: 0 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: 'bounce.out',
              stagger: 0.1,
              delay,
            }
          );
        }

        case 'wave': {
          const waveChars = children.split('').map((char) => (char === ' ' ? '\u00A0' : char));
          element.innerHTML = waveChars.map((char) => `<span>${char}</span>`).join('');
          const waveSpans = element.querySelectorAll('span');

          return gsap.fromTo(
            waveSpans,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.05,
              delay,
            }
          );
        }

        default:
          return gsap.fromTo(
            element,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay }
          );
      }
    };

    let animationInstance: gsap.core.Timeline | gsap.core.Tween | undefined;

    if (trigger === 'onMount') {
      animationInstance = createAnimation();
    } else if (trigger === 'onScroll') {
      animationInstance = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement || element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      if (animation === 'typewriter') {
        animationInstance.fromTo(
          element,
          { text: '' },
          {
            text: children,
            duration: children.length * speed,
            ease: 'none',
            delay,
          }
        );
      } else {
        animationInstance.add(createAnimation());
      }
    }

    // Repeat animation if requested
    if (repeat && animationInstance) {
      if ('repeat' in animationInstance) {
        animationInstance.repeat(-1);
        animationInstance.yoyo(true);
      }
    }

    return () => {
      if (animationInstance) {
        animationInstance.kill();
      }
    };
  }, [children, animation, speed, delay, repeat, trigger, triggerElement]);

  return (
    <div ref={textRef} className={className}>
      {animation === 'typewriter' ? '' : children}
    </div>
  );
};

export default AnimatedText;
