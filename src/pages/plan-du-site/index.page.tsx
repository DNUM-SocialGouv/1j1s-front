import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	isNavigationItem,
	NavigationItem,
	navigationItemList,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/NavigationStructure';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useAnalytics from '~/client/hooks/useAnalytics';
import styles from '~/pages/plan-du-site/PlanDuSite.module.scss';

export default function PlanDuSite() {
	useAnalytics('plan-du-site');

	const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';

	function displayNavigationTree(item: NavigationItem | NavigationItemWithChildren) {
		if (isNavigationItem(item)) {
			return (
				<li key={item.link}><Link href={item.link}>{item.label}</Link></li>
			);
		} else {
			return (
				<li key={item.label}>
					<span id="sectionPlanDuSite">{item.label}</span>
					<ul aria-labelledby="sectionPlanDuSite">
						{item.children.map((sub) => displayNavigationTree(sub))}
					</ul>
				</li>
			);
		}
	}

	return (
		<>
			<Head
				title="Plan du site | 1jeune1solution" description="Plan du site"
				robots="index,follow"
			/>
			<Container className={styles.planDuSiteContainer}>
				<main id="contenu">
					<h1 id="planDuSite" className={styles.planDuSiteTitre}>Plan du site</h1>
					<ul aria-labelledby="planDuSite">
						<li>
							<Link href={navigationItemList().accueil.link}>{navigationItemList().accueil.label}</Link>
						</li>

						{displayNavigationTree(navigationItemList().offresNav)}
						{displayNavigationTree(navigationItemList().orientationNav)}
						{displayNavigationTree(navigationItemList().accompagnementNav)}
						{displayNavigationTree(navigationItemList().engagementNav)}
						{displayNavigationTree(navigationItemList().logementsNav)}
						{displayNavigationTree(navigationItemList().employeurNav)}

						<li><Link href="/cgu">Conditions Générales d’utilisation</Link></li>
						<li><Link href="/accessibilite">Accessibilité : Partiellement conforme</Link></li>
						<li><Link href="/mentions-legales">Mentions légales</Link></li>
						<li><Link href="/confidentialite">Politique de confidentialité</Link></li>
						<li><Link href={`mailto:${MAIL_TO}`}>
							<TextIcon icon="external-redirection">Nous contacter</TextIcon>
						</Link></li>
					</ul>
				</main>
			</Container>
		</>
	);
}
