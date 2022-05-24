import '~/client/utils/string/string.util';

import {
  Button,
  ButtonGroup,
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
import { SelectCheckbox } from '~/client/components/ui/Select/SelectCheckbox/SelectCheckbox';
import { SelectComponent as Select } from '~/client/components/ui/Select/SelectComponent';
import { SelectRadio } from '~/client/components/ui/Select/SelectRadio/SelectRadio';
import { TagList } from '~/client/components/ui/TagList/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { LocalisationService } from '~/client/services/localisation.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { transformFormToEntries } from '~/client/utils/form.util';
import { ErrorType } from '~/server/errors/error.types';
import {
  mapExpérienceAttenduToOffreEmploiCheckboxFiltre,
  mapRéférentielDomaineToOffreEmploiCheckboxFiltre,
  mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { LocalisationList } from '~/server/localisations/domain/localisation';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import { RéférentielDomaine } from '~/server/offresEmploi/domain/référentiel';


export function RechercherOffreEmploi() {
  const router = useRouter();
  const { queryParams, hasQueryParams, isKeyInQueryParams, getQueryValue, getQueryString } = useQueryParams();
  const { isSmallScreen } = useBreakpoint();

  const offreEmploiService = useDependency('offreEmploiService') as OffreEmploiService;
  const localisationService = useDependency('localisationService') as LocalisationService;

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

  const [isFiltresAvancésDesktopOpen, setIsFiltresAvancésDesktopOpen] = useState(false);
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

  const [inputTypeDeContrat, setInputTypeDeContrat] = useState('');
  const [inputExpérience, setInputExpérience] = useState('');
  const [inputTempsDeTravail, setInputTempsDeTravail] = useState('');
  const [inputDomaine, setInputDomaine] = useState('');
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputLocalisation, setInputLocalisation] = useState<string>('');
  const [filtres, setFiltres] = useState<string[]>([]);

  const [référentielDomaineList, setRéférentielDomaineList] = useState<RéférentielDomaine[] | []>([]);
  const OFFRE_PER_PAGE = 30;

  useEffect(() => {
    const fetchRéférentielDomaineList = (async () => {
      return offreEmploiService.récupérerRéférentielDomaine();
    });
    fetchRéférentielDomaineList().then((response) => {
      setRéférentielDomaineList(response);
    });
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

      const setInputValuesTagList = async () => {
        const filtreList: string[] = [];

        if (isKeyInQueryParams(QueryParams.MOT_CLÉ)) {
          const motCle = getQueryValue(QueryParams.MOT_CLÉ);
          setInputMotCle(motCle);
          filtreList.push(motCle);
        }

        if (isKeyInQueryParams(QueryParams.TEMPS_PLEIN)) {
          const isTempsPlein = getQueryValue(QueryParams.TEMPS_PLEIN);
          setInputTempsDeTravail(isTempsPlein);
          filtreList.push(OffreEmploi.TEMPS_DE_TRAVAIL_LIST.find((temps) => temps.valeur!.toString() === isTempsPlein)!.libellé);
        }

        if (isKeyInQueryParams(QueryParams.TYPE_LOCALISATION) && isKeyInQueryParams(QueryParams.CODE_INSEE)) {
          const localisation = await localisationService.récupérerLocalisationAvecCodeInsee(getQueryValue(QueryParams.TYPE_LOCALISATION), getQueryValue(QueryParams.CODE_INSEE));
          const formattedLocalisation = `${localisation.libelle} (${localisation.code})`;
          setInputLocalisation(formattedLocalisation);
          filtreList.push(formattedLocalisation);
        }

        if (isKeyInQueryParams(QueryParams.TYPE_DE_CONTRATS)) {
          const typeDeContrats: string = getQueryValue(QueryParams.TYPE_DE_CONTRATS);
          setInputTypeDeContrat(typeDeContrats);
          const typeDeContratList = typeDeContrats.split(',');
          typeDeContratList.map((contrat: string) => {
            switch (contrat) {
              case (OffreEmploi.CONTRAT_INTÉRIMAIRE.valeur):
                filtreList.push(OffreEmploi.CONTRAT_INTÉRIMAIRE.libelléCourt!);
                break;
              case(OffreEmploi.CONTRAT_SAISONNIER.valeur):
                filtreList.push(OffreEmploi.CONTRAT_SAISONNIER.libelléCourt!);
                break;
              case (OffreEmploi.CONTRAT_CDI.valeur):
                filtreList.push(OffreEmploi.CONTRAT_CDI.libelléCourt!);
                break;
              case (OffreEmploi.CONTRAT_CDD.valeur):
                filtreList.push(OffreEmploi.CONTRAT_CDD.libelléCourt!);
                break;
              default:
                filtreList.push(contrat);
            }
          });
        }

        if (isKeyInQueryParams(QueryParams.EXPÉRIENCE)) {
          const typeExpérience: string = getQueryValue(QueryParams.EXPÉRIENCE);
          setInputExpérience(typeExpérience);
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

        setFiltres(filtreList);
      };

      (async () => {
        await fetchOffreEmploi();
        await setInputValuesTagList();
      })();
    }
  }, [queryParams]);

  function toggleFiltresAvancés() {
    if (isSmallScreen) {
      setIsFiltresAvancésMobileOpen(true);
    } else {
      setIsFiltresAvancésDesktopOpen(!isFiltresAvancésDesktopOpen);
    }
  }

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
    <main id="contenu">
      <Hero>
        <Title as="h1" look="h3">
          Des milliers d’offres d’emplois sélectionnées pour vous par Pôle Emploi
        </Title>
      </Hero>
      <form
        ref={rechercheOffreEmploiForm}
        className={styles.rechercheOffreEmploi}
        onSubmit={rechercherOffreEmploi}
        role="search"
      >
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
        <input type="hidden" name="tempsPlein" value={inputTempsDeTravail}/>
        <input type="hidden" name="experienceExigence" value={inputExpérience}/>
        <input type="hidden" name="domaine" value={inputDomaine}/>

        <AutoCompletionForLocalisation
          régionList={localisationList.régionList}
          communeList={localisationList.communeList}
          départementList={localisationList.départementList}
          inputName="localisations"
          inputLocalisation={inputLocalisation}
          onChange={rechercherLocalisation}
          onUpdateInputLocalisation={() => setInputLocalisation('')}/>

        <ButtonGroup size="md">
          <Button
            submit={true}
            icon="ri-search-line"
            iconPosition="right"
            data-testid="ButtonRechercher"
          >
            Rechercher
          </Button>
        </ButtonGroup>

        <Button
          styleAsLink
          className={`${styles.buttonFiltrerRecherche} fr-text--sm`}
          icon="ri-filter-fill"
          iconPosition="left"
          onClick={toggleFiltresAvancés}
          data-testid="ButtonFiltrerRecherche"
        >
          Filtrer ma recherche
        </Button>
        <Modal
          isOpen={isFiltresAvancésMobileOpen}
          hide={() => setIsFiltresAvancésMobileOpen(false)}
          data-testid="FiltreRechercheMobile"
        >
          <ModalClose hide={() => setIsFiltresAvancésMobileOpen(false)} title="Fermer les filtres"/>
          <ModalTitle icon="ri-menu-2-line">Filtrer ma recherche</ModalTitle>
          <ModalContent>
            <CheckboxGroup legend="Type de contrat" data-testid="FiltreTypeDeContrats">
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
            {référentielDomaineList &&
            <CheckboxGroup legend="Domaine">
              {référentielDomaineList.map((domaine, index) => (
                <Checkbox
                  key={index}
                  label={domaine.libelle}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onChange={(e: ChangeEvent<HTMLInputElement>) => toggleDomaine(e.target.value)}
                  value={domaine.code}
                  checked={inputDomaine.includes(domaine.code)}
                />
              ))}
            </CheckboxGroup>
            }
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
        {
          isFiltresAvancésDesktopOpen && (
            <div className={styles.filtreRechercheDesktop} data-testid="FiltreRechercheDesktop">
              <Select titre="Type de contrat">
                <SelectCheckbox
                  optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
                  onChange={toggleTypeDeContrat}
                  currentInput={inputTypeDeContrat}
                />
              </Select>

              <Select titre="Temps de travail">
                <SelectRadio
                  optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
                  onChange={(value) => setInputTempsDeTravail(value)}
                  currentInput={inputTempsDeTravail}
                />
              </Select>

              <Select titre="Niveau demandé">
                <SelectCheckbox
                  optionList={mapExpérienceAttenduToOffreEmploiCheckboxFiltre(OffreEmploi.EXPÉRIENCE)}
                  onChange={toggleExpérience}
                  currentInput={inputExpérience}
                />
              </Select>

              <Select titre="Domaine">
                <SelectCheckbox
                  optionList={mapRéférentielDomaineToOffreEmploiCheckboxFiltre(référentielDomaineList)}
                  onChange={toggleDomaine}
                  currentInput={inputDomaine}
                />
              </Select>

            </div>
          )}
      </form>

      {
        nombreRésultats !== 0 &&
        <div className={styles.nombreRésultats} data-testid="RechercheOffreEmploiNombreRésultats">
          {filtres.length > 0 &&
          <TagList list={filtres}/>
          }
          <h2>{nombreRésultats} offres
            d&apos;emplois {getQueryValue(QueryParams.MOT_CLÉ) ? `pour ${getQueryValue(QueryParams.MOT_CLÉ)}` : ''}</h2>
        </div>
      }

      {isLoading && <p>Recherche des offres</p>}
      {hasNoResult && !hasError && <NoResultErrorMessage className={styles.errorMessage}/>}
      {hasNoResult && errorType === ErrorType.ERREUR_INATTENDUE && <UnexpectedErrorMessage className={styles.errorMessage}/>}
      {hasNoResult && errorType === ErrorType.SERVICE_INDISPONIBLE && <UnavailableServiceErrorMessage className={styles.errorMessage}/>}
      {hasNoResult && errorType === ErrorType.DEMANDE_INCORRECTE && <IncorrectRequestErrorMessage className={styles.errorMessage}/>}
      {
        offreEmploiList.length > 0 && !isLoading &&
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
      {
        nombreRésultats > OFFRE_PER_PAGE &&
        <div className={styles.pagination}>
          <Pagination nombreRésultats={nombreRésultats} itemPerPage={OFFRE_PER_PAGE}/>
        </div>
      }
    </main>
  );
}

