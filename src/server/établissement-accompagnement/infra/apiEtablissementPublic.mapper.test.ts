import {
	JourSemaine,
	TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	anEtablissementAccompagnement,
	anÉtablissementAccompagnementList,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';
import {
	anAdresseEtablissementPublicResponse,
	anEtablissementPublicResponse,
	aPivotEtablissementPublicResponse,
	aPlageOuvertureEtablissementPublicResponse,
	aTelephoneEtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.fixture';
import {
	mapEtablissementPublicAccompagnement,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.mapper';

describe('mapÉtablissementAccompagnement', () => {
	it('retourne la liste des établissements publics', () => {
		const anEtablissement = anEtablissementPublicResponse();

		const result = mapEtablissementPublicAccompagnement([anEtablissement]);
		const expected = anÉtablissementAccompagnementList();

		expect(result).toEqual(expected);
	});

	describe('type accompagnement', () => {
		it('lorsque le type d‘établissement n‘est pas correcte, ne renvoie pas l‘établissement', () => {
			const resultatRechercheEtablissementPublicResponse = [anEtablissementPublicResponse({
				nom: 'un établissement avec un type incorrect',
				pivot: aPivotEtablissementPublicResponse([{ type_service_local: 'mairie' }, { type_service_local: 'tribunale' }]),
			}), anEtablissementPublicResponse()];
			const result = mapEtablissementPublicAccompagnement(resultatRechercheEtablissementPublicResponse);

			expect(result).toEqual(anÉtablissementAccompagnementList());
		});

		it('lorsque le type d‘établissement est correcte, renvoie l‘établissement', () => {
			const resultatRechercheEtablissementPublicResponse = [anEtablissementPublicResponse({
				nom: 'CIJ',
				pivot: aPivotEtablissementPublicResponse([{ type_service_local: 'pas un bon type' }, { type_service_local: 'cij' }]),
			}), anEtablissementPublicResponse({
				nom: 'Mission locale',
				pivot: aPivotEtablissementPublicResponse([{ type_service_local: 'mission_locale' }]),
			}), anEtablissementPublicResponse({
				nom: 'France travail',
				pivot: aPivotEtablissementPublicResponse([{ type_service_local: 'france_travail' }]),
			})];
			const result = mapEtablissementPublicAccompagnement(resultatRechercheEtablissementPublicResponse);

			expect(result).toEqual([anEtablissementAccompagnement({ nom: 'CIJ', type: TypeÉtablissement.INFO_JEUNE }),
				anEtablissementAccompagnement({ nom: 'Mission locale', type: TypeÉtablissement.MISSION_LOCALE }),
				anEtablissementAccompagnement({ nom: 'France travail', type: TypeÉtablissement.AGENCE_POLE_EMPLOI })]);
		});
	});

	describe('adresse', () => {
		it('lorsque l‘adresse n‘est pas présente renvoie undefined', () => {
			const anEtablissement = anEtablissementPublicResponse({
				adresse: anAdresseEtablissementPublicResponse([{
					code_postal: '14053',
					nom_commune: 'Caen Cedex 4',
					numero_voie: '1 rue Daniel Huet',
					type_adresse: 'Adresse postale',
				}]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({ adresse: undefined })]);
		});

		it('lorsque l‘adresse est présente renvoie l‘adresse', () => {
			const anEtablissement = anEtablissementPublicResponse({
				adresse: anAdresseEtablissementPublicResponse([{
					code_postal: '14053',
					nom_commune: 'Caen',
					numero_voie: '1 rue Daniel Huet',
					type_adresse: 'Adresse',
				}]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({ adresse: '1 rue Daniel Huet, 14053 Caen' })]);
		});
	});

	describe('téléphone', () => {
		it('lorsque des téléphones sont présents renvoie le premier numéro', () => {
			const anEtablissement = anEtablissementPublicResponse({
				telephone: aTelephoneEtablissementPublicResponse([{ valeur: '01 00 00 00 00' }, { valeur: '01 23 45 67 89' }]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({ telephone: '01 00 00 00 00' })]);
		});

		it('lorsqu‘aucun téléphone n‘est présent renvoie undefined', () => {
			const anEtablissement = anEtablissementPublicResponse({ telephone: undefined });

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({ telephone: undefined })]);
		});
	});

	describe('horaire', () => {
		it('lorsque les horaires ne sont pas présents renvoie undefined', () => {
			const anEtablissement = anEtablissementPublicResponse({ plage_ouverture: undefined });

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({ horaires: undefined })]);
		});

		it('lorsque la plage horaire est sur un jour, renvoie les horaires triés par jour de la semaine', () => {
			const anEtablissement = anEtablissementPublicResponse({
				plage_ouverture: aPlageOuvertureEtablissementPublicResponse([{
					nom_jour_debut: JourSemaine.JEUDI,
					nom_jour_fin: JourSemaine.JEUDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '',
				},
				{
					nom_jour_debut: JourSemaine.MARDI,
					nom_jour_fin: JourSemaine.MARDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '13:30:00',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '16:30:00',
				}]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({
				horaires: [
					{ heures: [], jour: JourSemaine.LUNDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }, { début: '13:30:00', fin: '16:30:00' }], jour: JourSemaine.MARDI },
					{ heures: [], jour: JourSemaine.MERCREDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }], jour: JourSemaine.JEUDI },
					{ heures: [], jour: JourSemaine.VENDREDI },
					{ heures: [], jour: JourSemaine.SAMEDI },
					{ heures: [], jour: JourSemaine.DIMANCHE },
				],
			})]);
		});

		it('lorsque la plage horaire est sur plusieurs jours, renvoie les horaires triés par jour de la semaine', () => {
			const anEtablissement = anEtablissementPublicResponse({
				plage_ouverture: aPlageOuvertureEtablissementPublicResponse([{
					nom_jour_debut: JourSemaine.VENDREDI,
					nom_jour_fin: JourSemaine.SAMEDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '13:30:00',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '16:30:00',
				},
				{
					nom_jour_debut: JourSemaine.MARDI,
					nom_jour_fin: JourSemaine.JEUDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '',
				}]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({
				horaires: [
					{ heures: [], jour: JourSemaine.LUNDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }], jour: JourSemaine.MARDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }], jour: JourSemaine.MERCREDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }], jour: JourSemaine.JEUDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }, { début: '13:30:00', fin: '16:30:00' }], jour: JourSemaine.VENDREDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }, { début: '13:30:00', fin: '16:30:00' }], jour: JourSemaine.SAMEDI },
					{ heures: [], jour: JourSemaine.DIMANCHE },
				],
			})]);
		});

		it('lorsque le jour de la plage horaire n‘est pas supporté, ne renvoie pas cet horaire', () => {
			const anEtablissement = anEtablissementPublicResponse({
				plage_ouverture: aPlageOuvertureEtablissementPublicResponse([{
					// @ts-expect-error
					nom_jour_debut: 'je suis un mauvais jour',
					nom_jour_fin: JourSemaine.JEUDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '',
				},
				{
					nom_jour_debut: JourSemaine.MARDI,
					nom_jour_fin: JourSemaine.MARDI,
					valeur_heure_debut_1: '09:00:00',
					valeur_heure_debut_2: '13:30:00',
					valeur_heure_fin_1: '11:30:00',
					valeur_heure_fin_2: '16:30:00',
				}]),
			});

			const result = mapEtablissementPublicAccompagnement([anEtablissement]);

			expect(result).toEqual([anEtablissementAccompagnement({
				horaires: [
					{ heures: [], jour: JourSemaine.LUNDI },
					{ heures: [{ début: '09:00:00', fin: '11:30:00' }, { début: '13:30:00', fin: '16:30:00' }], jour: JourSemaine.MARDI },
					{ heures: [], jour: JourSemaine.MERCREDI },
					{ heures: [], jour: JourSemaine.JEUDI },
					{ heures: [], jour: JourSemaine.VENDREDI },
					{ heures: [], jour: JourSemaine.SAMEDI },
					{ heures: [], jour: JourSemaine.DIMANCHE },
				],
			})]);
		});
	});
});
