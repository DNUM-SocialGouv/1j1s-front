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
  Pagination,
  TextInput,
  Title,
} from '@dataesr/react-dsfr';
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/features/OffreEmploi/Rechercher/RechercherOffreEmploi.module.css';
import { RésultatRechercherOffreEmploi } from '~/client/components/features/OffreEmploi/Rechercher/Résultat/RésultatRechercherOffreEmploi';
import { AutoCompletionForLocalisation } from '~/client/components/ui/AutoCompletion/AutoCompletionForLocalisation';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { TagList } from '~/client/components/ui/TagList/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import useQueryParams, { QueryParams } from '~/client/hooks/useQueryParams';
import { transformFormToEntries } from '~/client/utils/form.util';
import { LocalisationList } from '~/server/localisations/domain/localisation';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const { queryParams, hasQueryParams, isKeyInQueryParams, getQueryValue, getQueryString } = useQueryParams();
  const { isSmallScreen } = useBreakpoint();

  const offreEmploiService = useDependency('offreEmploiService');
  const localisationService = useDependency('localisationService');
  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [localisationList, setLocalisationList] = useState<LocalisationList>({ communeList: [], départementList: [], régionList: [] });
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [isFiltresAvancésDesktopOpen, setIsFiltresAvancésDesktopOpen] = useState(false);
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

  const [typeDeContratInput, setTypeDeContratInput] = useState('');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputLocalisation, setInputLocalisation] = useState<string>('');
  const [filtres, setFiltres] = useState<string[]>([]);

  const OFFRE_PER_PAGE = 30;
  const [page, setPage] = useState(1);
  const pageCount = Math.round(nombreRésultats / OFFRE_PER_PAGE);

  const mapQueryParamsToFiltreList = useCallback(() => {
    const filtreList: string[] = [];
    Object.keys(queryParams).map((key) => {
      if (key === QueryParams.PAGE) return;
      if (key === QueryParams.TYPE_LOCALISATION) return;
      if (key === QueryParams.CODE_INSEE) return;
      if (key === QueryParams.TYPE_DE_CONTRATS) {
        const typeDeContrats: string = getQueryValue(QueryParams.TYPE_DE_CONTRATS);
        const typeDeContratList = typeDeContrats.split(',');
        typeDeContratList.map((contrat: string) => {
          filtreList.push(contrat);
        });
      } else {
        filtreList.push(getQueryValue(key));
      }
    });
    setFiltres(filtreList);
  }, [queryParams]);

  useEffect(() => {
    if (hasQueryParams) {
      setParamètresUrl();
      mapQueryParamsToFiltreList();

      offreEmploiService.rechercherOffreEmploi(getQueryString())
        .then((res) => {
          setOffreEmploiList(res.résultats);
          setNombreRésultats(res.nombreRésultats);
          setIsLoading(false);
        });
    }
  }, [offreEmploiService, mapQueryParamsToFiltreList, queryParams, hasQueryParams]);

  function setParamètresUrl() {
    if (isKeyInQueryParams(QueryParams.MOT_CLÉ)) setInputValue(getQueryValue(QueryParams.MOT_CLÉ));
    if (isKeyInQueryParams(QueryParams.TYPE_DE_CONTRATS)) setTypeDeContratInput(getQueryValue(QueryParams.TYPE_DE_CONTRATS));
    if (isKeyInQueryParams(QueryParams.PAGE)) setPage(Number(getQueryValue(QueryParams.PAGE)));
    if (isKeyInQueryParams(QueryParams.CODE_INSEE) && isKeyInQueryParams(QueryParams.TYPE_LOCALISATION)) {
      getLocalisation();
    }
  }

  async function getLocalisation() {
    const localisation = await localisationService.récupérerLocalisationAvecCodeInsee(getQueryValue(QueryParams.TYPE_LOCALISATION), getQueryValue(QueryParams.CODE_INSEE));
    setInputLocalisation(`${localisation.libelle} (${localisation.code})`);
    if (!filtres.includes(localisation.libelle)) {
      setFiltres([...filtres, localisation.libelle]);
    }
  }

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
    setTypeDeContratInput(typeDeContratInput.appendOrRemoveSubStr(value));
  }

  async function changePage(page: number) {
    setPage(page);
    await router.push({ query: { ...router.query, page } });
  }

  async function rechercherOffreEmploi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formEntries = transformFormToEntries(event.currentTarget);
    const query = new URLSearchParams(formEntries).toString();
    const QUERY_FIRST_PAGE = 'page=1';
    return await router.push({ query: query ? `${query}&${QUERY_FIRST_PAGE}` : `${QUERY_FIRST_PAGE}` });
  }

  async function rechercherLocalisation(recherche: string) {
    const résultats = await localisationService.rechercheLocalisation(recherche);
    if(résultats) {
      setLocalisationList(résultats);
    } else {
      setLocalisationList({ communeList: [], départementList: [], régionList: [] });
    }
  }

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
          value={inputValue}
          name="motCle"
          autoFocus
          placeholder="exemple : boulanger, informatique..."
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
        />
        <input type="hidden" name="typeDeContrats" value={typeDeContratInput}/>

        <AutoCompletionForLocalisation
          régionList={localisationList.régionList}
          communeList={localisationList.communeList}
          départementList={localisationList.départementList}
          inputName="localisations"
          inputLocalisation={inputLocalisation}
          onChange={rechercherLocalisation}/>

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
                  checked={typeDeContratInput.includes(typeDeContrat.valeur)}
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

        {
          isFiltresAvancésDesktopOpen && (
            <div className={styles.filtreRechercheDesktop} data-testid="FiltreRechercheDesktop">
              <CheckboxGroup legend="Type de contrat">
                {OffreEmploi.TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                  <Checkbox
                    key={index}
                    label={typeDeContrat.libelléLong}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                    value={typeDeContrat.valeur}
                    checked={typeDeContratInput.includes(typeDeContrat.valeur)}
                  />
                ))}
              </CheckboxGroup>
            </div>
          )}
      </form>

      {
        nombreRésultats !== 0 &&
        <div className={styles.nombreRésultats} data-testid="RechercheOffreEmploiNombreRésultats">
          { filtres.length > 0 &&
          <TagList list={filtres} />
          }
          <strong>{nombreRésultats} offres d&apos;emplois</strong>
        </div>
      }

      {isLoading && <p>Recherche des offres</p>}
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
        nombreRésultats !== 0 &&
          <div className={styles.pagination}>
            <Pagination onClick={changePage} currentPage={page} pageCount={pageCount} surrendingPages={0}/>
          </div>

      }
    </main>
  );
}
