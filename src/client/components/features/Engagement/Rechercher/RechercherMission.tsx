import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';

import {
  FormulaireRechercheMissionEngagement,
} from '~/client/components/features/Engagement/FormulaireRecherche/FormulaireRechercheMissionEngagement';
import styles from '~/client/components/features/RechercherOffre.module.css';
import {
  RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { useMissionEngagementQuery } from '~/client/hooks/useMissionEngagementQuery';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { hasQueryParams } from '~/client/utils/queryParams.utils';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { bénévolatDomaineList, Mission, serviceCiviqueDomaineList } from '~/server/engagement/domain/engagement';
import { ErrorType } from '~/server/errors/error.types';

interface RechercherMissionProps {
  category: 'bénévolat' | 'service-civique'
}

export function RechercherMission(props: RechercherMissionProps) {
  const { category } = props;
  const missionEngagementService = useDependency<MissionEngagementService>('missionEngagementService');
  const { domain } = useMissionEngagementQuery();
  const router = useRouter();
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const isServiceCivique = useMemo(() => {
    return category === 'service-civique';
  }, [category]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | undefined>(undefined);
  const [title, setTitle] = useState<string>(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution'`);

  const hasNoResult = hasQueryParams(router.query) && !isLoading && missionList.length === 0;

  const OFFRE_PER_PAGE = 30;

  const defaultLogo = useMemo(() => {
    return isServiceCivique ? '/images/logos/service-civique.svg' : '/images/logos/je-veux-aider.svg';
  }, [isServiceCivique]);

  useEffect(() => {
    const queryString = stringify(router.query);
    if (queryString) {
      setIsLoading(true);
      missionEngagementService
        .rechercherMission(queryString, category)
        .then((response) => {
          if (response.instance === 'success') {
            setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de  ${isServiceCivique ? 'service civique' : 'bénévolat'} ${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
            setMissionList(response.result.résultats);
            setNombreRésultats(response.result.nombreRésultats);
          } else {
            setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'}`, response.errorType));
            setErrorType(response.errorType);
          }
          setIsLoading(false);
        });
    }
  }, [router.query, missionEngagementService, category, isServiceCivique]);

  const messageRésultatRecherche = useMemo(() => {
    if (domain) {
      return `${nombreRésultats} de missions pour ${récupérerLibelléDepuisValeur(isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList, domain)}`;
    } else {
      return `${nombreRésultats} de missions`;
    }
  }, [domain, isServiceCivique, nombreRésultats]);

  return (
    <>
      <HeadTag
        title={title || `Rechercher une mission de ${isServiceCivique ? 'service civique' : 'bénévolat'} | 1jeune1solution`}
        description="Se rendre utile tout en préparant son avenir grâce aux missions de service civique"
      />
      <main id="contenu" className={styles.container}>
        <Hero image="/images/banners/mission-service-civique.webp">
          <b>Se rendre utile</b> tout en <b>préparant</b><br/>
          <b>son avenir</b> grâce aux missions de<br/>
          <b>{isServiceCivique ? 'Service Civique' : 'Bénévolat'}</b>
        </Hero>
        <div className={styles.layout}>
          <FormulaireRechercheMissionEngagement domainList={isServiceCivique ? serviceCiviqueDomaineList : bénévolatDomaineList}/>
          {isLoading && <p>Recherche des missions en attente de loader</p>}
          {
            !isLoading && nombreRésultats !== 0 &&
            <div className={styles.nombreRésultats}>
              <h2>{messageRésultatRecherche}</h2>
            </div>
          }
          {hasNoResult && <ErrorComponent errorType={errorType}/>}

          {missionList.length > 0 && !isLoading &&
            <ul className={styles.résultatRechercheOffreList} data-testid={'RésultatRechercherOffreList'}>
              {missionList.map((mission: Mission) => (
                <li key={mission.id}>
                  <RésultatRechercherSolution
                    lienOffre={`/${category}/${mission.id}`}
                    intituléOffre={mission.titre}
                    logoEntreprise={defaultLogo}
                    nomEntreprise={mission.nomEntreprise}
                    descriptionOffre={mission.description}
                    étiquetteOffreList={mission.étiquetteList}
                  />
                </li>
              ))}
            </ul>
          }

          {nombreRésultats > OFFRE_PER_PAGE &&
            <div className={styles.pagination}>
              <Pagination itemListLength={nombreRésultats} itemPerPage={OFFRE_PER_PAGE}/>
            </div>
          }
        </div>
      </main>
    </>
  );
}
