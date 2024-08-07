import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { NavItem } from '~/client/components/layouts/Header/Navigation/NavItem/NavItem';

import { Container } from '../../Container/Container';
import styles from './Nav.module.scss';
import { navigationItemList } from './NavigationStructure';
import { NavItemWithSubItems } from './NavItemWithSubItems';

export function NavMobile({ toggleModal }: { toggleModal: () => void }) {
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
	const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

	const handleSubMenuToggle = (subNavItemLabel: string) => {
		setOpenSubMenu((prevOpenSubMenu) => prevOpenSubMenu === subNavItemLabel ? null : subNavItemLabel);
	};

	return (
		<Container>
			<nav role="navigation" aria-label="menu principal" data-testid="navigation-mobile">
				<ul className={styles.modalNavigationList}>
					<NavItem
						className={styles.navItem}
						label={accueil.label}
						link={accueil.link}
						isActive={router.pathname === accueil.link}
						onClick={toggleModal}
					/>
					{[offresNav, orientationNav, engagementNav, logementsNav, accompagnementNav, aidesEtOutilsNav, employeurNav].map((navItem) => (
						<NavItemWithSubItems
							key={navItem.label}
							className={styles.navItem}
							navigationItemWithChildren={navItem}
							onClick={toggleModal}
							isMobile
							isOpen={openSubMenu === navItem.label}
							onToggle={() => handleSubMenuToggle(navItem.label)}
						/>
					))}
				</ul>
			</nav>
		</Container>
	);
}
