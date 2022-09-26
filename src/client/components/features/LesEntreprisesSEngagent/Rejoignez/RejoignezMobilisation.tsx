import Image from 'next/image';
import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/Rejoignez/RejoignezMobilisation.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import Marked from '~/client/components/ui/Marked/Marked';

const contenuHeader = `
Votre entreprise recrute ou porte une initiative pour les jeunes ?
==================================================================

Rejoignez la mobilisation !

**La jeunesse est notre priorité.** Partout en France, des entreprises, chacune à leur échelle et selon leurs possibilités, cherchent ou apportent toutes sortes de solutions pour les jeunes. Rejoignez-les, et **bénéficiez de services inédits** : un accompagnement personnalisé si vous le souhaitez, des aides pour communiquer, etc.
`;

export default function RejoignezMobilisation() {
  return <div className={styles.content}>
    <Container className={styles.container} >
      <div className={styles.lesEntreprisesSEngagent}>
        <Image src="/icons/les-entreprises-s-engagent.svg" alt="" width="65" height="65"/>
        <span>Les entreprises s&apos;engagent</span>
      </div>
      <Marked markdown={contenuHeader}/>

      <div className={styles.linkAsButtonWrapper}>
        <LinkAsButton href="/les-entreprises-s-engagent/inscription">
        Rejoindre la mobilisation
        </LinkAsButton>
        <LinkAsButton
          className={styles.linkAsButtonMentorat}
          href="https://lesentreprises-sengagent.gouv.fr/les-entreprises-engagees"
          target="_blank"
        >
        Découvrir les entreprises engagées
        </LinkAsButton>
      </div>
    </Container>
  </div>;
}
