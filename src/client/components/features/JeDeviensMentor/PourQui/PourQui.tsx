import styles from '~/client/components/features/JeDeviensMentor/PourQui/PourQui.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';
import Marked from '~/client/components/ui/Marked/Marked';

export function PourQui() {
  return (
    <div className={styles.pourqui}>
      <Container className={styles.container}>
        <Marked markdown={contenuHeader} />

        <div className={styles.linkAsButtonWrapper}>
          <LinkAsButton
            href="https://www.1jeune1mentor.fr/formulaire-mentor?1jeune1solution"
            target="_blank"
          >
                    Je deviens mentor
          </LinkAsButton>
          <LinkAsButton
            href="/les-entreprises-s-engagent"
            className={styles.linkAsButtonMentorat}
          >
                    J&apos;engage mon entreprise
          </LinkAsButton>
        </div>
      </Container>
    </div>);
}

const contenuHeader = `
1 jeune 1 mentor, accompagner un jeune pour l'aider à réussir
=============================================================

Faites la rencontre qui change tout !

*   **Vous êtes employeur ou citoyen et souhaitez devenir mentor ?**  
    Embarquer dans une aventure humaine hors du commun, pour partager votre expérience, favoriser l'égalité des chances et continuer à apprendre en accompagnant un jeune.

*   **Votre entreprise recrute ou porte une initiative pour les jeunes ? Rejoignez la mobilisation !**  
    Permettez à votre entreprise d’apporter des solutions pour les jeunes, rejoignez des milliers d’entreprises déjà engagées et bénéficiez de services inédits.
`;

