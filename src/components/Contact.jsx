"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import SplitText from "./SplitText";
import SocialLinks from "./SocialLinks";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export default function Contact() {
  const sectionRef = useRef(null);
  const svgPathRef = useRef(null);
  const contentWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const svgPath = svgPathRef.current;
      const contentWrapper = contentWrapperRef.current;

      if (!section || !svgPath || !contentWrapper) {
        console.error("Contact section refs not found.");
        return;
      }

      // Reset states
      gsap.set(svgPath, { drawSVG: "0%" });
      gsap.set(contentWrapper, { autoAlpha: 0, y: 50 });
      // Initially hide the marker by removing the attribute
      gsap.set(svgPath, { attr: { "markerEnd": "none" } });

      // Main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: ".scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          markers: false,
        },
      });

      // SVG draw effect
      tl.to(svgPath, {
        drawSVG: "100%",
        duration: 4,
        ease: "power1.inOut",
        // When the path is fully drawn, add the marker back
        onComplete: () =>
          gsap.set(svgPath, { attr: { "markerEnd": "url(#SvgjsMarker1027)" } }),
        // When reversing, hide the marker immediately
        onReverseComplete: () =>
          gsap.set(svgPath, { attr: { "markerEnd": "none" } }),
      });

      // Content fade + rise
      tl.to(
        contentWrapper,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.01,
          ease: "power2.out",
        },
        "-=1.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section sticky-contact text-center w-screen h-screen flex flex-col justify-center items-center overflow-hidden"
      id="contact"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 800 800"
        className="absolute top-0 left-[12%] h-[480px]"
      >
        <defs>
          <linearGradient id="contactGradient">
            <stop stopColor="#00FF9D" offset="0%" />
            <stop stopColor="#00F0FF" offset="100%" />
          </linearGradient>
          <marker
            markerWidth="6"
            markerHeight="10"
            refX="5"
            refY="5"
            viewBox="0 0 10 10"
            orient="auto"
            id="SvgjsMarker1027"
          >
            <polyline
              points="0,5 5,2.5 0,0"
              fill="none"
              strokeWidth="1.6666666666666667"
              stroke="url(#contactGradient)"
              strokeLinecap="round"
              transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
              strokeLinejoin="round"
            ></polyline>
          </marker>
        </defs>
        <g
          strokeWidth="6"
          stroke="url(#contactGradient)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="matrix(1,0,0,1,-19,135)"
        >
          <path
            ref={svgPathRef}
            d="M184.5 184.5Q634.5 281.5 400 400Q208.5 467.5 615.5 615.5 "
            markerEnd="url(#SvgjsMarker1027)"
          ></path>
        </g>
      </svg>
      <div
        ref={contentWrapperRef}
        className="content-wrapper transition-all duration-500 ease-out"
      >
        <SplitText
          text="Let's Talk"
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
        <SocialLinks className="mt-8" />
      </div>
    </section>
  );
}
