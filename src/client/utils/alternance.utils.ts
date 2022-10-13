import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Alternance } from '~/server/alternances/domain/alternance';

const LOGO_ALTERNANCE = '/images/logos/la-bonne-alternance.svg';

export function mapAlternanceToLienSolution(alternance: Alternance): LienSolution {
  return {
    descriptionOffre: alternance.description,
    id: alternance.id,
    intituléOffre: alternance.intitulé,
    lienOffre: `/apprentissage/${alternance.from}-${alternance.id}`,
    logoEntreprise: alternance.entreprise?.logo || LOGO_ALTERNANCE,
    nomEntreprise: alternance.entreprise?.nom,
    étiquetteOffreList: alternance.étiquetteList,
  };
};

export function constructUrlWidgetPourPostulerOffreMatcha(id: string): string {
  const { NEXT_PUBLIC_URL_WIDGET_POSTULER_OFFRE_MATCHA } = process.env;
  return `${NEXT_PUBLIC_URL_WIDGET_POSTULER_OFFRE_MATCHA}?caller=1jeune1solution&type=matcha&itemId=${id}`;
}
