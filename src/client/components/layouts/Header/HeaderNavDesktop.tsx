import { useRouter } from 'next/router';
import React, {
	useEffect,
	useState,
} from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

import { NavEmployeurs } from './NavEmployeurs';

export function HeaderNavDesktop() {
	const {
		accueil,
		accompagnementNav,
		aidesEtOutilsNav,
		employeurNav,
		engagementNav,
		offresNav,
		orientationNav,
		logementsNav,
	} = navigationItemList();
	const router = useRouter();
	const [path, setPath] = useState(() => router.pathname || '');

	useEffect(() => {
		if (path !== router.pathname){
			setPath(router.pathname);
		}
	}, [path, setPath, router]);

	return (
		<div className={styles.headerNavigation}>
			<Container>
				<nav id="header-navigation"
					className={styles.headerNavigationList}
					role="navigation"
					aria-label="Menu principal">
					<ul className={styles.headerNavigationListLeft}>
						<NavItem className={styles.navItem} label={accueil.label} link={accueil.link} isActive={path === accueil.link} />
						<NavItemWithSubItems className={styles.navItem} item={offresNav} path={path} />
						<NavItemWithSubItems className={styles.navItem} item={orientationNav} path={path} />
						<NavItemWithSubItems className={styles.navItem} item={engagementNav} path={path} />
						<NavItemWithSubItems className={styles.navItem} item={logementsNav} path={path} />
						<NavItemWithSubItems className={styles.navItem} item={accompagnementNav} path={path}/>
						<NavItemWithSubItems className={styles.navItem} item={aidesEtOutilsNav} path={path}/>
					</ul>
					<ul className={styles.headerNavigationListRight}>
						<NavEmployeurs item={employeurNav} path={path}/>
					</ul>
				</nav>
			</Container>
		</div>
	);
}
