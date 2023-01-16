import React from 'react';

import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import {
	Domaines,
	OffreDeStageIndexée,
} from '~/server/cms/domain/offreDeStage.type';


const IMAGE_FIXE = '/images/logos/fallback.svg';


export const OffreDeStage = (props : HitProps<OffreDeStageIndexée>) => {
	const stage = props.hit;

	const listeEtiquettes: Array<string> = stage.domaines
		? stage.domaines
			.filter((domaine) => domaine !== Domaines.NON_RENSEIGNE)
			.map((domaine) => getCapitalizedItems(domaine))
		: [];
	listeEtiquettes.push(
		stage.localisation?.ville || stage.localisation?.departement || stage.localisation?.region as string,
		stage.dureeCategorisee !== 'Non renseigné' ? stage.dureeCategorisee as string : '',
		'Débute le : ' + new Date(stage.dateDeDebut).toLocaleDateString(),
	);

	return <RésultatRechercherSolution
		lienOffre={`/stages/${stage.slug}`}
		intituléOffre={stage.titre}
		logoEntreprise={IMAGE_FIXE}
		nomEntreprise={stage.nomEmployeur}
		étiquetteOffreList={listeEtiquettes || []}
		key={stage.slug}
	/>;
};
