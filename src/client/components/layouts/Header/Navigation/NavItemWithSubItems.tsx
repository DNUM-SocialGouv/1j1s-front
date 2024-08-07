import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FocusEvent, useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useKeyPress } from '~/client/hooks/useKeyPress';
import { useOutsideClick } from '~/client/hooks/useOutsideClick';

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
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);

	const isItemActive = useCallback((item: NavigationItemWithChildren): boolean => {
		return item.children.some((subItem) => 
			isNavigationItem(subItem) 
				? subItem.link === router.pathname 
				: isItemActive(subItem),
		);
	}, [router.pathname]);

	useEffect(() => {
		setIsExpanded(isItemActive(navigationItemWithChildren) && isMobile);
	}, [isItemActive, navigationItemWithChildren, isMobile]);

	const closeMenu = useCallback(() => setIsExpanded(false), []);

	useOutsideClick(optionRef, closeMenu);
	useKeyPress(closeMenu);

	const onBlur = useCallback((event: FocusEvent<HTMLLIElement>) => {
		const newFocusStillInSubItems = event.currentTarget.contains(event.relatedTarget);
		if (!newFocusStillInSubItems) {
			setIsExpanded(false);
		}
	}, []);

	function onNavItemSelected() {
		setIsExpanded(false);
		onClick?.();
	}

	const subNav = navigationItemWithChildren.children.map((subItem) => {
		if (isNavigationItem(subItem)) {
			return (
				<NavItem 
					className={styles.subNavItem}
					key={subItem.label?.toString()}
					label={subItem.label}
					link={subItem.link}
					isActive={router.pathname === subItem.link}
					onClick={onNavItemSelected}
				/>
			);
		}
		return (
			<NavItemWithSubItems
				key={subItem.label?.toString()}
				className={styles.navItem}
				navigationItemWithChildren={subItem}
				onClick={onClick}
				isMobile
			/>
		);
	});

	return (
		<li ref={optionRef} className={className} onBlur={onBlur}>
			<button
				className={classNames(styles.subNavItemButton)}
				onClick={() => setIsExpanded(!isExpanded)}
				aria-expanded={isExpanded}
			>
				<span className={styles.subNavItemButtonLabel} aria-current={isItemActive(navigationItemWithChildren)}>
					{navigationItemWithChildren.label}
				</span>
				<Icon 
					className={isExpanded ? styles.subNavItemButtonIconExpanded : styles.subNavItemButtonIcon} 
					name="angle-down"
				/>
			</button>
			{isExpanded && <ul className={styles.subNavItemList}>{subNav}</ul>}
		</li>
	);
}
