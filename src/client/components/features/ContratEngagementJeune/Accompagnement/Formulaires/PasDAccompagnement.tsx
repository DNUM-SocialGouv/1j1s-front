import React from 'react';

import { FormulairesProps } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function PasDAccompagnement({ setTypeFormulaireAffiché, setIsMissionLocaleModalOpen }: FormulairesProps) {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const isMobile = isSmallScreen || isMediumScreen;

  return <>
    <button className={styles.boutonRetour} onClick={() => setTypeFormulaireAffiché('Démarrage')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Quel âge avez-vous ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton} onClick={() => setIsMissionLocaleModalOpen(true)}>Moins de 18 ans</button>
      <button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('BesoinAide')}>Entre 18 et 25 ans</button>
      <button className={styles.optionBouton} onClick={() => setTypeFormulaireAffiché('BesoinAide')}>Plus de 26 ans</button>
    </div>
  </>;
}
