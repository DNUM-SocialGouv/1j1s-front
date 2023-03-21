import { FormationFiltre } from '~/server/formations/domain/formation';
import {
	ApiLaBonneAlternanceFormationRechercheResponse,
	ApiLaBonneAlternanceFormationResponse,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation';

export function aFormationQuery(): FormationFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['F1603', 'I1308'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
	};
}

export const aFormationAvecCodeCertificationQuery = (override?: Partial<FormationFiltre.AvecCodeCertification>): FormationFiltre.AvecCodeCertification => {
	return {
		...aFormationQuery(),
		codeCertification: '4567',
		...override,
	};
};

export function aFormationQueryWithDiploma(): FormationFiltre {
	return {
		codeCommune: '13180',
		codeRomes: ['F1603', 'I1308'],
		distanceCommune: '30',
		latitudeCommune: '48.2',
		longitudeCommune: '29.10',
		niveauEtude: '6',
	};
}

export const aLaBonneAlternanceApiRésultatRechercheFormationResponse = (): ApiLaBonneAlternanceFormationRechercheResponse => ({
	results: [
		{
			cfd: '999',
			company: {
				name: 'La Bonne Alternance',
			},
			diplomaLevel: '4 (BAC...)',
			idRco: '123',
			place: {
				city: 'Paris',
				fullAddress: '1 rue de la République',
				zipCode: '75001',
			},
			title: 'Développeur web',
		},
		{
			cfd: '888',
			company: {
				name: 'La Bonne Alternance',
			},
			diplomaLevel: 'Un autre type de diplôme',
			idRco: '456',
			place: {
				city: 'Paris',
			},
			title: 'Développeur web',
		},
	],
});

export const aLaBonneAlternanceApiFormationResponse = (): ApiLaBonneAlternanceFormationResponse => ({
	description: 'Description de la formation',
	'duree-indicative': '1 an',
	intitule: 'Développeur web',
	objectif: 'Objectifs de la formation',
	organisme: {
		contact: {
			email: 'email@domaine.fr',
			tel: '01 23 45 67 89',
			url: 'https://domaine.fr',
		},
		nom: 'La Bonne Alternance',
	},
	sessions: [
		{
			localisation: {
				formation: {
					adresse: '1 rue de la République',
					'code-postal': '75001',
					ville: 'Paris',
				},
			},
			'nombre-heures-centre': 100,
			'nombre-heures-entreprise': 200,
		},
	],
});
