import { Article } from './article';
import { Image } from './image';

export interface Actualité {
	article?: Article
	bannière?: Image
	extraitContenu: string
	contenu: string
	link: string
	titre: string
}
