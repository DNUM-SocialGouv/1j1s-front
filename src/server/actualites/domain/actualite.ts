import { Article } from '~/server/articles/domain/article';
import { Image } from '~/server/cms/domain/image';

export interface Actualité {
	article?: Article
	bannière?: Image
	extraitContenu: string
	contenu: string
	link: string
	titre: string
}
