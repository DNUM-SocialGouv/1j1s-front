import {
  ForwardedRef,
  useImperativeHandle,
  useRef,
} from 'react';

export function useSynchronizedRef<T>(ref: ForwardedRef<T | null>) {
  const innerRef = useRef<T>(null);
  useImperativeHandle<T | null, T | null>(ref, () => innerRef.current, [
    innerRef,
  ]);
  return innerRef;
}
