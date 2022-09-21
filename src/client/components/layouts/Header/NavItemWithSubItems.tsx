import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { NavigationItem } from '~/client/components/layouts/Header/NavigationStructure';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface NavItemWithSubItemsProps {
  label: string
  path: string
  subItemList: NavigationItem[]
}

export function NavItemWithSubItems({ children, className, label, path, subItemList }: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
  const optionsRef = useRef<HTMLLIElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = useMemo(() => {
    return subItemList.some((subItem) => {
      if ('link' in subItem) return subItem.link === path;
    });
  }, [path, subItemList]);

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

  return (
    <li ref={optionsRef} className={classNames(isActive ? styles.hasNavItemActive : '', className)}>
      <button
        className={styles.subNavItemButton}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}>
        <span className={styles.subNavItemLabel} aria-current={isActive}>{label}</span>
        <Icon className={isExpanded ? styles.subNavItemIconExpanded : styles.subNavItemIcon} name="angle-down" />
      </button>
      {isExpanded &&
        <ul className={styles.subNavItemList} onClick={() => setIsExpanded(!isExpanded)} role="menu">
          {children}
        </ul>
      }
    </li>
  );
}
