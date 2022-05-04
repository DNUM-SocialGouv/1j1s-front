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
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { RésultatRechercheOffreEmploi } from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { OffreEmploi, TYPE_DE_CONTRAT_LIST } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const offreEmploiService = useDependency('offreEmploiService');
  const [offreEmplois, setOffreEmplois] = useState<OffreEmploi[]>([]);
  const [offreEmploisNombreRésultats, setOffreEmploisNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleFiltrerMaRecherche, setToggleFiltrerMaRecherche] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typeDeContratInput, setTypeDeContratInput] = useState('');

  function handleToggleFiltrerMaRecherche() {
    setToggleFiltrerMaRecherche(!toggleFiltrerMaRecherche);
  }

  function toggleTypeDeContrat(value: string) {
    setTypeDeContratInput(typeDeContratInput.appendOrRemoveSubstr(value));
  }

  async function rechercherOffreEmploi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const result = await offreEmploiService.rechercherOffreEmploi(new FormData(event.currentTarget));
    setOffreEmplois(result.résultats);
    setOffreEmploisNombreRésultats(result.nombreRésultats);
    setIsLoading(false);
  }

  return (
    <>
      <HeadTag
        title="Rechercher un emploi | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />
      <main>
        <div className={styles.title}>
          <Title as="h1">
            Des milliers d’offres d’emplois sélectionnées pour vous par Pôle Emploi
          </Title>
        </div>

        <form className={styles.rechercheOffreEmploi} onSubmit={rechercherOffreEmploi} role="search">
          <TextInput
            label="Rechercher un métier, un mot-clé..."
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            name="motCle"
            placeholder="Boulanger"
            onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.value}
          />
          <input type="hidden" name="typeDeContrats" value={typeDeContratInput}/>
          <ButtonGroup size="md">
            <Button submit={true} icon="ri-search-line" iconPosition="right">Rechercher</Button>
          </ButtonGroup>

          <div className={styles.filtresMobile}>
            <Button
              styleAsLink
              icon="ri-filter-line"
              iconPosition="left"
              onClick={() => setIsOpen(true)}
            >
              Filtrer ma recherche
            </Button>
          </div>

          <div className={styles.filtresDesktop}>
            <Button
              styleAsLink
              icon="ri-filter-line"
              iconPosition="left"
              onClick={() => handleToggleFiltrerMaRecherche()}
            >
              Filtrer ma recherche
            </Button>
          </div>

          <Modal isOpen={isOpen} hide={() => setIsOpen(false)}>
            <ModalClose hide={() => setIsOpen(false)} title="Fermer les filtres"/>
            <ModalTitle icon="ri-menu-2-line">Filtrer ma recherche</ModalTitle>
            <ModalContent>
              <CheckboxGroup legend="Type de contrat">
                {TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                  <Checkbox
                    key={index}
                    label={typeDeContrat.label}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                    value={typeDeContrat.value}
                    checked={typeDeContratInput.includes(typeDeContrat.value)}
                  />
                ))}
              </CheckboxGroup>
            </ModalContent>
            <ModalFooter>
              <Button
                onClick={() => setIsOpen(false)}
                icon="ri-arrow-right-s-line"
                iconPosition="right"
              >
                Appliquer les filtres
              </Button>
            </ModalFooter>
          </Modal>

          {
            toggleFiltrerMaRecherche && <CheckboxGroup className={styles.filtresDesktop} legend="Type de contrat">
              {TYPE_DE_CONTRAT_LIST.map((typeDeContrat, index) => (
                <Checkbox
                  key={index}
                  label={typeDeContrat.label}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onChange={(e: ChangeEvent<HTMLInputElement>) => toggleTypeDeContrat(e.target.value)}
                  value={typeDeContrat.value}
                  checked={typeDeContratInput.includes(typeDeContrat.value)}
                />
              ))}
            </CheckboxGroup>
          }
        </form>

        {
          offreEmploisNombreRésultats !== 0 &&
          <div className={styles.nombreRésultats}>
            <strong>{offreEmploisNombreRésultats} offres d&apos;emplois</strong>
          </div>
        }

        {isLoading && <p>Recherche des offres</p>}
        {
          offreEmplois.length > 0 && !isLoading &&
          <ul className={styles.résultatRechercheOffreEmploiList}>
            {offreEmplois.map((offreEmploi: OffreEmploi) => {
              return (
                <li key={offreEmploi.id}>
                  <RésultatRechercheOffreEmploi offreEmploi={offreEmploi}/>
                </li>
              );
            })}
          </ul>
        }
      </main>
    </>
  );
}
