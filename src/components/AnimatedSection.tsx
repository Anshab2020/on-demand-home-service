import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'slide-in' | 'scale-in';
  once?: boolean;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
  once = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted state after a small delay
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            setIsVisible(true);
            hasAnimated.current = true;
          } else if (!entry.isIntersecting && !once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.unobserve(section);
  }, [once, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0',
        {
          'animate-fade-in': isVisible && animation === 'fade-in',
          'animate-slide-in': isVisible && animation === 'slide-in',
          'animate-scale-in': isVisible && animation === 'scale-in',
        },
        className
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
