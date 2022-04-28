import { Button } from '@dataesr/react-dsfr';
import React, {
  useEffect,
  useState,
} from 'react';

import { Autocompletion } from '~/client/components/Autocompletion';
import { BarreDeRecherche } from '~/client/components/BarreDeRecherche';
import { CardOffreEmploi } from '~/client/components/CardOffreEmploi';
import { HeadTag } from '~/client/components/HeaderTag';
import { useDeps } from '~/client/context/dependenciesContainer.context';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const { dependenciesContainer } = useDeps();

  const [offreEmploisFiltre, setOffreEmploisFiltre] = useState('');
  const [offreEmplois, setOffreEmplois] = useState([]);
  const [rechercher, setRechercher] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      return await dependenciesContainer.offreEmploiService.rechercherOffreEmploi(offreEmploisFiltre);
    };
    if (rechercher) {
      fetchData().then((res) => {
        setOffreEmplois(res.data);
      });
      setRechercher(false);
      setIsLoading(false);
    }
  }, [rechercher, dependenciesContainer, offreEmploisFiltre]);
  //const suggestionList = ['aude', 'aube']
  //console.log('localisationList', suggestionList)

  const getFiltre = (filtre: string) => {
    setOffreEmploisFiltre(filtre);
  };

  const rechercherMétier = () => {
    setIsLoading(true);
    setRechercher(true);
  };

  return (
    <>
      <HeadTag
        title="1 jeune 1 solution"
        description="Toutes les solutions pour l'avenir des jeunes"
      />

      <main>
        <section className={styles.subtitle}>
          <h2>
            Des milliers d’offres d’emplois sélectionnées pour vous par Pôle
            Emploi
          </h2>
        </section>

        <div className={styles.barreDeRechercheContainer}>
          <BarreDeRecherche
            placeholder="Recherche un métier, une entreprise, un mot-clé..."
            inputName="champ-métier"
            onChange={getFiltre}
          />
          <Autocompletion
            placeholder="Saisir une localisation, un lieu..."
            inputName="champ-localisation"
            icon="fr-icon-map-pin-2-line"
            data={['data-1', 'data-2', 'data-3']}
          />
          <div className={styles.buttonContainer}>
            <Button
              title="rechercher"
              onClick={rechercherMétier}
              size="md"
            >Rechercher
            </Button>
          </div>
        </div>

        { isLoading ?
          <p>....en cours de chargement</p>
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
