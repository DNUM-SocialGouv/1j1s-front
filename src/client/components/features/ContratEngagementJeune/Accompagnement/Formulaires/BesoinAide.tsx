import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';

export default function BesoinAide({ setTypeFormulaireAffiché, setIsDispositifsReferencesModalOpen }: FormulairesProps) {
  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('PasDAccompagnement')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Avez-vous besoin d’aide pour vous orienter, chercher un emploi, une alternance, une formation, ou travailler votre projet professionnel ?</p>
    <div>
      <button className={styles.optionBouton}>Oui</button>
      <button className={styles.optionBouton} onClick={() => setIsDispositifsReferencesModalOpen(true)}>Non</button>
    </div>
  </>;
}

