import { v4 as uuidv4 } from 'uuid';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ResultatRechercheStage3emeEt2nd, Stage3emeEt2nd } from '~/server/stage-3eme-et-2nd/domain/stage3emeEt2nd';

interface ListeResultatsStage3emeProps {
	resultatList: ResultatRechercheStage3emeEt2nd | undefined;
}

export function ListeResultatsStage3emeEt2nd({ resultatList }: ListeResultatsStage3emeProps) {
	if (!resultatList || resultatList.resultats.length === 0) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={'Stages de 3ème et 2nd'}
		>
			{resultatList.resultats.map((stage3emeEt2nd) => ResultatStage3eme(stage3emeEt2nd))}
		</ListeRésultatsRechercherSolution>
	);
}

function ResultatStage3eme(stage3emeEt2nd: Stage3emeEt2nd) {
	const étiquetteOffreList: string[] = [];

	if (stage3emeEt2nd.nombreDeSalaries) {
		étiquetteOffreList.push(`${stage3emeEt2nd.nombreDeSalaries} salariés`);
	}
	if (stage3emeEt2nd.modeDeContact) {
		étiquetteOffreList.push(stage3emeEt2nd.modeDeContact);
	}
	if (stage3emeEt2nd.accessiblePersonnesEnSituationDeHandicap) {
		étiquetteOffreList.push('Handi-accessible');
	}

	return (
		<li key={uuidv4()}>
			<RésultatRechercherSolution
				intituléOffre={stage3emeEt2nd.nomEntreprise}
				sousTitreOffre={<>
					<p>{stage3emeEt2nd.domaine}</p>
					<p>{stage3emeEt2nd.adresse.rueEtNumero}, {stage3emeEt2nd.adresse.codePostal} {stage3emeEt2nd.adresse.ville}</p>
				</>}
				étiquetteOffreList={étiquetteOffreList}
			/>
		</li>
	);
}
