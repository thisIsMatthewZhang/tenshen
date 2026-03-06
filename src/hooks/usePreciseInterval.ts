import { useEffect } from "react";
// setTimeout caused erratic behavior with the time changes (uses an internal clock to schedule callbacks);
// workaround: use 'performance.now()' to explicitly calculate elapsed time
// Check this link for better implementations: https://sqlpey.com/javascript/javascript-timer-accuracy-drift-fix/
export function usePreciseInterval(
  callback: () => void,
  delay: number,
  ...args: never[]
) {
  useEffect(() => {
    const start = performance.now();
    function checkElapsed() {
      const elapsed = performance.now() - start;
      const remaining = delay - elapsed;
      if (remaining <= 0) {
        callback();
      } else {
        setTimeout(checkElapsed, Math.max(1, remaining)); // prevent negative values for time delays
      }
    }
    let timeout = setTimeout(checkElapsed, 1); // yes, schedules callback for every 1 ms (0.001 s)
    return () => clearTimeout(timeout);
  }, [callback, delay, args]);
}
