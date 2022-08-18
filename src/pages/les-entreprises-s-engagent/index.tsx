import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import Marked from '~/client/components/ui/Marked/Marked';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './LesEntreprisesSEngagent.module.scss';

const contenuHeader = `
Votre entreprise recrute ou porte une initiative pour les jeunes ?
==================================================================

Rejoignez la mobilisation !

**La jeunesse est notre priorité.** Partout en France, des entreprises, chacune à leur échelle et selon leurs possibilités, cherchent ou apportent toutes sortes de solutions pour les jeunes. Rejoignez-les, et **bénéficiez de services inédits** : un accompagnement personnalisé si vous le souhaitez, des aides pour communiquer, etc.
`;

export default function LesEntreprisesSEngagent() {
  return (
    <>
      <HeadTag
        title="Les entreprises s'engagent | 1jeune1solution"
        description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
      />
      <main id="contenu">
        <div className={styles.content}>
          <Marked markdown={contenuHeader} />

          <div className={styles.linkAsButtonWrapper}>
            <LinkAsButton
              href="/les-entreprises-s-engagent/inscription"
            >
              Rejoindre la mobilisation
            </LinkAsButton>
            <LinkAsButton
              className={styles.linkAsButtonMentorat}
              href="https://lesentreprises-sengagent.gouv.fr/les-entreprises-engagees"
              target="_blank"
            >
              J&apos;engage mon entreprise
            </LinkAsButton>
          </div>
        </div>
      </main>
    </>
  );
}
