// TODO (BRUJ 30/01/2024): rajouter les tests sur le mapper

import { aStrapiArticle, aStrapiImage, aStrapiSingleRelation } from '~/server/cms/infra/repositories/strapi.fixture';
import {
	aStrapiMesureJeune,
	aStrapiMesuresJeunesParCategorie,
} from '~/server/services-jeunes/infra/strapiMesuresJeunes.fixture';
import { mapToServicesJeunes } from '~/server/services-jeunes/infra/strapiServicesJeunes.mapper';

describe('mapToServicesJeunes', () => {
	it('renvoie la liste des services jeunes', () => {
		// GIVEN
		const strapiMesuresJeunesParCategorie = aStrapiMesuresJeunesParCategorie({
			accompagnement: [aStrapiMesureJeune({
				article: aStrapiSingleRelation(aStrapiArticle()),
				banniere: aStrapiSingleRelation(aStrapiImage()),
				contenu: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
				pourQui: 'pour les 12 à 18mois',
				titre: 'Une formation en centre EPIDE',
				url: 'Une belle url de carte',
			})],
			aidesFinancieres: [aStrapiMesureJeune({
				titre: 'Des aides pour financer son permis de conduire',
			})],
			orienterFormer: [aStrapiMesureJeune({
				titre: 'Les Junior Entreprises',
			})],
			vieProfessionnelle: [aStrapiMesureJeune({
				titre: 'Le Parcours Emploi Compétences (PEC) Jeunes',
			})],

		});

		// WHEN
		const result = mapToServicesJeunes(strapiMesuresJeunesParCategorie);

		// THEN
		expect(result).toStrictEqual();
	});
});
