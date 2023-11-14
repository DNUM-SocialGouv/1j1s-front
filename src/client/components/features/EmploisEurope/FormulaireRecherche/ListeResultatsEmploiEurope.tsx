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
	const location = emploiEurope.pays && emploiEurope.ville ? `${emploiEurope.pays}/${emploiEurope.ville}` : emploiEurope.pays ?? emploiEurope.ville;
	const tags = location ? [location] : [];
	const typeContract = emploiEurope.typeContrat;
	if (typeContract) tags.push(typeContract);

	return (
		<li key={emploiEurope.id}>
			<RésultatRechercherSolution
				intituléOffre={emploiEurope.titre ?? 'Offre d’emploi sans titre'}
				lienOffre={`/emplois-europe/${emploiEurope.id}`}
				sousTitreOffre={emploiEurope.nomEntreprise}
				étiquetteOffreList={tags}
			/>
		</li>
	);
}
