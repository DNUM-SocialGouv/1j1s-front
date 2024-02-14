import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	isNavigationItem,
	NavigationItem,
	navigationItemList,
	NavigationItemWithChildren,
} from '~/client/components/layouts/Header/NavigationStructure';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/plan-du-site/index.analytics';
import styles from '~/pages/plan-du-site/index.module.scss';

export default function PlanDuSite() {
	useAnalytics(analytics);

	function displayNavigationTree(item: NavigationItem | NavigationItemWithChildren) {
		if (isNavigationItem(item)) {
			return (
				<li key={item.link}><LinkDeprecated href={item.link}>{item.label}</LinkDeprecated></li>
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
							<LinkDeprecated href={navigationItemList().accueil.link}>{navigationItemList().accueil.label}</LinkDeprecated>
						</li>

						{displayNavigationTree(navigationItemList().offresNav)}
						{displayNavigationTree(navigationItemList().orientationNav)}
						{displayNavigationTree(navigationItemList().engagementNav)}
						{displayNavigationTree(navigationItemList().logementsNav)}
						{displayNavigationTree(navigationItemList().accompagnementNav)}
						{displayNavigationTree(navigationItemList().aidesEtOutilsNav)}
						{displayNavigationTree(navigationItemList().employeurNav)}

						<li><LinkDeprecated href="/espace-jeune">Espace Jeune</LinkDeprecated></li>
						<li><LinkDeprecated href="/faq">Foire aux questions</LinkDeprecated></li>
						<li><LinkDeprecated href="/cgu">Conditions Générales d’utilisation</LinkDeprecated></li>
						<li><LinkDeprecated href="/accessibilite">Accessibilité : Partiellement conforme</LinkDeprecated></li>
						<li><LinkDeprecated href="/mentions-legales">Mentions légales</LinkDeprecated></li>
						<li><LinkDeprecated href="/confidentialite">Politique de confidentialité</LinkDeprecated></li>
					</ul>
				</main>
			</Container>
		</>
	);
}
