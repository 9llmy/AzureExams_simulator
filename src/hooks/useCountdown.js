import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Countdown timer.
 *
 * @param {boolean}  running   ticks once per second while true (pause = false)
 * @param {function} onExpire  called once when the timer reaches zero
 * @returns {{ secondsLeft: number, reset: (seconds: number) => void }}
 *
 * `onExpire` is kept in a ref so callers may pass a fresh closure on every
 * render without restarting the interval or firing stale callbacks.
 */
export function useCountdown({ running, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const expireRef = useRef(onExpire);
  const firedRef = useRef(false);

  useEffect(() => {
    expireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (!running || secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [running, secondsLeft <= 0]);

  useEffect(() => {
    if (running && secondsLeft <= 0 && !firedRef.current) {
      firedRef.current = true;
      expireRef.current?.();
    }
  }, [running, secondsLeft]);

  const reset = useCallback((seconds) => {
    firedRef.current = false;
    setSecondsLeft(seconds);
  }, []);

  return { secondsLeft, reset };
}
