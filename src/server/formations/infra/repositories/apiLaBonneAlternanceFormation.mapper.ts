import { Formation,RésultatRechercheFormation } from '~/server/formations/domain/formation';
import { mapNiveauFormation } from '~/server/formations/domain/formation.mapper';
import {
	ID_FORMATION_SEPARATOR,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.repository';

import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse, IdRcoAndCléMinistèreÉducatif,
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

function mapFormationAdresse(
	adresse: string | undefined,
	codePostal: string | undefined,
	ville: string | undefined,
): Formation['adresse'] {
	const adresseComplèteArray = [adresse || '', codePostal || '', ville || ''].filter((element) => element !== '');
	return {
		adresseComplète: adresseComplèteArray.join(' - '),
		codePostal,
	};
}

export const mapFormation = (response: ApiLaBonneAlternanceFormationResponse): Formation => {
	const session = response.sessions[0];
	return {
		adresse: mapFormationAdresse(session.localisation?.formation?.adresse,
			session.localisation?.formation?.['code-postal'],
			session.localisation?.formation?.ville,
		),
		contact: {
			email: response.organisme?.contact?.email,
			tel: response.organisme?.contact?.tel,
			url: response.organisme?.contact?.url,
		},
		description: response.description,
		duréeIndicative: response['duree-indicative'],
		nomEntreprise: response.organisme?.nom,
		nombreHeuresAuCentre: session['nombre-heures-centre'],
		nombreHeuresEnEntreprise: session['nombre-heures-entreprise'],
		objectif: response.objectif,
		tags: [session.localisation?.formation?.ville || ''],
		titre: response.intitule,
	};
};

export const mapRésultatRechercheFormationToFormation = (résultatRechercheFormation: RésultatRechercheFormation):Formation => ({
	adresse: {
		adresseComplète: résultatRechercheFormation.adresse,
		codePostal: résultatRechercheFormation.codePostal,
	},
	contact: {},
	nomEntreprise: résultatRechercheFormation.nomEntreprise,
	tags: [résultatRechercheFormation.tags[0] || ''],
	titre: résultatRechercheFormation.titre,
});
