import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';
import Marked from '~/client/components/ui/Marked/Marked';
import useBreakpoint from '~/client/hooks/useBreakpoint';

const titre = `
## J'ai des questions sur le Contrat d'Engagement Jeune et souhaite être rappelé(e)
`;
const titreMobile = `
## J'ai des questions sur le Contrat d'Engagement Jeune
`;

export default function Rappel() {
  const { isSmallScreen, isMediumScreen } = useBreakpoint();
  const displayScreen = isSmallScreen || isMediumScreen;
  const buttonMobile = 'Je me lance  >';
  const buttonTitle = 'Je souhaite être rappelé(e)';
  return (
    <section className={ styles.rappel }>
      <div className={ styles.rappelContainer }>
        {displayScreen ? <Marked markdown={ titreMobile }/> : <Marked markdown={ titre }/> }
        <Button
          buttonType="primary"
        >
          {displayScreen ? buttonMobile : buttonTitle }
        </Button>
      </div>
    </section>
  );
}
