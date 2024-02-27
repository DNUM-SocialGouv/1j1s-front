import { Article } from '~/server/articles/domain/article';
import { Image } from '~/server/cms/domain/image';

export interface MesureEmployeur {
  titre: string
  contenu: string
  banniere?: Image
  url?: string
  article?: Article
  pourQui: string
  link: string
  extraitContenu: string
}

