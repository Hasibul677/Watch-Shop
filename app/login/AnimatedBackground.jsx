"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    // Generate random values for the circles only on the client side
    setCircles(
      Array.from({ length: 20 }).map(() => ({
        r: Math.random() * 20 + 10, // Random radius between 10 and 30
        opacity: Math.random() * 0.5 + 0.1, // Random opacity between 0.1 and 0.6
        x: Math.random() * 100, // Random initial x position
        y: Math.random() * 100, // Random initial y position
        duration: Math.random() * 10 + 10, // Random duration between 10 and 20 seconds
      }))
    );
  }, []);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      {circles.map((circle, i) => (
        <motion.circle
          key={i}
          cx={circle.x + "%"}
          cy={circle.y + "%"}
          r={circle.r}
          fill="#fff"
          initial={{
            opacity: circle.opacity,
            x: circle.x + "%",
            y: circle.y + "%",
          }}
          animate={{
            x: [circle.x + "%", (circle.x + Math.random() * 50) + "%", circle.x + "%"],
            y: [circle.y + "%", (circle.y + Math.random() * 50) + "%", circle.y + "%"],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
        />
      ))}
    </svg>
  );
};

export default AnimatedBackground;