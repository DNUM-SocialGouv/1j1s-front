import React, { useMemo } from 'react';

import {
  displayHeures,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement.module.scss';
import { ButtonAsLink } from '~/client/components/ui/ButtonAsLink/ButtonAsLink';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';
import {
  ÉtablissementAccompagnement,
  TypeÉtablissement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

interface RésultatRechercherAccompagnementMobileProps {
  établissement: ÉtablissementAccompagnement
  onContactClick(): void
}

export function RésultatRechercherAccompagnementMobile(props: RésultatRechercherAccompagnementMobileProps) {
  const {
    établissement,
    onContactClick,
  } = props;

  const isMissionLocale = établissement.type === TypeÉtablissement.MISSION_LOCALE;

  const logoÉtablissement = useMemo(() => {
    switch (établissement.type) {
      case 'cij':
        return '/images/logos/info-jeunes.svg';
      case 'mission_locale':
        return '/images/logos/union-mission-locale.svg';
      case 'pole_emploi':
        return '/images/logos/pole-emploi.svg';
      default:
        return '';
    }
  }, [établissement.type]);

  return (
    <CardComponent layout={'vertical'} className={styles.card}>
      <CardComponent.Content className={styles.content}>
        <CardComponent.Image className={styles.logo} src={logoÉtablissement} ariaHidden/>
        <div className={styles.mainContent}>
          <CardComponent.Title className={styles.title} titleAs={'h3'}>
            {établissement.nom}
          </CardComponent.Title>
          {établissement.adresse && <span className={styles.address}>{établissement.adresse}</span>}
        </div>
      </CardComponent.Content>
      <TagList list={[établissement.telephone, établissement.email]} className={styles.tags}/>
      {
        établissement.email && !isMissionLocale &&
        <a href={établissement.email} className={styles.contactFormulaireÉtablissement}>
          Contacter l‘agence
          <Icon name="mail" className={styles.buttonIcon} />
        </a>
      }
      {
        établissement.email && isMissionLocale &&
        <ButtonAsLink className={styles.contactFormulaireÉtablissement} onClick={onContactClick}>
          Je souhaite être rappelé
        </ButtonAsLink>
      }
      <details className={styles.details}>
        <summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
        <ol className={styles.listeHoraire}>
          {établissement.horaires?.map((horaire) => (
            <li key={horaire.jour} className={styles.horaireElement}>
              <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
            </li>
          ))}
        </ol>
      </details>
    </CardComponent>
  );
}
