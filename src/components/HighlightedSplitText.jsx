"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const HighlightedSplitText = ({
  text,
  className = '',
  delay = 0.1,
  duration = 0.6,
  splitType = 'chars',
  tag = 'p',
  stagger = 0.05,
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center',
  highlights = [] // Array of { word: 'word', color: 'neon-blue' | 'neon-purple' }
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

  const getHighlightColor = (word) => {
    const highlight = highlights.find(h => 
      word.toLowerCase().includes(h.word.toLowerCase())
    );
    return highlight ? highlight.color : null;
  };

  const splitText = (text, type) => {
    if (!mounted) {
      return text;
    }

    if (type === 'chars') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration,
            delay: index * stagger,
            ease: "easeOut"
          }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    } else if (type === 'words') {
      return text.split(' ').map((word, index) => {
        const highlightColor = getHighlightColor(word);
        const cleanWord = word.replace(/[.,!?;:]$/, '');
        const punctuation = word.replace(/^[^.,!?;:]*/, '');
        
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration,
              delay: index * stagger,
              ease: "easeOut"
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {highlightColor ? (
              <span 
                className="font-semibold"
                style={{ 
                  color: highlightColor === 'neon-blue' ? '#00f0ff' : '#a855f7'
                }}
              >
                {cleanWord}
              </span>
            ) : (
              cleanWord
            )}
            {punctuation}
          </motion.span>
        );
      });
    } else if (type === 'lines') {
      return text.split('\n').map((line, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration,
            delay: index * stagger,
            ease: "easeOut"
          }}
          style={{ display: 'block' }}
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

export default HighlightedSplitText;
