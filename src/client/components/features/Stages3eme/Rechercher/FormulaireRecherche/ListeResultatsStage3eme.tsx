import { v4 as uuidv4 } from 'uuid';

import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ResultatRechercheStage3eme, Stage3eme } from '~/server/stage-3eme/domain/stage3eme';

interface ListeResultatsStage3emeProps {
	resultatList: ResultatRechercheStage3eme | undefined;
}

export function ListeResultatsStage3eme({ resultatList }: ListeResultatsStage3emeProps) {
	if (!resultatList || resultatList.resultats.length === 0) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={'Stages de 3ème'}
		>
			{resultatList.resultats.map((stage3eme) => ResultatStage3eme(stage3eme))}
		</ListeRésultatsRechercherSolution>
	);
}

function ResultatStage3eme(stage3eme: Stage3eme) {
	const tailleEntreprise = stage3eme.nombreDeSalaries ? `${stage3eme.nombreDeSalaries} salariés` : undefined;
	const modeDeContact = stage3eme.modeDeContact;
	return (
		<li key={uuidv4()}>
			<RésultatRechercherSolution
				intituléOffre={stage3eme.nomEntreprise}
				sousTitreOffre={<>
					<p>{stage3eme.domaine}</p>
					<p>{stage3eme.adresse.rueEtNumero}, {stage3eme.adresse.codePostal} {stage3eme.adresse.ville}</p>
				</>}
				étiquetteOffreList={[tailleEntreprise, modeDeContact]}
			/>
		</li>
	);
}