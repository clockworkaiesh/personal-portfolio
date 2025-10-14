"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "../portfolioData.js";

export default function Work({
  isActive,
  onExitWork,
}) {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = portfolioData.length; // Total slides based on portfolioData
  const isAnimating = useRef(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  // Handle scroll navigation when work section is active
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      e.preventDefault();

      if (isAnimating.current) return;

      const delta = e.deltaY;
      isAnimating.current = true;

      if (delta > 0) {
        // Scrolling down
        setIsScrollingUp(false);
        if (currentSlide < totalSlides - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          // Exit to the next section
          if (onExitWork) {
            onExitWork("down");
          }
        }
      } else {
        // Scrolling up
        setIsScrollingUp(true);
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        } else {
          // Exit to the previous section
          if (onExitWork) {
            onExitWork("up");
          }
        }
      }

      setTimeout(() => {
        isAnimating.current = false;
      }, 1200);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isActive, currentSlide, totalSlides]);

  return (
    <section
      ref={sectionRef}
      className="portfolio relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {portfolioData[currentSlide] && (
            <motion.div
              key={portfolioData[currentSlide].id}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.6 }}
              className={`max-w-[70dvw] mx-auto px-6 text-center flex ${
                portfolioData[currentSlide].image ? "gap-6 items-center" : "flex-col"
              } justify-center`}
            >
              <div className={`w-full ${portfolioData[currentSlide].image ? "text-left" : "text-center"}`}>
                <h3 className={`${!portfolioData[currentSlide].image ? "section-heading" : "project-title"}`}>
                  {portfolioData[currentSlide].title}
                </h3>
                <p className={`${!portfolioData[currentSlide].image ? "section-content" : "project-detail"}`}>
                  {portfolioData[currentSlide].description}
                </p>
              </div>
              {portfolioData[currentSlide].image && (
                <div className="w-full h-[300px] bg-dark-softer rounded-[12px] overflow-hidden flex items-center justify-center">
                  <img
                    src={portfolioData[currentSlide].image}
                    alt={portfolioData[currentSlide].title}
                    className="w-full aspect-square object-contain rounded-[12px]"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
