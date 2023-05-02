import React from 'react';

import { ServiceCardList } from '~/client/components/features/ServiceCard/Card/ServiceCard';
import { MétierDuSoinPartner } from '~/client/components/features/ServiceCard/MétiersDuSoinPartner';
import { MonCompteFormationPartner } from '~/client/components/features/ServiceCard/MonCompteFormationPartner';
import { OnisepPartner } from '~/client/components/features/ServiceCard/OnisepPartner';
import { ParcourSupPartner } from '~/client/components/features/ServiceCard/ParcourSupPartner';
import { Head } from '~/client/components/head/Head';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/formations/index.analytics';
import styles from '~/pages/formations/index.module.scss';

export default function FormationPage() {
	useAnalytics(analytics);

	return (
		<>
			<Head
				title="Rechercher une formation | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<HeroWithButtonLink
					titlePrimaryText="Je trouve une formation pour réaliser "
					titleSecondaryText="mon projet professionnel"
					content={heroFormationContent()}
					buttonHref="https://reseau.intercariforef.org/"
					buttonLabel="Trouver sa formation"
					imgSrc="/images/formations-initiales.webp"
				/>
				<div className={styles.partenaires}>
					<h2 className={styles.partenairesTitle}>Je découvre les dispositifs pour m’accompagner dans ma formation</h2>
					<ServiceCardList>
						<MonCompteFormationPartner/>
						<ParcourSupPartner/>
						<OnisepPartner/>
						<MétierDuSoinPartner/>
					</ServiceCardList>
				</div>
			</main>
		</>
	);
};

function heroFormationContent() {
	return (
		<>
			<span>Vous recherchez une formation qualifiante pour préparer au mieux votre entrée, votre maintien ou votre retour sur le marché du travail ? Grâce au moteur de recherche Carif Oref,</span>
			<b> trouvez la formation qu’il vous faut en fonction de sa localisation, du type de métier auquel vous souhaitez
				être préparé, du niveau de qualification souhaité et bien plus encore !</b>
		</>
	);
}

