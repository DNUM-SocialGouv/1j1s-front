import React from 'react';

import styles from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerEntreprises.module.scss';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';


export function RéférencerEntreprises () {
  return (
    <section className={styles.referencer}>
      <div className={styles.referencerContainer}>
        <h2 className={styles.referencerContainerTitre}>Référencer votre entreprise afin de proposer des immersions au sein de votre entreprise</h2>
        <p>Proposer une immersion c’est permettre à des jeunes :</p>
        <ul>
          <li>De découvrir un métier</li>
          <li>De les aider à confirmer un projet professionnel en situation réelle de travail</li>
          <li>D’initier un parcours d’embauche pour leur permettre d’accéder à un emploi ou dans le cadre d’une reconversion</li>
        </ul>
        <div className={styles.referencerContainerBouton}>
          <LinkAsButton href={'https://immersion-facile.beta.gouv.fr/etablissement/lesentreprises-sengagent'}>
            Référencer mon entreprise
          </LinkAsButton>
        </div>
      </div>
    </section>

  );
}
