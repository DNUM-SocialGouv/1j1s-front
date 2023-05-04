import { useRouter } from 'next/router';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { navigationItemList } from '~/client/components/layouts/Header/NavigationStructure';
import { NavItem } from '~/client/components/layouts/Header/NavItem';
import { NavItemWithSubItems } from '~/client/components/layouts/Header/NavItemWithSubItems';

export function HeaderNavMobile({ toggleModal }: { toggleModal: () => void }) {
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

	return (
		<Container className={styles.headerModalContainer}>
			<nav role="navigation">
				<ul className={styles.headerModalNavigationList}>
					<NavItem className={styles.navItem} label={accueil.label} link={accueil.link} isActive={router.pathname === accueil.link} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={offresNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={orientationNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={engagementNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={logementsNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={accompagnementNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={aidesEtOutilsNav} onClick={toggleModal}/>
					<NavItemWithSubItems className={styles.navItem} item={employeurNav} onClick={toggleModal}/>
				</ul>
			</nav>
		</Container>
	);
}
