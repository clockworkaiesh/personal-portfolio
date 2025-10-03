"use client";
import { useRef, useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import WebMenu from "../components/WebMenu";
import GlowCursor from "@/components/GlowCursor";
import PrimaryButton from "@/components/PrimaryButton";
// import FixedLightRays from "../components/FixedLightRays";

export default function Home() {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [previousSection, setPreviousSection] = useState(0);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout;

    // Enhanced scroll behavior with debouncing
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const container = containerRef.current;
      if (!container) return;

      const delta = e.deltaY;
      const scrollAmount = window.innerHeight;
      
      // Skip scroll handling if we're in the Work section (let Work component handle it)
      if (currentSection === 3) {
        return;
      }
      
      isScrolling = true;
      
      if (delta > 0) {
        // Scrolling down
        if (currentSection < 4) { // 5 sections total (0-4)
          setCurrentSection(prev => prev + 1);
          container.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
      } else {
        // Scrolling up
        if (currentSection > 0) {
          setCurrentSection(prev => prev - 1);
          container.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
          });
        }
      }

      // Reset scrolling flag after animation completes
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    // Keyboard navigation support
    const handleKeyDown = (e) => {
      if (isScrolling) return;
      
      const container = containerRef.current;
      if (!container) return;

      const scrollAmount = window.innerHeight;
      
      // Skip keyboard handling if we're in the Work section (let Work component handle it)
      if (currentSection === 3) {
        return;
      }
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        isScrolling = true;
        
        if (currentSection < 4) {
          setCurrentSection(prev => prev + 1);
          container.scrollBy({
            top: scrollAmount,
            behavior: 'smooth'
          });
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        isScrolling = true;
        
        if (currentSection > 0) {
          setCurrentSection(prev => prev - 1);
          container.scrollBy({
            top: -scrollAmount,
            behavior: 'smooth'
          });
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        container.removeEventListener('wheel', handleWheel);
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(scrollTimeout);
      };
    }
  }, [currentSection]);

  // Track current section based on scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const newSection = Math.round(scrollTop / sectionHeight);
      
      if (newSection !== currentSection) {
        setPreviousSection(currentSection);
        setCurrentSection(newSection);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  const handleItemClick = (index) => {
    setCurrentSection(index);
    const sections = document.querySelectorAll('.section');
    if (sections[index]) {
      sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleExitWork = (direction) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = window.innerHeight;
    
    if (direction === 'down') {
      // Move to next section (Contact)
      if (currentSection < 4) {
        setCurrentSection(4);
        container.scrollBy({
          top: scrollAmount,
          behavior: 'smooth'
        });
      }
    } else if (direction === 'up') {
      // Move to previous section (Skills)
      if (currentSection > 0) {
        setCurrentSection(2);
        container.scrollBy({
          top: -scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };



  return (
    <>
      {/* Fixed Logo */}
      <div 
        className="fixed top-4 left-4 z-50 cursor-pointer hover:scale-110 transition-transform duration-200"
        onClick={() => handleItemClick(0)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleItemClick(0);
          }
        }}
        aria-label="Navigate to home section"
      >
        <img 
          src="/ayesha-naveed-logo.svg" 
          alt="Ayesha Naveed" 
          className="w-16 h-16 hover:opacity-80 transition-opacity duration-200"
        />
      </div>
      <div className="absolute z-50 top-4 right-4">
        <PrimaryButton text="Contact" />
      </div>

      {/* Fixed Light Rays */}
      {/* <FixedLightRays /> */}

      <main ref={containerRef} className="scroll-container w-full">
        <section className="scroll-section section w-full flex items-center justify-center section-bg text-text-heading">
          <div className="relative z-10">
            <Hero />
          </div>
        </section>
        <section className="scroll-section section w-full flex items-center justify-center section-bg text-text-heading">
          <div className="relative z-10">
            <About />
          </div>
        </section>
        <section className="scroll-section section w-full flex items-center justify-center section-bg text-text-heading">
          <div className="relative z-10">
            <Skills />
          </div>
        </section>
        <section className="scroll-section section w-full flex items-center justify-center section-bg text-text-heading">
          <div className="relative z-10">
            <Work 
              isActive={currentSection === 3} 
              enteredFromBelow={previousSection === 4 && currentSection === 3}
              onExitWork={handleExitWork}
            />
          </div>
        </section>
        
        <section className="scroll-section section w-full  flex items-center justify-center section-bg text-text-heading">
            <Contact />
        </section>
      </main>
      
      {/* WebMenu Dock */}
      <WebMenu onItemClick={handleItemClick} />
      <GlowCursor />
    </>
  );
}
