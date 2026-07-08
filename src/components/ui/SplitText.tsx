import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay between character/word animations in ms
  duration?: number; // duration of animation in seconds
  ease?: string | number[]; // easing function
  splitType?: "chars" | "words";
  from?: any;
  to?: any;
  threshold?: number;
  rootMargin?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text = "",
  className = "",
  delay = 30,
  duration = 0.5,
  ease = "backOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  textAlign,
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold, margin: rootMargin as any });
  
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const childVariants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration: duration,
        ease: ease,
      },
    },
  };

  const Tag = tag;

  return (
    <Tag
      ref={ref as any}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        willChange: "transform, opacity",
      }}
    >
      {/* Screen-reader-only text for accessibility and testing-library */}
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>

      {/* Visually animated text, hidden from screen readers to prevent letter-by-letter spelling and testing-library spacing issues */}
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="inline"
        onAnimationComplete={() => {
          if (isInView && onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        }}
      >
        {splitType === "words"
          ? words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <motion.span
                  variants={childVariants}
                  className="inline-block"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
                {wordIndex < words.length - 1 && " "}
              </React.Fragment>
            ))
          : words.map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={childVariants}
                      className="inline-block"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                {wordIndex < words.length - 1 && " "}
              </React.Fragment>
            ))}
      </motion.span>
    </Tag>
  );
}

export default SplitText;
