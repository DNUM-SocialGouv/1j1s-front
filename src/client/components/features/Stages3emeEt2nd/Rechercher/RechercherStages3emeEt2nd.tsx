import { useEffect, useMemo, useState } from 'react';

import {
	FormulaireRechercheStages3emeEt2nd,
} from '~/client/components/features/Stages3emeEt2nd/Rechercher/FormulaireRecherche/FormulaireRechercheStages3emeEt2nd';
import {
	ListeResultatsStage3emeEt2nd,
} from '~/client/components/features/Stages3emeEt2nd/Rechercher/FormulaireRecherche/ListeResultatsStage3emeEt2nd';
import { Head } from '~/client/components/head/Head';
import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useStage3emeEt2ndQuery } from '~/client/hooks/useStage3emeEt2ndQuery';
import { Stage3emeEt2ndService } from '~/client/services/stage3emeEt2nd/stage3emeEt2nd.service';
import empty from '~/client/utils/empty';
import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { isSuccess } from '~/server/errors/either';
import { Erreur } from '~/server/errors/erreur.types';
import { ResultatRechercheStage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';

const PREFIX_TITRE_PAGE = 'Rechercher un stage de 3ème et 2nd';

export default function RechercherStages3emeEt2nd() {
	const stage3emeQuery = useStage3emeEt2ndQuery();
	const stage3emeService = useDependency<Stage3emeEt2ndService>('stage3emeEt2ndService');

	const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
	const [isLoading, setIsLoading] = useState(false);
	const [erreurRecherche, setErreurRecherche] = useState<Erreur | undefined>(undefined);
	const [stage3emeList, setStage3emeList] = useState<ResultatRechercheStage3emeEt2nd | undefined>(undefined);

	useEffect(() => {
		if (empty(stage3emeQuery)) {
			return;
		}

		setIsLoading(true);
		setErreurRecherche(undefined);
		stage3emeService.rechercherStage3emeEt2nd(stage3emeQuery)
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

	const etiquettesRecherche = useMemo(() => {
		const filtreList: string[] = [];
		if (stage3emeQuery.libelleCommune) {
			filtreList.push(stage3emeQuery.libelleCommune);
		}
		if (filtreList.length === 0) return;
		return <TagList list={filtreList} aria-label="Filtres de la recherche"/>;
	}, [stage3emeQuery.libelleCommune]);

	return <>
		<Head
			title={title}
			description="Des milliers d’entreprises prêtes à vous accueillir pour votre stage de 3ème et 2nd"
			robots="index,follow"
		/>
		<main id="contenu">
			<RechercherSolutionLayout
				bannière={<BaniereStages3eme/>}
				erreurRecherche={erreurRecherche}
				étiquettesRecherche={etiquettesRecherche}
				formulaireRecherche={<FormulaireRechercheStages3emeEt2nd/>}
				isLoading={isLoading}
				listeSolutionElement={<ListeResultatsStage3emeEt2nd resultatList={stage3emeList}/>}
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
				<LightHeroSecondaryText>pour votre stage de 3ème et 2nd</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
