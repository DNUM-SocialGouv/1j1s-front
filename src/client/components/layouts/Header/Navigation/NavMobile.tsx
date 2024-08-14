import { useRouter } from 'next/router';

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
	const navItems = [offresNav, orientationNav, engagementNav, logementsNav, accompagnementNav, aidesEtOutilsNav, employeurNav];

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
					{navItems.map((navItem) => (
						<NavItemWithSubItems
							key={navItem.label}
							className={styles.navItem}
							navigationItemWithChildren={navItem}
							onClick={toggleModal}
							isMobile
						/>
					))}
				</ul>
			</nav>
		</Container>
	);
}
