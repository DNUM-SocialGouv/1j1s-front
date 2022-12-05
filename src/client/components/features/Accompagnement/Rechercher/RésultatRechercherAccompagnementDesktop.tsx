import React from 'react';

import {
  LienSolutionAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import { displayHeures } from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement.module.scss';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';


export function RésultatRechercherAccompagnementDesktop(props: Omit<LienSolutionAccompagnement, 'id'>) {
  const { logoEntreprise, intituléOffre, nomEntreprise, étiquetteOffreList, lienOffre, horaires } = props;
  return (
    <CardComponent layout={'vertical'} className={styles.card}>
      <CardComponent.Content className={styles.content}>
        <CardComponent.Image className={styles.logo} src={logoEntreprise}/>
        <div className={styles.mainContent}>
          <div className={styles.logoAlignment}>
            <CardComponent.Title className={styles.title} titleAs={'h2'}>
              {intituléOffre}
            </CardComponent.Title>
            {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
            <TagList list={étiquetteOffreList} className={styles.tags}/>
          </div>
          <a href={lienOffre} className={styles.button}>
            Contacter l‘agence
            <svg className={styles.buttonIcon} width="15" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H19C19.5523 0 20 0.447715 20 1V17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17V1C0 0.447715 0.447715 0 1 0ZM18 4.238L10.072 11.338L2 4.216V16H18V4.238ZM2.511 2L10.061 8.662L17.502 2H2.511Z" fill="currentColor"/>
            </svg>
          </a>
        </div>
        <details className={styles.details}>
          <summary className={styles.summary}>Voir les horaires d‘ouverture
          </summary>
          <div className={styles.horaireBackground}>
            <ol className={styles.listeHoraire}>
              {horaires?.map((horaire) => (
                <li key={horaire.jour} className={styles.horaireElement}>
                  <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
                </li>
              ))}
            </ol>
          </div>
        </details>
      </CardComponent.Content>
    </CardComponent>
  );
}
