import { Alternance } from './alternance';

export const anAlternanceMatcha = (): Alternance => {
	return {
		id: 'id',
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
		id: 'id-boucher',
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
		id: 'id-boulanger',
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
		id: 'alternance-pejob',
		localisation: 'paris',
		nomEntreprise: 'une entreprise',
		source: Alternance.Source.POLE_EMPLOI,
		tags: ['paris', 'Contrat d‘alternance', 'CDD'],
		titre: 'un titre',
		typeDeContrat: ['CDD'],
	};
};

export const aRésultatRechercherMultipleAlternance = (): Array<Alternance> => {
	return [anAlternanceMatcha(), anAlternanceMatchaBoucher(), anAlternanceMatchaBoulanger(), anAlternancePEJobs()];
};
