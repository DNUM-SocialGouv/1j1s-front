import { MetierAlternance } from '~/server/alternances/domain/métier';

import { Alternance } from './alternance';

export const uneAlternance = (): Alternance => {
	return {
		localisation: 'paris',
		niveauRequis: 'débutant',
		nomEntreprise: 'une entreprise',
		titre: 'un titre',
		typeDeContrat: 'apprentissage',
	};
};

export const aRésultatRechercheAlternance = (): Array<Alternance> => {
	return [uneAlternance()];
};

export const aListeDeMetierLaBonneAlternance = (): Array<MetierAlternance> => {
	return [
		{ label: 'Vente, transaction, gestion immobilière', romes: ['C1504', 'C1501', 'C1502', 'C1503'] },
		{ label: 'Transport aérien', romes: ['N2101', 'N2102', 'N2203', 'N2204'] },
		{ label: 'Transport ferroviaire', romes: ['N4301', 'N4401', 'N4403'] },
	];
};
