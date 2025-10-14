"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SplitText = ({
  text,
  className = '',
  delay = 0.1,
  duration = 0.6,
  splitType = 'chars',
  tag = 'p',
  stagger = 0.05,
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center'
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { 
    threshold, 
    margin: rootMargin,
    once: true 
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const splitText = (text, type) => {
    if (!mounted) {
      // Return simple text during SSR to prevent hydration mismatch
      return text;
    }

    // Optimize animations for better performance
    const animationProps = {
      initial: { opacity: 0, y: 10 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
      transition: {
        duration: duration * 0.8, // Slightly faster animations
        ease: "easeOut"
      },
      style: { willChange: 'transform, opacity' }
    };

    if (type === 'chars') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          {...animationProps}
          transition={{
            ...animationProps.transition,
            delay: index * stagger * 0.5 // Reduced stagger for faster animation
          }}
          style={{ ...animationProps.style, display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    } else if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          {...animationProps}
          transition={{
            ...animationProps.transition,
            delay: index * stagger * 0.3 // Reduced stagger for faster animation
          }}
          style={{ ...animationProps.style, display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ));
    } else if (type === 'lines') {
      // For lines, we need to handle block elements properly
      return text.split('\n').map((line, index) => (
        <motion.span
          key={index}
          {...animationProps}
          transition={{
            ...animationProps.transition,
            delay: index * stagger * 0.2 // Reduced stagger for faster animation
          }}
          style={{ ...animationProps.style, display: 'block' }}
        >
          {line}
        </motion.span>
      ));
    }
    return text;
  };

  const renderTag = () => {
    const textAlignClass = textAlign === 'left' ? 'text-left' : textAlign === 'right' ? 'text-right' : 'text-center';
    const classes = `overflow-hidden ${textAlignClass} ${className}`;
    const content = splitText(text, splitType);
    
    // For lines split type, we need to use div instead of p to avoid nesting issues
    const TagComponent = splitType === 'lines' && tag === 'p' ? 'div' : tag;
    
    switch (TagComponent) {
      case 'h1':
        return (
          <h1 ref={ref} className={classes}>
            {content}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} className={classes}>
            {content}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} className={classes}>
            {content}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} className={classes}>
            {content}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} className={classes}>
            {content}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} className={classes}>
            {content}
          </h6>
        );
      case 'div':
        return (
          <div ref={ref} className={classes}>
            {content}
          </div>
        );
      default:
        return (
          <p ref={ref} className={classes}>
            {content}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;