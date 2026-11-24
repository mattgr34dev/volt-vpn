import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';

interface TiltGlassSurfaceProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  baseRotate?: number;
  glareOpacity?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const TiltGlassSurface: React.FC<TiltGlassSurfaceProps> = ({
  children,
  className = '',
  maxTilt = 4.5,
  baseRotate = 0,
  glareOpacity = 0.28,
  disabled = false,
  style,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 260, damping: 24, mass: 0.6 };
  const rotateX = useSpring(rotateXRaw, springConfig);
  const rotateY = useSpring(rotateYRaw, springConfig);

  const glareBackground = useMotionTemplate`radial-gradient(380px circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, ${glareOpacity}), rgba(255, 255, 255, 0) 70%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateXRaw.set((0.5 - py) * maxTilt * 2);
    rotateYRaw.set((px - 0.5) * maxTilt * 2);
    glareX.set(px * 100);
    glareY.set(py * 100);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || prefersReducedMotion || e.pointerType === 'touch') return;
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-glass-surface ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        transformPerspective: 1100,
        rotateX: prefersReducedMotion || disabled ? 0 : rotateX,
        rotateY: prefersReducedMotion || disabled ? 0 : rotateY,
        rotateZ: baseRotate,
      }}
    >
      {children}
      {!prefersReducedMotion && !disabled && (
        <motion.div
          aria-hidden="true"
          className="tilt-glass-glare"
          style={{
            background: glareBackground,
            opacity: hovered ? 1 : 0,
          }}
        />
      )}
    </motion.div>
  );
};
