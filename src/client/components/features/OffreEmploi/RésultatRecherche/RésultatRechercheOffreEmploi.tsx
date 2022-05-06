import { ButtonGroup, Icon, Text } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/features/OffreEmploi/RésultatRecherche/RésultatRechercheOffreEmploi.module.css';
import { TagList } from '~/client/components/ui/TagList/TagList';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

interface RésultatRechercheOffreEmploiProps {
  offreEmploi: OffreEmploi;
}

export function RésultatRechercheOffreEmploi(props: RésultatRechercheOffreEmploiProps) {
  const { offreEmploi } = props;
  const defaultLogo = '/images/pole-emploi.svg';

  return (
    <Link href={'/emplois/' + offreEmploi.id}>
      <a className={styles.card}>
        <header className={styles.cardHeader}>
          <Image alt="" src={offreEmploi.entreprise.logo || defaultLogo} width="48" height="48"/>
          <div>
            <strong>{offreEmploi.intitulé}</strong>
            {offreEmploi.entreprise?.nom && <div>{offreEmploi.entreprise?.nom}</div>}
          </div>
        </header>
        <div className={styles.cardBody}>
          <TagList list={[
            offreEmploi.lieuTravail,
            offreEmploi.expérience,
            offreEmploi.typeContrat.libelléCourt,
            offreEmploi.duréeTravail,
          ]}/>
          <p>
            <strong>Description:</strong>{' '}
            {offreEmploi.description?.slice(0, 100)} [...]
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
