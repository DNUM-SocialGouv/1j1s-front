import Link from 'next/link';
import React, { useMemo } from 'react';

import styles
  from '~/client/components/features/FicheMétier/Rechercher/RésultatRechercherMétier.module.scss';
import { HitProps } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import useSanitize from '~/client/hooks/useSanitize';
import {
  FicheMétierHttp,
  mapFicheMetier,
} from '~/server/fiche-metier/domain/ficheMetierHttp';

export function RésultatRechercherMétier(props: HitProps<Partial<FicheMétierHttp>>) {
  const ficheMetier = mapFicheMetier(props.hit);
  const accrocheMétier = useSanitize(ficheMetier.accrocheMetier);
  const nomMetier = useMemo(() => {
    return `${ficheMetier.nomMetier?.charAt(0).toUpperCase()}${ficheMetier.nomMetier?.slice(1)}`;
  }, [ficheMetier.nomMetier]);

  if (!ficheMetier.nomMetier) return null;

  return (
    <Link href={`/decouvrir-les-metiers/${encodeURIComponent(ficheMetier.nomMetier)}`} className={'underline-none'}>
      <CardComponent className={styles.resultatCard} layout={'horizontal'}>
        <CardComponent.Content className={styles.content}>
          <CardComponent.Title className={styles.title} titleAs={'h3'}>{nomMetier}</CardComponent.Title>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: accrocheMétier || '' }}/>
          <CardComponent.FakeLink appearance={'tertiary'} className={styles.link} icon={<Icon name={'angle-right'}/>} label={'En savoir plus'} />
        </CardComponent.Content>
      </CardComponent>
    </Link>
  );
}
