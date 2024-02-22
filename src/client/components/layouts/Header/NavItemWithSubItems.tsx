import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import {
	isNavigationItem,
	NavigationItem,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { Icon } from '~/client/components/ui/Icon/Icon';

import { EmbeddedNavItem } from './EmbeddedNavItem';

interface NavItemWithSubItemsProps {
  onClick?: () => void;
  item: NavigationItemWithChildren;
	isMobile?: boolean
}

export function NavItemWithSubItems({ className, onClick, item: root, isMobile = false }: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
	const optionsRef = useRef<HTMLLIElement>(null);

	const router = useRouter();
	const [pathToCurrentSubmenu, setPathToCurrentSubmenu] = useState<NavigationItemWithChildren[]>(
		createPathToCurrentPageSubmenu(root, (element) => element.link === router.pathname) ?? [root],
	);

	const isActive = useMemo(() => {
		return isItemActive(root, router.pathname);
	}, [router.pathname, root]);
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => { // initialisation de l'état côté client, une fois le router dispo
		setIsExpanded(isActive && isMobile);
	}, [isActive, isMobile]);

	const reset = useCallback(() => {
		setIsExpanded(false);
		setPathToCurrentSubmenu([root]);
	}, [setIsExpanded, root]);

	const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
		if (!optionsRef.current?.contains(event.target as Node)) {
			reset();
		}
	}, [reset]);

	const closeOptionsOnSpaceOutside = useCallback((event: KeyboardEvent) => {
		if (!optionsRef.current?.contains(event.target as Node) && event.key === KeyBoard.SPACE) {
			reset();
		}
	}, [reset]);

	const closeMenuOnEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === KeyBoard.ESCAPE) {
			reset();
		}
	}, [reset]);

	const currentItem = pathToCurrentSubmenu[pathToCurrentSubmenu.length - 1];

	function selectEmbeddedNavItem(item: NavigationItemWithChildren) {
		setPathToCurrentSubmenu([...pathToCurrentSubmenu, item]);
	}

	function popEmbeddedItem() {
		setPathToCurrentSubmenu((callstack) => {
			const newStack = [...callstack];
			newStack.pop();
			return newStack;
		});
	}

	function onItemSelected() {
		reset();
		if (onClick) {
			onClick();
		}
	}

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mouseup', closeOptionsOnClickOutside);
		document.addEventListener('keyup', closeMenuOnEscape);
		document.addEventListener('keyup', closeOptionsOnSpaceOutside);

		return () => {
			document.removeEventListener('mouseup', closeOptionsOnClickOutside);
			document.removeEventListener('keyup', closeMenuOnEscape);
			document.removeEventListener('keyup', closeOptionsOnSpaceOutside);
		};
	}, [closeMenuOnEscape, closeOptionsOnClickOutside, closeOptionsOnSpaceOutside]);

	const subNav = currentItem.children.map((item, index) => {
		if (isNavigationItem(item)) {
			return (
				<NavItem className={styles.subNavItem}
					key={item.label}
					label={item.label}
					link={item.link}
					isActive={router.pathname === item.link}
					onClick={onItemSelected}/>
			);
		}
		return (
			<EmbeddedNavItem
				label={item.label}
				key={index}
				isActive={isItemActive(item, router.pathname)}
				onClick={(e) => {
					e.stopPropagation();
					selectEmbeddedNavItem(item);
				}}
			/>
		);
	});

	const isRoot = root.label === currentItem.label;

	return (
		<li ref={optionsRef} className={classNames(isActive ? styles.hasNavItemActive : '', className)}>
			<button
				className={classNames(styles.subNavItemButton, { [styles.embedded]: !isRoot })}
				onClick={() => isRoot ? setIsExpanded(!isExpanded) : popEmbeddedItem()}
				aria-expanded={isExpanded}>
				<span className={styles.subNavItemLabel} aria-current={isActive}>{currentItem.label}</span>
				<Icon className={isExpanded ? styles.subNavItemIconExpanded : styles.subNavItemIcon} name="angle-down"/>
			</button>
			{isExpanded &&
        <ul className={styles.subNavItemList}>
        	{subNav}
        </ul>
			}
		</li>
	);
}

function createPathToCurrentPageSubmenu(category: NavigationItemWithChildren, matcher: (element: NavigationItem) => boolean): NavigationItemWithChildren[] | null {
	for (const item of category.children) {
		if (isNavigationItem(item) && matcher(item)) {
			return [category];
		}

		if (!isNavigationItem(item)) {
			const childStack = createPathToCurrentPageSubmenu(item, matcher);
			if (childStack != null) {
				return [category, ...childStack];
			}
		}
	}
	return null;
}

function isItemActive(item: NavigationItemWithChildren, path: string): boolean {
	return item.children.some((subItem) => {
		return isNavigationItem(subItem) ? subItem.link === path : isItemActive(subItem, path);
	});
}

