import {
	ContactEtablissementAccompagnement,
	EtablissementAccompagnement,
	JourSemaine,
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';

export function anEtablissementAccompagnementList(overrides?: Partial<EtablissementAccompagnement>): Array<EtablissementAccompagnement> {
	return [
		anEtablissementAccompagnement(overrides),
	];
}

export function anEtablissementAccompagnementAdresse(overrides?: Partial<EtablissementAccompagnement.Adresse>): EtablissementAccompagnement.Adresse {
	return {
		codePostal: '75011',
		nomCommune: 'Paris',
		numeroVoie: '29-31 rue des Boulets',
		...overrides,
	};
}

export function anEtablissementAccompagnement(overrides?: Partial<EtablissementAccompagnement>): EtablissementAccompagnement {
	return {
		adresse: anEtablissementAccompagnementAdresse(),
		email: 'email@missionlocaledeparis.fr',
		horaires: [
			{
				heures: [
					{
						début: '09:00:00',
						fin: '11:30:00',
					},
					{
						début: '13:30:00',
						fin: '16:30:00',
					},
				],
				jour: JourSemaine.LUNDI,
			},
			{
				heures: [
					{
						début: '09:00:00',
						fin: '11:30:00',
					},
					{
						début: '13:30:00',
						fin: '16:30:00',
					},
				],
				jour: JourSemaine.MARDI,
			},
			{
				heures: [
					{
						début: '09:00:00',
						fin: '11:30:00',
					},
					{
						début: '13:30:00',
						fin: '16:30:00',
					},
				],
				jour: JourSemaine.MERCREDI,
			},
			{
				heures: [
					{
						début: '09:00:00',
						fin: '11:30:00',
					},
					{
						début: '13:30:00',
						fin: '16:30:00',
					},
				],
				jour: JourSemaine.JEUDI,
			},
			{
				heures: [
					{
						début: '09:00:00',
						fin: '11:30:00',
					},
					{
						début: '13:30:00',
						fin: '15:30:00',
					},
				],
				jour: JourSemaine.VENDREDI,
			},
			{
				heures: [],
				jour: JourSemaine.SAMEDI,
			},
			{
				heures: [],
				jour: JourSemaine.DIMANCHE,
			},
		],
		id: 'b7c5ef55-664f-4e16-90c3-87518a823b81',
		nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 1er 2e 3e 4e 9e 10e et 11e',
		telephone: '01 00 00 00 00',
		type: TypeÉtablissement.MISSION_LOCALE,
		...overrides,
	};
}

export function aContactÉtablissementAccompagnement(): ContactEtablissementAccompagnement {
	const missionLocale = anEtablissementAccompagnement({
		type: TypeÉtablissement.MISSION_LOCALE,
	});
	return {
		email: missionLocale.email || '',
		nom: missionLocale.nom,
		type: missionLocale.type,
	};
}


