import { CarteActualite } from './actualite';
import { anArticle } from './article.fixture';

export const aCarteActualiteFixture = (override?: Partial<CarteActualite>) => ({
	article: anArticle(),
	bannière: {
		alt: 'text',
		url: 'https://animage.jpg',
	},
	contenu: 'Contenu',
	extraitContenu: 'Contenu',
	link: '/articles/slug-titre',
	titre: 'Titre',
	...override,
});

export const aCartesActualitesListFixture = () => (
	[
		aCarteActualiteFixture({ titre: 'Actualité 1' }),
		aCarteActualiteFixture({ titre: 'Actualité 2' }),
		aCarteActualiteFixture({ titre: 'Actualité 3' }),
		aCarteActualiteFixture({ titre: 'Actualité 4' }),
		aCarteActualiteFixture({ titre: 'Actualité 5' }),
		aCarteActualiteFixture({ titre: 'Actualité 6' }),
		aCarteActualiteFixture({ titre: 'Actualité 7' }),
	]
);

