import React from 'react';

import Accompagnement from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import Actions from '~/client/components/features/ContratEngagementJeune/Actions/Actions';
import Allocations from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations';
import Application from '~/client/components/features/ContratEngagementJeune/Application/Application';
import Banniere from '~/client/components/features/ContratEngagementJeune/Banniere/Banniere';
import Rappel from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Rappel';
import PourquoiCEstFaitPourMoi from '~/client/components/features/ContratEngagementJeune/Pourquoi/PourquoiCEstFaitPourMoi';
import QuEstCeQueCEst from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst';
import QuEstCeQueJyGagne from '~/client/components/features/ContratEngagementJeune/QuEstCeQueJyGagne/QuEstCeQueJyGagne';
import { Témoignages } from '~/client/components/features/ContratEngagementJeune/Témoignages/Témoignages';
import { Head } from '~/client/components/head/Head';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useAnalytics from '~/client/hooks/useAnalytics';
import { MarketingService } from '~/client/services/marketing/marketing.service';
import analytics from '~/pages/contrat-engagement-jeune/index.analytics';

const PAGE_NAME_ADFORM = '2023-10-1jeune1solution.gouv.fr-PageArrivee-ContratEngagementJeune';

export default function ContratEngagementJeune() {
	useAnalytics(analytics);

	const marketingService = useDependency<MarketingService>('marketingService');
	const marketingPageActif = process.env.NEXT_PUBLIC_CAMPAGNE_CEJ_FEATURE === '1';

	if (marketingPageActif) {
		marketingService.trackPage(PAGE_NAME_ADFORM);
	}


	return (
		<>
			<Head
				title="Contrat Engagement Jeune"
				description="Plus de 400 000 offres d‘emplois et d‘alternances sélectionnées pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<Banniere/>
				<QuEstCeQueCEst/>
				<Actions/>
				<PourquoiCEstFaitPourMoi/>
				<QuEstCeQueJyGagne/>
				<Allocations/>
				<Témoignages/>
				<Accompagnement/>
				<Rappel/>
				<Application/>
			</main>
		</>
	);
}
