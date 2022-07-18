import React, {
  useEffect,
  useState,
} from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export function ÉtiquettesFiltreOffreEmploi() {
  const [filtres, setFiltres] = useState<string[]>([]);
  const offreEmploiQuery = useOffreEmploiQuery();

  useEffect(() => {
    const filtreList: string[] = [];

    if (offreEmploiQuery.tempsDeTravail) {
      const tempsDeTravail = OffreEmploi.TEMPS_DE_TRAVAIL_LIST.find((temps) => temps.valeur !== 'indifférent' && temps.valeur === offreEmploiQuery.tempsDeTravail);
      if (tempsDeTravail) {
        filtreList.push(tempsDeTravail.libellé);
      }
    }

    if (offreEmploiQuery.typeDeContrats) {
      const typeDeContratList = offreEmploiQuery.typeDeContrats.split(',');
      typeDeContratList.map((contrat: string) => {
        switch (contrat) {
          case (OffreEmploi.CONTRAT_INTÉRIMAIRE.valeur):
            filtreList.push(OffreEmploi.CONTRAT_INTÉRIMAIRE.libelléCourt);
            break;
          case (OffreEmploi.CONTRAT_SAISONNIER.valeur):
            filtreList.push(OffreEmploi.CONTRAT_SAISONNIER.libelléCourt);
            break;
          case (OffreEmploi.CONTRAT_CDI.valeur):
            filtreList.push(OffreEmploi.CONTRAT_CDI.libelléCourt);
            break;
          case (OffreEmploi.CONTRAT_CDD.valeur):
            filtreList.push(OffreEmploi.CONTRAT_CDD.libelléCourt);
            break;
          default:
            filtreList.push(contrat);
        }
      });
    }

    if (offreEmploiQuery.experienceExigence) {
      const typeExpérienceList = offreEmploiQuery.experienceExigence.split(',');
      typeExpérienceList.map((expérience: string) => {
        switch (expérience) {
          case (OffreEmploi.EXPÉRIENCE_DEBUTANT.valeur):
            filtreList.push(OffreEmploi.EXPÉRIENCE_DEBUTANT.libellé);
            break;
          case(OffreEmploi.EXPÉRIENCE_EXIGÉE.valeur):
            filtreList.push(OffreEmploi.EXPÉRIENCE_EXIGÉE.libellé);
            break;
          case(OffreEmploi.EXPÉRIENCE_SOUHAITÉ.valeur):
            filtreList.push(OffreEmploi.EXPÉRIENCE_SOUHAITÉ.libellé);
            break;
          default:
            filtreList.push(expérience);
        }
      });
    }

    if (offreEmploiQuery.libelleLocalisation) {
      filtreList.push(offreEmploiQuery.libelleLocalisation);
    }

    setFiltres(filtreList);
  }, [offreEmploiQuery]);

  if (!filtres.length) {
    return null;
  }

  return (
    <TagList list={filtres} aria-label="Filtres de la recherche" />
  );
}
