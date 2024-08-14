import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import { useNavItemBlur } from '~/client/hooks/useNavItemBlur';
import { useNavItemKeyDown } from '~/client/hooks/useNavItemKeyDown';

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

	const isNavItemActive = useMemo(() => {
		const hasChildActive = (item: NavigationItemWithChildren): boolean => {
			return item.children.some((subItem) => 
				isNavigationItem(subItem) ? subItem.link === router.pathname : hasChildActive(subItem),
			);
		};
	
		return hasChildActive(navigationItemWithChildren);
	}, [router.pathname, navigationItemWithChildren]);

	useEffect(() => {
		setIsExpanded(isNavItemActive && isMobile);
	}, [isNavItemActive, isMobile]);

	const onBlur = useNavItemBlur(setIsExpanded);
	const onKeyDown = useNavItemKeyDown(optionRef, setIsExpanded);

	function onNavItemSelected() {
		setIsExpanded(false);
		if (onClick) {
			onClick();
		}
	}

	const subNav = navigationItemWithChildren.children.map((subItem, index) => {
		if (isNavigationItem(subItem)) {
			return (
				<NavItem 
					className={styles.subNavItem}
					key={`nav-item-label-${index}`}
					label={subItem.label}
					link={subItem.link}
					isActive={router.pathname === subItem.link}
					onClick={onNavItemSelected}
				/>
			);
		}
		return <NavItemWithSubItems
			key={`nav-item-with-subitem-label-${index}`}
			className={styles.navItem}
			navigationItemWithChildren={subItem}
			onClick={onClick}
			isMobile/>;
	});

	return (
		<li ref={optionRef} className={className} onBlur={onBlur} onKeyDown={onKeyDown}>
			<button
				className={classNames(styles.subNavItemButton)}
				onClick={() => setIsExpanded(!isExpanded)}
				aria-expanded={isExpanded}>
				<span className={styles.subNavItemButtonLabel} aria-current={isNavItemActive}>
					{navigationItemWithChildren.label}
				</span>
				<Icon name="angle-down"/>
			</button>
			{isExpanded && <ul className={styles.subNavItemList}>{subNav}</ul>}
		</li>
	);
}
