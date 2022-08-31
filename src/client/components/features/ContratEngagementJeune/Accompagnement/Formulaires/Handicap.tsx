import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function Handicap({ setTypeFormulaireAffiché, setIsPôleEmploiModalOpen }: FormulairesProps ) {
  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAideAge')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Êtes-vous en situation de handicap (RQTH) ?</p>
    <div>
      <button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('AutresBesoinsAge')}>Oui</button>
      <button className={styles.optionBouton} onClick={() => setIsPôleEmploiModalOpen(true)}>Non</button>
    </div>
  </>;
}
