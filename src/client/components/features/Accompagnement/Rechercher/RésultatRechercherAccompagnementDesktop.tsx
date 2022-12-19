import React from 'react';

import {
  displayHeures,
  RésultatRechercherAccompagnementProps,
} from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement.module.scss';
import { ButtonAsLink } from '~/client/components/ui/ButtonAsLink/ButtonAsLink';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';

export function RésultatRechercherAccompagnementDesktop(props: RésultatRechercherAccompagnementProps) {
  const {
    logoEntreprise,
    intituléOffre,
    nomEntreprise,
    étiquetteOffreList,
    lienOffre,
    horaires,
    typeAccompagnement,
    setIsPopInOpen,
  } = props;

  const isMissionLocale = typeAccompagnement === TypeÉtablissement.MISSION_LOCALE;

  return (
    <>
      <CardComponent layout={'vertical'} className={styles.card}>
        <CardComponent.Content className={styles.content}>
          <CardComponent.Image className={styles.logo} src={logoEntreprise} ariaHidden/>
          <div className={styles.mainContent}>
            <div className={styles.logoAlignment}>
              <CardComponent.Title className={styles.title} titleAs={'h3'}>
                {intituléOffre}
              </CardComponent.Title>
              {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
              <TagList list={étiquetteOffreList} className={styles.tags}/>
            </div>
            {
              lienOffre && !isMissionLocale &&
              <a href={lienOffre} className={styles.contactMailÉtablissement}>
                <TextIcon icon={'mail'} iconPosition={'right'}>Contacter l‘agence</TextIcon>
              </a>
            }
            {
              lienOffre && isMissionLocale &&
              <ButtonAsLink className={styles.contactFormulaireÉtablissement} onClick={() => setIsPopInOpen(true)}>
                Je souhaite être rappelé
              </ButtonAsLink>
            }
          </div>
          {horaires &&
            <details className={styles.details}>
              <summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
              <div className={styles.horaireBackground}>
                <ol className={styles.listeHoraire}>
                  {horaires.map((horaire) => (
                    <li key={horaire.jour} className={styles.horaireElement}>
                      <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          }
        </CardComponent.Content>
      </CardComponent>
    </>
  );
}
