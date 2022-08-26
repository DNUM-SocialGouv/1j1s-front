import styles from '~/client/components/features/Contenu/ConsulterContenu.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import Marked from '~/client/components/ui/Marked/Marked';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export interface ConsulterContenuProps {
  titre: string
  contenu: string
}

export function ConsulterContenu({ titre, contenu }: ConsulterContenuProps) {
  return (
    <Container>
      <article className={styles.article}>
        <HeadTag title={`${titre} | 1jeune1solution`}></HeadTag>
        <Marked markdown={contenu} />
        <p dangerouslySetInnerHTML={{ __html: contenu }} />
      </article>
    </Container>
  );
}
