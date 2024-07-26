import { useMemo } from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { useEmploiEuropeQuery } from '~/client/hooks/useEmploiEuropeQuery';
import { niveauDEtudes } from '~/server/emplois-europe/domain/niveauDEtudes';
import { secteurActiviteEures } from '~/server/emplois-europe/infra/secteurActiviteEures';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

function mapContratListToLibelle(typeContratList: string[]) {
	return typesContratEures
		.filter((typeDeContrat) => typeContratList.includes(typeDeContrat.valeur))
		.map((typeDeContrat) => typeDeContrat.libellé);
}

function mapTempsDeTravailListToLibelle(tempsDeTravailList: string[]) {
	return tempsDeTravailEures
		.filter((tempsDeTravail) => tempsDeTravailList.includes(tempsDeTravail.valeur))
		.map((tempsDeTravail) => tempsDeTravail.libellé);
}

function mapNiveauEtudesListToLibelle(niveauEtudesValueList: string[]) {
	return niveauDEtudes
		.filter((niveauDEtude) => niveauEtudesValueList.includes(niveauDEtude.valeur))
		.map((niveauEtudes) => niveauEtudes.libellé);
}

function mapSecteurActiviteListToLibelle(secteurActiviteList: string[]) {
	return secteurActiviteEures
		.filter((secteurActivite) => secteurActiviteList.includes(secteurActivite.valeur))
		.map((secteurActivite) => secteurActivite.libellé);
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

	if (filtreList.length === 0) return;

	return <TagList list={filtreList} aria-label="Filtres de la recherche"/>;
};
