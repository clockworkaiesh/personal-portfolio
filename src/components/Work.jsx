"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../portfolioData.js";

export default function Work({
  isActive,
  enteredFromBelow = false,
  onExitWork,
}) {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = portfolioData.length + 1; // intro + projects
  const isAnimating = useRef(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);

  // Handle scroll navigation when work section is active
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isAnimating.current) return;

      const delta = e.deltaY;
      isAnimating.current = true;

      if (delta > 0) {
        // Scrolling down - normal order (0 to 6)
        setIsScrollingUp(false);
        setHasUserScrolled(true);
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          // Reached the end, exit work section to next section
          if (onExitWork) {
            onExitWork("down");
          }
        }
      } else {
        // Scrolling up - reverse order (6 to 0)
        setIsScrollingUp(true);
        setHasUserScrolled(true);
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        } else {
          // Reached the beginning, exit work section to previous section
          if (onExitWork) {
            onExitWork("up");
          }
        }
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 600);
    };

    const handleKeyDown = (e) => {
      if (isAnimating.current) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        isAnimating.current = true;

        // Scrolling down - normal order (0 to 6)
        setIsScrollingUp(false);
        setHasUserScrolled(true);
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          // Reached the end, exit work section to next section
          if (onExitWork) {
            onExitWork("down");
          }
        }

        setTimeout(() => {
          isAnimating.current = false;
        }, 600);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        isAnimating.current = true;

        // Scrolling up - reverse order (6 to 0)
        setIsScrollingUp(true);
        setHasUserScrolled(true);
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        } else {
          // Reached the beginning, exit work section to previous section
          if (onExitWork) {
            onExitWork("up");
          }
        }

        setTimeout(() => {
          isAnimating.current = false;
        }, 600);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, currentSlide, totalSlides]);

  // Initialize slide position and scroll direction when work section becomes active
  useEffect(() => {
    if (isActive) {
      if (enteredFromBelow) {
        // If entered from below (Contact section), start at last slide and show reverse counting
        setCurrentSlide(totalSlides - 1);
        setIsScrollingUp(true);
        setHasUserScrolled(true); // Mark as scrolled to immediately use reverse counting
      } else {
        // If entered from above (Skills section), start at first slide and show normal counting
        setCurrentSlide(0);
        setIsScrollingUp(false);
        setHasUserScrolled(false); // Reset user scroll tracking
      }
    } else {
      // Reset when leaving work section
      setCurrentSlide(0);
      setIsScrollingUp(false);
      setHasUserScrolled(false);
    }
  }, [isActive, enteredFromBelow, totalSlides]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Slide counter */}
      <div className="absolute top-4 right-4 bg-dark-softer bg-opacity-50 text-text-heading p-2 rounded text-sm z-50">
        {isScrollingUp ? totalSlides - 1 - currentSlide : currentSlide} /{" "}
        {totalSlides - 1}
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentSlide === 0 ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl px-6"
            >
              <h2 className="text-6xl font-bold mb-6 text-text-heading">
                What do I make?
              </h2>
              <p className="text-[18px] text-text-muted">
              I craft digital products that are clean, responsive, and functional, with attention to detail and usability. Browse through my recent projects to see how I translate ideas into effective, user-friendly solutions.
              </p>
            </motion.div>
          ) : (
            (() => {
              const slideIndex = currentSlide - 1;
              const currentProject = portfolioData[slideIndex];

              // Safety check to prevent accessing undefined array elements
              if (!currentProject) {
                return (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -200 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto px-6 text-center"
                  >
                    <h3 className="text-4xl font-bold mb-6 text-text-heading">
                      Project Not Found
                    </h3>
                    <p className="text-lg mb-8 text-text-muted leading-relaxed">
                      This project is not available at the moment.
                    </p>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-[70dvw] mx-auto px-6 text-center flex gap-6 items-center justify-center"
                >
                 <div className="w-full">
                  <h3 className="text-2xl font-bold mb-3 text-text-heading text-left">
                      {currentProject.title}
                    </h3>
                    <p className="text-[13px] text-left text-base opacity-80 leading-relaxed">
                      {currentProject.description}
                    </p>
                 </div>
                  <div className="w-full h-[300px] bg-dark-softer rounded-[12px] overflow-hidden flex items-center justify-center">
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      className="w-full aspect-square object-contain rounded-[12px]"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  </div>
                </motion.div>
              );
            })()
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
