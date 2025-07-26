import AnimatedText from './AnimatedText';

const TextAnimationDemo = () => {
  return (
    <div className="p-8 bg-white space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">GSAP Text Animation Examples</h2>

      {/* Typewriter Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">1. Typewriter Effect</h3>
        <AnimatedText
          animation="typewriter"
          speed={0.05}
          className="text-2xl font-bold text-blue-600"
        >
          This text appears character by character like a typewriter!
        </AnimatedText>
      </div>

      {/* Reveal Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">2. Reveal Effect</h3>
        <AnimatedText animation="reveal" delay={0.5} className="text-2xl font-bold text-green-600">
          This text reveals from left to right with a clip-path effect
        </AnimatedText>
      </div>

      {/* Split Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">3. Character Split Effect</h3>
        <AnimatedText animation="split" delay={1.0} className="text-2xl font-bold text-purple-600">
          Each character animates individually with 3D rotation
        </AnimatedText>
      </div>

      {/* Fade In Words */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">4. Word by Word Fade</h3>
        <AnimatedText
          animation="fadeInWords"
          delay={1.5}
          className="text-2xl font-bold text-orange-600"
        >
          Words fade in one by one with a staggered effect
        </AnimatedText>
      </div>

      {/* Bounce Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">5. Bounce Effect</h3>
        <AnimatedText animation="bounce" delay={2.0} className="text-2xl font-bold text-red-600">
          Characters bounce in with a playful animation
        </AnimatedText>
      </div>

      {/* Wave Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">6. Wave Effect</h3>
        <AnimatedText animation="wave" delay={2.5} className="text-2xl font-bold text-teal-600">
          Characters flow in like a wave from bottom to top
        </AnimatedText>
      </div>

      {/* Scroll Triggered Animation */}
      <div className="space-y-2 mt-12">
        <h3 className="text-lg font-semibold text-gray-700">7. Scroll Triggered Animation</h3>
        <AnimatedText
          animation="typewriter"
          trigger="onScroll"
          speed={0.03}
          className="text-xl font-bold text-indigo-600"
        >
          This text animates when you scroll to this section
        </AnimatedText>
      </div>

      {/* Repeating Animation */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-700">8. Repeating Animation</h3>
        <AnimatedText animation="bounce" repeat={true} className="text-xl font-bold text-pink-600">
          This animation repeats infinitely
        </AnimatedText>
      </div>
    </div>
  );
};

export default TextAnimationDemo;
