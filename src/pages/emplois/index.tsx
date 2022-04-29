import React, { FormEvent, useState } from 'react';

import { BarreDeRecherche } from '~/client/components/BarreDeRecherche/BarreDeRecherche';
import { CardOffreEmploi } from '~/client/components/CardOffreEmploi/CardOffreEmploi';
import { HeadTag } from '~/client/components/HeaderTag';
import { SubmitButton } from '~/client/components/SubmitButton';
import { useDeps } from '~/client/context/dependenciesContainer.context';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const { dependenciesContainer } = useDeps();
  const offreEmploiService = dependenciesContainer.offreEmploiService;
  const [offreEmploisFiltreMétier, setOffreEmploisFiltreMétier] = useState('');
  const [offreEmplois, setOffreEmplois] = useState<OffreEmploi[]>([]);
  const [offreEmploisNombreRésultats, setOffreEmploisNombreRésultats] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const rechercherOffreEmploi = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const result = await offreEmploiService.rechercherOffreEmploi(offreEmploisFiltreMétier);
    setOffreEmplois(result.résultats);
    setOffreEmploisNombreRésultats(result.nbRésultats);
    setIsLoading(false);
  };

  return (
    <>
      <HeadTag
        title="Rechercher un emploi | 1jeune1solution"
        description="Plus de 400 000 offres d'emplois et d'alternances sélectionnées pour vous"
      />

      <main>
        <div className={styles.title}>
          <h1>
            Des milliers d’offres d’emplois sélectionnées pour vous par Pôle
            Emploi
          </h1>
        </div>

        <form className={styles.barreDeRechercheContainer} onSubmit={rechercherOffreEmploi} role="search">
          <BarreDeRecherche
            placeholder="Recherche un métier, une entreprise, un mot-clé..."
            inputName="champ-métier"
            onChange={setOffreEmploisFiltreMétier}
          />
          <SubmitButton label="Rechercher"/>
        </form>

        { offreEmploisNombreRésultats !== 0 &&
          <div className={styles.nombreRésultats}>
            <strong>{offreEmploisNombreRésultats} offres d&apos;emplois</strong>
          </div>
        }


        { isLoading ?
          <p className={'pl-16'}>....en cours de chargement (todo ajouter un loader)</p>
          :
          <div className={styles.listOffreEmplois}>
            {offreEmplois.map((offreEmploi: OffreEmploi) => {
              return (
                <CardOffreEmploi offreEmploi={offreEmploi} key={offreEmploi.id} />
              );
            })}
          </div>
        }

      </main>

    </>
  );
}
