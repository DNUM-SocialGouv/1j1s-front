import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {
  RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';

const JOURS_DE_LA_SEMAINE: { [key: number]: string } = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const JOURS_DE_LA_SEMAINE_INDEX: { [key: string]: number } = {
  Dimanche: 6,
  Jeudi: 3,
  Lundi: 0,
  Mardi: 1,
  Mercredi: 2,
  Samedi: 5,
  Vendredi: 4,
};

export function mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublic: RésultatRechercheÉtablissementPublicResponse): ÉtablissementAccompagnement[] {
  return résultatRechercheÉtablissementPublic.features.map((feature) => ({
    adresse: mapAdresse(feature.properties.adresses),
    email: feature.properties.email,
    horaires: mapHoraire(feature.properties.horaires),
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

function mapHoraire(horaireList: RésultatRechercheÉtablissementPublicResponse.Feature.Properties.Horaire[]): ÉtablissementAccompagnement.Horaire[] {
  const result: ÉtablissementAccompagnement.Horaire[] = [];
  horaireList.forEach((horaire) => {
    for (let jourIndex = JOURS_DE_LA_SEMAINE_INDEX[horaire.du];
      jourIndex < 6 && jourIndex <= JOURS_DE_LA_SEMAINE_INDEX[horaire.au];
      jourIndex++) {
      const jour = JOURS_DE_LA_SEMAINE[jourIndex];
      result.push({
        heures: mapHeure(horaire.heures),
        jour: jour,
      });
    }
  });
  for (let jourIndex = 0; jourIndex < 6; jourIndex++) {
    const jour = JOURS_DE_LA_SEMAINE[jourIndex];
    if (!result[jourIndex]) {
      result.push({
        heures: [],
        jour: jour,
      });
      continue;
    }
    if (result[jourIndex].jour !== jour) {
      result.splice(jourIndex, 0, {
        heures: [],
        jour: jour,
      });
    }
  }
  return result;
}

function mapHeure(heureList: RésultatRechercheÉtablissementPublicResponse.Feature.Properties.Horaire.Heure[]): ÉtablissementAccompagnement.Horaire.Heure[] {
  return heureList.map((heure) => ({
    heureDébut: heure.de,
    heureFin: heure.a,
  }));
}
