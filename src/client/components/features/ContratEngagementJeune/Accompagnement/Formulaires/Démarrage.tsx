import React from 'react';

import { Formulaires } from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement';
import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import useBreakpoint from '~/client/hooks/useBreakpoint';

interface DémarrageProps {
  onClick: (formulaire: Formulaires) => void
}

export default function Démarrage({ onClick }: DémarrageProps) {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const isMobile = isSmallScreen || isMediumScreen;

  return <>
    <p className={styles.accompagnementQuestion}>Bénéficiez-vous actuellement d&apos;un accompagnement ?</p>
    <div>
      {isMobile && <span>Sélectionnez l&apos;option qui vous correspond :</span>}
      <button className={styles.optionBouton}>Oui, je suis accompagné(e) par la Mission Locale</button>
      <button className={styles.optionBouton}>Oui, je suis accompagné(e) par Pôle Emploi</button>
      <button className={styles.optionBouton} onClick={() => onClick('PasDAccompagnement')}>Non, je ne bénéficie d&apos;aucun
        accompagnement
      </button>
    </div>
  </>;
}
