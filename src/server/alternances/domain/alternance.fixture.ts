import { MetierAlternance } from '~/server/alternances/domain/métier';

import { Alternance } from './alternance';

export const anAlternanceMatcha = (): Alternance => {
	return {
		localisation: 'paris',
		niveauRequis: 'débutant',
		nomEntreprise: 'une entreprise',
		source: Alternance.Source.MATCHA,
		tags: ['paris', 'apprentissage', 'débutant'],
		titre: 'un titre',
		typeDeContrat: 'apprentissage',
	};
};

const anAlternanceMatchaBoucher = (): Alternance => {
	return {
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise: 'SARL HUGUE-DEBRIX',
		source: Alternance.Source.MATCHA,
		tags: ['apprentissage', 'Cap, autres formations niveau (Infrabac)'],
		titre: 'Boucher-charcutier / Bouchère-charcutière',
		typeDeContrat: 'apprentissage',
	};
};

const anAlternanceMatchaBoulanger = (): Alternance => {
	return {
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise: 'MONSIEUR MICHEL',
		source: Alternance.Source.MATCHA,
		tags: ['apprentissage',  'Cap, autres formations niveau (Infrabac)'],
		titre: 'Ouvrier boulanger / Ouvrière boulangère',
		typeDeContrat: 'apprentissage',
	};
};

export const anAlternancePEJobs = (): Alternance => {
	return {
		localisation: 'paris',
		nomEntreprise: 'une entreprise',
		source: Alternance.Source.POLE_EMPLOI,
		tags: ['paris', 'Contrat d‘alternance', 'CDD'],
		titre: 'un titre',
		typeDeContrat: 'CDD',
	};
};


export const anAlternanceList = (): Array<Alternance> => {
	return [anAlternanceMatcha(), anAlternanceMatchaBoucher(), anAlternanceMatchaBoulanger(), anAlternancePEJobs()];
};

export const aListeDeMetierLaBonneAlternance = (): Array<MetierAlternance> => {
	return [
		{ label: 'Vente, transaction, gestion immobilière', romes: ['C1504', 'C1501', 'C1502', 'C1503'] },
		{ label: 'Transport aérien', romes: ['N2101', 'N2102', 'N2203', 'N2204'] },
		{ label: 'Transport ferroviaire', romes: ['N4301', 'N4401', 'N4403'] },
	];
};

