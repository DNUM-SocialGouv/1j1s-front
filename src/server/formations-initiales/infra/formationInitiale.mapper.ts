import {
	FormationInitiale, FormationInitialeDetailCMS,
	ResultatRechercheFormationsInitiales,
} from '~/server/formations-initiales/domain/formationInitiale';
import {
	FormationInitialeApiResponse,
	ResultatRechercheFormationInitialeApiResponse,
} from '~/server/formations-initiales/infra/onisepFormationInitiale';
import {
	StrapiFormationInitialeDetail,
} from '~/server/formations-initiales/infra/strapiFormationInitialeDetail';

export function mapRechercheformationInitiale(resultatRechercheFormationInitialeApiResponse: ResultatRechercheFormationInitialeApiResponse): ResultatRechercheFormationsInitiales {
	return {
		formationsInitiales: resultatRechercheFormationInitialeApiResponse.results.map((formationInitiale) => mapFormationInitialeDetailFromOnisep(formationInitiale)),
		nombreDeResultat: resultatRechercheFormationInitialeApiResponse.total,
	};
}

export function mapFormationInitialeDetailFromOnisep(formationInitialeApiResponse: FormationInitialeApiResponse): FormationInitiale {
	function getIdentifiant(url: string) {
		const regex = /slug\/([^/]+)/;
		const match = url.match(regex);
		if (match && match.length >= 2) {
			return match[1];
		}
		return undefined;
	}

	function getTags(formationInitialeApiResponse: FormationInitialeApiResponse) {
		const tags = [];
		const isCertifiante = !(formationInitialeApiResponse.niveau_de_certification === '0' || formationInitialeApiResponse.niveau_de_certification === '');

		if (isCertifiante) tags.push('Certifiante');
		tags.push(formationInitialeApiResponse.niveau_de_sortie_indicatif);
		tags.push(formationInitialeApiResponse.duree);
		return tags;
	}

	return {
		identifiant: getIdentifiant(formationInitialeApiResponse.url_et_id_onisep),
		libelle: formationInitialeApiResponse.libelle_formation_principal,
		// TODO (BRUJ 21/05/2024): déplacer la formation du tag côté client
		tags: getTags(formationInitialeApiResponse),
		url_formation: formationInitialeApiResponse.url_et_id_onisep,
	};
}

export function mapFormationInitialeDetailFromStrapi(strapiFormationInitiale: StrapiFormationInitialeDetail): FormationInitialeDetailCMS {
	return {
		attendusParcoursup: strapiFormationInitiale.attendusParcoursup,
		conditionsAcces: strapiFormationInitiale.conditionsAcces,
		dateDeMiseAJour: strapiFormationInitiale.updatedAt,
		description: strapiFormationInitiale.description,
		poursuiteEtudes: strapiFormationInitiale.poursuiteEtudes,
	};
}
