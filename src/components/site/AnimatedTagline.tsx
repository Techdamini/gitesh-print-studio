import { useEffect, useState } from "react";

const phrases = [
  "All Printing Solutions in One Place",
  "Flex, Boards, ID Cards & More",
  "High Quality Printing at Affordable Prices",
  "Custom Designs for Every Need",
];

export function AnimatedTagline({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % phrases.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={className} aria-live="polite">
      <span
        key={i}
        className="inline-block animate-pop"
      >
        {phrases[i]}
      </span>
    </div>
  );
}
