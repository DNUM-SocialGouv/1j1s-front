import { BaseHit } from 'instantsearch.js/es/types/results';

export interface Evenement extends BaseHit {
	titreEvenement: string;
	organismeOrganisateur: string;
	lieuEvenement: string;
	dateDebut: string;
	dateFin: string;
	slug: string;
}
