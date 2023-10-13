import React from 'react';

import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import {
	Domaines,
	OffreDeStageIndexée,
} from '~/server/cms/domain/offreDeStage.type';

const IMAGE_FIXE = '/images/logos/fallback.svg';

export function OffreDeStage (props : HitProps<OffreDeStageIndexée>) {
	const stage = props.hit;
	const listeEtiquettes: Array<string> = stage.domaines
		? stage.domaines
			.filter((domaine) => domaine !== Domaines.NON_RENSEIGNE)
			.map((domaine) => getCapitalizedItems(domaine))
		: [];

	const etiquetteLocalisation = stage.localisation?.ville || stage.localisation?.departement || stage.localisation?.region;
	if (etiquetteLocalisation) {
		listeEtiquettes.push(etiquetteLocalisation);
	}

	listeEtiquettes.push(
		(stage.dureeCategorisee && stage.dureeCategorisee !== 'Non renseigné')
			? stage.dureeCategorisee
			: '',
	);

	if (stage.dateDeDebutMin) {
		// FIXME (GAFI 13-10-2023): Passer par des composants pour pouvoir notamment les partager entre les pages
		listeEtiquettes.push(
			stage.dateDeDebutMax && stage.dateDeDebutMin !== stage.dateDeDebutMax
				? `Débute entre le : ${new Date(stage.dateDeDebutMin).toLocaleDateString()} et ${new Date(stage.dateDeDebutMax).toLocaleDateString()}`
				: `Débute le : ${new Date(stage.dateDeDebutMin).toLocaleDateString()}`,
		);
	}

	return <RésultatRechercherSolution
		lienOffre={`/stages/${stage.slug}`}
		intituléOffre={stage.titre}
		logo={IMAGE_FIXE}
		sousTitreOffre={stage.nomEmployeur}
		étiquetteOffreList={listeEtiquettes || []}
		key={stage.slug}
	/>;
}
