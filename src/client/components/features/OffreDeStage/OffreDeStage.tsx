import dynamic from 'next/dynamic';
import React from 'react';

import { OffreDeStageIndexée } from '~/client/components/features/OffreDeStage/OffreDeStageIndexee';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { getCapitalizedItems } from '~/client/components/ui/Meilisearch/getCapitalizedItems';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DateService } from '~/client/services/date/date.service';
import { DomainesStage } from '~/server/stages/repository/domainesStage';

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/ResultatRechercherSolution').then((mod) => mod.ResultatRechercherSolution), { ssr: false });

const IMAGE_FIXE = '/images/logos/fallback.svg';

export function OffreDeStage(props: HitProps<OffreDeStageIndexée>) {
	const stage = props.hit;
	const dateService = useDependency<DateService>('dateService');

	function formatDate(dateDebutMin: string, dateDebutMax?: string) {
		if (!dateDebutMax || dateDebutMin === dateDebutMax) return `Débute le ${dateService.formatToHumanReadableDate(new Date(dateDebutMin))}`;

		return `Débute entre le ${dateService.formatToHumanReadableDate(new Date(dateDebutMin))} et le ${dateService.formatToHumanReadableDate(new Date(dateDebutMax))}`;
	}

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
		listeEtiquettes.push(formatDate(stage.dateDeDebutMin, stage.dateDeDebutMax));
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
