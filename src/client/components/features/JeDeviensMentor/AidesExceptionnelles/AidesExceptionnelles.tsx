import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles.module.scss';
import { AngleRightIcon } from '~/client/components/ui/Icon/angle-right.icon';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';

export default function AidesExceptionnelles() {

  return (
    <section className={ styles.aides }>
      <div className={ styles.aidesContainer }>
        <h2 className={ styles.aidesContainerTitre }>Les entreprises s’engagent,
          <span className={ styles.aidesContainerTitreAccroche }>  une mobilisation des entreprises pour l’emploi des jeunes</span>
        </h2>
        <LinkAsButton
          href="/les-entreprises-s-engagent/inscription"
          className={ styles.aidesContainerLink }
        >
          Rejoindre la mobilisation
          <AngleRightIcon className={'angle-right'}/>
        </LinkAsButton>
      </div>
    </section>
  );
}
