import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FocusEvent, KeyboardEvent,useCallback, useEffect, useState  } from 'react';

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
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const isItemActive = useCallback((item: NavigationItemWithChildren): boolean => {
		return item.children.some((subItem) => {
			const toto = isNavigationItem(subItem) 
				? subItem.link === router.pathname 
				: isItemActive(subItem);
			return toto;
		});
	}, [router.pathname]);

	useEffect(() => {
		setIsExpanded(isItemActive(navigationItemWithChildren) && isMobile);
	}, [isItemActive, navigationItemWithChildren, isMobile]);

	const handleToggle = () => setIsExpanded(!isExpanded);

	const handleFocus = () => setIsFocused(true);

	const onBlur = useCallback(function onBlur(event: FocusEvent<HTMLLIElement>) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setIsFocused(false);
			setIsExpanded(false);
		}
	}, []);

	const onKeyDown = useCallback(function onKeyDown(event: KeyboardEvent<HTMLLIElement>) {
		if (event.key === KeyBoard.ESCAPE || (!isFocused && event.key === KeyBoard.SPACE)) {
			setIsExpanded(false);
		}
	}, [isFocused]);

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
		<li 
			className={className} 
			onBlur={onBlur}
			onFocus={handleFocus}
			onKeyDown={onKeyDown}
		>
			<button
				className={classNames(styles.subNavItemButton)}
				onClick={handleToggle}
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
