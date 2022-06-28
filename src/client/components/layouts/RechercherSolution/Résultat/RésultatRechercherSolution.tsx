import { ButtonGroup, Icon, Text } from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution.module.css';
import { TagList } from '~/client/components/ui/TagList/TagList';
import useSanitize from '~/client/hooks/useSanitize';

export interface RésultatRechercherSolutionProps {
  lienOffre: string
  intituléOffre: string
  descriptionOffre?: string
  logoEntreprise: string
  nomEntreprise?: string
  étiquetteOffreList: string[]
}

export function RésultatRechercherSolution(props: RésultatRechercherSolutionProps) {
  const { lienOffre, intituléOffre, descriptionOffre, logoEntreprise, nomEntreprise, étiquetteOffreList } = props;
  const description = useSanitize(descriptionOffre);

  return (
    <Link href={lienOffre}>
      <a className={styles.card} data-testid="RésultatRechercherSolution">
        <header className={styles.cardHeader}>
          <Image alt="" src={logoEntreprise} width="56" height="56" />
          <div className={styles.offreLead}>
            <div className="fr-text--bold">{intituléOffre}</div>
            {nomEntreprise && <div>{nomEntreprise}</div>}
          </div>
        </header>
        <section className={styles.cardBody}>
          {étiquetteOffreList.length > 0 && <TagList data-testid="ÉtiquetteOffreList" list={étiquetteOffreList} />}
          <div className={styles.descriptionOffre}>
            <span className={styles.descriptionLabel}>Description :</span>
            <p dangerouslySetInnerHTML={{ __html: description }}/>
          </div>
          <ButtonGroup size="md" align="right">
            <Text size="sm" spacing="m-0" className="fr-link">
              En savoir plus
              <Icon name="ri-arrow-right-s-line" size="2x" iconPosition="right" />
            </Text>
          </ButtonGroup>
        </section>
      </a>
    </Link>
  );
}
