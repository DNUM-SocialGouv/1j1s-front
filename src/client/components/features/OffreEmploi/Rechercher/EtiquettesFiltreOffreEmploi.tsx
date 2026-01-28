import React, { useEffect, useState } from 'react';

import {
	formatLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/formatLibelleLocalisation';
import {
	getCodeLibelleLocalisation,
} from '~/client/components/ui/Form/Combobox/ComboboxLocalisation/localisations/getCodeLibelleLocalisation';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import {
	CONTRAT_CDD,
	CONTRAT_CDI,
	CONTRAT_INTÉRIMAIRE,
	CONTRAT_SAISONNIER,
	EXPÉRIENCE_DEBUTANT,
	EXPÉRIENCE_EXIGÉE,
	EXPÉRIENCE_SOUHAITÉ,
	TEMPS_DE_TRAVAIL_LIST,
} from '~/server/offres/domain/offre';

export function EtiquettesFiltreOffreEmploi() {
	const [filtres, setFiltres] = useState<string[]>([]);
	const offreEmploiQuery = useOffreQuery();

	useEffect(() => {
		const filtreList: string[] = [];

		if (offreEmploiQuery.tempsDeTravail) {
			const tempsDeTravail = TEMPS_DE_TRAVAIL_LIST.find((temps) => temps.valeur !== 'indifférent' && temps.valeur === offreEmploiQuery.tempsDeTravail);
			if (tempsDeTravail) {
				filtreList.push(tempsDeTravail.libellé);
			}
		}

		if (offreEmploiQuery.typeDeContrats) {
			const typeDeContratList = offreEmploiQuery.typeDeContrats.split(',');
			typeDeContratList.map((contrat: string) => {
				switch (contrat) {
					case (CONTRAT_INTÉRIMAIRE.valeur):
						filtreList.push(CONTRAT_INTÉRIMAIRE.libelléCourt);
						break;
					case (CONTRAT_SAISONNIER.valeur):
						filtreList.push(CONTRAT_SAISONNIER.libelléCourt);
						break;
					case (CONTRAT_CDI.valeur):
						filtreList.push(CONTRAT_CDI.libelléCourt);
						break;
					case (CONTRAT_CDD.valeur):
						filtreList.push(CONTRAT_CDD.libelléCourt);
						break;
					default:
						filtreList.push(contrat);
				}
			});
		}

		if (offreEmploiQuery.experienceExigence) {
			const typeExpérienceList = offreEmploiQuery.experienceExigence.split(',');
			typeExpérienceList.map((expérience: string) => {
				switch (expérience) {
					case (EXPÉRIENCE_DEBUTANT.valeur):
						filtreList.push(EXPÉRIENCE_DEBUTANT.libellé);
						break;
					case(EXPÉRIENCE_EXIGÉE.valeur):
						filtreList.push(EXPÉRIENCE_EXIGÉE.libellé);
						break;
					case(EXPÉRIENCE_SOUHAITÉ.valeur):
						filtreList.push(EXPÉRIENCE_SOUHAITÉ.libellé);
						break;
					default:
						filtreList.push(expérience);
				}
			});
		}

		if (offreEmploiQuery.nomLocalisation) {
			filtreList.push(formatLibelleLocalisation(
				offreEmploiQuery.nomLocalisation,
				getCodeLibelleLocalisation(offreEmploiQuery.codeLocalisation, offreEmploiQuery.codePostalLocalisation, offreEmploiQuery.typeLocalisation) || '',
			));
		}

		setFiltres(filtreList);
	}, [offreEmploiQuery]);

	if (!filtres.length) {
		return null;
	}

	return (
		<TagList list={filtres} aria-label="Filtres de la recherche" />
	);
}
