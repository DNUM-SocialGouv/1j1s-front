import dynamic from 'next/dynamic';

import { getTagsFromAnnonce } from '~/client/components/features/EmploisEurope/tags.utils';
import {
	ListeRésultatsRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/ListeRésultats/ListeRésultatsRechercherSolution';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';

// NOTE (BRUJ 06/05/2024): Pour éviter les hydratation mismatch lié au usebreakpoint on désactive le srr sur des composants spécifiques cf https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const RésultatRechercherSolution = dynamic(() => import('~/client/components/layouts/RechercherSolution/Résultat/ResultatRechercherSolution').then((mod) => mod.ResultatRechercherSolution), { ssr: false });

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
	const codeLangueDeLOffre = emploiEurope.codeLangueDeLOffre ?? '';

	return (
		<li key={emploiEurope.id}>
			<RésultatRechercherSolution
				intituléOffre={emploiEurope.titre ? <span lang={codeLangueDeLOffre}>{emploiEurope.titre}</span> : 'Offre d’emploi sans titre'}
				lienOffre={`/emplois-europe/${emploiEurope.id}`}
				sousTitreOffre={emploiEurope.nomEntreprise}
				étiquetteOffreList={getTagsFromAnnonce(emploiEurope)}
			/>
		</li>
	);
}
