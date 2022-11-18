import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { RésultatRechercheÉtablissementPublicResponse } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';

export function mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublic: RésultatRechercheÉtablissementPublicResponse): ÉtablissementAccompagnement[] {
  return résultatRechercheÉtablissementPublic.features.map((feature) => ({
    adresse: mapAdresse(feature.properties.adresses),
    email: feature.properties.email,
    id: feature.properties.id,
    nom: feature.properties.nom,
    telephone: feature.properties.telephone,
  }));
}

function mapAdresse(adresseList: RésultatRechercheÉtablissementPublicResponse.Feature.Properties.Adresse[]): string | undefined {
  const adresse = adresseList.find((adresse) => adresse.type === 'Adresse');
  if (!adresse) {
    return undefined;
  } else {
    return `${adresse.lignes.join(', ')}, ${adresse.codePostal} ${adresse.commune}`;
  }
}
