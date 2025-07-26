import skincareText from '../assets/skincareText.svg';

const Footer = () => {
  return (
    <div className="bg-[#2D3B36] text-[#E7E8E0] h-max w-full mt-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-8 md:py-12 gap-6 md:gap-0">
        <h2 className="text-2xl md:text-4xl w-full md:w-1/3 px-0 md:px-6 leading-8 md:leading-10 text-center md:text-left">
          Join The Skincare Community Now.
        </h2>
        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-sm">Get in Touch</span>
          <h3 className="text-xl md:text-2xl">contact.skincare.com</h3>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-8 md:py-12 mt-8 md:mt-12 gap-6 md:gap-0">
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Facebook
          </li>
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Instagram
          </li>
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            YouTube
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-center md:text-left">
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Terms of Service
          </li>
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Privacy Policy
          </li>
          <li className="cursor-pointer hover:text-white transition-colors duration-300">
            Cookie Settings
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="px-4 md:px-0">
        <img src={skincareText} alt="skincarea" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Footer;
