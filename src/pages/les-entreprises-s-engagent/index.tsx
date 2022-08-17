import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './LesEntreprisesSEngagent.module.scss';

export default function LesEntreprisesSEngagent() {
  return (
    <>
      <HeadTag
        title="Les entreprises s'engagent | 1jeune1solution"
        description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
      />
      <main id="contenu">
        <div className={styles.heading}>
          <h1>Votre entreprise recrute ou porte une initiative pour les jeunes ?</h1>
          <p>
            Rejoignez la mobilisation !
          </p>
          <p>
            <strong>La jeunesse est notre priorité. </strong>
            Partout en France, des entreprises, chacune à leur échelle et selon leurs possibilités, cherchent ou apportent toutes sortes de solutions pour les jeunes.
            Rejoignez-les, et <strong>bénéficiez de services inédits</strong> : un accompagnement personnalisé si vous le souhaitez, des aides pour communiquer, etc.
          </p>

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
