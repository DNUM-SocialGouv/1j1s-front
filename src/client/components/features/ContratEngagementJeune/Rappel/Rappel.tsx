import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Rappel/Rappel.module.scss';
import { Button } from '~/client/components/ui/Button/Button';

export default function Rappel() {
  return (
    <section className={ styles.rappel }>
      <div className={ styles.rappelContainer }>
        <h2 className={ styles.rappelContainer__Title }>J&apos;ai des questions sur le Contrat d&apos;Engagement Jeune et souhaite être rappelé(e)</h2>
        <Button
          buttonType="primary"
        >
          Je souhaite être rappelé(e)
        </Button>
      </div>
    </section>
  );
}
