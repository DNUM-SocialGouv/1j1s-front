import React from 'react';

import { Formulaires } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import { AngleLeftIcon } from '~/client/components/ui/Icon/angle-left.icon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface PasDAccompagnementProps {
  onClick: (formulaire: Formulaires) => void
}

export default function PasDAccompagnement({ onClick }: PasDAccompagnementProps) {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const isMobile = isSmallScreen || isMediumScreen;

  return <>
    <button className={styles.boutonRetour} onClick={() => onClick('Démarrage')}>
      <AngleLeftIcon className={styles.iconeRetour}/> Retour
    </button>
    <p className={styles.accompagnementQuestion}>Quel âge avez-vous ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton}>Moins de 18 ans</button>
      <button className={styles.optionBouton}>Entre 18 et 25 ans</button>
      <button className={styles.optionBouton}>Plus de 26 ans</button>
    </div>
  </>;
}
