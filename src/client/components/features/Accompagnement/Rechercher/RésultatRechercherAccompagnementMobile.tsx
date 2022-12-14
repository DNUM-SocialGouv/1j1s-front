import React, { useState } from 'react';

import {
  LienSolutionAccompagnement,
} from '~/client/components/features/Accompagnement/Rechercher/RechercherAccompagnement';
import { displayHeures } from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement';
import styles
  from '~/client/components/features/Accompagnement/Rechercher/RésultatRechercherAccompagnement.module.scss';
import {
  FormulaireDeContactMissionLocale,
} from '~/client/components/features/ContratEngagementJeune/FormulaireDeContact/FormulaireDeContactMissionLocale/FormulaireDeContactMissionLocale';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/infra/apiÉtablissementPublic.repository';


export function RésultatRechercherAccompagnementMobile(props: Omit<LienSolutionAccompagnement, 'id'>) {
  const { logoEntreprise, intituléOffre, nomEntreprise, étiquetteOffreList, lienOffre, horaires, typeAccompagnement } = props;
  const isMissionLocale = typeAccompagnement === TypeÉtablissement.MISSION_LOCALE;

  const [isPopInOpen, setIsPopInOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <CardComponent layout={'vertical'} className={styles.card}>
        <CardComponent.Content className={styles.content}>
          <CardComponent.Image className={styles.logo} src={logoEntreprise} ariaHidden/>
          <div className={styles.mainContent}>
            <CardComponent.Title className={styles.title} titleAs={'h3'}>
              {intituléOffre}
            </CardComponent.Title>
            {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
          </div>
        </CardComponent.Content>
        <TagList list={étiquetteOffreList} className={styles.tags}/>
        {
          lienOffre && !isMissionLocale &&
          <a href={lienOffre} className={styles.button}>
            Contacter l‘agence
            <Icon name="mail" className={styles.buttonIcon} />
          </a>
        }
        {
          lienOffre && isMissionLocale &&
          <a className={styles.button} onClick={() => setIsPopInOpen(true)}>
            Je souhaite être rappelé
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
      <ModalComponent
        className={styles.modale}
        isOpen={isPopInOpen}
        close={() => setIsPopInOpen(false)}
        aria-labelledby={ !isSuccess ? 'dialog_label' : 'dialog_label_success'}
      >
        { !isSuccess && <ModalComponent.Title className={styles.modaleTitle} id="dialog_label">
          Je souhaite être contacté(e) par la Mission Locale
        </ModalComponent.Title>
        }
        <ModalComponent.Content className={!isSuccess ? styles.modaleContent : styles.modaleContentSuccess}>
          { !isSuccess && <small>Tous le champs sont obligatoires sauf mention contraire</small> }
          <FormulaireDeContactMissionLocale onSuccess={() => setIsSuccess(true)}>
            <ButtonComponent label='Fermer' onClick={() => setIsPopInOpen(false)} title="Fermer, Revenir à la page" />
          </FormulaireDeContactMissionLocale>
        </ModalComponent.Content>
      </ModalComponent>
    </>
  );
}
