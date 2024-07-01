import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import { Icon } from '~/client/components/ui/Icon/Icon';

import styles from './Nav.module.scss';
import { isNavigationItem, NavigationItemWithChildren } from './NavigationStructure';
import { NavItem } from './NavItem/NavItem';

interface NavItemWithSubItemsProps {
	onClick?: () => void;
	navigationItemWithChildren: NavigationItemWithChildren;
	isMobile?: boolean
}

export function NavItemWithSubItems({
	className,
	onClick,
	navigationItemWithChildren,
	isMobile = false,
}: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
	const optionRef = useRef<HTMLLIElement>(null);
	const navContainerRef = useRef<HTMLUListElement>(null);
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);

	const isNavItemHasOneOfTheseChildrenActive = useCallback(function isItemHasOneOfTheseChildrenActive(item: NavigationItemWithChildren): boolean {
		return item.children.some((subItem) => {
			return isNavigationItem(subItem) ? subItem.link === router.pathname : isItemHasOneOfTheseChildrenActive(subItem);
		});
	}, [router.pathname]);

	const isNavItemActive = useMemo(() => isNavItemHasOneOfTheseChildrenActive(navigationItemWithChildren), [isNavItemHasOneOfTheseChildrenActive, navigationItemWithChildren]);

	useEffect(() => { // initialisation de l'état côté client, une fois le router dispo
		setIsExpanded(isNavItemActive && isMobile);
	}, [isNavItemActive, isMobile]);

	const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
		if (!optionRef.current?.contains(event.target as Node)) {
			setIsExpanded(false);
		}
	}, []);

	const closeOptionsOnSpaceOutside = useCallback((event: KeyboardEvent) => {
		if (!optionRef.current?.contains(event.target as Node) && event.key === KeyBoard.SPACE) {
			setIsExpanded(false);
		}
	}, []);

	const closeNavSubOnFocusOutside = useCallback((event: FocusEvent) => {
		if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
			setIsExpanded(false);
		}
	}, []);

	const closeMenuOnEscape = useCallback((event: KeyboardEvent) => {
		if (event.key === KeyBoard.ESCAPE) {
			setIsExpanded(false);
		}
	}, []);

	function onNavItemSelected() {
		setIsExpanded(false);
		if (onClick) {
			onClick();
		}
	}

	useEffect(function setEventListenerOnMount() {
		document.addEventListener('mouseup', closeOptionsOnClickOutside);
		document.addEventListener('keyup', closeMenuOnEscape);
		document.addEventListener('keyup', closeOptionsOnSpaceOutside);
		document.addEventListener('focusin', closeNavSubOnFocusOutside);
		
		return () => {
			document.removeEventListener('mouseup', closeOptionsOnClickOutside);
			document.removeEventListener('keyup', closeMenuOnEscape);
			document.removeEventListener('keyup', closeOptionsOnSpaceOutside);
			document.removeEventListener('focusin', closeNavSubOnFocusOutside);
		};
	}, [closeMenuOnEscape, closeOptionsOnClickOutside, closeNavSubOnFocusOutside, closeOptionsOnSpaceOutside]);

	const subNav = navigationItemWithChildren.children.map((subItem) => {
		if (isNavigationItem(subItem)) {
			return (
				<NavItem className={styles.subNavItem}
								 key={subItem.label?.toString()}
								 label={subItem.label}
								 link={subItem.link}
								 isActive={router.pathname === subItem.link}
								 onClick={onNavItemSelected}/>
			);
		}
		return <NavItemWithSubItems
			key={subItem.label?.toString()}
			className={styles.navItem}
			navigationItemWithChildren={subItem}
			onClick={onClick}
			isMobile/>;
	});

	return (
		<li ref={optionRef} className={className}>
			<button
				className={classNames(styles.subNavItemButton)}
				onClick={() => setIsExpanded(!isExpanded)}
				aria-expanded={isExpanded}>
				<span className={styles.subNavItemButtonLabel} aria-current={isNavItemActive}>
					{navigationItemWithChildren.label}
				</span>
				<Icon className={isExpanded ? styles.subNavItemButtonIconExpanded : styles.subNavItemButtonIcon} name="angle-down"/>
			</button>
			{isExpanded && <ul ref={navContainerRef} className={styles.subNavItemList}>{subNav}</ul>}
		</li>
	);
}


