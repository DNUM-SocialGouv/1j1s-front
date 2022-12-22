import classNames from 'classnames';
import React from 'react';

import { Evenement } from '~/client/components/features/Evenement/Evenement.type';
import styles from '~/client/components/features/Evenement/RésultatRechercherEvenement.module.scss';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { formatEventDateTime } from '~/client/utils/formatEventDateTime.util';

interface HitProps {
  hit: Evenement
}

export function RésultatRechercherEvenement(props: HitProps) {
  const { titreEvenement, organismeOrganisateur, dateDebut, dateFin, lieuEvenement, slug } = props.hit;

  return (
    <Link href={`evenements/${slug}`} className={classNames(styles.card, 'underline-none')}>
      <CardComponent className={styles.resultatCard} layout={'vertical'}>
        <CardComponent.Content className={styles.content}>
          <div className={styles.event}>
            <div className={styles.eventDetails}>{formatEventDateTime(dateDebut, dateFin)} <span
              className={styles.eventOrganizer}>- {organismeOrganisateur}</span>
            </div>
            <div className={styles.eventTitle}>{titreEvenement}</div>
          </div>
        </CardComponent.Content>
        <div className={styles.tagLink}>
          <TagList list={[lieuEvenement]} aria-label="Lieu de l'évènement"/>
          <CardComponent.FakeLink appearance={'tertiary'} icon={<Icon name={'angle-right'}/>}
            label={'En savoir plus'}/>
        </div>
      </CardComponent>
    </Link>
  );
}
