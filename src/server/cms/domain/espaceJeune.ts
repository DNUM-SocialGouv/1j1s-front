import { Image } from '~/server/cms/domain/image';

export interface EspaceJeune {
  vieProfessionnelle: CarteEspaceJeune[]
  accompagnement: CarteEspaceJeune[]
  aidesFinancières: CarteEspaceJeune[]
  orienterFormer: CarteEspaceJeune[]
}

export interface CarteEspaceJeune {
  titre: string
  contenu: string
  bannière: Image | undefined
  url: string
  concerné : string
}
