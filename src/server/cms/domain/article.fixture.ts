import { Article } from '~/server/cms/domain/article';
import { anImage } from '~/server/cms/domain/image.fixture';

export function anArticle(override?: Partial<Article>): Article {
	return {
		bannière: anImage(),
		contenu: 'Avec le Parcours Emploi Compétences (PEC), vous permettez à des personnes éloignées de l’emploi de s’insérer professionnellement et vous bénéficiez d’une aide de l’État.',
		slug: 'aide-a-l-embauche-d-un-jeune-en-parcours-emploi-competences-pec-jeunes-dans-le-secteur-non-marchand',
		titre: 'Aide à l’embauche d’un jeune en Parcours Emploi Compétences (PEC Jeunes) dans le secteur non marchand',
		...override,
	};
}
