import { Domaines } from '~/server/cms/domain/offreDeStage.type';
import { createSuccess } from '~/server/errors/either';

import { OffreDeStageFormulaire, StageService } from './stage.service';

export function aStageService(): StageService {
	return {
		enregistrerOffreDeStage: jest.fn().mockResolvedValue(createSuccess(undefined)),
	} as unknown as StageService;
}

export function anOffreDeStageFormulaire(): OffreDeStageFormulaire {
	return {
		adresse:'Vieux port Marseille',
		codePostal:'13000',
		dateDebut:'2023-02-03',
		departement:'Var',
		descriptionEmployeur:'description entreprise',
		descriptionOffre:'Vous assurez la préparation des commandes clients en prélevant les produits dans les emplacements via le système informatique Vous prenez en charge la réception, le déchargement, le réapprovisionnement des produit Vous gérez la réception des commandes par les clients Vous veillez au rangement et à la propreté de la zone de travail',
		domaineStage: 'achats' as Domaines,
		dureeStage:'30',
		emailEmployeur:'example@example.com',
		lienCandidature:'mailto:admin@example.com',
		logoEmployeur:'https://fake-url.com',
		nomEmployeur:'SNCF',
		nomOffre:'Assistant conducteur train',
		pays:'FR',
		region:	"Provence-Alpes-Côte d'Azure",
		remunerationStage: 560,
		siteEmployeur: 'https://fake-url.com',
		teletravail: true,
		ville:'Paris',
	};
}
