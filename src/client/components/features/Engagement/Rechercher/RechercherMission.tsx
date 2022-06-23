import {
  Button,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import styles from '~/client/components/features/RechercherOffre/RechercherOffre.module.css';
import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { Pagination } from '~/client/components/ui/Pagination/Pagination';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MissionEngagementService } from '~/client/services/missionEngagement/missionEngagement.service';
import { transformFormToEntries } from '~/client/utils/form.util';
import {
  générerTitreFiltre,
} from '~/client/utils/offreEmploi.mapper';
import {
  getQueryString,
  getQueryValue,
  hasQueryParams,
  isKeyInQueryParams,
} from '~/client/utils/queryParams.utils';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import {
  domaineList,
  Mission,
} from '~/server/engagement/domain/engagement';
import { ErrorType } from '~/server/errors/error.types';

interface RechercherMissionProps {
  category: string
}

const enum QueryParams {
  DOMAIN = 'domain'
}

export function RechercherMission(props: RechercherMissionProps) {
  const { category } = props;
  const missionEngagementService =useDependency<MissionEngagementService>('missionEngagementService');
  const router = useRouter();
  const queryParams = router.query;
  const [missionList, setMissionList] = useState<Mission[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | undefined>(undefined);
  const [title, setTitle] = useState<string>(`Rechercher une mission de ${category === 'service-civique' ? 'service civique' : 'bénévolat'} | 1jeune1solution'`);

  const hasNoResult = hasQueryParams(queryParams) && !isLoading && missionList.length === 0;

  const [inputDomaine, setInputDomaine] = useState('');

  const OFFRE_PER_PAGE = 30;
  const defaultLogo = category === 'service-civique' ? '/images/logos/service-civique.svg' : '/images/logos/service-civique.svg';

  useEffect(() => {
    if(hasQueryParams(queryParams)) {
      const fetchMission = async () => {
        const response = await missionEngagementService.rechercherMission(getQueryString(queryParams), category);
        if (response.instance === 'success') {
          setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de  ${category === 'service-civique' ? 'service civique' : 'bénévolat'} ${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setMissionList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setTitle(getRechercherOffreHeadTagTitre(`Rechercher une mission de ${category === 'service-civique' ? 'service civique' : 'bénévolat'}`, response.errorType));
          setErrorType(response.errorType);
        }
        setIsLoading(false);
      };

      const setInputValues = async () => {
        if (isKeyInQueryParams(queryParams, QueryParams.DOMAIN)) setInputDomaine(getQueryValue(queryParams, QueryParams.DOMAIN));
      };
      (async () => {
        await fetchMission();
        await setInputValues();
      })();
    }
  }, [queryParams]);
  
  async function rechercherMission(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formEntries = transformFormToEntries(event.currentTarget);
    formEntries.push(['page', '1']);
    const query = new URLSearchParams(formEntries).toString();
    return router.push({ query });
  }

  return (
    <>
      <HeadTag
        title={title || `Rechercher une mission de ${category === 'service-civique' ? 'service civique' : 'bénévolat'} | 1jeune1solution`}
        description='Se rendre utile tout en préparant son avenir grâce aux missions de service civique'
      />
      <main id="contenu" className={commonStyles.container}>
        <Hero image="/images/banners/mission-service-civique.webp">
          <b>Se rendre utile</b> tout en <b>préparant</b><br />
          <b>son avenir</b> grâce aux missions de<br/>
          <b>{ category === 'service-civique' ? 'Service Civique' : 'Bénévolat'}</b>
        </Hero>
        <div className={commonStyles.layout}>
          <form
            className={commonStyles.rechercheOffreForm}
            onSubmit={rechercherMission}
            role="search"
          >
            <div className={commonStyles.inputButtonWrapper}>
              <SelectSingle
                titre={générerTitreFiltre('Domaine', inputDomaine)}
                optionList={domaineList}
                onChange={(value) => setInputDomaine(value)}
                currentInput={inputDomaine}
              />
              <input type="hidden" name="domain" value={inputDomaine}/>
              <Button
                submit={true}
                className={commonStyles.buttonRechercher}
                icon="ri-search-line"
                iconPosition="right"
              >
                Rechercher
              </Button>
            </div>
          </form>

          { isLoading && <p>Recherche des missions en attente de loader</p>}
          {
            !isLoading && nombreRésultats !== 0 &&
            <div className={commonStyles.nombreRésultats} >
              <h2>{nombreRésultats} de missions pour { récupérerLibelléDepuisValeur(domaineList, inputDomaine)}</h2>
            </div>
          }
          { hasNoResult && <ErrorComponent errorType={errorType} /> }

          {missionList.length > 0 && !isLoading &&
          <ul className={commonStyles.résultatRechercheOffreList} data-testid={'RésultatRechercherOffreList'}>
            {missionList.map((mission: Mission) => (
              <li key={mission.id}>
                <RésultatRechercherOffre
                  lienOffre={''}
                  intituléOffre={mission.titre}
                  logoEntreprise={mission.logo || defaultLogo}
                  nomEntreprise={mission.nomEntreprise}
                  descriptionOffre={mission.description}
                  étiquetteOffreList={mission.étiquetteList}
                />
              </li>
            ))}

          </ul>}

          {nombreRésultats > OFFRE_PER_PAGE &&
          <div className={styles.pagination}>
            <Pagination itemListLength={nombreRésultats} itemPerPage={OFFRE_PER_PAGE} />
          </div>
          }
        </div>
      </main>


    </>
  );

}
