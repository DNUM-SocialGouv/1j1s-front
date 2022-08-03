import { Strapi } from '~/server/mesuresJeunes/infra/repositories/apiStrapiMesuresJeunes.response';

export interface MesuresJeunes {
  vieProfessionnelle: CarteMesuresJeunes[]
  accompagnement: CarteMesuresJeunes[]
  aidesFinancieres: CarteMesuresJeunes[]
  orienterFormer: CarteMesuresJeunes[]
}

export interface CarteMesuresJeunes {
  titre: string
  contenu: string
  bannière: Strapi.ImageAttributes
  url: string
}
