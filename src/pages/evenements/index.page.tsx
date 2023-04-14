import React from 'react';

import { FormulaireRechercheEvenement } from '~/client/components/features/Evenement/FormulaireRecherche/FormulaireRechercheEvenement';
import { RésultatRechercherEvenement } from '~/client/components/features/Evenement/RésultatRechercherEvenement';
import { Head } from '~/client/components/head/Head';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import MeilisearchCustomCurrentRefinements
	from '~/client/components/ui/Meilisearch/MeilisearchCustomCurrentRefinements';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/evenements/index.analytics';

const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'evenement';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

export default function PageEvenements() {
	useAnalytics(analytics);
	const displayRechercheEvenement = process.env.NEXT_PUBLIC_RECHERCHE_EVENEMENT_FEATURE === '1';

	return (
		<>
			{
				!displayRechercheEvenement && <>
					<Head
						title={'Trouver un évènement Emploi | 1jeune1solution'}
						robots="index,follow"
					/>
					<main id='contenu'>
						<HeroWithButtonLink
							titlePrimaryText="Des centaines d‘événements de recrutement "
							titleSecondaryText="pour tous les jeunes, partout en France"
							content='À la recherche d’un emploi ou d’une formation ?
              Dépassez les frontières du virtuel en allant directement à la rencontre de votre futur employeur,
              en participant à des ateliers thématiques ou en assistant à une conférence près de chez vous !'
							buttonLabel='Trouver un événement Pôle Emploi'
							buttonLabelSecondary='Trouver un événement ma Mission Locale'
							buttonHref='https://mesevenementsemploi.pole-emploi.fr/mes-evenements-emploi/evenements'
							buttonHrefSecondary='https://40-ans.unml.info/le-programme'
							imgSrc='/images/évènements.webp'/>
					</main>
				</>
			}
			{displayRechercheEvenement && <>
				<Head
					title={'Rechercher un évènement | 1jeune1solution'}
					description="Des centaines d‘évènements de recrutement pour tous les jeunes, partout en France"
					robots="index,follow"
				/>
				<InstantSearchLayout
					meilisearchIndex={MEILISEARCH_INDEX}
					nombreDeResultatParPage={HITS_PER_PAGE}
					titre="Des centaines d‘évènements de recrutement"
					sousTitre="pour tous les jeunes, partout en France"
					isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
					formulaireDeRecherche={<FormulaireRechercheEvenement/>}
					messageResultatRechercheLabelSingulier="évènement"
					messageResultatRechercheLabelPluriel="évènements"
					nombreDeSkeleton={2}
					ariaLabelListeDesResultats="Evènements"
					resultatDeRecherche={RésultatRechercherEvenement}
					tagList={<MeilisearchCustomCurrentRefinements />}
					isAffichageListeDeResultatsDesktopDirectionRow
				/>
			</>
			}
		</>
	);
}
