"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCardWrapperProps {
  children: ReactNode;
}

const AnimatedCardWrapper = ({ children }: AnimatedCardWrapperProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (card) {
      // Set initial state (invisible)
      gsap.set(card, { 
        opacity: 0,
        y: 30
      });

      // Create animation that triggers when scrolled into view
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100", // Starts animation when top of card is 100px from bottom of viewport
          toggleActions: "play none none none"
        }
      });
    }

    // Cleanup function
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <div ref={cardRef}>
      {children}
    </div>
  );
};

export default AnimatedCardWrapper;