import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { isNavigationItem, NavigationItemWithChildren } from '~/client/components/layouts/Header/Navigation/NavigationStructure';

export function useActiveNavItem(navigationItemWithChildren: NavigationItemWithChildren, isMobile: boolean) {
	const router = useRouter();
	const [isExpanded, setIsExpanded] = useState(false);

	const isNavItemHasOneOfTheseChildrenActive = useCallback((item: NavigationItemWithChildren): boolean => {
		return item.children.some((subItem) => 
			isNavigationItem(subItem) ? subItem.link === router.pathname : isNavItemHasOneOfTheseChildrenActive(subItem),
		);
	}, [router.pathname]);

	const isNavItemActive = useMemo(() => 
		isNavItemHasOneOfTheseChildrenActive(navigationItemWithChildren), 
	[isNavItemHasOneOfTheseChildrenActive, navigationItemWithChildren],
	);

	useEffect(() => {
		setIsExpanded(isNavItemActive && isMobile);
	}, [isNavItemActive, isMobile]);

	return { isExpanded, isNavItemActive, setIsExpanded };
}
