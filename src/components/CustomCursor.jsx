import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.role === "button" ||
        target.classList.contains("cursor-pointer");

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-[var(--color-accent)] mix-blend-difference hidden md:block"
      animate={{
        scale: isHovered ? 3.5 : 1,
        x: position.x - 4,
        y: position.y - 4,
      }}
      transition={{ type: "spring", stiffness: 600, damping: 30, mass: 0.1 }}
      style={{
        width: "8px",
        height: "8px",
      }}
    />
  );
}
