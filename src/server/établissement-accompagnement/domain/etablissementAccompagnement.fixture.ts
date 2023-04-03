import {
	ContactÉtablissementAccompagnement,
	ÉtablissementAccompagnement,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';

export function anOrderedÉtablissementAccompagnementList(): ÉtablissementAccompagnement[] {
	return [
		{
			adresse: undefined,
			email: 'cyberbase@cauvaldor.fr',
			horaires: [
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: '1fe2b5e7-e80f-47ca-9cf7-84e7e99b8c07',
			nom: 'Point information jeunesse - Saint-Céré',
			telephone: '05 65 38 07 15',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '1 ter avenue Philibert-Delprat, 46100 Figeac',
			email: 'figeac.pij@wanadoo.fr',
			horaires: [
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '12:30:00',
							fin: '16:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'bcb60ef1-6afc-45c7-b530-fa635cc20bc6',
			nom: 'Point information jeunesse - Figeac',
			telephone: '05 65 34 34 49',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '4 place gambetta, Maison des Services Publics 1er étage, 46400 Saint-Céré',
			email: 'cyberbase@cauvaldor.fr',
			horaires: [
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: '698e58e6-f3f9-42e4-ae2b-bff878dd59e8',
			nom: 'Point information jeunesse - Saint-Céré',
			telephone: '05 65 38 07 15',
			type: TypeÉtablissement.INFO_JEUNE,
		},
	];
}

export function anUnorderedÉtablissementAccompagnementList(): ÉtablissementAccompagnement[] {
	return [
		{
			adresse: '90 rue Curial, 75019 Paris',
			email: undefined,
			horaires: [
				{
					heures: [
						{
							début: '10:30:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '10:30:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: '12c9fee2-38c7-4d16-a27c-a2a9040f0475',
			nom: 'Point information jeunesse - Paris 19e arrondissement - Curial',
			telephone: '01 40 37 32 28',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '3-5 rue d‘Aligre, 75012 Paris',
			email: 'maisondesensembles@ligueparis.org',
			horaires: [
				{
					heures: [
						{
							début: '10:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: '12f15c57-ea33-4ec9-aa34-5e664f742872',
			nom: 'Point information jeunesse - Paris 12e - Maison des ensembles',
			telephone: '01 53 46 75 10',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: 'Espace jeunes, 49 ter avenue de Flandre, 75019 Paris',
			email: 'ejf.espoir18@gmail.com',
			horaires: [
				{
					heures: [
						{
							début: '14:00:00',
							fin: '21:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '21:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '21:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '21:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '21:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '22:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: '254cc707-6403-40bf-a4be-f937eebc6ac9',
			nom: 'Centre information jeunesse - Paris - Flandre',
			telephone: '01 42 81 58 02',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: 'Espace jeunes le 27, 27 rue Marguerite Long, 75017 Paris',
			email: 'epjle27@leolagrange.org',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: '4f846571-e2d0-4c38-9cc9-ac79c56090c4',
			nom: 'Point information jeunesse - Paris 17e',
			telephone: '01 43 18 51 03',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '64 rue de la Santé, 75014 Paris',
			email: undefined,
			horaires: [
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: '7d7c1fa0-7a1c-41e4-9f81-7f3e5e2e5e41',
			nom: 'Point information jeunesse - Paris 14e - ALJT',
			telephone: '01 44 16 89 08',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: 'Centre Maurice-Ravel, 6 avenue Maurice-Ravel, 75012 Paris',
			email: 'pijravel@laligue.org',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '16:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '16:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: '93ed2234-4bf7-4b69-a06c-87679308c3de',
			nom: "Point information jeunesse - Paris 12e - Anim' Ravel",
			telephone: '01 44 75 60 02',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '6-8 rue Eugène Oudiné, Siège, 75013 Paris',
			email: 'accueil@cidj.com',
			horaires: [
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '13:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: '94614f64-50ba-4ae1-9603-15c051cfcf40',
			nom: 'Centre information et documentation jeunesse - CIDJ',
			telephone: '01 88 40 41 80',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '4 rue Louis Bonnet, Espace Paris Jeunes Belleville, 75011 Paris',
			email: 'contact.epj.belleville@paris.ifac.asso.fr',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:30',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '22:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: 'a668c144-57a4-46c5-80be-fc31ce828fb7',
			nom: 'Point information jeunesse - Paris 11e - Belleville',
			telephone: '01 48 06 48 45',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '119 rue du Mont-Cenis, 75018 Paris',
			email: 'ajpmontcenis@gmail.com',
			horaires: [
				{
					heures: [
						{
							début: '10:30:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '10:30:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'ba70f229-221e-45cd-90b3-07d651c3170e',
			nom: 'Point information jeunesse - Paris 18e',
			telephone: '01 49 25 44 05',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '40 rue Didot, 75014 Paris',
			email: 'jeunesseparisanim14sud@gmail.com',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: 'c014ccac-681a-465f-b298-08f8c0f729d9',
			nom: 'Point information jeunesse - Paris 14e -  Jeunes-Didot',
			telephone: '01 77 10 12 17',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: "Centre Paris Anim' Mercœur, 4 rue Mercœur, 75011 Paris",
			email: 'sij@mercoeur.asso.fr',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '16:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '15:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: 'c8b9c7f6-6a31-422f-945e-d16dde79209b',
			nom: 'Point information jeunesse - Paris 11e',
			telephone: '01 43 79 25 54',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '3 rue du Coq-Héron, 75001 Paris',
			email: 'contact-ciej@sauvegarde-paris.fr',
			horaires: [
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '13:30:00',
							fin: '17:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '13:30:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '13:30:00',
							fin: '17:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '13:30:00',
							fin: '17:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '09:00:00',
							fin: '12:00:00',
						},
						{
							début: '13:30:00',
							fin: '17:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'ca18f355-ab28-4bf0-a880-06d48f18de6d',
			nom: 'Point information jeunesse - Paris 1e',
			telephone: '01 40 39 70 00',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '60 rue la Fayette, 75009 Paris',
			email: 'pijneuvieme@ligueparis.org',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'cdb9f29f-289e-4075-bb99-2f9d03966cea',
			nom: 'Point information jeunesse - La Fayette',
			telephone: '01 42 29 65 36',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: '50 rue des Rigoles, 75020 Paris',
			email: 'contact.epj.taosamrouche@paris.ifac.asso.fr',
			horaires: [
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '11:00:00',
							fin: '13:00:00',
						},
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:30:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'd78846fe-fdeb-4d12-9f3d-eaf0472a1020',
			nom: 'Point information jeunesse - Paris 20e - Espace Paris jeunes Taos Amrouche',
			telephone: '01 42 23 09 10',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: 'Centre Maurice-Ravel, 6 avenue Maurice-Ravel, 75012 Paris',
			email: 'pijravel@laligue.org',
			horaires: [
				{
					heures: [],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '16:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '15:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '16:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '16:00:00',
							fin: '18:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [
						{
							début: '10:00:00',
							fin: '12:00:00',
						},
						{
							début: '14:00:00',
							fin: '17:00:00',
						},
					],
					jour: 'Samedi',
				},
			],
			id: 'f33ed7f9-ed0b-4191-8a69-ffb1854d7d1a',
			nom: 'Point information jeunesse - Paris - 12e arrondissement',
			telephone: '01 44 75 60 02',
			type: TypeÉtablissement.INFO_JEUNE,
		},
		{
			adresse: 'Tour Anvers, 32 rue du Javelot, 75013 Paris',
			email: 'pij-olympiades@mjcidf.org',
			horaires: [
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Lundi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mardi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Mercredi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Jeudi',
				},
				{
					heures: [
						{
							début: '14:00:00',
							fin: '19:00:00',
						},
					],
					jour: 'Vendredi',
				},
				{
					heures: [],
					jour: 'Samedi',
				},
			],
			id: 'f55d736a-0f4b-41ac-baae-eb9a3ccbbcc1',
			nom: 'Point information jeunesse - Paris 13e - Olympiades',
			telephone: '01 44 24 22 90',
			type: TypeÉtablissement.INFO_JEUNE,
		},
	];
}

export function aMissionLocaleÉtablissementAccompagnement(): ÉtablissementAccompagnement {
	return {
		adresse: '93 rue Jeanne-d‘Arc, 75013 Paris',
		email: 'email@email.com',
		horaires: [
			{
				heures: [
					{
						début: '10:30:00',
						fin: '13:00:00',
					},
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Lundi',
			},
			{
				heures: [
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Mardi',
			},
			{
				heures: [],
				jour: 'Mercredi',
			},
			{
				heures: [
					{
						début: '10:30:00',
						fin: '13:00:00',
					},
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Jeudi',
			},
			{
				heures: [
					{
						début: '14:00:00',
						fin: '19:00:00',
					},
				],
				jour: 'Vendredi',
			},
			{
				heures: [],
				jour: 'Samedi',
			},
		],
		id: '11c63eb2-68b3-40dc-828e-33c212686173',
		nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 5e 12e et 13e arrondissements',
		telephone: '01 45 85 20 50',
		type: TypeÉtablissement.MISSION_LOCALE,
	};
}

export function aMissionLocaleÉtablissementAccompagnementList(): ÉtablissementAccompagnement[] {
	return [
		aMissionLocaleÉtablissementAccompagnement(),
	];
}

export function aContactÉtablissementAccompagnement(): ContactÉtablissementAccompagnement {
	const missionLocale = aMissionLocaleÉtablissementAccompagnement();
	return {
		email: missionLocale.email || '',
		nom: missionLocale.nom,
		type: missionLocale.type,
	};
}
