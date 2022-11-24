import Link from 'next/link';
import React, { useMemo } from 'react';

import styles
  from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import useSanitize from '~/client/hooks/useSanitize';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';

import { CardComponent } from '../../../ui/Card/AbstractCard/CardComponent';
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
    <Link href={`/decouvrir-les-metiers/${encodeURIComponent(résultat.nomMetier)}`} className={'underline-none'}>
      <CardComponent className={styles.resultatCard} layout={'horizontal'}>
        <CardComponent.Content className={styles.content}>
          <CardComponent.Title className={styles.title} titleAs={'h2'}>{nomMetier}</CardComponent.Title>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
          <CardComponent.FakeLink appearance={'tertiary'} className={styles.link} icon={<Icon name={'angle-right'}/>} label={'En savoir plus'} />
        </CardComponent.Content>
      </CardComponent>
    </Link>
  );
}
