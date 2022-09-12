import { Image } from '~/server/cms/domain/image';

export interface MesuresEmployeurs {
  dispositifs: CarteMesuresEmployeurs[]
}

export interface CarteMesuresEmployeurs {
  titre: string
  contenu: string
  bannière: Image | undefined
  url?: string
}

