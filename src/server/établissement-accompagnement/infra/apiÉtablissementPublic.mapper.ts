import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {
  RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';

const JOURS_DE_LA_SEMAINE: {index: { [key: string]: number }; nom: string[]} = {
  index: {
    Dimanche: 6,
    Jeudi: 3,
    Lundi: 0,
    Mardi: 1,
    Mercredi: 2,
    Samedi: 5,
    Vendredi: 4,
  },
  nom: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
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

  horaireList.sort((horaireA, horaireB) => JOURS_DE_LA_SEMAINE.index[horaireA.du] - JOURS_DE_LA_SEMAINE.index[horaireB.du]);

  horaireList.forEach((horaire) => {
    for (let jourIndex = JOURS_DE_LA_SEMAINE.index[horaire.du];
      jourIndex < 6 && jourIndex <= JOURS_DE_LA_SEMAINE.index[horaire.au];
      jourIndex++) {
      const jour = JOURS_DE_LA_SEMAINE.nom[jourIndex];
      result.push({
        heures: mapHeure(horaire.heures),
        jour: jour,
      });
    }
  });
  for (let jourIndex = 0; jourIndex < 6; jourIndex++) {
    const jour = JOURS_DE_LA_SEMAINE.nom[jourIndex];
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
    début: heure.de,
    fin: heure.a,
  }));
}
