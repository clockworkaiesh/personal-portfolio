"use client";
import { useRef, useEffect, useState } from "react";
import SplitText from "./SplitText";

export default function Skills() {
  const containerRef = useRef(null);
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const skills = [
    { name: "React", image: "/skills/reactjs.svg" },
    { name: "Next.js", image: "/skills/nextjs.svg" },
    { name: "Vue.js", image: "/skills/vuejs.svg" },
    { name: "Vanilla JS", image: "/skills/js.svg" },
    { name: "Node.js", image: "/skills/nodejs.svg" },
    { name: "Redux", image: "/skills/redux.svg" },
    { name: "D3.js", image: "/skills/d3js.svg" },
    { name: "Framer Motion", image: "/skills/framermotion.svg" },
    { name: "Tailwind CSS", image: "/skills/tailwind.svg" },
    { name: "Sass", image: "/skills/sass.svg" },
    { name: "Material-UI", image: "/skills/mui.svg" },
    { name: "Figma", image: "/skills/figma.svg" },
    { name: "Git", image: "/skills/git.svg" },
    { name: "VS Code", image: "/skills/vscode.svg" },
    { name: "WordPress", image: "/skills/wordpress.svg" },
    { name: "Bootstrap", image: "/skills/brand.svg" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay to ensure smooth transition
            setTimeout(() => {
              setIsVisible(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "50px"
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="text-center px-6 h-full flex flex-col relative source-code-img overflow-visible w-screen">
      <div className="mb-8 w-[50dvw] mx-auto">
        <SplitText
          text="Superpowers"
          tag="h2"
          className="section-heading"
          stagger={0.05}
          duration={0.8}
          splitType="chars"
          threshold={0.3}
          rootMargin="0px"
        />
        <SplitText
          text="A toolbox of design, development, and collaboration skills that I use to turn ideas into smooth, scalable, and production-ready web experiences."
          tag="div"
          className="section-content"
          stagger={0.02}
          duration={0.2}
          splitType="lines"
          threshold={0.3}
          rootMargin="0px"
        />
      </div>
      
      {/* Skills Grid with Staggered Animation */}
      <div className="flex-1 min-h-0 w-[60dvw] mx-auto">
        <div ref={skillsRef} className="skills-grid grid grid-cols-8 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={skill.name} 
              className="skill-item flex flex-col items-center justify-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`,
                willChange: 'opacity, transform'
              }}
            >
              <img 
                src={skill.image} 
                alt={skill.name} 
                className="size-[70px] aspect-square min-w-[70px] min-h-[70px] object-contain transition-transform duration-300 hover:scale-110" 
              />
              <p className="text-sm mt-2 text-center">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
