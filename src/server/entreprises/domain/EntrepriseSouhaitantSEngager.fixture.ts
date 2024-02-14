import {
	EntrepriseSouhaitantSEngager,
	SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM,
} from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';

export function anEntrepriseSouhaitantSEngager(overrides?: Partial<EntrepriseSouhaitantSEngager>): EntrepriseSouhaitantSEngager {
	return {
		codePostal: '75015',
		email: 'machin.chose@bidule.com',
		nom: 'Chose',
		nomSociété: 'Bidule co.',
		prénom: 'Machin',
		secteur: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER_SERVICES,
		siret: '12345678901114',
		taille: 'medium',
		travail: 'Chef',
		téléphone: '+33123456789',
		ville: 'Paris (15e arrondissement)',
		...overrides,
	};
}
