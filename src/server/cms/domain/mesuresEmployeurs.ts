import { Image } from '~/server/cms/domain/image';

import { Article } from './article';

export interface MesuresEmployeurs {
  dispositifs: CarteMesuresEmployeurs[]
}

export interface CarteMesuresEmployeurs {
  titre: string
  contenu: string
  bannière: Image | undefined
  url?: string
  article?: Article
  pourQui : string
}

