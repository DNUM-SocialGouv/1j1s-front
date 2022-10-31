import React, { useEffect, useState } from 'react';

import { TagList } from '~/client/components/ui/Tag/TagList';
import { useOffreQuery } from '~/client/hooks/useOffreQuery';
import { Offre } from '~/server/offres/domain/offre';

export function ÉtiquettesFiltreOffreEmploi() {
  const [filtres, setFiltres] = useState<string[]>([]);
  const offreEmploiQuery = useOffreQuery();

  useEffect(() => {
    const filtreList: string[] = [];

    if (offreEmploiQuery.tempsDeTravail) {
      const tempsDeTravail = Offre.TEMPS_DE_TRAVAIL_LIST.find((temps) => temps.valeur !== 'indifférent' && temps.valeur === offreEmploiQuery.tempsDeTravail);
      if (tempsDeTravail) {
        filtreList.push(tempsDeTravail.libellé);
      }
    }

    if (offreEmploiQuery.typeDeContrats) {
      const typeDeContratList = offreEmploiQuery.typeDeContrats.split(',');
      typeDeContratList.map((contrat: string) => {
        switch (contrat) {
          case (Offre.CONTRAT_INTÉRIMAIRE.valeur):
            filtreList.push(Offre.CONTRAT_INTÉRIMAIRE.libelléCourt);
            break;
          case (Offre.CONTRAT_SAISONNIER.valeur):
            filtreList.push(Offre.CONTRAT_SAISONNIER.libelléCourt);
            break;
          case (Offre.CONTRAT_CDI.valeur):
            filtreList.push(Offre.CONTRAT_CDI.libelléCourt);
            break;
          case (Offre.CONTRAT_CDD.valeur):
            filtreList.push(Offre.CONTRAT_CDD.libelléCourt);
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
          case (Offre.EXPÉRIENCE_DEBUTANT.valeur):
            filtreList.push(Offre.EXPÉRIENCE_DEBUTANT.libellé);
            break;
          case(Offre.EXPÉRIENCE_EXIGÉE.valeur):
            filtreList.push(Offre.EXPÉRIENCE_EXIGÉE.libellé);
            break;
          case(Offre.EXPÉRIENCE_SOUHAITÉ.valeur):
            filtreList.push(Offre.EXPÉRIENCE_SOUHAITÉ.libellé);
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
