import React from 'react';

import {
  EntreprendreOutilADisposition,
} from '~/client/components/features/Entreprendre/OutilADisposition/EntreprendreOutilADisposition';
import {
  RéseauAccompagnementList,
  RéseauÉconomieSocialeEtSolidaireList,
  RéseauFinancementList,
} from '~/client/components/features/Entreprendre/Réseau/EntreprendreRéseau';
import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import { Container } from '~/client/components/layouts/Container/Container';
import { Accordion } from '~/client/components/ui/Accordion/Accordion';
import { HeroComponent } from '~/client/components/ui/Hero/HeroComponent';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './entreprendre.module.scss';

export default function Entreprendre() {
  return (
    <>
      <HeadTag title="Les solutions pour créer une entreprise | 1jeune1solution"/>
      <HeroComponent
        titlePrimaryText={<span className={styles.heroTitle}><b>Découvrez les solutions qui s’offrent à vous</b>, pour créer votre entreprise…</span>}
        titleSecondaryText={<>…quel que soit le stade de votre projet de création !</>}
        imgSrc="/images/entrepreneurs.webp"
      >
        <ol className={styles.phases}>
          <li className={styles.phasesCard}>
            <b>Ante-création</b>
            <span>Etudier le marché et construire le business plan</span>
          </li>
          <li className={styles.phasesCard}>
            <b>Test</b>
            <span>Tester son idée au contact du marché</span>
          </li>
          <li className={styles.phasesCard}>
            <b>Post-création</b>
            <span>Accompagnement dans les premières années suivant la création</span>
          </li>
        </ol>
      </HeroComponent>

      <main id="contenu" className={styles.main}>
        <div className={styles.réseaux}>
          <Container>
            <h2 className={styles.réseauxHeader}>
              Découvrez les différents réseaux d’accompagnement suivant votre besoin et le stade d’avancement de votre
              projet
            </h2>

            <div className={styles.réseauxContent}>
              <Accordion summary="Je cherche à être accompagné" summaryAs="h3">
                <RéseauAccompagnementList/>
              </Accordion>
              <Accordion summary="Je cherche à financer mon projet" summaryAs="h3">
                <RéseauFinancementList/>
              </Accordion>
              <Accordion summary="Je lance un projet dans l’Economie sociale et solidaire" summaryAs="h3">
                <RéseauÉconomieSocialeEtSolidaireList/>
              </Accordion>
            </div>
          </Container>
        </div>

        <div className={styles.outilsADisposition}>
          <Container>
            <h2 className={styles.outilsADispositionHeader} id="outilsADispositionTitle">Des outils à votre disposition</h2>
            <ul className={styles.outilsADispositionList} aria-labelledby="outilsADispositionTitle">
              <li>
                <EntreprendreOutilADisposition
                  link="https://bpifrance-creation.fr/encyclopedie/previsions-financieres-business-plan/business-plan/faire-son-business-plan"
                  linkLabel="Construire mon Business Plan"
                  description="Construisez votre Business Plan, gratuitement en ligne"
                />
              </li>
              <li>
                <EntreprendreOutilADisposition
                  link="https://jesuisentrepreneur.fr/mon-etude-de-marche"
                  linkLabel="Faire mon étude de marché"
                  description="Découvrez les tendances et les chiffres de votre marché"
                />
              </li>
              <li>
                <EntreprendreOutilADisposition
                  link="https://bpifrance-creation.fr/boiteaoutils/infographie-entrepreneurs-trouvez-bon-reseau-daccompagnement-vos-besoins"
                  linkLabel="Me faire accompagner"
                  description="Trouvez le réseau d’accompagnement qui correspond à vos besoins"
                />
              </li>
            </ul>
          </Container>
        </div>

        <div className={styles.marseille}>
          <Container>
            <h2 className={styles.marseilleHeader}>Découvrez l’ensemble des opportunités offertes par l’éco-système
              marseillais</h2>

            <PartnerCard
              link="https://entreprendreamarseille.fr/prendre-un-rendez-vous/"
              linkLabel="J’expose mon projet en rendez-vous"
              logo="/images/entreprendre/région-sud.png"
              title="Vous avez moins de 30 ans, habitez Marseille et souhaitez créer votre entreprise ?"
              description="Dans le cadre de l’initiative “Marseille en grand” lancée par le Président de la République le 2 septembre 2021, l’Etat et la région Sud se mobilisent pour soutenir la création d’entreprises à Marseille notamment avec l’ouverture des Carrefours de l’entreprenariat."
            />
          </Container>
        </div>
      </main>
    </>
  );
}
