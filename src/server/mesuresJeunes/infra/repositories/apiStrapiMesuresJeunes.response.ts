import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export type MesuresJeunesContentType = Strapi.SingleType<MesuresJeunesAttributes>

export interface MesuresJeunesAttributes extends Strapi.PublicationContentTypeAttributes {
    vieProfessionnelle: CarteMesuresJeunesResponse[]
    orienterFormer: CarteMesuresJeunesResponse[]
    accompagnement: CarteMesuresJeunesResponse[]
    aidesFinancieres: CarteMesuresJeunesResponse[]
}

export interface CarteMesuresJeunesResponse {
    titre: string
    contenu: string
    url: string
    banniere: Strapi.Image
}

