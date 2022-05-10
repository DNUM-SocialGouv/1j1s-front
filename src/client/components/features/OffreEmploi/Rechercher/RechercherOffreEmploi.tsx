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
import { Hero } from '~/client/components/ui/Hero/Hero';
import { TagList } from '~/client/components/ui/TagList/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { transformFormToEntries } from '~/client/utils/form.util';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

export function RechercherOffreEmploi() {
  const router = useRouter();

  const offreEmploiService = useDependency('offreEmploiService');
  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);
  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltresAvancésDesktopOpen, setIsFiltresAvancésDesktopOpen] = useState(false);
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);
  const [typeDeContratInput, setTypeDeContratInput] = useState('');
  const { isSmallScreen } = useBreakpoint();
  const [inputValue, setInputValue] = useState<string>('');
  const [filtres, setFiltres] = useState<string[]>([]);

  const [page, setPage] = useState(1);

  const QUERY_MOT_CLÉ = 'motCle';
  const QUERY_TYPE_DE_CONTRATS = 'typeDeContrats';
  const QUERY_PAGE = 'page';

  const mapFiltres = useCallback(() => {
    const filtreList: string[] = [];
    Object.keys(router.query).map((key) => {
      if (key === QUERY_PAGE) return;
      if (key === QUERY_TYPE_DE_CONTRATS) {
        const typeDeContrats: string = router.query[key]!.toString();
        const typeDeContratList = typeDeContrats.split(',');
        typeDeContratList.map((contrat: string) => {
          filtreList.push(contrat);
        });
      } else {
        filtreList.push(router.query[key]!.toString());
      }
    });
    setFiltres(filtreList);
  }, [router.query]);

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const queries = new URLSearchParams(Object.entries(router.query) as unknown as URLSearchParams);
      setParamètresUrl(queries);
      mapFiltres();

      offreEmploiService.rechercherOffreEmploi(queries.toString())
        .then((res) => {
          setOffreEmploiList(res.résultats);
          setNombreRésultats(res.nombreRésultats);
          setIsLoading(false);
        });
    }
  }, [offreEmploiService, router.query, mapFiltres]);

  function setParamètresUrl(queries: URLSearchParams) {
    if (queries.has(QUERY_MOT_CLÉ) && queries.get(QUERY_MOT_CLÉ) !== null) {
      setInputValue(queries.get(QUERY_MOT_CLÉ)!);
    }
    if (queries.has(QUERY_TYPE_DE_CONTRATS) && queries.get(QUERY_TYPE_DE_CONTRATS) !== null) {
      setTypeDeContratInput(queries.get(QUERY_TYPE_DE_CONTRATS)!);
    }
    if (queries.has(QUERY_PAGE) && queries.get(QUERY_PAGE) !== null) {
      setPage(Number(queries.get(QUERY_PAGE)!));
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
    if (query) {
      return await router.push({ query: `${query}&page=1` });
    }

    offreEmploiService.rechercherOffreEmploi('page=1')
      .then((res) => {
        setOffreEmploiList(res.résultats);
        setNombreRésultats(res.nombreRésultats);
        setIsLoading(false);
      });

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

          label="Rechercher un métier, un mot-clé..."
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
        <Pagination onClick={changePage} currentPage={page} pageCount={Math.round(nombreRésultats / 30)}/>
      }
    </main>
  );
}
