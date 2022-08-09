import { Image } from '~/server/cms/domain/image';

export interface MesuresJeunes {
  vieProfessionnelle: CarteMesuresJeunes[]
  accompagnement: CarteMesuresJeunes[]
  aidesFinancières: CarteMesuresJeunes[]
  orienterFormer: CarteMesuresJeunes[]
}

export interface CarteMesuresJeunes {
  titre: string
  contenu: string
  bannière: Image | undefined
  url: string
}
