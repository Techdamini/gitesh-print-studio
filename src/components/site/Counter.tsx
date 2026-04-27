import { useCounter } from "@/hooks/use-counter";

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, value: v } = useCounter(value);
  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}
