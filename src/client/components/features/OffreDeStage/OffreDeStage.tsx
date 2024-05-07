import React from 'react';

import { DateStageFormatted } from '~/client/components/features/OffreDeStage/dateStageFormatted';
import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStageIndexee';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { DomainesStage } from '~/server/stages/repository/domainesStage';

const IMAGE_FIXE = '/images/logos/fallback.svg';

export function OffreDeStage(props: HitProps<OffreDeStageIndexée>) {
	const stage = props.hit;
	const listeEtiquettes: Array<string> = stage.domaines
		? stage.domaines
			.filter((domaine) => domaine !== DomainesStage.NON_RENSEIGNE)
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
		listeEtiquettes.push(DateStageFormatted(stage.dateDeDebutMin, stage.dateDeDebutMax));
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
