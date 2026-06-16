import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

type ScrollVelocityProps = {
  items: ReactNode[];
  baseVelocity?: number;
  className?: string;
};

export function ScrollVelocity({
  items,
  baseVelocity = -60,
  className = "",
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const directionFactor = useRef(baseVelocity < 0 ? -1 : 1);
  const [groupWidth, setGroupWidth] = useState(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  useEffect(() => {
    const measure = () => {
      const width = groupRef.current?.getBoundingClientRect().width ?? 0;
      setGroupWidth(width);
    };

    measure();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(measure);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (groupRef.current) {
      resizeObserver.observe(groupRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (!groupWidth) {
      return;
    }

    const velocity = velocityFactor.get();
    const velocityDirection = velocity === 0 ? directionFactor.current : Math.sign(velocity);

    if (velocityDirection !== 0) {
      directionFactor.current = velocityDirection;
    }

    let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    moveBy += directionFactor.current * Math.abs(moveBy) * Math.abs(velocity);

    let nextX = baseX.get() + moveBy;

    if (nextX <= -groupWidth) {
      nextX += groupWidth;
    } else if (nextX >= 0) {
      nextX -= groupWidth;
    }

    baseX.set(nextX);
  });

  const x = useTransform(baseX, (value) => `${value}px`);

  return (
    <div ref={containerRef} className={`scroll-velocity ${className}`.trim()}>
      <motion.div className="scroll-velocity__track" style={{ x }}>
        <div ref={groupRef} className="scroll-velocity__group" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`group-a-${index}`} className="scroll-velocity__item">
              {item}
            </div>
          ))}
        </div>
        <div className="scroll-velocity__group" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`group-b-${index}`} className="scroll-velocity__item">
              {item}
            </div>
          ))}
        </div>
        <div className="scroll-velocity__group" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`group-c-${index}`} className="scroll-velocity__item">
              {item}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
