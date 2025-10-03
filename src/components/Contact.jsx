"use client";
import { useRef, useEffect, useState } from "react";
import SplitText from "./SplitText";
import SocialLinks from "./SocialLinks";

export default function Contact() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [contentScrollY, setContentScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let contentTimeout;
    let animationTimeout;
    
    const handleMouseMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // Get the scroll position relative to this section
      const rect = container.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within this section (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
      
      // Determine section visibility and state
      const isInView = sectionTop < viewportHeight && sectionTop > -sectionHeight;
      const isFullyInView = sectionTop <= 0 && sectionTop > -sectionHeight;
      const isScrollingDown = scrollProgress > 0.1;
      const isScrollingUp = scrollProgress < 0.9;
      
      // Handle entrance animation (shapes first, then content)
      if (isInView && !isVisible) {
        setIsVisible(true);
        setIsEntering(true);
        setIsExiting(false);
        
        // Shapes appear immediately
        setScrollY(scrollProgress);
        
        // Content fades in after 0.4s delay
        animationTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
          setIsEntering(false);
        }, 400);
      }
      
      // Handle exit animation (content first, then shapes)
      else if (!isInView && isVisible) {
        setIsVisible(false);
        setIsExiting(true);
        setIsEntering(false);
        
        // Content fades out immediately
        setContentScrollY(0);
        
        // Shapes fade out after 0.3s delay
        animationTimeout = setTimeout(() => {
          setScrollY(0);
          setIsExiting(false);
        }, 300);
      }
      
      // Handle normal scrolling within section
      else if (isVisible && isFullyInView) {
        // Background elements move immediately
        setScrollY(scrollProgress);
        
        // Clear any existing timeout
        if (contentTimeout) {
          clearTimeout(contentTimeout);
        }
        
        // Content follows with 0.3s delay
        contentTimeout = setTimeout(() => {
          setContentScrollY(scrollProgress);
        }, 300);
      }
    };

    // Listen to scroll events on the main container
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      // Initial call to set correct position
      handleScroll();
    }
    
    // Add mouse move listener to the container
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (contentTimeout) {
        clearTimeout(contentTimeout);
      }
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [isVisible]);

  // Parallax transform calculations for background elements (immediate)
  const getParallaxTransform = (speed, offset = 0) => {
    const translateY = (scrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  const getParallaxRotation = (speed, baseRotation = 0) => {
    const rotation = (scrollY - 0.5) * speed + baseRotation;
    return `rotate(${rotation}deg)`;
  };

  // Content transform calculations (delayed)
  const getContentTransform = (speed, offset = 0) => {
    const translateY = (contentScrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  // Cursor interaction functions
  const getCursorTransform = (sensitivity = 20) => {
    const translateX = (mousePosition.x - 0.5) * sensitivity;
    const translateY = (mousePosition.y - 0.5) * sensitivity;
    return `translate(${translateX}px, ${translateY}px)`;
  };

  const getCursorRotation = (sensitivity = 10) => {
    const rotation = (mousePosition.x - 0.5) * sensitivity;
    return `rotate(${rotation}deg)`;
  };

  const getCursorScale = (baseScale = 1, sensitivity = 0.1) => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - 0.5, 2) + Math.pow(mousePosition.y - 0.5, 2)
    );
    const scale = baseScale + (1 - distance) * sensitivity;
    return `scale(${Math.max(0.8, Math.min(1.2, scale))})`;
  };

  return (
    <div 
      ref={containerRef}
      className="text-center w-screen h-[60dvh] relative flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      <div 
        className="content-wrapper transition-all duration-500 ease-out"
        style={{
          transform: `${getContentTransform(20)} ${isEntering ? 'translateY(30px)' : isExiting ? 'translateY(-30px)' : 'translateY(0px)'}`,
          opacity: isVisible && !isEntering ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        <SplitText
          text="Let's Talk "
          tag="h2"
          className="section-heading"
          stagger={0.05}
          duration={0.8}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <SplitText
          text="Looking to turn your idea into a polished product? Let's make it happen."
          tag="div"
          className="section-content"
          stagger={0.02}
          duration={0.2}
          splitType="lines"
          threshold={0.3}
          rootMargin="0px"
        />
        
        {/* Social Media Links */}
        <SocialLinks className="mt-8" />
      </div>
      
      {/* Parallax decorative images with cursor interaction */}
      <img 
        className="absolute bottom-14 left-10 -translate-x-1/2 size-[80px] parallax-element parallax-layer-1 transition-all duration-300 ease-out cursor-pointer" 
        src="/shapes/purple-blob1.png" 
        alt="blob1"
        style={{
          transform: `${getParallaxTransform(-100)} ${getParallaxRotation(45)} ${getCursorTransform(15)} ${getCursorScale(1, 0.15)}`,
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      <img 
        className="absolute bottom-32 -right-10 parallax-element parallax-layer-2 transition-all duration-300 ease-out opacity-10 cursor-pointer" 
        src="/shapes/purple-blob2.png" 
        alt="blob2"
        style={{
          transform: `${getParallaxTransform(-60)} ${getParallaxRotation(-30)} ${getCursorTransform(-10)} ${getCursorScale(1, 0.1)}`,
          opacity: isVisible ? 0.5 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      <img 
        className="absolute top-32 left-1/2 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/dots-big.png" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
    </div>
  );
}
