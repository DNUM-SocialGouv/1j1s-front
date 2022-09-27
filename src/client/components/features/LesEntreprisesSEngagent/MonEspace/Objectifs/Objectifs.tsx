import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/MonEspace/Objectifs/Objectifs.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

export function Objectifs () {
  return (
    <div className={styles.objectifs}>
      <Container className={styles.objectifsContainer}>
        <div className={styles.objectifsContainerIllustration}>
          <Image src="/icons/les-entreprises-s-engagent.svg" alt="" width="65" height="65"/>
        </div>
        <div className={styles.objectifsContainerText}>
          <p>La communauté « Les entreprises s’engagent » a été lancée par le Président de la République en juillet 2018 dans l’objectif de renforcer et de pérenniser le lien entre l’Etat et l’Entreprise en faveur de l’emploi de tous les publics</p>
          <ol>
            <li>Fédérer, sur l’ensemble du territoire, les entreprises - ainsi que les grands réseaux d’entreprises et partenaires - qui oeuvrent pour une société plus durable et solidaire.</li>
            <li>Simplifier l’accès à l’information, aux dispositifs et aux aides.</li>
            <li>Créer des espaces de coopération entre l’Etat et les entreprises pour accompagner le passage à l’ation en offrant les outils et les moyens permettant à chacun d’agir à son échelle.</li>
            <li>Valoriser les entreprises qui s’engagent, leurs bonnes pratiques et les actions innovantes qu’elles développent.</li>
          </ol>
        </div>
      </Container>
    </div>

  );
}
