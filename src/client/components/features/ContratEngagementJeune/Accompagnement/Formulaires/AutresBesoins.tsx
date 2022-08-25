import React, { useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function AutresBesoins({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen, setIsPôleEmploiModalOpen }: FormulairesProps) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };

  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide2')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Rencontrez-vous d’autres besoins ?</p>
    <div>
      <button className={isActive ? styles.accompagnementIsActive : styles.accompagnementBoutons} onClick={toggleClass}>Logement</button>
      <button className={isActive ? styles.accompagnementIsActive : styles.accompagnementBoutons} onClick={toggleClass}>Santé</button>
    </div>
    <div className={styles.accompagnementBoutons}>
      {isActive ?
        <Button buttonType={'primary'} onClick={() => setIsMissionLocaleModalOpen(true)}>Valider</Button> :
        <Button buttonType={'primary'} onClick={() => setIsPôleEmploiModalOpen(true)}>Valider</Button>
      }
    </div>
  </>;
}
