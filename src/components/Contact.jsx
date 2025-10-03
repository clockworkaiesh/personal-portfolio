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
      className="text-center w-screen h-screen relative flex flex-col justify-center items-center overflow-hidden  "
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
        className="absolute bottom-0 left-0  w-[440px] h-auto parallax-element parallax-layer-1 transition-all duration-300 ease-out cursor-pointer" 
        src="/shapes/blob-2.svg" 
        alt="blob1"
      />
      
      <img 
        className="absolute bottom-32 -right-24 w-[300px] parallax-element parallax-layer-2 transition-all duration-300 ease-out opacity-10 cursor-pointer rotate-90" 
        src="/shapes/blob-1.svg" 
        alt="blob2"
      />
      
      <img 
        className="absolute top-32 -left-10 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/dual-neon-circle.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute top-32 left-1/2 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/neon-triangle.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute bottom-32 left-1/2 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/neon-mini-strokes.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute top-44 -right-10 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/purple-triangle-1.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute bottom-32 -right-10 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/neon-green-circle-1.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute top-1/2 right-1/4 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[80px] cursor-pointer" 
        src="/shapes/neon-lines.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
       <img 
        className="absolute top-1/2 left-1/4 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[20px] cursor-pointer" 
        src="/shapes/neon-green-circle-4.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      <img 
        className="absolute top-1/4 right-1/4 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[30px] cursor-pointer" 
        src="/shapes/neon-green-circle-4.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />

      <img 
        className="absolute bottom-1/4 right-1/4 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[30px] cursor-pointer" 
        src="/shapes/purple-triangle-3.svg" 
        alt="dots"
        style={{
          transform: `${getParallaxTransform(120)} ${getParallaxRotation(-15)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />

      {/* Shapes positioned in the four corners */}
      {/* Top-Left Corner */}
      <img 
        className="absolute bottom-4 left-60 opacity-40 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[60px] cursor-pointer" 
        src="/shapes/neon-dull-mini-strokes.svg" 
        alt="neon strokes"
        style={{
          transform: `${getParallaxTransform(80)} ${getParallaxRotation(25)} ${getCursorTransform(12)} ${getCursorScale(1, 0.15)}`,
          opacity: isVisible ? 0.3 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Top-Right Corner */}
      <img 
        className="absolute top-4 right-4 opacity-35 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[45px] cursor-pointer" 
        src="/shapes/neon-dull-strokes.svg" 
        alt="neon strokes"
        style={{
          transform: `${getParallaxTransform(100)} ${getParallaxRotation(-30)} ${getCursorTransform(10)} ${getCursorScale(1, 0.18)}`,
          opacity: isVisible ? 0.35 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Left Corner */}
      <img 
        className="absolute bottom-4 left-4 opacity-45 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[35px] cursor-pointer" 
        src="/shapes/neon-green-circle-2.svg" 
        alt="neon circle"
        style={{
          transform: `${getParallaxTransform(90)} ${getParallaxRotation(45)} ${getCursorTransform(15)} ${getCursorScale(1, 0.12)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Right Corner */}
      <img 
        className="absolute bottom-4 right-4 opacity-50 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[55px] cursor-pointer" 
        src="/shapes/neon-stroke-circle-1.svg" 
        alt="neon stroke circle"
        style={{
          transform: `${getParallaxTransform(70)} ${getParallaxRotation(-20)} ${getCursorTransform(8)} ${getCursorScale(1, 0.2)}`,
          opacity: isVisible ? 0.45 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Additional corner shapes */}
      {/* Top-Left Corner - Second shape */}
      <img 
        className="absolute top-6 left-44 opacity-40 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[65px] cursor-pointer" 
        src="/shapes/neon-strokes.svg" 
        alt="neon strokes"
        style={{
          transform: `${getParallaxTransform(110)} ${getParallaxRotation(35)} ${getCursorTransform(14)} ${getCursorScale(1, 0.16)}`,
          opacity: isVisible ? 0.35 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Top-Right Corner - Second shape */}
      <img 
        className="absolute top-16 right-16 opacity-45 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[40px] cursor-pointer" 
        src="/shapes/neon-triangle-2.svg" 
        alt="neon triangle"
        style={{
          transform: `${getParallaxTransform(85)} ${getParallaxRotation(-40)} ${getCursorTransform(11)} ${getCursorScale(1, 0.14)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      
      {/* Bottom-Left Corner - Second shape */}
      <img 
        className="absolute bottom-44 left-16 opacity-40 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[25px] cursor-pointer" 
        src="/shapes/neon-green-circle-4.svg" 
        alt="small neon circle"
        style={{
          transform: `${getParallaxTransform(95)} ${getParallaxRotation(50)} ${getCursorTransform(18)} ${getCursorScale(1, 0.08)}`,
          opacity: isVisible ? 0.3 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Right Corner - Second shape */}
      <img 
        className="absolute bottom-16 right-16 opacity-35 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[20px] cursor-pointer" 
        src="/shapes/neon-green-circle-2.svg" 
        alt="tiny neon circle"
        style={{
          transform: `${getParallaxTransform(105)} ${getParallaxRotation(-60)} ${getCursorTransform(20)} ${getCursorScale(1, 0.06)}`,
          opacity: isVisible ? 0.25 : 0,
          willChange: 'transform, opacity'
        }}
      />

      {/* Additional corner shapes for richer layout */}
      {/* Top-Left Corner - Third shape */}
      <img 
        className="absolute top-8 right
        -8 opacity-30 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[30px] cursor-pointer" 
        src="/shapes/neon-green-circle-1.svg" 
        alt="neon circle"
        style={{
          transform: `${getParallaxTransform(75)} ${getParallaxRotation(60)} ${getCursorTransform(16)} ${getCursorScale(1, 0.1)}`,
          opacity: isVisible ? 0.25 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Top-Right Corner - Third shape */}
      <img 
        className="absolute top-8 right-8 opacity-35 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[35px] cursor-pointer" 
        src="/shapes/neon-mini-strokes.svg" 
        alt="neon mini strokes"
        style={{
          transform: `${getParallaxTransform(65)} ${getParallaxRotation(-45)} ${getCursorTransform(13)} ${getCursorScale(1, 0.12)}`,
          opacity: isVisible ? 0.3 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Left Corner - Third shape */}
      <img 
        className="absolute bottom-96 left-8 opacity-40 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[40px] cursor-pointer" 
        src="/shapes/neon-lines.svg" 
        alt="neon lines"
        style={{
          transform: `${getParallaxTransform(85)} ${getParallaxRotation(30)} ${getCursorTransform(11)} ${getCursorScale(1, 0.14)}`,
          opacity: isVisible ? 0.35 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Right Corner - Third shape */}
      <img 
        className="absolute bottom-8 right-8 opacity-45 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[45px] cursor-pointer" 
        src="/shapes/purple-triangle-1.svg" 
        alt="purple triangle"
        style={{
          transform: `${getParallaxTransform(95)} ${getParallaxRotation(-25)} ${getCursorTransform(9)} ${getCursorScale(1, 0.16)}`,
          opacity: isVisible ? 0.4 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Top-Left Corner - Fourth shape */}
      <img 
        className="absolute top-12 left-12 opacity-25 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[25px] cursor-pointer" 
        src="/shapes/neon-stroke-circle-1.svg" 
        alt="neon stroke circle"
        style={{
          transform: `${getParallaxTransform(55)} ${getParallaxRotation(75)} ${getCursorTransform(22)} ${getCursorScale(1, 0.05)}`,
          opacity: isVisible ? 0.2 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Top-Right Corner - Fourth shape */}
      <img 
        className="absolute top-12 right-12 opacity-30 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[28px] cursor-pointer" 
        src="/shapes/neon-triangle.svg" 
        alt="neon triangle"
        style={{
          transform: `${getParallaxTransform(70)} ${getParallaxRotation(-55)} ${getCursorTransform(19)} ${getCursorScale(1, 0.07)}`,
          opacity: isVisible ? 0.25 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Left Corner - Fourth shape */}
      <img 
        className="absolute bottom-12 left-96 opacity-35 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[32px] cursor-pointer" 
        src="/shapes/dual-neon-circle.svg" 
        alt="dual neon circle"
        style={{
          transform: `${getParallaxTransform(80)} ${getParallaxRotation(40)} ${getCursorTransform(17)} ${getCursorScale(1, 0.09)}`,
          opacity: isVisible ? 0.3 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      {/* Bottom-Right Corner - Fourth shape */}
      <img 
        className="absolute bottom-1/3 left-[12%] opacity-40 parallax-element parallax-layer-3 transition-all duration-300 ease-out size-[38px] cursor-pointer" 
        src="/shapes/purple-triangle-3.svg" 
        alt="purple triangle"
        style={{
          transform: `${getParallaxTransform(90)} ${getParallaxRotation(-35)} ${getCursorTransform(15)} ${getCursorScale(1, 0.11)}`,
          opacity: isVisible ? 0.35 : 0,
          willChange: 'transform, opacity'
        }}
      />
    </div>
  );
}
