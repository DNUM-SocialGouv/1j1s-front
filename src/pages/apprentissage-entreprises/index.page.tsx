import { useEffect } from 'react';

import {
	CampagneApprentissageEntreprises,
} from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/CampagneApprentissageEntreprises';
import { Head } from '~/client/components/head/Head';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import styles from '~/pages/apprentissage/index.module.scss';
import analyticsPageConfig from '~/pages/apprentissage-entreprises/index.analytics';

export default function ApprentissageEntreprises () {
	useAnalytics(analyticsPageConfig);

	const amnetService = useDependency<MarketingService>('amnetService');
	useEffect(() => {
		// @ts-expect-error
		amnetService.trackPage();
	});

	return (
		<>
			<Head title="Découvrir les avantages de l’apprentissage pour les entreprises | 1jeune1solution" robots="index,follow" />
			<main id="contenu" className={styles.contenu}>
				<CampagneApprentissageEntreprises />
			</main>
		</>
	);
}
