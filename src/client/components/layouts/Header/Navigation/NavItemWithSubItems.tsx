import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useActiveNavItem } from '~/client/hooks/useActiveNavItem';
import { useNavItemEvents } from '~/client/hooks/useNavItemEvents';

import styles from './Nav.module.scss';
import { isNavigationItem, NavigationItemWithChildren } from './NavigationStructure';
import { NavItem } from './NavItem/NavItem';

interface NavItemWithSubItemsProps {
  onClick?: () => void;
  navigationItemWithChildren: NavigationItemWithChildren;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NavItemWithSubItems({
	className,
	onClick,
	navigationItemWithChildren,
	isMobile = false,
	isOpen,
	onToggle,
}: NavItemWithSubItemsProps & React.HTMLAttributes<HTMLLIElement>) {
	const router = useRouter();
	const { isExpanded, isNavItemActive, setIsExpanded } = useActiveNavItem(navigationItemWithChildren, isMobile);
	const { optionRef, onBlur } = useNavItemEvents(() => {});

	const isMenuOpen = isOpen ? isOpen : isExpanded;

	function onNavItemSelected() {
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
				onClick={onToggle || (() => setIsExpanded(!isExpanded))}
				aria-expanded={isMenuOpen}
			>
				<span className={styles.subNavItemButtonLabel} aria-current={isNavItemActive}>
					{navigationItemWithChildren.label}
				</span>
				<Icon 
					className={isMenuOpen ? styles.subNavItemButtonIconExpanded : styles.subNavItemButtonIcon} 
					name="angle-down"
				/>
			</button>
			{isMenuOpen && <ul className={styles.subNavItemList}>{subNav}</ul>}
		</li>
	);
}
