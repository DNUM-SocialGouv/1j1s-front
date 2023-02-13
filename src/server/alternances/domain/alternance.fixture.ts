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

const uneAlternanceBoucher = (): Alternance => {
	return {
		niveauRequis : 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise : 'SARL HUGUE-DEBRIX',
		titre: 'Boucher-charcutier / Bouchère-charcutière',
		typeDeContrat : 'Apprentissage',
	};
};

const uneAlternanceBoulanger = (): Alternance => {
	return {
		niveauRequis : 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise : 'MONSIEUR MICHEL',
		titre: 'Ouvrier boulanger / Ouvrière boulangère',
		typeDeContrat : 'Apprentissage',
	};
};

const uneAlternanceBarista = (): Alternance => {
	return {
		niveauRequis : 'Indifférent',
		nomEntreprise : 'A My B FORMATIONS',
		titre: 'Barista',
		typeDeContrat : 'Apprentissage',
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

export const aRésultatRechercherMultipleAlternance = (): Array<Alternance> => {
	return [ uneAlternance(), uneAlternanceBoucher(), uneAlternanceBoulanger(), uneAlternanceBarista()];
};
