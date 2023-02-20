import { MetierAlternance } from '~/server/alternances/domain/métier';

import { Alternance } from './alternance';

export const anAlternanceMatcha = (): Alternance => {
	return {
		localisation: 'paris',
		niveauRequis: 'débutant',
		nomEntreprise: 'une entreprise',
		source: Alternance.Source.MATCHA,
		tags: ['paris', 'Apprentissage', 'débutant'],
		titre: 'un titre',
		typeDeContrat: ['Apprentissage'],
	};
};

const anAlternanceMatchaBoucher = (): Alternance => {
	return {
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise: 'SARL HUGUE-DEBRIX',
		source: Alternance.Source.MATCHA,
		tags: ['Apprentissage', 'Cap, autres formations niveau (Infrabac)'],
		titre: 'Boucher-charcutier / Bouchère-charcutière',
		typeDeContrat: ['Apprentissage'],
	};
};

const anAlternanceMatchaBoulanger = (): Alternance => {
	return {
		niveauRequis: 'Cap, autres formations niveau (Infrabac)',
		nomEntreprise: 'MONSIEUR MICHEL',
		source: Alternance.Source.MATCHA,
		tags: ['Apprentissage',  'Cap, autres formations niveau (Infrabac)'],
		titre: 'Ouvrier boulanger / Ouvrière boulangère',
		typeDeContrat: ['Apprentissage'],
	};
};

export const anAlternancePEJobs = (): Alternance => {
	return {
		localisation: 'paris',
		nomEntreprise: 'une entreprise',
		source: Alternance.Source.POLE_EMPLOI,
		tags: ['paris', 'Contrat d‘alternance', 'CDD'],
		titre: 'un titre',
		typeDeContrat: ['CDD'],
	};
};

export const aListeDeMetierLaBonneAlternance = (): Array<MetierAlternance> => {
	return [
		{ label: 'Conduite de travaux, direction de chantier', romes: ['F1201', 'F1202', 'I1101'] },
		{ label: 'Ingéniérie en BTP (Bureau d études, conception technique, BIM, …)', romes: ['F1106', 'F1104', 'I1101'] },
		{ label: 'Génie électrique', romes: ['H1209', 'H1504'] },
		{ label: 'Aéronautique', romes: ['I1304', 'I1602'] },
		{ label: 'Chimie', romes: ['H1201', 'H1505', 'H2301'] },
		{ label: 'Electronique, informatique industrielle', romes: ['H1206', 'H1402'] },
		{ label: 'Electricité, climatisation, domotique, électronique', romes: ['F1106'] },
		{ label: 'Biologie, santé, sciences physiques', romes: ['H1206'] },
		{ label: 'Energie', romes: ['H1302', 'H1206'] },
		{ label: 'Mécanique, maintenance industrielle', romes: ['I1310', 'I1502'] },
		{ label: 'Robotique, systèmes automatisés', romes: ['H1208', 'I1301'] },
	];
};

export const aRésultatRechercherMultipleAlternance = (): Array<Alternance> => {
	return [anAlternanceMatcha(), anAlternanceMatchaBoucher(), anAlternanceMatchaBoulanger(), anAlternancePEJobs()];
};
