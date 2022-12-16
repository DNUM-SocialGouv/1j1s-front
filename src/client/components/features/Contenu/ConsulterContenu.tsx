import styles from '~/client/components/features/Contenu/ConsulterContenu.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import Marked from '~/client/components/ui/Marked/Marked';
import markedStyles from '~/client/components/ui/Marked/Marked.module.scss';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export interface ConsulterContenuProps {
  titre: string
  contenu: string
}

export function ConsulterContenu({ titre, contenu }: ConsulterContenuProps) {
  return (
    <main id="contenu">
      <Container>
        <article className={styles.article}>
          <HeadTag title={`${titre} | 1jeune1solution`}></HeadTag>
          <Marked markdown={contenu} className={markedStyles.normalize}/>
        </article>
      </Container>
    </main>
  );
}
