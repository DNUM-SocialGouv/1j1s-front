import React from 'react';

import styles from '~/client/components/features/JeDeviensMentor/RecrutementCandidatPôleEmploi/RecrutementCandidatPôleEmploi.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import Marked from '~/client/components/ui/Marked/Marked';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const contenuHeader = `
Je m’engage à recruter des candidats formés avec l’aide de Pôle emploi (AFPR/POEI)
=============================================================

Formez un candidat à vos besoins. Bénéficiez d’une **aide au financement** de la formation, **anticipez vos besoins** en recrutement sur vos métiers en tension et **améliorez l’intégration des jeunes** en entreprise
`;

export default function RecrutementCandidatPôleEmploi() {
  return (
    <>
      <HeadTag
        title="Je deviens mentor | 1jeune1solution"
        description="1 jeune 1 mentor, accompagner un jeune pour l’aider à réussir"
      />
      <main id="contenu" className={styles.contenu}>
        <Container className={styles.container}>
          <Marked markdown={contenuHeader}/>
          <Link className={styles.bouton} href='/je-recrute-afpr-poei/inscription' appearance="asPrimaryButton">Être recontacté(e) par un conseiller Pôle Emploi</Link>
        </Container>
      </main>
    </>
  );
}
