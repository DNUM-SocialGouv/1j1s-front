import { getTagsFromAnnonce } from '~/client/components/features/EmploisEurope/utils';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { RésultatRechercherSolution } from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

interface ListeResultatsEmploiEuropeProps {
	resultatList: EmploiEurope[];
}

export function ListeResultatsEmploiEurope({ resultatList }: ListeResultatsEmploiEuropeProps) {
	if (!resultatList.length) {
		return null;
	}

	return (
		<ListeRésultatsRechercherSolution
			aria-label={'Offres d’emplois en Europe'}
		>
			{resultatList.map((emploiEurope) => ResultatEmploiEurope(emploiEurope))}
		</ListeRésultatsRechercherSolution>
	);
}

function ResultatEmploiEurope(emploiEurope: EmploiEurope) {
	return (
		<li key={emploiEurope.id}>
			<RésultatRechercherSolution
				intituléOffre={emploiEurope.titre ? <span lang="">{emploiEurope.titre}</span> : 'Offre d’emploi sans titre'}
				lienOffre={`/emplois-europe/${emploiEurope.id}`}
				sousTitreOffre={emploiEurope.nomEntreprise}
				étiquetteOffreList={getTagsFromAnnonce(emploiEurope)}
			/>
		</li>
	);
}
