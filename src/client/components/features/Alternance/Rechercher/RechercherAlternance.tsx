import { Button } from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/RechercherAlternance.module.css';
import { CIDJPartner } from '~/client/components/features/Partner/CIDJPartner';
import { LaBonneAlternancePartner } from '~/client/components/features/Partner/LaBonneAlternancePartner';
import { SimulationAlternancePartner } from '~/client/components/features/Partner/SimulationAlternancePartner';
import commonStyles from '~/client/components/features/RechercherOffre.module.css';
import { TagListRechercheOffre } from '~/client/components/features/RechercherOffre/TagListRechercheOffre';
import { RésultatRechercherOffre } from '~/client/components/features/RésultatRechercherOffre/RésultatRechercherOffre';
import { AutoCompletionForLocalisation } from '~/client/components/ui/AutoCompletion/AutoCompletionForLocalisation';
import { AutoCompletionForMétierRecherché } from '~/client/components/ui/AutoCompletion/AutoCompletionForMétierRecherché';
import { ErrorComponent } from '~/client/components/ui/ErrorMessage/ErrorComponent';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { AlternanceService } from '~/client/services/alternances/alternance.service';
import { LocalisationService } from '~/client/services/localisation.service';
import { getFormValue, transformFormToEntries } from '~/client/utils/form.util';
import { getRechercherOffreHeadTagTitre } from '~/client/utils/rechercherOffreHeadTagTitre.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { Alternance, radiusList } from '~/server/alternances/domain/alternance';
import { ErrorType } from '~/server/errors/error.types';
import { Localisation } from '~/server/localisations/domain/localisation';

export function RechercherAlternance() {
  const localisationService = useDependency<LocalisationService>('localisationService');
  const alternanceService  = useDependency<AlternanceService>('alternanceService');
  const router = useRouter();
  const { hasQueryParams, isKeyInQueryParams, getQueryValue, queryParams } = useQueryParams();
  const [alternanceList, setAlternanceList] = useState<Alternance[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | undefined>(undefined);
  const [inputIntituleMétier, setInputIntituleMétier] = useState<string>('');
  const [inputIntituleMétierObligatoireErrorMessage, setInputIntituleMétierObligatoireErrorMessage] = useState<boolean>(false);
  const [inputLocalisation, setInputLocalisation] = useState<string>('');
  const [formattedLocalisation, setFormattedLocalisation] = useState<string>('');
  const [communeList, setCommuneList] = useState<Localisation[]>([]);
  const defaultLogo = '/images/logos/la-bonne-alternance.svg';
  const [radius, setRadius] = useState('');
  const [title, setTitle] = useState<string>('Rechercher une alternance | 1jeune1solution');

  useEffect(() => {
    if(hasQueryParams) {
      const fetchOffreAlternance = async () => {
        const localisationParam = isKeyInQueryParams(QueryParams.CODE_LOCALISATION) ? `&codeLocalisation=${getQueryValue(QueryParams.CODE_LOCALISATION)}` : '';
        const radiusParam = isKeyInQueryParams(QueryParams.RADIUS) ? `&radius=${getQueryValue(QueryParams.RADIUS)}` : '';
        const params = `codeRomes=${getQueryValue(QueryParams.CODE_ROMES)}${localisationParam}${radiusParam}`;
        const response = await alternanceService.rechercherAlternance(params);
        if (response.instance === 'success') {
          setTitle(getRechercherOffreHeadTagTitre(`Rechercher une alternance ${response.result.nombreRésultats === 0 ? ' - Aucun résultat' : ''}`));
          setAlternanceList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setTitle(getRechercherOffreHeadTagTitre('Rechercher une alternance', response.errorType));
          setErrorType(response.errorType);
        }
        setIsLoading(false);
      };

      const setInputValues = async () => {
        if (isKeyInQueryParams(QueryParams.MÉTIER_SÉLECTIONNÉ)) setInputIntituleMétier(getQueryValue(QueryParams.MÉTIER_SÉLECTIONNÉ));
        if (isKeyInQueryParams(QueryParams.TYPE_LOCALISATION) && isKeyInQueryParams(QueryParams.CODE_LOCALISATION)) {
          const localisation = await localisationService.récupérerLocalisationAvecCodeInsee(getQueryValue(QueryParams.TYPE_LOCALISATION), getQueryValue(QueryParams.CODE_LOCALISATION));
          const formattedLocalisation = `${localisation.nom} (${localisation.code})`;
          setInputLocalisation(formattedLocalisation);
          setFormattedLocalisation(formattedLocalisation);
        }
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

  async function rechercherLocalisation(recherche: string) {
    setInputLocalisation(recherche);
    const résultats = await localisationService.rechercherLocalisation(recherche);
    setCommuneList(résultats && résultats.communeList ? résultats.communeList : []);
  }
  
  const hasNoResult = hasQueryParams && !isLoading && alternanceList.length === 0;

  return (
    <>
      <HeadTag
        title={title}
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main id="contenu" className={commonStyles.container}>
        <Hero image="/images/banners/offre-alternance.webp">
          Avec la <b>Bonne Alternance</b>, trouvez <br/>
          l’entreprise qu’il vous faut pour <br/>
          <b>réaliser votre projet d’alternance</b>
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
              <AutoCompletionForLocalisation
                communeList={communeList}
                inputName="localisations"
                inputLocalisation={inputLocalisation}
                onChange={rechercherLocalisation}
                onUpdateInputLocalisation={() => setInputLocalisation('')}
              />
              <SelectSingle
                label="Rayon"
                titre={récupérerLibelléDepuisValeur(radiusList, radius) || 'Indifférent'}
                optionList={radiusList}
                onChange={(value) => setRadius(value === 'Indifférent' ? '' : value)}
                currentInput={radius}
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
            <input type="hidden" name="radius" value={radius}/>

          </form>

          {isLoading && <p>Recherche des offres en attente de loader</p>}
          {!isLoading && <TagListRechercheOffre localisation={formattedLocalisation}/>}
          {nombreRésultats !== 0 &&

            <div className={commonStyles.nombreRésultats} data-testid="RechercheAlternanceNombreRésultats">
              <h2>{nombreRésultats} contrats d&apos;alternances pour {inputIntituleMétier}</h2>
            </div>
          }
          {hasNoResult && <ErrorComponent errorType={errorType}/>}


          {alternanceList.length > 0 && !isLoading &&
            <ul className={commonStyles.résultatRechercheOffreList}>
              {alternanceList.map((alternance: Alternance) => (
                <li key={alternance.id}>
                  <RésultatRechercherOffre
                    lienOffre={`/apprentissage/${alternance.from}-${alternance.id}`}
                    intituléOffre={alternance.intitulé}
                    logoEntreprise={alternance.entreprise?.logo || defaultLogo}
                    nomEntreprise={alternance.entreprise?.nom}
                    descriptionOffre={alternance.description}
                    étiquetteOffreList={alternance.étiquetteList}
                  />
                </li>
              ))}
            </ul>
          }
          <ul className={commonStyles.partnerList}>
            <li>
              <SimulationAlternancePartner titleAs="h2"/>
            </li>
            <li>
              <LaBonneAlternancePartner titleAs="h2"/>
            </li>
            <li>
              <CIDJPartner titleAs="h2"/>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
