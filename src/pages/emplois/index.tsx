import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr';
import React, { FormEvent, useState } from 'react';

import { RésultatRechercheOffreEmploi } from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi';
import { BarreDeRecherche } from '~/client/components/ui/BarreDeRecherche/BarreDeRecherche';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const offreEmploiService = useDependency('offreEmploiService');
  const [offreEmploisFiltreMétier, setOffreEmploisFiltreMétier] = useState('');
  const [offreEmplois, setOffreEmplois] = useState<OffreEmploi[]>([]);
  const [offreEmploisNombreRésultats, setOffreEmploisNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function rechercherOffreEmploi(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const result = await offreEmploiService.rechercherOffreEmploi(offreEmploisFiltreMétier);
    setOffreEmplois(result.résultats);
    setOffreEmploisNombreRésultats(result.nbRésultats);
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
          <BarreDeRecherche
            placeholder="Recherche un métier, une entreprise, un mot-clé..."
            inputName="champ-métier"
            onChange={setOffreEmploisFiltreMétier}
          />
          <ButtonGroup size="md">
            <Button submit={true} icon="ri-search-line" iconPosition="right">Rechercher</Button>
          </ButtonGroup>
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
