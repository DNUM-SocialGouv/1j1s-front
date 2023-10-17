import { Formation, RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { mapNiveauFormation } from '~/server/formations/domain/formation.mapper';
import {
	ID_FORMATION_SEPARATOR,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';

import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse,
	IdRcoAndCléMinistèreÉducatif,
} from './apiLaBonneAlternanceFormation';

export const mapRésultatRechercheFormation = (response: ApiLaBonneAlternanceFormationRechercheResponse): Array<RésultatRechercheFormation> => {
	return response.results.map((formation) => ({
		adresse: formation.place?.fullAddress,
		codeCertification: formation.cfd,
		codePostal: formation.place?.zipCode,
		id: mapIdFormation(formation),
		nomEntreprise: formation.company?.name,
		tags: [formation.place?.city, mapNiveauFormation(formation.diplomaLevel)],
		titre: formation.title,
	}));
};

function mapIdFormation(
	response: ApiLaBonneAlternanceFormationRechercheResponse.Formation,
): RésultatRechercheFormation['id'] {
	return `${response.idRco}${ID_FORMATION_SEPARATOR}${response.cleMinistereEducatif ? response.cleMinistereEducatif : ''}`;
}

export function parseIdFormation(id: string): IdRcoAndCléMinistèreÉducatif {
	const idArray = id.split(ID_FORMATION_SEPARATOR);
	return {
		cleMinistereEducatif: idArray[1],
		idRco: idArray[0],
	};
}

export const mapFormation = (response: ApiLaBonneAlternanceFormationResponse): Formation => {
	const apiFormationResult = response.results[0]; // todo SULI : gérer tableau vide
	return {
		adresse: {
			adresseComplète: apiFormationResult.place?.fullAddress,
			codePostal: apiFormationResult.place?.zipCode,
		},
		description: apiFormationResult.training?.description,
		nomEntreprise: apiFormationResult.company?.headquarter?.name,
		nombreHeuresAuCentre: undefined,
		nombreHeuresEnEntreprise: undefined, // NOTE (SULI 17-10-2023): LBA se renseigne de leur côté s'ils peuvent nous fournir ces données d'heure sur le retour de leur nouvel endpoint
		objectif: apiFormationResult.training?.objectif,
		tags: [apiFormationResult.place?.city || ''],
		titre: apiFormationResult.title,
	};
};

export const mapRésultatRechercheFormationToFormation = (résultatRechercheFormation: RésultatRechercheFormation): Formation => ({
	adresse: {
		adresseComplète: résultatRechercheFormation.adresse,
		codePostal: résultatRechercheFormation.codePostal,
	},
	nomEntreprise: résultatRechercheFormation.nomEntreprise,
	tags: [résultatRechercheFormation.tags[0] || ''],
	titre: résultatRechercheFormation.titre,
});
