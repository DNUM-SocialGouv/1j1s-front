import { aStrapiCollectionType } from '~/server/cms/infra/repositories/strapi.fixture';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

export function aStrapiFormationInitialeDetail(): Strapi.CollectionType<Strapi.CollectionType.FormationInitialeDetail>{
	return aStrapiCollectionType([{
		attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
		certification: 'Bac + 5',
		conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
		description: 'Je suis une description de formation initiale',
		duree: '1 an',
		identifiant: 'FOR.495',
		intitule: 'BM boulanger',
		niveauEtudesVise: '5',
		poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		updatedAt: '2023-05-15T09:37:44.283Z',
	}]);
}
