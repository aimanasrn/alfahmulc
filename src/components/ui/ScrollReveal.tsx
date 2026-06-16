import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { cn } from "../../utils/cn";

type ScrollRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("scroll-reveal", isVisible && "is-visible", className)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
