import SplitText from "./SplitText";

export default function Hero() {
  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center px-6">
      <div className="flex justify-between items-center max-w-[60dvw] mx-auto">
        <div className="text-left">
        <SplitText
        text="Hey, I'm Ayesha"
        tag="h1"
        className="section-heading large"
        stagger={0.05}
        duration={0.8}
        splitType="chars"
        threshold={0.3}
        rootMargin="0px"
        textAlign="left"
      />
      <SplitText
        text="Frontend Developer & UI/UX Enthusiast"
        tag="h2"
        className="text-2xl font-medium leading-[150%] mb-3 text-neon-blue opacity-90"
        stagger={0.03}
        duration={0.7}
        splitType="words"
        threshold={0.3}
        rootMargin="0px"
        textAlign="left"
      />
      <SplitText
        text="I craft sleek and high-performance web experiences using React, Framer Motion, and modern tools. I focus on building interfaces that are fast, intuitive, and pleasant to interact with. Scroll to see how I bring ideas into motion."
        tag="p"
        className="section-content"
        stagger={0.02}
        duration={0.6}
        splitType="lines"
        threshold={0.3}
        rootMargin="0px"
        textAlign="left"
      />
      </div>

        <div className="w-[1020px] h-full relative">
          <img src="/shapes/hero-blob.gif" className="absolute inset-0 z-0 opacity-[0.2]"/>
          <img src="/dev-setup.png" alt="" className="relative z-10"/>
        </div>
      </div>
    </div>
  );
}
