import { Actualite } from '~/server/actualites/domain/actualite';
import { anArticle } from '~/server/articles/domain/article.fixture';
import { anImage } from '~/server/cms/domain/image.fixture';

export function anActualite(override?: Partial<Actualite>) {
	return {
		article: anArticle(),
		bannière: anImage(),
		contenu: 'Contenu',
		extraitContenu: 'Contenu',
		link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Titre',
		...override,
	};
}

export function anActualiteList() {
	return [
		anActualite(),
		anActualite({
			article: anArticle(),
			bannière: anImage(),
			contenu: 'Contenu 2',
			extraitContenu: 'Contenu 2',
			link: '/articles/aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
			titre: 'Titre 2',
		})];
}
