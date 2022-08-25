import React, { useState } from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function AutresBesoins({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen, setIsPôleEmploiModalOpen }: FormulairesProps) {
  const [isActive, setActive] = useState(false);

  function Cliked(placeholder: string, setActivePage: React.Dispatch<React.SetStateAction<boolean>>) {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
      setActive(!isActive);
      setActivePage(!isActive);
    };
    return <button onClick={toggleClass} className={isActive ? styles.accompagnementIsActive : styles.accompagnementDesactive}>{placeholder}</button>;
  }

  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Rencontrez-vous d’autres besoins ?</p>
    <div className={styles.accompagnementBoutons}>
      {Cliked('Logement', setActive)}
      {Cliked('Santé', setActive)}
      {Cliked('Difficultés administratives ou juridiques', setActive)}
      {Cliked(' Problématique d\'accès aux droits', setActive)}
      {Cliked(' Maîtrise de français', setActive)}
      {Cliked(' Contraintes familiales', setActive)}
    </div>
    <div className={styles.accompagnementValider}>
      {isActive ?
        <Button buttonType={'primary'} onClick={() => setIsMissionLocaleModalOpen(true)}>Valider</Button> :
        <Button buttonType={'primary'} onClick={() => setIsPôleEmploiModalOpen(true)}>Valider</Button>
      }
    </div>
  </>;
}
