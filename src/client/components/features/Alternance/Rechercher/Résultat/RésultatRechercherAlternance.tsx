import { ButtonGroup, Icon, Text } from '@dataesr/react-dsfr';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/Alternance/Rechercher/Résultat/RésultatRechercherAlternance.module.css';
import { Alternance } from '~/server/alternances/domain/alternance';

interface RésultatRechercherAlternanceProps {
  alternance: Alternance;
}

export function RésultatRechercherAlternance(props: RésultatRechercherAlternanceProps) {
  const { alternance } = props;

  return (
    <Link href={`/apprentissage/${alternance.id}`}>
      <a className={styles.card} data-testid="RésultatRechercherAlternance">
        <header className={styles.cardHeader}>
          <div className={styles.intitule}>{alternance.intitulé}</div>
          {alternance.entreprise?.nom && <div>{alternance.entreprise?.nom}</div>}
        </header>
        <div className={styles.cardBody}>
          <p className={styles.cardDescription}>
            <span className={styles.description}>Description :</span>{' '}
            {alternance.description}
          </p>

          <ButtonGroup size="md" align="right">
            <Text size="sm" spacing="m-0" className="fr-link">
              En savoir plus
              <Icon name="ri-arrow-right-s-line" size="2x" iconPosition="right" />
            </Text>
          </ButtonGroup>
        </div>
      </a>
    </Link>
  );
}
