import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';


export default function Démarrage({ setTypeFormulaireAffiché, setIsPôleEmploiModalOpen }: FormulairesProps) {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const isMobile = isSmallScreen || isMediumScreen;

  return <>
    <p className={styles.accompagnementQuestion}>Bénéficiez-vous actuellement d&apos;un accompagnement ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton}>
        Oui, je suis accompagné(e) par la Mission Locale
      </button>
      <button className={styles.optionBouton} onClick={() => setIsPôleEmploiModalOpen(true)}>
        Oui, je suis accompagné(e) par Pôle Emploi
      </button>
      <button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('PasDAccompagnement')}>
        Non, je ne bénéficie d&apos;aucun accompagnement
      </button>
    </div>
  </>;
}
