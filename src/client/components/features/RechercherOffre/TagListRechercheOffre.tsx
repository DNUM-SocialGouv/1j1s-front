import React, {
  useEffect,
  useState,
} from 'react';

import { TagList } from '~/client/components/ui/TagList/TagList';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface TagListRechercheOffreProps {
  localisation: string
}

export function TagListRechercheOffre(props: TagListRechercheOffreProps) {
  const { localisation } = props;
  const [filtres, setFiltres] = useState<string[]>([]);
  const { isKeyInQueryParams, getQueryValue, hasQueryParams, queryParams } = useQueryParams();

  useEffect(() => {
    if (hasQueryParams) {
      const filtreList: string[] = [];

      if (isKeyInQueryParams(QueryParams.TEMPS_DE_TRAVAIL)) {
        const valeurTempsDeTravail = getQueryValue(QueryParams.TEMPS_DE_TRAVAIL);
        const tempsDeTravail = OffreEmploi.TEMPS_DE_TRAVAIL_LIST.find((temps) => temps.valeur !== 'indifférent' && temps.valeur === valeurTempsDeTravail);
        if (tempsDeTravail) filtreList.push(tempsDeTravail.libellé);
      }

      if (isKeyInQueryParams(QueryParams.TYPE_DE_CONTRATS)) {
        const typeDeContrats: string = getQueryValue(QueryParams.TYPE_DE_CONTRATS);
        const typeDeContratList = typeDeContrats.split(',');
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

      if (isKeyInQueryParams(QueryParams.EXPÉRIENCE)) {
        const typeExpérience: string = getQueryValue(QueryParams.EXPÉRIENCE);
        const typeExpérienceList = typeExpérience.split(',');
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

      if (isKeyInQueryParams(QueryParams.TYPE_LOCALISATION) && isKeyInQueryParams(QueryParams.CODE_LOCALISATION)) {
        filtreList.push(localisation);
      }
      setFiltres(filtreList);
    }
  }, [queryParams, localisation]);

  return (
    <>
      { filtres.length > 0 &&
       <TagList list={filtres} />
      }
    </>

  );
}
