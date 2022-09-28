import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/QuEstCeQueLeMentorat/QuEstCeQueLeMentorat.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import Marked from '~/client/components/ui/Marked/Marked';

export function QuEstCeQueLeMentorat() {
  return (

    <article className={styles.quEstCeQueLeMentorat}>
      <Container className={styles.container}>
        <Marked markdown={quEstCeQueLeMentorat} />
      </Container>

    </article>
  );
}

const quEstCeQueLeMentorat = `
Qu'est-ce que le mentorat ?
===========================

Le mentorat, c’est l’accompagnement individuel bénévole d’un jeune par un mentor, qui peut aussi bien être lycéen qu’étudiant, actif ou retraité. Le “binôme” que forment le mentor et le jeune se rencontre plusieurs fois par mois (pendant au moins 6 mois) pour répondre aux objectifs du mentoré selon son âge et ses besoins. Le binôme est encadré par une structure, le plus souvent une association, qui offre un cadre sécurisé pour chacun.
`;

