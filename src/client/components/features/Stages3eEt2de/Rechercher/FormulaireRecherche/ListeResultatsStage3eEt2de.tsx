import { v4 as uuidv4 } from 'uuid';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ResultatRechercheStage3eEt2de, Stage3eEt2de } from '~/server/stage-3e-et-2de/domain/stage3eEt2de';

interface ListeResultatsStage3eEt2deProps {
	resultatList: ResultatRechercheStage3eEt2de | undefined;
}

export function ListeResultatsStage3eEt2de({ resultatList }: ListeResultatsStage3eEt2deProps) {
	if (!resultatList || resultatList.resultats.length === 0) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={'Stages de 3e et 2de'}
		>
			{resultatList.resultats.map((stage3eEt2de) => ResultatStage3eEt2de(stage3eEt2de))}
		</ListeRésultatsRechercherSolution>
	);
}

function ResultatStage3eEt2de(stage3eEt2de: Stage3eEt2de) {
	const étiquetteOffreList: string[] = [];

	if (stage3eEt2de.nombreDeSalaries) {
		étiquetteOffreList.push(`${stage3eEt2de.nombreDeSalaries} salariés`);
	}
	if (stage3eEt2de.modeDeContact) {
		étiquetteOffreList.push(stage3eEt2de.modeDeContact);
	}
	if (stage3eEt2de.accessiblePersonnesEnSituationDeHandicap) {
		étiquetteOffreList.push('Handi-accessible');
	}

	return (
		<li key={uuidv4()}>
			<RésultatRechercherSolution
				intituléOffre={stage3eEt2de.nomEntreprise}
				sousTitreOffre={<>
					<p>{stage3eEt2de.domaine}</p>
					<p>{stage3eEt2de.adresse.rueEtNumero}, {stage3eEt2de.adresse.codePostal} {stage3eEt2de.adresse.ville}</p>
				</>}
				étiquetteOffreList={étiquetteOffreList}
			/>
		</li>
	);
}
