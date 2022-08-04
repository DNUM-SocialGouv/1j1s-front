import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

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
