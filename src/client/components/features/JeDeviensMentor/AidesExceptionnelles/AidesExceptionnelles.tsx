import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles.module.scss';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import Marked from '~/client/components/ui/Marked/Marked';

export default function AidesExceptionnelles() {

  return (
    <section className={styles.aides}>
      <div className={styles.aidesContainer}>
        <Marked markdown={'## Les entreprises s’engagent, une mobilisation des entreprises pour l’emploi des jeunes'}/>
        <LinkAsButton
          href="/inscription"
          className={styles.aidesContainerLink}
        >
          Rejoindre la mobilisation
        </LinkAsButton>
      </div>
    </section>
  );
}
