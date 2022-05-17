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
import { LocalisationService } from '~/client/services/localisation.service';
import { OffreEmploiService } from '~/client/services/offreEmploi/offreEmploi.service';
import { transformFormToEntries } from '~/client/utils/form.util';
import { LocalisationList } from '~/server/localisations/domain/localisation';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export function RechercherOffreEmploi() {
  const router = useRouter();
  const { queryParams, hasQueryParams, isKeyInQueryParams, getQueryValue, getQueryString } = useQueryParams();
  const { isSmallScreen } = useBreakpoint();

  const  offreEmploiService  = useDependency('offreEmploiService') as OffreEmploiService;
  const localisationService = useDependency('localisationService') as LocalisationService;

  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);

  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [localisationList, setLocalisationList] = useState<LocalisationList>({ communeList: [], départementList: [], régionList: [] });
  const [nombreRésultats, setNombreRésultats] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [isFiltresAvancésDesktopOpen, setIsFiltresAvancésDesktopOpen] = useState(false);
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

  const [inputTypeDeContrat, setInputTypeDeContrat] = useState('');
  const [inputMotCle, setInputMotCle] = useState<string>('');
  const [inputLocalisation, setInputLocalisation] = useState<string>('');
  const [filtres, setFiltres] = useState<string[]>([]);

  const OFFRE_PER_PAGE = 30;
  const [page, setPage] = useState(1);
  const pageCount = Math.round(nombreRésultats / OFFRE_PER_PAGE);

  useEffect(() => {
    if (hasQueryParams) {
      const fetchOffreEmploi = async () => {
        const response = await offreEmploiService.rechercherOffreEmploi(getQueryString());
        setOffreEmploiList(response.résultats);
        setNombreRésultats(response.nombreRésultats);
        setIsLoading(false);
      };

      const setInputValuesTagList = async () => {
        setPage(isKeyInQueryParams(QueryParams.PAGE) ? Number(getQueryValue(QueryParams.PAGE)) : 1);

        const urlSearchParams = new URLSearchParams(getQueryString());
        const urlSearchParamsObject = Object.fromEntries(urlSearchParams);
        const filtreList: string[] = [];

        if(isKeyInQueryParams(QueryParams.MOT_CLÉ)) {
          const motCle = getQueryValue(QueryParams.MOT_CLÉ);
          setInputMotCle(motCle);
          filtreList.push(motCle);
        }

        if(isKeyInQueryParams(QueryParams.TYPE_LOCALISATION) && isKeyInQueryParams(QueryParams.CODE_INSEE)) {
          const localisation = await localisationService.récupérerLocalisationAvecCodeInsee(getQueryValue(QueryParams.TYPE_LOCALISATION), getQueryValue(QueryParams.CODE_INSEE));
          const formattedLocalisation = `${localisation.libelle} (${localisation.code})`;
          setInputLocalisation(formattedLocalisation);
          filtreList.push(formattedLocalisation);
        }

        if(isKeyInQueryParams(QueryParams.TYPE_DE_CONTRATS)) {
          setInputTypeDeContrat(getQueryValue(QueryParams.TYPE_DE_CONTRATS));
          const typeDeContrats: string = urlSearchParamsObject[QueryParams.TYPE_DE_CONTRATS];
          const typeDeContratList = typeDeContrats.split(',');
          typeDeContratList.map((contrat: string) => {
            switch (contrat) {
              case (OffreEmploi.CONTRAT_INTÉRIMAIRE.valeur):
                filtreList.push(OffreEmploi.CONTRAT_INTÉRIMAIRE.libelléCourt!);
                break;
              case(OffreEmploi.CONTRAT_SAISONNIER.valeur):
                filtreList.push(OffreEmploi.CONTRAT_SAISONNIER.libelléCourt!);
                break;
              case(OffreEmploi.CONTRAT_CDI.valeur):
                filtreList.push(OffreEmploi.CONTRAT_CDI.libelléCourt!);
                break;
              case(OffreEmploi.CONTRAT_CDD.valeur):
                filtreList.push(OffreEmploi.CONTRAT_CDD.libelléCourt!);
                break;
              default:
                filtreList.push(contrat);
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
    return router.push({ query: query ? `${query}&${QUERY_FIRST_PAGE}` : `${QUERY_FIRST_PAGE}` });
  }

  async function rechercherLocalisation(recherche: string) {
    setInputLocalisation(recherche);
    const résultats = await localisationService.rechercheLocalisation(recherche);
    setLocalisationList(résultats ?? { communeList: [], départementList: [], régionList: [] });
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
          value={inputMotCle}
          name="motCle"
          autoFocus
          placeholder="Exemple : boulanger, informatique..."
          onChange={(event: ChangeEvent<HTMLInputElement>) => setInputMotCle(event.currentTarget.value)}
        />
        <input type="hidden" name="typeDeContrats" value={inputTypeDeContrat}/>

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
                  data-testid="FiltreTypeDeContratsItem"
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
                    checked={inputTypeDeContrat.includes(typeDeContrat.valeur)}
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
          <h2>{nombreRésultats} offres d&apos;emplois pour {getQueryValue(QueryParams.MOT_CLÉ) ? `pour ${getQueryValue(QueryParams.MOT_CLÉ)}` : ''}</h2>
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
        nombreRésultats > OFFRE_PER_PAGE &&
          <div className={styles.pagination}>
            <Pagination onClick={changePage} currentPage={page} pageCount={pageCount}/>
          </div>

      }
    </main>
  );
}
