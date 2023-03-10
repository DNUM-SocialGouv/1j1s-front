import classNames from 'classnames';
import React from 'react';

import { FormulaireRechercheFicheMetier } from '~/client/components/features/FicheMétier/FormulaireRecherche/FormulaireRechercheFicheMetier';
import { RésultatRechercherMétier } from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier';
import { MétierDuSoinPartner } from '~/client/components/features/Partner/MétiersDuSoinPartner';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import MeilisearchCustomCurrentRefinements
	from '~/client/components/ui/Meilisearch/MeilisearchCustomCurrentRefinements';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import styles from '~/pages/decouvrir-les-metiers/decouvrir-les-metiers.module.scss';

const MEILISEARCH_INDEX = 'fiche-metier';
const HITS_PER_PAGE = 15;
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

export default function RechercherFicheMetierPage() {
	useAnalytics('decouvrir-les-metiers');
	useReferrer();

	return (
		<>
			<Head
				title={'Rechercher un métier | 1jeune1solution'}
				description="Trouver le métier qui vous correspond"
				robots="index,follow"
			/>
			<InstantSearchLayout
				meilisearchIndex={MEILISEARCH_INDEX}
				nombreDeResultatParPage={HITS_PER_PAGE}
				titre="Trouvez le métier"
				sousTitre="qui vous correspond"
				isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
				formulaireDeRecherche={<FormulaireRechercheFicheMetier />}
				messageResultatRechercheLabelSingulier="fiche métier"
				messageResultatRechercheLabelPluriel="fiches métier"
				nombreDeSkeleton={2}
				ariaLabelListeDesResultats="fiches métier"
				resultatDeRecherche={RésultatRechercherMétier}
				tagList={<MeilisearchCustomCurrentRefinements />}
				isAffichageListeDeResultatsDesktopDirectionRow
			/>
			<EnTeteSection heading="Découvrez des services faits pour vous" />
			<div className={classNames(styles.additionalSection, 'background-white-lilac')}>
				<Container className={styles.partnerCardContainer}>
					<MétierDuSoinPartner />
				</Container>
			</div>
		</>
	);
}
