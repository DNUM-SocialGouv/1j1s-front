import { Article } from './article';
import { Image } from './image';

export interface CarteActualite {
	article: Article | undefined
	bannière: Image | undefined
	extraitContenu: string
	contenu: string
	link: string
	titre: string
}
