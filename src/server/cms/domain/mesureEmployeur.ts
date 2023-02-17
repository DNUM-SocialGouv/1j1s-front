import { Image } from '~/server/cms/domain/image';

import { Article } from './article';

export interface MesureEmployeur {
  titre: string
  contenu: string
  bannière?: Image
  url?: string
  article?: Article
  pourQui : string
  link: string
  extraitContenu: string
}

