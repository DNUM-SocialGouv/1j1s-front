import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react';

import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { LaBonneBoitePartner } from '~/client/components/features/Partner/LaBonneBoitePartner';
import { ServiceCiviquePartner } from '~/client/components/features/Partner/ServiceCiviquePartner';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import styles from '~/client/components/features/RechercherOffre/RechercherOffre.module.css';
import { TagListRechercheOffre } from '~/client/components/features/RechercherOffre/TagListRechercheOffre';
import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useOffreEmploiQuery } from '~/client/hooks/useOffreEmploiQuery';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { ErrorType } from '~/server/errors/error.types';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

const PREFIX_TITRE_PAGE = 'Rechercher un emploi';
const OFFRE_PER_PAGE = 30;
const LOGO_OFFRE_EMPLOI = '/images/logos/pole-emploi.svg';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const offreEmploiQuery = useOffreEmploiQuery();
  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');

  const [title, setTitle] = useState<string>(`${PREFIX_TITRE_PAGE} | 1jeune1solution`);
  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | undefined>(undefined);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      offreEmploiService.rechercherOffreEmploi(queryString)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(getRechercherOffreHeadTagTitre(`${PREFIX_TITRE_PAGE}${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
            setOffreEmploiList(response.result.résultats);
            setNombreRésultats(response.result.nombreRésultats);
          } else {
            setTitle(getRechercherOffreHeadTagTitre(PREFIX_TITRE_PAGE, response.errorType));
            setErrorType(response.errorType);
          }
          setIsLoading(false);
        });
    }
  }, [router.query, offreEmploiService]);

  return (
    <>
      <HeadTag
        title={title}
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <div className={commonStyles.layout}>
        {
          // TODO: add loading as attribute
          Object.keys(router.query).length > 0 &&
            <>
              <TagListRechercheOffre/>
              <div className={commonStyles.nombreRésultats} data-testid="RechercheOffreEmploiNombreRésultats">
                <h2>
                  {`${nombreRésultats} offres d'emplois`}{offreEmploiQuery.motCle && <>{` pour ${offreEmploiQuery.motCle}`}</>}
                </h2>
              </div>
              {offreEmploiList.length > 0 ?
                <>
                  <ul className={commonStyles.résultatRechercheOffreList}>
                    {offreEmploiList.map((offreEmploi: OffreEmploi) => (
                      <li key={offreEmploi.id}>
                        <RésultatRechercherOffre
                          lienOffre={`/emplois/${offreEmploi.id}`}
                          intituléOffre={offreEmploi.intitulé}
                          logoEntreprise={offreEmploi.entreprise.logo || LOGO_OFFRE_EMPLOI}
                          nomEntreprise={offreEmploi.entreprise?.nom}
                          descriptionOffre={offreEmploi.description}
                          étiquetteOffreList={offreEmploi.étiquetteList}
                        />
                      </li>
                    ))}
                  </ul>
                  {nombreRésultats > OFFRE_PER_PAGE &&
                    <div className={styles.pagination}>
                      <Pagination itemListLength={nombreRésultats} itemPerPage={OFFRE_PER_PAGE}/>
                    </div>
                  }
                </> :
                <ErrorComponent errorType={errorType}/>
              }
            </>
        }

        <ul className={styles.partnerList}>
          <li>
            <CIDJPartner titleAs="h2"/>
          </li>
          <li>
            <LaBonneBoitePartner titleAs="h2"/>
          </li>
          <li>
            <ServiceCiviquePartner titleAs="h2"/>
          </li>
        </ul>
      </div>
    </>
  );
}
