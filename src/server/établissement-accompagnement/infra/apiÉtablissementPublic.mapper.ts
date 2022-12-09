import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import {
  RésultatRechercheÉtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.response';

const JOURS_DE_LA_SEMAINE_NOM = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const JOURS_DE_LA_SEMAINE_INDEX: { [key: string]: number } = Object.assign({}, ...JOURS_DE_LA_SEMAINE_NOM.map((jour, index) => {
  return {
    [jour]: index,
  };
}));

export function mapÉtablissementAccompagnement(résultatRechercheÉtablissementPublic: RésultatRechercheÉtablissementPublicResponse): ÉtablissementAccompagnement[] {
  return résultatRechercheÉtablissementPublic.features.map((feature) => ({
    adresse: mapAdresse(feature.properties.adresses),
    email: feature.properties.email,
    horaires: feature.properties.horaires && mapHoraire(feature.properties.horaires),
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

function fillHoraireListJoursFermé(result: ÉtablissementAccompagnement.Horaire[]): void {
  for (let jourIndex = 0; jourIndex < JOURS_DE_LA_SEMAINE_NOM.length - 1; jourIndex++) {
    const jour = JOURS_DE_LA_SEMAINE_NOM[jourIndex];
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
}

function mapHoraire(horaireList: RésultatRechercheÉtablissementPublicResponse.Feature.Properties.Horaire[]): ÉtablissementAccompagnement.Horaire[] {
  const result: ÉtablissementAccompagnement.Horaire[] = [];

  horaireList.sort((horaireA, horaireB) => JOURS_DE_LA_SEMAINE_INDEX[horaireA.du] - JOURS_DE_LA_SEMAINE_INDEX[horaireB.du]);

  horaireList.forEach((horaire) => {
    const heures = mapHeure(horaire.heures);
    for (let jourIndex = JOURS_DE_LA_SEMAINE_INDEX[horaire.du];
      jourIndex < JOURS_DE_LA_SEMAINE_NOM.length - 1 && jourIndex <= JOURS_DE_LA_SEMAINE_INDEX[horaire.au];
      jourIndex++) {
      const jour = JOURS_DE_LA_SEMAINE_NOM[jourIndex];
      result.push({
        heures: heures,
        jour: jour,
      });
    }
  });

  fillHoraireListJoursFermé(result);

  return result;
}

function mapHeure(heureList: RésultatRechercheÉtablissementPublicResponse.Feature.Properties.Horaire.Heure[]): ÉtablissementAccompagnement.Horaire.Heure[] {
  return heureList.map((heure) => ({
    début: heure.de,
    fin: heure.a,
  }));
}
