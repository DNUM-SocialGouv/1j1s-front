import classNames from 'classnames';
import React, { RefObject, useEffect, useRef, useState } from 'react';

import styles from '~/client/components/ui/Bouée/Bouée.module.scss';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';

export default function Bouée ({ surface }: { surface: RefObject<HTMLElement> }) {
  const [isDown, setIsDown] = useDebouncedState(false, 50);

  useEffect(() => {
    function onScroll () {
      if (surface.current) {
        const { y } = surface.current.getBoundingClientRect();
        y < 0 ? setIsDown(true) : setIsDown(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [surface]);

  function toSurface () {
    surface.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <button 
      className={ classNames({ [styles.bouée]: true, [styles.enabled]: isDown, [styles.disabled]: !isDown })}
      hidden={ !isDown }
      onClick={ () => toSurface() }
      title="remonter en haut de la page"
    >
      <span><AngleUpIcon /></span>
    </button>
  );
}


function useDebouncedState<T>(initial: T, delay = 50): [T, (v: T) => void] {
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
