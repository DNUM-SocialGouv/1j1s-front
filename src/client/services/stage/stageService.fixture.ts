import { Domaines, OffreDeStageDepot } from '~/server/cms/domain/offreDeStage.type';
import { createSuccess } from '~/server/errors/either';

import { StageService } from './stage.service';

export function aStageService(): StageService {
	return {
		enregistrerOffreDeStage: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StageService;
}

export function anOffreDeStageDepot(): OffreDeStageDepot {
	return {
		dateDeDebut: '2023-02-03',
		description: 'Vous assurez la préparation des commandes clients en prélevant les produits dans les emplacements via le système informatique Vous prenez en charge la réception, le déchargement, le réapprovisionnement des produit Vous gérez la réception des commandes par les clients Vous veillez au rangement et à la propreté de la zone de travail',
		domaine: 'achats' as Domaines,
		duree: '30',
		employeur: {
			description: 'description entreprise',
			email: 'example@example.com',
			logoUrl: 'https://fake-url.com',
			nom: 'SNCF',
			siteUrl: 'https://fake-url.com',
		},
		localisation: {
			adresse: 'Vieux port Marseille',
			codePostal: '13000',
			departement: 'Var',
			pays: 'FR',
			region: 'Provence-Alpes-Côte d\'Azure',
			ville: 'Paris',
		},
		remunerationBase: 560,
		teletravailPossible: true,
		titre: 'Assistant conducteur train',
		urlDeCandidature: 'mailto:admin@example.com',
	};
}
