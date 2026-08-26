"use client";
import { useEffect, useState } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  start: boolean;
}

export const CountUp = ({ target, suffix = "", start }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 2000;
    const stepTime = duration / target;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, start]);

  return <>{count}{suffix}</>;
};
