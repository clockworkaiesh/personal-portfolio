import React, { useState, useEffect, useCallback } from "react";

function GlowCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Throttle mouse movement for better performance
  const throttledMouseMove = useCallback((e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
    
    if (!isVisible) {
      setIsVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    let throttleTimeout;
    
    const handleMouseMove = (e) => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        throttledMouseMove(e);
        throttleTimeout = null;
      }, 16); // ~60fps
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [throttledMouseMove]);

  return (
    <div 
      className={`cursor-glow ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(79, 70, 229, 0.15), transparent)`
      }}
    />
  );
}
export default GlowCursor;