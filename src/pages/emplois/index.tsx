import React from 'react';

import { Autocompletion } from '~/client/components/Autocompletion';
import { BarreDeRecherche } from '~/client/components/BarreDeRecherche';
import { CardOffreEmploi } from '~/client/components/CardOffreEmploi';
import { Footer } from '~/client/components/Footer';
import { Header } from '~/client/components/Header';
import { HeadTag } from '~/client/components/HeaderTag';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import styles from '~/styles/Emplois.module.css';

export default function Emplois() {
  const offreEmplois: OffreEmploi[] = [];
  return (
    <>
      <HeadTag
        title="1 jeune 1 solution"
        description="Toutes les solutions pour l'avenir des jeunes"
      />
      <Header />

      <main>
        <section className={styles.subtitle}>
          <h2>
            Des milliers d’offres d’emplois sélectionnées pour vous par Pôle
            Emploi
          </h2>
        </section>

        <div className={styles.barrederecherche}>
          <BarreDeRecherche
            placeholder="Recherche un métier, une entreprise, un mot-clé..."
            inputName="champ-métier"
          />
          <Autocompletion
            placeholder="Saisir une localisation, un lieu..."
            inputName="champ-localisation"
            icon="fr-icon-map-pin-2-line"
            data={['Paris', 'Parasol', 'Paravent', 'Palerme']}
          />
        </div>

        <div className={styles.listOffreEmplois}>
          {offreEmplois.map((offreEmploi: OffreEmploi) => {
            return (
              <CardOffreEmploi offreEmploi={offreEmploi} key={offreEmploi.id} />
            );
          })}
        </div>
      </main>

      <Footer />
    </>
  );
}
