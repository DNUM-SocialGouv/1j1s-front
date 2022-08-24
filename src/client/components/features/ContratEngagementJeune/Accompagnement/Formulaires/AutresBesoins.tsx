import React, { useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function AutresBesoins({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen }: FormulairesProps) {
  const [isActive, setActive] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
    setActive(true);
  };


  return <>
    <p className={styles.accompagnementQuestion}>Rencontrez-vous d’autres besoins ?</p>
    <div className={styles.accompagnementBoutons}>
      <button onClick={toggleClass}>Logement
        {isActive ? 'black' : ''}</button>
      <button onClick={toggleClass}>Santé</button>
      <button onClick={toggleClass}>Difficultés administratives ou juridiques</button>
      <button onClick={toggleClass}>Problématique d’accès aux droits</button>
      <button onClick={toggleClass}>Maîtrise de français</button>
      <button onClick={toggleClass}>Contraintes familiales</button>
    </div>
    {isActive ?
      <Button buttonType={'primary'} onClick={() => setIsMissionLocaleModalOpen(true)}>Valider</Button> :
      <Button buttonType={'primary'} onClick={() => setTypeFormulaireAffiché('Démarrage')}>Valider</Button>
    }
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide2')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
  </>;
}
