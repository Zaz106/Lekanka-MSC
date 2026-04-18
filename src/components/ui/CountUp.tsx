"use client";

import { animate } from "motion";
import { useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  separator?: string;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  delay = 0,
  className = "",
  separator = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const getDecimalPlaces = (num: number) => {
    const str = num.toString();
    if (str.includes(".")) {
      const d = str.split(".")[1];
      if (parseInt(d) !== 0) return d.length;
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (val: number) => {
      const opts: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: maxDecimals,
        maximumFractionDigits: maxDecimals,
      };
      const formatted = Intl.NumberFormat("en-US", opts).format(val);
      return separator ? formatted.replace(/,/g, separator) : formatted;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) ref.current.textContent = formatValue(from);
  }, [from, formatValue]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(val) {
        if (ref.current) ref.current.textContent = formatValue(val);
      },
    });
    return () => controls.stop();
  }, [isInView, from, to, duration, delay, formatValue]);

  return <span className={className} ref={ref} />;
}
