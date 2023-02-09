import { Alternance } from './alternance';

export const uneAlternance = (): Alternance => {
	return {
		localisation : 'paris',
		niveauRequis : 'débutant',
		nomEntreprise : 'une entreprise',
		titre: 'un titre',
		typeDeContrat : 'apprentissage',
	};
};

export const aRésultatRechercheAlternance = (): Array<Alternance> => {
	return [ uneAlternance()];
};
