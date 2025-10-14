"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import SplitText from "./SplitText";
import HighlightedSplitText from "./HighlightedSplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function About() {
  const sectionRef = useRef(null);
  const svgPathRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const svgPath = svgPathRef.current;
      const contentWrapper = contentWrapperRef.current;

      if (!section || !svgPath || !contentWrapper) {
        console.error("About section refs not found.");
        return;
      }

      // Set initial states
      gsap.set(svgPath, { drawSVG: "0%" });
      gsap.set(contentWrapper, { autoAlpha: 0 });
      // Initially hide the marker
      gsap.set(svgPath, { attr: { "markerEnd": "none" } });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: ".scroll-container",
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
          toggleActions: "play reverse play reverse",
        },
      });

      // 1. Animate the SVG path drawing
      tl.to(svgPath, {
        drawSVG: "100%",
        duration: 2,
        ease: "none",
        // When the path is fully drawn, add the marker back
        onComplete: () =>
          gsap.set(svgPath, { attr: { "markerEnd": "url(#SvgjsMarker3293)" } }),
        // When reversing, hide the marker immediately
        onReverseComplete: () =>
          gsap.set(svgPath, { attr: { "markerEnd": "none" } }),
      }).to(
        // 2. Animate the content to appear
        contentWrapper,
        {
          autoAlpha: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="text-center w-screen h-screen relative flex flex-col justify-center items-center px-6 overflow-hidden"
    >
      {/* Parallax background gradient */}
      <div className="animated-bg" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 640 800"
        className="absolute right-[7%] top-[5%] h-[500px]"
      >
        <defs>
          {/* Define the gradient */}
          <linearGradient id="aboutGradient">
            <stop stopColor="#00FF9D" offset="0%" />
            <stop stopColor="#00F0FF" offset="100%" />
          </linearGradient>
          <marker
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            viewBox="0 0 8 8"
            orient="auto"
            id="SvgjsMarker3293"
          >
            <polyline
              points="0,4 4,2 0,0"
              fill="none"
              strokeWidth="1.3333333333333333"
              stroke="url(#aboutGradient)" // Apply gradient to marker
              strokeLinecap="round"
              transform="matrix(1,0,0,1,1.3333333333333333,2)"
              strokeLinejoin="round"
            ></polyline>
          </marker>
        </defs>
        <g
          strokeWidth="6"
          stroke="url(#aboutGradient)" // Apply gradient to the path
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="matrix(0.12186934340514749,0.992546151641322,-0.992546151641322,0.12186934340514749,638.0202707668816,15.637494112717945)"
        >
          <path
            ref={svgPathRef}
            d="M32.5 112.5Q809.5 519.5 320 400Q583.5 141.5 607.5 687.5 "
            markerEnd="url(#SvgjsMarker3293)"
          ></path>
        </g>
      </svg>
      <div
        ref={contentWrapperRef}
        className="content-wrapper w-[60dvw] mx-auto] transition-all duration-500 ease-out"
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
          text="I'm a Frontend Developer with 6+ years of experience turning ideas into digital products that are both functional and visually engaging. From sleek landing pages to complex dashboards, I focus on building interfaces that are responsive, intuitive, and performance-driven."
          tag="p"
          className="section-content mb-2"
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
          highlights={[
            { word: "Frontend Developer", color: "neon-blue" },
            { word: "6+ years", color: "neon-blue" },
            { word: "responsive", color: "neon-blue" },
            { word: "intuitive", color: "neon-blue" },
            { word: "performance-driven", color: "neon-blue" },
          ]}
        />

        <HighlightedSplitText
          text="My toolkit includes React.js, Next.js, Redux Toolkit, and Tailwind, along with Framer Motion for animations, D3.js for data visualizations, and Web3 integrations that bring interactivity and modern functionality to the web."
          tag="p"
          className="section-content"
          stagger={0.02}
          duration={0.6}
          splitType="words"
          threshold={0.3}
          rootMargin="0px"
          highlights={[
            { word: "React.js", color: "neon-blue" },
            { word: "Next.js", color: "neon-blue" },
            { word: "Redux Toolkit", color: "neon-blue" },
            { word: "Tailwind", color: "neon-blue" },
            { word: "Framer Motion", color: "neon-blue" },
            { word: "D3.js", color: "neon-blue" },
            { word: "Web3", color: "neon-blue" },
          ]}
        />
      </div>
    </div>
  );
}
