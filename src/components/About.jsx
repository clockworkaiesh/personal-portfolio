"use client";
import { useRef, useEffect, useState } from "react";
import SplitText from "./SplitText";
import HighlightedSplitText from "./HighlightedSplitText";
import PixelBlast from "./PixelBlast";

export default function About() {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [contentScrollY, setContentScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let contentTimeout;
    let animationTimeout;
    
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
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        if (contentTimeout) {
          clearTimeout(contentTimeout);
        }
        if (animationTimeout) {
          clearTimeout(animationTimeout);
        }
      };
    }
  }, [isVisible]);

  const getContentTransform = (speed, offset = 0) => {
    const translateY = (contentScrollY - 0.5) * speed + offset;
    return `translateY(${translateY}px)`;
  };

  return (
    <div 
      ref={containerRef}
      className="text-center w-screen h-screen  relative flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      <div className="w-full h-full absolute inset-0 opacity-20">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>
      {/* Parallax background gradient */}
      <div 
        className="about-parallax-bg transition-opacity duration-500 ease-out"
        style={{
          transform: `translateY(${(scrollY - 0.5) * 30}px)`,
          opacity: isVisible ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      />
      
      <div 
        className="content-wrapper w-[60dvw] mx-auto] transition-all duration-500 ease-out"
        style={{
          transform: `${getContentTransform(20)} ${isEntering ? 'translateY(30px)' : isExiting ? 'translateY(-30px)' : 'translateY(0px)'}`,
          opacity: isVisible && !isEntering ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        <SplitText
          text="Who am I?"
          tag="h2"
          className="section-heading"
          stagger={0.05}
          duration={0.7}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <HighlightedSplitText
          text="I'm a Frontend Developer with 6+ years of experience turning ideas into digital products that are both functional and visually engaging. From sleek landing pages to complex dashboards, I focus on building interfaces that are responsive, intuitive, and performance-driven. My toolkit includes React.js, Next.js, Redux Toolkit, and Tailwind, along with Framer Motion for animations, D3.js for data visualizations, and Web3 integrations that bring interactivity and modern functionality to the web."
          tag="p"
          className="section-content"
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
          highlights={[
            { word: 'Frontend Developer', color: 'neon-blue' },
            { word: '6+ years', color: 'neon-blue' },
            { word: 'React.js', color: 'neon-blue' },
            { word: 'Next.js', color: 'neon-blue' },
            { word: 'Redux Toolkit', color: 'neon-blue' },
            { word: 'Tailwind', color: 'neon-blue' },
            { word: 'Framer Motion', color: 'neon-blue' },
            { word: 'D3.js', color: 'neon-blue' },
            { word: 'Web3', color: 'neon-blue' },
            { word: 'responsive', color: 'neon-blue' },
            { word: 'intuitive', color: 'neon-blue' },
            { word: 'performance-driven', color: 'neon-blue' }
          ]}
        />
      </div>
      
    </div>
  );
}
