import classNames from 'classnames';
import React, { 
  MouseEventHandler, 
  useCallback, useEffect, 
  useMemo, 
  useRef, 
  useState, 
} from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { isNavigationItem, NavigationItem, NavigationItemWithChildren } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { Icon } from '~/client/components/ui/Icon/Icon';

interface NavItemWithSubItemsProps {
  label: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
  path: string
  subItemList: Array<NavigationItem | NavigationItemWithChildren>
}

export function NavItemWithSubItems({ className, onClick, label, path, subItemList }: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
  const optionsRef = useRef<HTMLLIElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = useMemo(() => {
    return subItemList.some((subItem) => isNavigationItem(subItem) && subItem.link === path);
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

  const subItems = subItemList.map((item, index) => {
    if (isNavigationItem(item)) {
      return (
        <NavItem className={styles.subNavItem} 
          key={index} 
          label={item.label} 
          link={item.link} 
          isActive={path === item.link} 
          onClick={onClick}/>
      );
    } else {
      return (
        <SubNavItem
          label={item.label}
          key={index}
          onClick={() => {}}
        />
      );
    }

  });

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
          { subItems }
        </ul>
      }
    </li>
  );
}


interface SubNavItemProps {
  key: number | string
  label: string
  onClick: () => void
}
function SubNavItem ({ key, label, onClick }: SubNavItemProps) {
  return (
    <li key={key}>
      <button
        className={styles.subNavItemButton}
        onClick={onClick}
      >
        sub {label}
      </button>
    </li>
  );
}
