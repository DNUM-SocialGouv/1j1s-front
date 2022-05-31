import '~/client/utils/string/string.util';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalTitle,
  Radio,
  RadioGroup,
  TextInput,
  Title,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { FiltresOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/FiltresOffreEmploi';
import styles from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi.module.css';
import {
  RésultatRechercherOffreEmploi,
} from '~/client/components/features/OffreEmploi/Rechercher/Résultat/RésultatRechercherOffreEmploi';
import { AutoCompletionForLocalisation } from '~/client/components/ui/AutoCompletion/AutoCompletionForLocalisation';
import { IncorrectRequestErrorMessage } from '~/client/components/ui/ErrorMessage/IncorrectRequestErrorMessage';
import { NoResultErrorMessage } from '~/client/components/ui/ErrorMessage/NoResultErrorMessage';
import { UnavailableServiceErrorMessage } from '~/client/components/ui/ErrorMessage/UnavailableServiceErrorMessage';
import { UnexpectedErrorMessage } from '~/client/components/ui/ErrorMessage/UnexpectedErrorMessage';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { PaginationComponent as Pagination } from '~/client/components/ui/Pagination/PaginationComponent';
import { SelectMultiple } from '~/client/components/ui/Select/SelectMultiple/SelectMultiple';
import { SelectSingle } from '~/client/components/ui/Select/SelectSingle/SelectSingle';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { LocalisationService } from '~/client/services/localisation.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { transformFormToEntries } from '~/client/utils/form.util';
import {
  générerTitreFiltre,
  mapExpérienceAttendueToOffreEmploiCheckboxFiltre,
  mapRéférentielDomaineToOffreEmploiCheckboxFiltre,
  mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { ErrorType } from '~/server/errors/error.types';
import { LocalisationList } from '~/server/localisations/domain/localisation';
import {
  OffreEmploi,
  référentielDomaineList,
} from '~/server/offresEmploi/domain/offreEmploi';


export function RechercherOffreEmploi() {
  const domaineList = référentielDomaineList;
  const router = useRouter();
  const { queryParams, hasQueryParams, isKeyInQueryParams, getQueryValue, getQueryString } = useQueryParams();
  const { isSmallScreen } = useBreakpoint();

  const offreEmploiService = useDependency<OffreEmploiService>('offreEmploiService');
  const localisationService = useDependency<LocalisationService>('localisationService');

  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [localisationList, setLocalisationList] = useState<LocalisationList>({
    communeList: [],
    départementList: [],
    régionList: [],
  });
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

  const [inputTypeDeContrat, setInputTypeDeContrat] = useState('');
  const [inputExpérience, setInputExpérience] = useState('');
  const [inputTempsDeTravail, setInputTempsDeTravail] = useState('');
  const [inputDomaine, setInputDomaine] = useState('');
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputLocalisation, setInputLocalisation] = useState<string>('');
  const [formattedLocalisation, setFormattedLocalisation] = useState<string>('');

  const OFFRE_PER_PAGE = 30;

  useEffect(() => {
    if (!isSmallScreen) setIsFiltresAvancésMobileOpen(false);
    if (hasQueryParams) {
      const fetchOffreEmploi = async () => {
        const response = await offreEmploiService.rechercherOffreEmploi(getQueryString());
        if (response.instance === 'success') {
          setOffreEmploiList(response.result.résultats);
          setNombreRésultats(response.result.nombreRésultats);
        } else {
          setErrorType(response.errorType);
        }
        setIsLoading(false);
      };

      const setInputValues = async () => {
        if (isKeyInQueryParams(QueryParams.MOT_CLÉ)) setInputMotCle(getQueryValue(QueryParams.MOT_CLÉ));
        if (isKeyInQueryParams(QueryParams.DOMAINE)) setInputDomaine(getQueryValue(QueryParams.DOMAINE));
        if (isKeyInQueryParams(QueryParams.TEMPS_DE_TRAVAIL)) setInputTempsDeTravail(getQueryValue(QueryParams.TEMPS_DE_TRAVAIL));
        if (isKeyInQueryParams(QueryParams.TYPE_DE_CONTRATS)) setInputTypeDeContrat(getQueryValue(QueryParams.TYPE_DE_CONTRATS));
        if (isKeyInQueryParams(QueryParams.EXPÉRIENCE)) setInputExpérience(getQueryValue(QueryParams.EXPÉRIENCE));
        if (isKeyInQueryParams(QueryParams.TYPE_LOCALISATION) && isKeyInQueryParams(QueryParams.CODE_INSEE)) {
          const localisation = await localisationService.récupérerLocalisationAvecCodeInsee(getQueryValue(QueryParams.TYPE_LOCALISATION), getQueryValue(QueryParams.CODE_INSEE));
          const formattedLocalisation = `${localisation.libelle} (${localisation.code})`;
          setFormattedLocalisation(formattedLocalisation);
          setInputLocalisation(formattedLocalisation);
        }
      };

      (async () => {
        await fetchOffreEmploi();
        await setInputValues();
      })();
    }
  }, [queryParams, isSmallScreen]);

  function applyFiltresAvancés() {
    setIsFiltresAvancésMobileOpen(false);
    rechercheOffreEmploiForm.current?.dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true }),
    );
  }

  function toggleTypeDeContrat(value: string) {
    setInputTypeDeContrat(inputTypeDeContrat.appendOrRemoveSubStr(value));
  }

  function toggleExpérience(value: string) {
    setInputExpérience(inputExpérience.appendOrRemoveSubStr(value));
  }

  function toggleDomaine(value: string) {
    setInputDomaine(inputDomaine.appendOrRemoveSubStr(value));
  }

  async function rechercherOffreEmploi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formEntries = transformFormToEntries(event.currentTarget);
    const query = new URLSearchParams(formEntries).toString();
    const QUERY_FIRST_PAGE = 'page=1';
    return router.push({ query: query ? `${query}&${QUERY_FIRST_PAGE}` : `${QUERY_FIRST_PAGE}` });
  }

  async function rechercherLocalisation(recherche: string) {
    setInputLocalisation(recherche);
    const résultats = await localisationService.rechercheLocalisation(recherche);
    setLocalisationList(résultats ?? { communeList: [], départementList: [], régionList: [] });
  }

  const hasNoResult = hasQueryParams && !isLoading && offreEmploiList.length === 0;
  const hasError = !!errorType && hasNoResult;

  return (
    <main id="contenu" className={styles.container}>
      <Hero>
        <Title as="h1" look="h3">
          Des milliers d’offres d’emplois sélectionnées pour vous par Pôle Emploi
        </Title>
      </Hero>
      <div className={styles.layout}>
        <form
          ref={rechercheOffreEmploiForm}
          className={styles.rechercheOffreEmploiForm}
          onSubmit={rechercherOffreEmploi}
          role="search"
        >
          <div className={styles.inputButtonWrapper}>
            <TextInput
              label="Métier, mot-clé..."
              data-testid="InputRechercheMotClé"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value={inputMotCle}
              name="motCle"
              autoFocus
              placeholder="Exemple : boulanger, informatique..."
              onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
            />
            <input type="hidden" name="typeDeContrats" value={inputTypeDeContrat}/>
            <input type="hidden" name="tempsDeTravail" value={inputTempsDeTravail}/>
            <input type="hidden" name="experienceExigence" value={inputExpérience}/>
            <input type="hidden" name="grandDomaine" value={inputDomaine}/>

            <AutoCompletionForLocalisation
              régionList={localisationList.régionList}
              communeList={localisationList.communeList}
              départementList={localisationList.départementList}
              inputName="localisations"
              inputLocalisation={inputLocalisation}
              onChange={rechercherLocalisation}
              onUpdateInputLocalisation={() => setInputLocalisation('')}
            />

            <Button
              className={styles.buttonRechercher}
              submit={true}
              icon="ri-search-line"
              iconPosition="right"
              data-testid="ButtonRechercher"
            >
              Rechercher
            </Button>

            { isSmallScreen &&
            <Button
              styleAsLink
              className={`${styles.buttonFiltrerRecherche} fr-text--sm`}
              icon="ri-filter-fill"
              iconPosition="left"
              onClick={() => setIsFiltresAvancésMobileOpen(true)}
              data-testid="ButtonFiltrerRecherche"
            >
              Filtrer ma recherche
            </Button>
            }

            <Modal
              isOpen={isFiltresAvancésMobileOpen}
              hide={() => setIsFiltresAvancésMobileOpen(false)}
              data-testid="FiltreRechercheMobile"
            >
              <ModalClose hide={() => setIsFiltresAvancésMobileOpen(false)} title="Fermer les filtres"/>
              <ModalTitle className={styles.filtresAvancésModalTitle} icon="ri-menu-2-line">Filtrer ma recherche</ModalTitle>
              <ModalContent className={styles.filtresAvancésModalContenu}>
                <CheckboxGroup legend="Type de Contrat" data-testid="FiltreTypeDeContrats">
                  {OffreEmploi.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                    <Checkbox
                      key={index}
                      label={typeDeContrat.libelléLong}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                      value={typeDeContrat.valeur}
                      checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
                    />
                  ))}
                </CheckboxGroup>
                <RadioGroup legend="Temps de travail" data-testid="FiltreTempsDeTravail">
                  {OffreEmploi.TEMPS_DE_TRAVAIL_LIST.map((tempsDeTravail, index) => (
                    <Radio
                      key={index}
                      label={tempsDeTravail.libellé}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      checked={inputTempsDeTravail === `${tempsDeTravail.valeur}`}
                      onChange={() => setInputTempsDeTravail(`${tempsDeTravail.valeur}`)}
                      value={`${tempsDeTravail.valeur}`}
                    />
                  ))}
                </RadioGroup>
                <CheckboxGroup legend="Niveau demandé">
                  {OffreEmploi.EXPÉRIENCE.map((expérience, index) => (
                    <Checkbox
                      key={index}
                      label={expérience.libellé}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onChange={(e: ChangeEvent<HTMLInputElement>) => toggleExpérience(e.target.value)}
                      value={expérience.valeur}
                      checked={inputExpérience.includes(expérience.valeur)}
                    />
                  ))}
                </CheckboxGroup>

                <CheckboxGroup legend="Domaine">
                  {domaineList.map((domaine, index) => (
                    <Checkbox
                      key={index}
                      label={domaine.libelle}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                      value={domaine.code}
                      checked={inputDomaine.split(',').includes(domaine.code)}
                    />
                  ))}
                </CheckboxGroup>
              </ModalContent>
              <ModalFooter className={styles.filtresAvancésModalFooter}>
                <Button
                  onClick={applyFiltresAvancés}
                  icon="ri-arrow-right-s-line"
                  iconPosition="right"
                  data-testid="ButtonAppliquerFiltres"
                >
                  Appliquer les filtres
                </Button>
              </ModalFooter>
            </Modal>
          </div>

          { !isSmallScreen && (
            <div className={styles.filtreRechercheDesktop} data-testid="FiltreRechercheDesktop">
              <SelectMultiple
                titre={générerTitreFiltre('Type de contrat', inputTypeDeContrat)}
                optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
                onChange={toggleTypeDeContrat}
                currentInput={inputTypeDeContrat}
              />

              <SelectSingle
                titre={générerTitreFiltre('Temps de travail', inputTempsDeTravail)}
                optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
                onChange={(value) => setInputTempsDeTravail(value)}
                currentInput={inputTempsDeTravail}
              />

              <SelectMultiple
                titre={générerTitreFiltre('Niveau demandé', inputExpérience)}
                optionList={mapExpérienceAttendueToOffreEmploiCheckboxFiltre(OffreEmploi.EXPÉRIENCE)}
                onChange={toggleExpérience}
                currentInput={inputExpérience}
              />

              <SelectMultiple
                titre={générerTitreFiltre('Domaine', inputDomaine)}
                optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(domaineList)}
                onChange={toggleDomaine}
                currentInput={inputDomaine}
              />

            </div>
          )}
        </form>

        { nombreRésultats !== 0 &&
          <div className={styles.nombreRésultats} data-testid="RechercheOffreEmploiNombreRésultats">
            <FiltresOffreEmploi localisation={formattedLocalisation}/>
            <h2>{nombreRésultats} offres
              d&apos;emplois {getQueryValue(QueryParams.MOT_CLÉ) ? `pour ${getQueryValue(QueryParams.MOT_CLÉ)}` : ''}</h2>
          </div>
        }


        { isLoading && <p>Recherche des offres en attente de loader</p>}
        { hasNoResult && !hasError && <NoResultErrorMessage className={styles.errorMessage}/>}
        { hasNoResult && errorType === ErrorType.ERREUR_INATTENDUE && <UnexpectedErrorMessage className={styles.errorMessage}/>}
        { hasNoResult && errorType === ErrorType.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage className={styles.errorMessage}/>}
        { hasNoResult && errorType === ErrorType.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage className={styles.errorMessage}/>}


        { offreEmploiList.length > 0 && !isLoading &&
          <ul className={styles.résultatRechercheOffreEmploiList}>
            {offreEmploiList.map((offreEmploi: OffreEmploi) => {
              return (
                <li key={offreEmploi.id}>
                  <RésultatRechercherOffreEmploi offreEmploi={offreEmploi}/>
                </li>
              );
            })}
          </ul>
        }

        { nombreRésultats > OFFRE_PER_PAGE &&
          <div className={styles.pagination}>
            <Pagination nombreRésultats={nombreRésultats} itemPerPage={OFFRE_PER_PAGE}/>
          </div>
        }
      </div>
    </main>
  );
}

