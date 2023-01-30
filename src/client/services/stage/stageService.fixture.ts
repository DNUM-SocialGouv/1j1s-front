import { Domaines } from '~/server/cms/domain/offreDeStage.type';

import { OffreDeStageFormulaire } from './stage.service';

export function anOffreDeStageFormulaire(): OffreDeStageFormulaire {
	return {
		logoEmployeur:'https://fake-url-logo.com',
		descriptionEmployeur: 'Lorem ipsum dolor sit amet',
		dateDeDebut: '15/10/2022',
		domaine: Domaines.AGRICULTURE,
		descriptionOffre: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		pays: 'France',
		duree: '2 mois',
		remunerationStage: 2500,
		titre: 'Développeur fullStack',
		urlDeCandidature: 'https://fake-url.com',
		ville: 'Marseille',
	};
}
