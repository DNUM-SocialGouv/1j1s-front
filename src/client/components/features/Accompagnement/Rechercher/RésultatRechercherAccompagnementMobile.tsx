import React from 'react';

import {
  LienSolutionAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import { displayHeures } from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement.module.scss';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';


export function RésultatRechercherAccompagnementMobile(props: Omit<LienSolutionAccompagnement, 'id'>) {
  const { logoEntreprise, intituléOffre, nomEntreprise, étiquetteOffreList, lienOffre, horaires } = props;
  return (
    <CardComponent layout={'vertical'} className={styles.card}>
      <CardComponent.Content className={styles.content}>
        <CardComponent.Image className={styles.logo} src={logoEntreprise}/>
        <div className={styles.mainContent}>
          <CardComponent.Title className={styles.title} titleAs={'h2'}>
            {intituléOffre}
          </CardComponent.Title>
          {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
        </div>
      </CardComponent.Content>
      <TagList list={étiquetteOffreList} className={styles.tags}/>
      {
        lienOffre &&
        <a href={lienOffre} className={styles.button}>
          Contacter l‘agence
          <Icon name="mail" className={styles.buttonIcon} />
        </a>
      }
      <details className={styles.details}>
        <summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
        <ol className={styles.listeHoraire}>
          {horaires?.map((horaire) => (
            <li key={horaire.jour} className={styles.horaireElement}>
              <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
            </li>
          ))}
        </ol>
      </details>
    </CardComponent>
  );
}
