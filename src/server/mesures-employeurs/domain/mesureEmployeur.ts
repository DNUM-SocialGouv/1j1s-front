import { Image } from '~/server/cms/domain/image';

export interface MesureEmployeur {
  titre: string
  banniere?: Image
  pourQui: string
  link?: string
}

