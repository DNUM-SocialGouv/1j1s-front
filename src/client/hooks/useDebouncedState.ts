import {  useEffect, useRef, useState } from 'react';

export default function useDebouncedState<T>(initial: T, delay = 50): [T, (v: T) => void] {
  const [s, set] = useState<T>(initial);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    return () => clearTimeout(timer.current);
  });
  function debounce (v: T) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => set(v), delay);
  }
  return [s, debounce];
}
