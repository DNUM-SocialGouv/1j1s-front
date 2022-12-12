import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/RecrutementCandidatPôleEmploi.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

export default function RecrutementCandidatPôleEmploi() {
  return (
    <>
      <div className={styles.contenu}>
        <Container className={styles.container}>
          <h1>Je m’engage à recruter des candidats formés avec l’aide de Pôle emploi (AFPR/POEI)</h1>
          <p>Formez un candidat à vos besoins. Bénéficiez d’une <b>aide au financement</b> de la formation, <b>anticipez vos besoins</b> en recrutement sur vos métiers en tension et <b>améliorez l’intégration des jeunes</b> en entreprise</p>
          <Link className={styles.bouton} href='/je-recrute-afpr-poei/inscription' appearance="asPrimaryButton">Être recontacté(e) par un conseiller Pôle Emploi</Link>
        </Container>
      </div>
    </>
  );
}
