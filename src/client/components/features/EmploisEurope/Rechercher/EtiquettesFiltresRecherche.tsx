import { useMemo } from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { secteurActiviteEures } from '~/server/emplois-europe/infra/secteurActiviteEures';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

function mapContratListToLibelle(typeContratList: string[]) {
	return typeContratList
		.filter((typeContrat) => typesContratEures.find((typeContratEures) => typeContratEures.valeur === typeContrat)?.libellé)
		.map((typeContrat) => typesContratEures.find((typeContratEures) => typeContratEures.valeur === typeContrat)!.libellé);
}
function mapTempsDeTravailListToLibelle(tempsDeTravailList: string[]) {
	return tempsDeTravailList
		.filter((tempsDeTravail) => tempsDeTravailEures.find((tempsDeTravailEures) => tempsDeTravailEures.valeur === tempsDeTravail)?.libellé)
		.map((tempsDeTravail) => tempsDeTravailEures.find((tempsDeTravailEures) => tempsDeTravailEures.valeur === tempsDeTravail)!.libellé);
}
function mapNiveauEtudesListToLibelle(niveauEtudesList: string[]) {
	return niveauEtudesList
		.filter((niveauEtudes) => niveauEtudesEures.find((niveauEtudesEures) => niveauEtudesEures.valeur.toString() === niveauEtudes)?.libellé)
		.map((niveauEtudes) => niveauEtudesEures.find((niveauEtudesEures) => niveauEtudesEures.valeur.toString() === niveauEtudes)!.libellé);
}

function mapSecteurActiviteListToLibelle(secteurActiviteList: string[]) {
	return secteurActiviteList
		.filter((secteurActivite) => secteurActiviteEures.find((secteurActiviteEures) => secteurActiviteEures.valeur.toString() === secteurActivite)?.libellé)
		.map((secteurActivite) => secteurActiviteEures.find((secteurActiviteEures) => secteurActiviteEures.valeur.toString() === secteurActivite)!.libellé);
}

function mapQueryParamToLibelle(queryParam: string, mapValeurListToLibelle: (valeurList: string[]) => string[]): string[] {
	const valeurList = queryParam.split(',');
	return mapValeurListToLibelle(valeurList);
}

export const EtiquettesFiltresRecherche = () => {

	const emploiEuropeQuery = useEmploiEuropeQuery();
	const filtreList = useMemo(() => {
		const filtreList: string[] = [];
		if (emploiEuropeQuery.libellePays) {
			filtreList.push(emploiEuropeQuery.libellePays);
		}

		if (emploiEuropeQuery.typeContrat) {
			const typeContratLibelleList = mapQueryParamToLibelle(emploiEuropeQuery.typeContrat, mapContratListToLibelle);
			filtreList.push(...typeContratLibelleList);
		}

		if (emploiEuropeQuery.tempsDeTravail) {
			const tempsDeTravailLibelleList = mapQueryParamToLibelle(emploiEuropeQuery.tempsDeTravail, mapTempsDeTravailListToLibelle);
			filtreList.push(...tempsDeTravailLibelleList);
		}


		if (emploiEuropeQuery.niveauEtude) {
			const niveauEtudesLibelleList = mapQueryParamToLibelle(emploiEuropeQuery.niveauEtude, mapNiveauEtudesListToLibelle);
			filtreList.push(...niveauEtudesLibelleList);
		}

		if (emploiEuropeQuery.secteurActivite) {
			const secteurActiviteLibelleList = mapQueryParamToLibelle(emploiEuropeQuery.secteurActivite, mapSecteurActiviteListToLibelle);
			filtreList.push(...secteurActiviteLibelleList);
		}
		return filtreList;
	}, [emploiEuropeQuery.typeContrat, emploiEuropeQuery.tempsDeTravail, emploiEuropeQuery.libellePays, emploiEuropeQuery.niveauEtude, emploiEuropeQuery.secteurActivite]);

	if(filtreList.length === 0) return ;

	return <TagList list={filtreList} aria-label="Filtres de la recherche" />;
};
