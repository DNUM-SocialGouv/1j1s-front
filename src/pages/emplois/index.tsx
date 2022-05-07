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
  TextInput,
  Title,
} from '@dataesr/react-dsfr';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';

import { RésultatRechercheOffreEmploi } from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/RechercheOffreEmploi.module.css';

export default function RechercherOffresEmploi() {
  const offreEmploiService = useDependency('offreEmploiService');
  const rechercheOffreEmploiForm = useRef<HTMLFormElement>(null);
  const [offreEmploiList, setOffreEmploiList] = useState<OffreEmploi[]>([]);
  const [nombreRésultats, setNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltresAvancésDesktopOpen, setIsFiltresAvancésDesktopOpen] = useState(false);
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);
  const [typeDeContratInput, setTypeDeContratInput] = useState('');
  const { isSmallScreen } = useBreakpoint();

  function toggleFiltreRechercheDesktop() {
    setIsFiltresAvancésDesktopOpen(!isFiltresAvancésDesktopOpen);
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

  async function rechercherOffreEmploi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const {
      résultats,
      nombreRésultats,
    } = await offreEmploiService.rechercherOffreEmploi(formData.toRecord());
    setOffreEmploiList(résultats);
    setNombreRésultats(nombreRésultats);
    setIsLoading(false);
  }

  return (
    <>
      <HeadTag
        title="Rechercher un emploi | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main>
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
            name="motCle"
            placeholder="exemple : boulanger, informatique..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.value}
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
            onClick={() => isSmallScreen ? setIsFiltresAvancésMobileOpen(true) : toggleFiltreRechercheDesktop()}
            data-testid="ButtonFiltrerRecherche"
          >
            Filtrer ma recherche
          </Button>

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
                  <RésultatRechercheOffreEmploi offreEmploi={offreEmploi}/>
                </li>
              );
            })}
          </ul>
        }
      </main>
      <Modal isOpen={isFiltresAvancésMobileOpen} hide={() => setIsFiltresAvancésMobileOpen(false)} data-testid="FiltreRechercheMobile">
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
    </>
  );
}
