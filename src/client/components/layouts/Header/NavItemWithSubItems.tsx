import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { isNavigationItem, NavigationItemWithChildren } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

import { EmbeddedNavItem } from './EmbeddedNavItem';

interface NavItemWithSubItemsProps {
  onClick?: () => void;
  path: string;
  item: NavigationItemWithChildren;
}

export function NavItemWithSubItems({ className, onClick, item: root, path }: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
	const optionsRef = useRef<HTMLLIElement>(null);
	const [currentItem, setCurrentItem] = useState<NavigationItemWithChildren>(root);
	const [previousEmbeddedItems, setPreviousEmbeddedItems] = useState<NavigationItemWithChildren[]>([]);
	const label = currentItem.label;
	const subItems = currentItem.children;
	const isRoot = root.label === currentItem.label;
	const { isLargeScreen } = useBreakpoint();

	const isActive = useMemo(() => {
		return isItemActive(root, path);
	}, [path, root]);
	const [isExpanded, setIsExpanded] = useState(isActive && !isLargeScreen);

	const reset = useCallback(() => {
		setIsExpanded(false);
		setCurrentItem(root);
		setPreviousEmbeddedItems([]);
	}, [setIsExpanded, setCurrentItem, root]);

	const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
		if (!optionsRef.current?.contains(event.target as Node)) {
			reset();
		}
	}, [reset]);

	const closeMenuOnEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === KeyBoard.ESCAPE) {
			reset();
		}
	}, [reset]);

	function selectEmbeddedNavItem(item: NavigationItemWithChildren) {
		setPreviousEmbeddedItems([currentItem, ...previousEmbeddedItems]);
		setCurrentItem(item);
	}

	function popEmbeddedItem() {
		const [next, ...parents] = previousEmbeddedItems;
		setCurrentItem(next || root);
		setPreviousEmbeddedItems(parents);
	}

	function onItemSelected() {
		reset();
		if (onClick) {
			onClick();
		}
	}

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mousedown', closeOptionsOnClickOutside);
		document.addEventListener('keyup', closeMenuOnEscape);

		return () => {
			document.removeEventListener('mousedown', closeOptionsOnClickOutside);
			document.removeEventListener('keyup', closeMenuOnEscape);
		};
	}, [closeMenuOnEscape, closeOptionsOnClickOutside]);

	useEffect(() => {
		for (const item of root.children) {
			if (!isNavigationItem(item) && isItemActive(item, path)) {
				selectEmbeddedNavItem(item);
				break;
			}
		}
		/* eslint-disable */
  }, [path, root]);

  const subNav = subItems.map((item, index) => {
    if (isNavigationItem(item)) {
      return (
        <NavItem className={styles.subNavItem}
          key={index}
          label={item.label}
          link={item.link}
          isActive={path === item.link}
          onClick={onItemSelected}/>
      );
    } else {
      return (
        <EmbeddedNavItem
          label={item.label}
          key={index}
          isActive={isItemActive(item, path)}
          onClick={(e) => {
            e.stopPropagation();
            selectEmbeddedNavItem(item);
          }}
        />
      );
    }

  });


  return (
    <li ref={optionsRef} className={classNames(isActive ? styles.hasNavItemActive : '', className)}>
      <button
        className={classNames(styles.subNavItemButton, { [styles.embedded]: !isRoot })}
        onClick={() => isRoot ? setIsExpanded(!isExpanded) : popEmbeddedItem()}
        aria-expanded={isExpanded}>
        <span className={styles.subNavItemLabel} aria-current={isActive}>{label}</span>
        <Icon className={isExpanded ? styles.subNavItemIconExpanded : styles.subNavItemIcon} name="angle-down"/>
      </button>
      {isExpanded &&
        <ul className={styles.subNavItemList} role="menu">
          {subNav}
        </ul>
      }
    </li>
  );
}

function isItemActive(item: NavigationItemWithChildren, path: string): boolean {
  return item.children.some((subItem) => {
    return isNavigationItem(subItem) ? subItem.link === path : isItemActive(subItem, path);
  });
}

