import React, { useMemo } from 'react';

import styles
  from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import useSanitize from '~/client/hooks/useSanitize';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import { CardComponent } from '../../../ui/Card/CardComponent';
import { Icon } from '../../../ui/Icon/Icon';

interface RésultatRechercherMétierProps {
  résultat: Partial<FicheMétier>
}

export function RésultatRechercherMétier({ résultat }: RésultatRechercherMétierProps) {
  const accrocheMétier = useSanitize(résultat.accrocheMetier);
  const nomMetier = useMemo(() => {
    return `${résultat.nomMetier?.charAt(0).toUpperCase()}${résultat.nomMetier?.slice(1)}`;
  }, [résultat.nomMetier]);

  if (!résultat.nomMetier) return null;

  return (
    <CardComponent className={styles.resultat} layout={'horizontal'} link={`/decouvrir-les-metiers/${encodeURIComponent(résultat.nomMetier)}`}>
      <CardComponent.Content className={styles.resultatContent}>
        <CardComponent.Title className={styles.resultatTitle}>{nomMetier}</CardComponent.Title>
        <div className={styles.resultatDescription} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
        <CardComponent.Button appearance={'tertiary'} className={styles.resultatButton} icon={<Icon name={'angle-right'}/>} label={'En savoir plus'} />
      </CardComponent.Content>
    </CardComponent>
  );
}
