import styles from '~/client/components/features/Contenu/ConsulterContenu.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

export interface ConsulterContenuProps {
  titre: string
  contenu: string
}

export function ConsulterContenu({ titre, contenu }: ConsulterContenuProps) {
  return (
    <Container>
      <article className={styles.article}>
        <h2>{titre}</h2>
        <p dangerouslySetInnerHTML={{ __html: contenu }} />
      </article>
    </Container>
  );
}
