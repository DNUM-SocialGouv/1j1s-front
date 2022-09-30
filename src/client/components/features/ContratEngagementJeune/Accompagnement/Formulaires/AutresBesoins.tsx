import React, { useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function AutresBesoins({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen, setIsPôleEmploiDeuxièmeModalOpen }: FormulairesProps) {
  const [activeCounter, setActiveCounter] = useState(0);


  function BoutonAutreBesoin(placeholder: string) {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
      setActive(!isActive);
      if (!isActive) {
        setActiveCounter(activeCounter + 1);
      } else {
        setActiveCounter(activeCounter - 1);
      }

    };
    return <button onClick={toggleClass} className={isActive ? styles.accompagnementIsActive : styles.accompagnementDesactive}>{placeholder}</button>;
  }

  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Rencontrez-vous d’autres besoins ?</p>
    <div className={styles.accompagnementBoutons}>
      {BoutonAutreBesoin('Logement')}
      {BoutonAutreBesoin('Santé')}
      {BoutonAutreBesoin('Difficultés administratives ou juridiques')}
      {BoutonAutreBesoin('Problématique d\'accès aux droits')}
      {BoutonAutreBesoin('Maîtrise de français')}
      {BoutonAutreBesoin('Contraintes familiales')}
    </div>
    <div className={styles.accompagnementValider}>
      {activeCounter > 0
        ? <Button buttonType={'primary'} onClick={() => setIsMissionLocaleModalOpen(true)}>Valider</Button>
        : <Button buttonType={'primary'} onClick={() => setIsPôleEmploiDeuxièmeModalOpen(true)}>Valider</Button>
      }
    </div>
  </>;
}
