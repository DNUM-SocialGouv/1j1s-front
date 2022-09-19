import React, { useCallback, useEffect, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { CommonProps } from '~/client/components/props';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';

interface NavItemWithSubItemsProps extends CommonProps {
  title: string
  isCurrent: boolean
  children: React.ReactNode
}

export function NavItemWithSubItems({ children, title, isCurrent }: React.PropsWithChildren<NavItemWithSubItemsProps>) {

  const optionsRef = useRef<HTMLLIElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(optionsRef.current)?.contains(event.target as Node)) {
      setIsExpanded(false);
    }
  }, []);

  const closeMenuOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === KeyBoard.ESCAPE) {
      setIsExpanded(false);
    }
  }, []);

  useEffect(function setEventListenerOnMount() {
    document.addEventListener('mousedown', closeOptionsOnClickOutside);
    document.addEventListener('keyup', closeMenuOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOptionsOnClickOutside);
      document.removeEventListener('keyup', closeMenuOnEscape);
    };
  }, [closeMenuOnEscape, closeOptionsOnClickOutside]);

  return(
    <li ref={optionsRef}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span aria-current={isCurrent}>{title}</span>
        {isExpanded ? <AngleUpIcon /> : <AngleDownIcon />}
      </button>
      {isExpanded &&
        <ul className={styles.subItemsWrapper} onClick={ () => setIsExpanded(!isExpanded)}>
          {children}
        </ul>
      }
    </li>
  );
}
