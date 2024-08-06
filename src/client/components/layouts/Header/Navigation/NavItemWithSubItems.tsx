import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FocusEvent,useCallback, useEffect, useRef, useState } from 'react';

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

	const handleOutsideClick = useCallback((event: MouseEvent) => {
		if (!optionRef.current?.contains(event.target as Node)) {
			setIsExpanded(false);
		}
	}, []);

	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (!optionRef.current?.contains(event.target as Node) && event.key === KeyBoard.SPACE) {
			setIsExpanded(false);
		}

		if (event.key === KeyBoard.ESCAPE) {
			setIsExpanded(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('mouseup', handleOutsideClick);
		document.addEventListener('keyup', handleKeyPress);

		return () => {
			document.removeEventListener('mouseup', handleOutsideClick);
			document.removeEventListener('keyup', handleKeyPress);
		};
	}, [handleOutsideClick, handleKeyPress]);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLLIElement>) {
		const newFocusStillInSubItems = event.currentTarget.contains(event.relatedTarget);
        
		if (!newFocusStillInSubItems) {
			setIsExpanded(false);
			return;
		}
	}, []);

	function onNavItemSelected() {
		setIsExpanded(false);
		if (onClick) {
			onClick();
		}
	}

	const subNav = navigationItemWithChildren.children.map((subItem) => {
		if (isNavigationItem(subItem)) {
			return (
				<NavItem className={styles.subNavItem}
					key={subItem.label?.toString()}
					label={subItem.label}
					link={subItem.link}
					isActive={router.pathname === subItem.link}
					onClick={onNavItemSelected}
				/>
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
