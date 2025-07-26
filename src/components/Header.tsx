import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BsHandbag } from 'react-icons/bs';
import { GoHeart } from 'react-icons/go';
import { PiUser } from 'react-icons/pi';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for animations
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);
  const cartRef = useRef<HTMLUListElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } });

    // Logo animation
    tl.fromTo(logoRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0 });

    // Menu items staggered animation (desktop only)
    const menuItems = menuItemsRef.current?.querySelectorAll('li');
    if (menuItems) {
      tl.fromTo(menuItems, { opacity: 0, y: -30 }, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.3');
    }

    // Cart items staggered animation
    const cartItems = cartRef.current?.querySelectorAll('li');
    if (cartItems) {
      tl.fromTo(cartItems, { opacity: 0, x: 50 }, { opacity: 1, x: 0, stagger: 0.1 }, '-=0.4');
    }

    // Add hover animations for menu items (desktop only)
    const menuLiItems = menuItemsRef.current?.querySelectorAll('li');
    if (menuLiItems) {
      menuLiItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -3,
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      });
    }

    // Add hover animations for cart icons
    const cartLiItems = cartRef.current?.querySelectorAll('li');
    if (cartLiItems) {
      cartLiItems.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            rotation: 5,
            duration: 0.2,
            ease: 'back.out(1.7)',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            rotation: 0,
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      });
    }

    // Logo hover effect
    if (logoRef.current) {
      logoRef.current.addEventListener('mouseenter', () => {
        gsap.to(logoRef.current, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        });
      });

      logoRef.current.addEventListener('mouseleave', () => {
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    }

    return () => {
      tl.kill();
      // Clean up event listeners
      if (menuLiItems) {
        menuLiItems.forEach((item) => {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        });
      }
      if (cartLiItems) {
        cartLiItems.forEach((item) => {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        });
      }
    };
  }, []);

  // Mobile menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Animate mobile menu opening
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );

      // Animate hamburger to X
      gsap.to(hamburgerRef.current, {
        rotation: 180,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      // Animate mobile menu closing
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate X back to hamburger
      gsap.to(hamburgerRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      ref={navRef}
      className="w-full h-20 flex justify-between items-center text-[#2D3B36] bg-[#EFF5E1] px-4 md:px-10 shadow-sm relative"
    >
      <div
        ref={logoRef}
        className="text-xl md:text-2xl font-bold cursor-pointer transition-all duration-300"
      >
        SKINCARE
      </div>

      {/* Desktop Menu */}
      <ul ref={menuItemsRef} className="hidden md:flex gap-6">
        <li className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300">
          all Products
        </li>
        <li className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300">
          serum
        </li>
        <li className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300">
          sunscreen
        </li>
        <li className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300">
          Bundle
        </li>
      </ul>

      {/* Desktop Cart */}
      <ul ref={cartRef} className="hidden md:flex gap-4 items-center">
        <li className="cursor-pointer w-10 h-10 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
          <BsHandbag />
        </li>
        <li className="cursor-pointer hover:text-[#1a2520] transition-colors duration-300 font-medium">
          cart(1)
        </li>
        <li className="cursor-pointer w-10 h-10 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
          <GoHeart />
        </li>
        <li className="cursor-pointer w-10 h-10 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
          <PiUser />
        </li>
      </ul>

      {/* Mobile Cart Icons */}
      <div className="flex md:hidden gap-2 items-center">
        <div className="cursor-pointer w-8 h-8 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
          <BsHandbag className="w-4 h-4" />
        </div>
        <div className="cursor-pointer w-8 h-8 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
          <GoHeart className="w-4 h-4" />
        </div>
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-[#2D3B36] hover:text-[#EFF5E1] rounded-full transition-all duration-300"
        >
          {isMobileMenuOpen ? <HiX className="w-5 h-5" /> : <HiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-full left-0 w-full bg-[#EFF5E1] shadow-lg z-50 md:hidden"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Menu Items */}
            <div className="space-y-3">
              <div className="text-lg font-semibold text-[#2D3B36] border-b border-[#2D3B36] pb-2">
                Menu
              </div>
              <div className="space-y-2">
                <div className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300 py-2">
                  all Products
                </div>
                <div className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300 py-2">
                  serum
                </div>
                <div className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300 py-2">
                  sunscreen
                </div>
                <div className="text-md capitalize cursor-pointer hover:text-[#1a2520] transition-colors duration-300 py-2">
                  Bundle
                </div>
              </div>
            </div>

            {/* Mobile Cart Section */}
            <div className="space-y-3 pt-4 border-t border-[#2D3B36]">
              <div className="text-lg font-semibold text-[#2D3B36]">Cart</div>
              <div className="flex items-center gap-3">
                <div className="cursor-pointer w-10 h-10 rounded-full bg-[#F8FEE5] flex justify-center items-center hover:bg-[#2D3B36] hover:text-[#EFF5E1] transition-all duration-300 shadow-md">
                  <PiUser className="w-5 h-5" />
                </div>
                <span className="text-[#2D3B36] font-medium">cart(1)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
