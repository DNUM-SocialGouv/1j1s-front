import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function AutresBesoins({ setTypeFormulaireAffiché }: FormulairesProps) {

  return <>
    <p className={styles.accompagnementQuestion}>Rencontrez-vous d’autres besoins ?</p>
    <div className={ styles.accompagnementBoutons}>
      <button>Logement</button>
      <button>Santé</button>
      <button>Difficultés administratives ou juridiques</button>
      <button>Problématique d’accès aux droits</button>
      <button>Maîtrise de français</button>
      <button>Contraintes familiales</button>
    </div>
    <Button buttonType={'primary'}>Valider</Button>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('BesoinAide2')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
  </>;
}
