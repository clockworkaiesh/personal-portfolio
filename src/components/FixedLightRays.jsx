'use client';

import { useEffect, useState } from 'react';
import LightRays from './LightRays';

export default function FixedLightRays() {
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const windowWidth = window.innerWidth;
      
      // Calculate which section we're in (0 = hero, 1 = about, etc.)
      const currentSection = Math.round(scrollLeft / windowWidth);
      
      // Fade out when not in hero section (section 0)
      if (currentSection === 0) {
        setOpacity(0.5);
      } else {
        // Fade out completely when in other sections
        setOpacity(0);
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{
        opacity: opacity,
        transition: 'opacity 0.8s ease-in-out'
      }}
    >
      <LightRays
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        opacity={opacity}
        className="custom-rays"
      />
    </div>
  );
}
