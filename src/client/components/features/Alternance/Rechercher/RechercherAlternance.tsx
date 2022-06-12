import { Button, Title } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/RechercherAlternance.module.css';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';
import { AutoCompletionForMétierRecherché } from '~/client/components/ui/AutoCompletion/AutoCompletionForMétierRecherché';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { getFormValue, transformFormToEntries } from '~/client/utils/form.util';
import { Alternance } from '~/server/alternances/domain/alternance';

export function RechercherAlternance() {
  const alternanceService  = useDependency<AlternanceService>('alternanceService');
  const router = useRouter();
  const { hasQueryParams, isKeyInQueryParams, getQueryValue, queryParams } = useQueryParams();
  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [inputIntituleMétier, setInputIntituleMétier] = useState<string>('');
  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);
  const defaultLogo = '/images/logos/la-bonne-alternance.svg';

  useEffect(() => {
    if(hasQueryParams) {
      const fetchOffreAlternance = async () => {
        const response = await alternanceService.rechercherAlternance(`codeRomes=${getQueryValue(QueryParams.CODE_ROMES)}`);
        setNombreRésultats(response.nombreRésultats);
        setAlternanceList(response.résultats);
        setIsLoading(false);
      };

      const setInputValues = async () => {
        if (isKeyInQueryParams(QueryParams.MÉTIER_SÉLECTIONNÉ)) setInputIntituleMétier(getQueryValue(QueryParams.MÉTIER_SÉLECTIONNÉ));
      };

      (async () => {
        await fetchOffreAlternance();
        await setInputValues();
      })();
    }
  }, [queryParams]);

  async function rechercherAlternance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const codeRomeList = getFormValue(event.currentTarget, 'codeRomes');
    if(!codeRomeList?.length) {
      setInputIntituleMétierObligatoireErrorMessage(true);
    } else {
      setIsLoading(true);
      const query = new URLSearchParams(transformFormToEntries(event.currentTarget)).toString();
      return router.push( { query });
    }
  }

  function resetHandleErrorMessageActive() {
    setInputIntituleMétierObligatoireErrorMessage(false);
  }

  return (
    <>
      <HeadTag
        title={'Rechercher une alternance | 1jeune1solution'}
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu" className={commonStyles.container}>
        <Hero image="/images/banners/offres-alternance.jpg">
          <Title as="h1" look="h4">
            Avec la Bonne Alternance, trouvez l’entreprise qu’il vous faut pour réaliser votre projet d’alternance
          </Title>
        </Hero>
        <div className={commonStyles.layout}>
          <form
            className={commonStyles.rechercheOffreForm}
            onSubmit={rechercherAlternance}
            role="search"
          >
            <div className={commonStyles.inputButtonWrapper}>
              <AutoCompletionForMétierRecherché
                className={styles.rechercheAlternanceInput}
                inputName="metierSelectionne"
                inputIntituleMétier={inputIntituleMétier}
                handleErrorMessageActive={inputIntituleMétierObligatoireErrorMessage}
                resetHandleErrorMessageActive={resetHandleErrorMessageActive}
              />

              <Button
                submit={true}
                icon="ri-search-line"
                iconPosition="right"
                data-testid="ButtonRechercherAlternance"
                className={commonStyles.buttonRechercher}
              >
                Rechercher
              </Button>
            </div>
          </form>

          { isLoading && <p>Recherche des offres en attente de loader</p>}
          {
            !isLoading && nombreRésultats !== 0 &&
            <div className={commonStyles.nombreRésultats} data-testid="RechercheAlternanceNombreRésultats">
              <h2>{nombreRésultats} contrats d&apos;alternances pour {inputIntituleMétier}</h2>
            </div>
          }

          {alternanceList.length > 0 && !isLoading &&
          <ul className={commonStyles.résultatRechercheOffreList}>
            {alternanceList.map((alternance: Alternance) => (
              <li key={alternance.id}>
                <RésultatRechercherOffre
                  lienOffre={`/apprentissage/${alternance.from}-${alternance.id}`}
                  intituléOffre={alternance.intitulé}
                  logoEntreprise={alternance.entreprise.logo || defaultLogo}
                  nomEntreprise={alternance.entreprise?.nom}
                  descriptionOffre={alternance.description}
                  étiquetteOffreList={alternance.étiquetteList}
                />
              </li>
            ))}
          </ul>
          }
        </div>
      </main>
    </>
  );
}
