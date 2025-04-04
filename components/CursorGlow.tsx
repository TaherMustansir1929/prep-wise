"use client";

import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[-1] transition duration-300 lg:block hidden"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(100, 100, 255, 0.1), transparent 40%)`,
      }}
    />
  );
};

export default CursorGlow;