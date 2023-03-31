import { AxiosResponse } from 'axios';

import { OffreResponse, RésultatsRechercheOffreResponse } from '~/server/offres/infra/repositories/pole-emploi/poleEmploiOffre.response';
import { anAxiosResponse } from '~/server/services/http/publicHttpClient.service.fixture';

export function aRésultatRechercheOffreEmploiAxiosResponse(override?: Partial<RésultatsRechercheOffreResponse>): AxiosResponse<RésultatsRechercheOffreResponse> {
	return anAxiosResponse({
		filtresPossibles: aFiltresPossiblesResponse(),
		resultats: [
			aBarmanOffreEmploiApiResponse(),
			aMaçonOffreEmploiResponse(),
			aValetOffreEmploiResponse(),
		],
		...override,
	});
}

export function aRésultatsRechercheOffreEmploiApiResponse() {
	return {
		filtresPossibles: aFiltresPossiblesResponse(),
		resultats: [
			aBarmanOffreEmploiApiResponse(),
			aMaçonOffreEmploiResponse(),
			aValetOffreEmploiResponse(),
		],
	};
}
export function aRésultatRéférentielCommuneResponse() {
	return anAxiosResponse([
		{
			code: '76322',
			codeDepartement: '76',
			codePostal: '76120',
			libelle: 'LE GRAND QUEVILLY',
		},
		{
			code: '44109',
			codeDepartement: '44',
			codePostal: '44000',
			libelle: 'NANTES',
		},
		{
			code: '76615',
			codeDepartement: '76',
			codePostal: '76133',
			libelle: 'ST MARTIN DU BEC',
		},
		{
			code: '75101',
			codeDepartement: '75',
			codePostal: '75001',
			libelle: 'PARIS 01',
		},
	]);
}

export function aBarmanOffreEmploiApiResponse(): OffreResponse {
	return {
		description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d‘alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d‘hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
		dureeTravailLibelleConverti: 'Temps partiel',
		entreprise: {
			logo: undefined,
			nom: 'LE PLEIN AIR',
		},
		experienceExige: 'D',
		formations: [
			{ commentaire: 'Bac Pro Automobile',
				niveauLibelle: 'Bac ou équivalent' },
			{ commentaire: 'Bac Pro Moto',
				niveauLibelle: 'Bac ou supérieur' },
		],
		id: '132LKFB',
		intitule: 'Barman / Barmaid (H/F)',
		lieuTravail: {
			libelle: '26 - BOURG LES VALENCE',
		},
		origineOffre: {
			urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132LKFB',
		},
		typeContrat: 'SAI',
	};
}

function aMaçonOffreEmploiResponse(): OffreResponse {
	return {
		description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d‘agences d‘emploi de 170 agences, propose des centaines d‘opportunités d‘emploi dans tous les secteurs d‘activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d‘un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
		dureeTravailLibelleConverti: 'Temps partiel',
		entreprise: {
			logo: undefined,
			nom: 'RAS 1040',
		},
		experienceExige: 'E',
		formations:[
			{ commentaire: 'Bac pro Maçon',
				niveauLibelle: 'Bac ou supérieur' },
		],
		id: '130WPHC',
		intitule: 'Maçon / Maçonne',
		lieuTravail: undefined,
		origineOffre: {
			urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/130WPHC',
		},
		typeContrat: 'MIS',
	};
}

function aValetOffreEmploiResponse(): OffreResponse {
	return {
		description: 'Vous interviendrez sur le nettoyage des chambres de l‘Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l‘aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d‘heure varieront en fonction des nécessites du service; c‘est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
		dureeTravailLibelleConverti: 'Temps partiel',
		entreprise: undefined,
		experienceExige: 'S',
		id: '132MDKM',
		intitule: 'Valet / Femme de chambre',
		lieuTravail: {
			libelle: '34 - BALARUC LES BAINS',
		},
		origineOffre: {
			urlOrigine: 'https://candidat.pole-emploi.fr/offres/recherche/detail/132MDKM',
		},
		typeContrat: 'CDD',
	};
}

function aFiltresPossiblesResponse(): RésultatsRechercheOffreResponse.FiltresPossibles[] {
	return [
		{
			agregation: [
				{
					nbResultats: 3,
				},
			],
		},
		{
			agregation: [
				{
					nbResultats: 3,
				},
			],
		},
		{
			agregation: [
				{
					nbResultats: 1,
				},
				{
					nbResultats: 2,
				},
			],
		},
		{
			agregation: [
				{
					nbResultats: 1,
				},
				{
					nbResultats: 2,
				},
			],
		},
	];
}

export function anOffreEmploiResponseCompétenceList(): OffreResponse.Compétence[] {
	return [
		anOffreEmploiResponseCompétence(),
		anOffreEmploiResponseCompétence({ libelle: 'Déterminer les besoins thérapeutiques' }),
	];
}

export function anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie(): OffreResponse.Compétence[] {
	return [
		anOffreEmploiResponseCompétence(),
		anOffreEmploiResponseCompétence({ libelle: undefined }),
	];
}

function anOffreEmploiResponseCompétence(override?: Partial<OffreResponse.Compétence>): OffreResponse.Compétence {
	return {
		libelle: 'Réaliser la prescription médicale',
		...override,
	};
}

export function anOffreEmploiResponseFormationList(): OffreResponse.Formation[] {
	return [
		anOffreEmploiResponseFormation(),
		anOffreEmploiResponseFormation({
			commentaire: 'Licence pro commerce',
			niveauLibelle: 'Bac+3 et plus ou équivalents',
		}),
	];
}

export function anOffreEmploiResponseFormationListAvecFormationNonDéfinie(): OffreResponse.Formation[] {
	return [
		anOffreEmploiResponseFormation(),
		anOffreEmploiResponseFormation({ commentaire: undefined, niveauLibelle: undefined }),
	];
}

function anOffreEmploiResponseFormation(override?: Partial<OffreResponse.Formation>): OffreResponse.Formation {
	return {
		commentaire: 'DE docteur en médecine',
		niveauLibelle: 'Bac+5 et plus ou équivalents',
		...override,
	};
}

export function anOffreEmploiResponseQualitéProfessionnelleList(): OffreResponse.QualitéeProfessionnelle[] {
	return [
		anOffreEmploiResponseQualitéProfessionnelle(),
		anOffreEmploiResponseQualitéProfessionnelle({ libelle: 'Capacité de décision' }),
	];
}

export function anOffreEmploiResponseQualitéProfessionnelleListAvecQualitéNonDéfinie(): OffreResponse.QualitéeProfessionnelle[] {
	return [
		anOffreEmploiResponseQualitéProfessionnelle(),
		anOffreEmploiResponseQualitéProfessionnelle({ libelle: undefined }),
	];
}

function anOffreEmploiResponseQualitéProfessionnelle(override?: Partial<OffreResponse.QualitéeProfessionnelle>): OffreResponse.QualitéeProfessionnelle {
	return {
		libelle: 'Capacité d‘adaptation',
		...override,
	};
}
