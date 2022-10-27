import { Article } from '~/server/cms/domain/article';
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
  article: Article | null
  concerné : string
  link: string
  extraitContenu: string
}
