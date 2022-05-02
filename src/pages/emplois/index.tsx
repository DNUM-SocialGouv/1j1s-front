import { Button, ButtonGroup, TextInput, Title } from '@dataesr/react-dsfr';
import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { ChoixMultiple } from '~/client/components/ChoixMultiple';
import { RésultatRechercheOffreEmploi } from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const offreEmploiService = useDependency('offreEmploiService');
  const [offreEmplois, setOffreEmplois] = useState<OffreEmploi[]>([]);
  const [offreEmploisNombreRésultats, setOffreEmploisNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [toggleFiltrerMaRecherche, setToggleFiltrerMaRecherche] = useState(false);

  function handleToggleFiltrerMaRecherche() { setToggleFiltrerMaRecherche(!toggleFiltrerMaRecherche); }


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
          <ButtonGroup size="md">
            <Button submit={true} icon="ri-search-line" iconPosition="right">Rechercher</Button>
          </ButtonGroup>

          <Button className={styles.filtrerRecherche} styleAsLink>
            <Image src="/icons/filtrer.svg" alt="" width="24" height="24" />
            <span onClick={handleToggleFiltrerMaRecherche}>Filtrer ma recherche</span>
          </Button>


          {
            toggleFiltrerMaRecherche && <ChoixMultiple
              name="typeDeContrat"
              list={
                [
                  { label: 'Contrat à durée déterminé', value: 'CDD' },
                  { label: 'Contrat à durée indéterminé', value: 'CDI' },
                  { label: 'Mission intérimaire', value: 'MIS' },
                  { label: 'Contrat travail saisonnier', value: 'SAI' },
                ]
              }

            />
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
