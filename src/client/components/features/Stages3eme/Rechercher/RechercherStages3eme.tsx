import { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheStages3eme,
} from '~/client/components/features/Stages3eme/Rechercher/FormulaireRecherche/FormulaireRechercheStages3eme';
import {
	ListeResultatsStage3eme,
} from '~/client/components/features/Stages3eme/Rechercher/FormulaireRecherche/ListeResultatsStage3eme';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useStage3emeQuery } from '~/client/hooks/useStage3emeQuery';
import { Stage3emeService } from '~/client/services/stage3eme/stage3eme.service';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { isSuccess } from '~/server/errors/either';
import { Erreur } from '~/server/errors/erreur.types';
import { ResultatRechercheStage3eme } from '~/server/stage-3eme/domain/stage3eme';

const PREFIX_TITRE_PAGE = 'Rechercher un stage de 3ème';

export default function RechercherStages3eme() {
	const stage3emeQuery = useStage3emeQuery();
	const stage3emeService = useDependency<Stage3emeService>('stage3emeService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
	const [stage3emeList, setStage3emeList] = useState<ResultatRechercheStage3eme | undefined>(undefined);

	useEffect(() => {
		setIsLoading(true);
		setErreurRecherche(undefined);

		stage3emeService.rechercherStage3eme(stage3emeQuery)
			.then((response) => {
				if (isSuccess(response)) {
					setTitle(formatRechercherSolutionDocumentTitle(`${PREFIX_TITRE_PAGE}${response.result.nombreDeResultats === 0 ? ' - Aucun résultat' : ''}`));
					setStage3emeList(response.result);
				} else {
					setTitle(formatRechercherSolutionDocumentTitle(PREFIX_TITRE_PAGE, response.errorType));
					setErreurRecherche(response.errorType);
				}
				setIsLoading(false);
			});
	}, [stage3emeService, stage3emeQuery]);

	const messageResultatsRecherche: string = useMemo(() => {
		const messageResultatRechercheSplit: string[] = [`${stage3emeList?.nombreDeResultats}`];
		if (stage3emeList && stage3emeList.nombreDeResultats > 1) {
			messageResultatRechercheSplit.push('entreprises accueillantes');
		} else if (stage3emeList && stage3emeList.nombreDeResultats === 1) {
			messageResultatRechercheSplit.push('entreprise accueillante');
		} else {
			return '';
		}
		if (stage3emeQuery.libelleMetier) {
			messageResultatRechercheSplit.push(`pour ${stage3emeQuery.libelleMetier}`);
		}
		return messageResultatRechercheSplit.join(' ');
	}, [stage3emeList, stage3emeQuery.libelleMetier]);

	return <>
		<Head
			title={title}
			description="Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème"
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				bannière={<BaniereStages3eme/>}
				erreurRecherche={erreurRecherche}
				formulaireRecherche={<FormulaireRechercheStages3eme/>}
				isLoading={isLoading}
			  listeSolutionElement={<ListeResultatsStage3eme resultatList={stage3emeList} />}
				messageRésultatRecherche={messageResultatsRecherche}
				nombreSolutions={stage3emeList?.nombreDeResultats ?? 0}
			/>
		</main>
	</>;
}

function BaniereStages3eme() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Des milliers d’entreprises prêtes à vous accueillir</LightHeroPrimaryText>
				<LightHeroSecondaryText>pour votre stage de 3ème</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
