import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { Alternance } from '~/server/alternances/domain/alternance';

const LOGO_ALTERNANCE = '/images/logos/la-bonne-alternance.svg';

export function mapAlternanceToLienSolution(alternance: Alternance): LienSolution {
  return alternance.from === 'peJob' ? mapAlternanceToLienSolutionForPoleEmploi(alternance) : mapAlternanceToLienSolutionForMatcha(alternance);
}

function mapAlternanceToLienSolutionForPoleEmploi(alternance: Alternance): LienSolution {
  return {
    descriptionOffre: alternance.description,
    id: alternance.id,
    intituléOffre: alternance.intitulé,
    lienOffre: `/emplois/${alternance.id}`,
    logoEntreprise: alternance.entreprise?.logo || LOGO_ALTERNANCE,
    nomEntreprise: alternance.entreprise?.nom,
    étiquetteOffreList: alternance.étiquetteList,
  };
}

function mapAlternanceToLienSolutionForMatcha(alternance: Alternance): LienSolution {
  return {
    descriptionOffre: alternance.description,
    id: alternance.id,
    intituléOffre: alternance.intitulé,
    lienOffre: `/apprentissage/${alternance.from}-${alternance.id}`,
    logoEntreprise: alternance.entreprise?.logo || LOGO_ALTERNANCE,
    nomEntreprise: alternance.entreprise?.nom,
    étiquetteOffreList: alternance.étiquetteList,
  };
}
