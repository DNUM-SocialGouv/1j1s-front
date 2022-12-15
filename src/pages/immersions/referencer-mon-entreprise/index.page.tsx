import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './index.module.scss';

const POLITIQUE_DE_CONFIDENTIALITÉ_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/politique-de-confidentialite';
const CONDITIONS_GÉNÉRALES_UTILISATION_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/conditions-generales-dutilisation';

export default function ImmersionReferenceMonEntreprisePage() {
  return (
    <>
      <HeadTag title="je référence mon entreprise pour des immersions | 1jeune1solution"/>
      <Hero>
        <p><b>Je référence mon entreprise</b></p>
        <p className={styles.heroSubtitle}>
          Ce formulaire vous permet d‘indiquer les métiers de votre établissement ouverts aux immersions. Si votre
          entreprise comprend plusieurs établissements, il convient de renseigner un formulaire pour chaque
          établissement (SIRET différent).
        </p>
      </Hero>
      <Container>
        <iframe
          className={styles.iframe}
          src="https://immersion-facile.beta.gouv.fr/etablissement/unJeuneUneSolution"
          title="Formulaire recueil des entreprises volontaires pour l‘accueil des immersions professionnelles"
        />
        <p className={styles.rgpd}>
          Vous êtes informé que vos données sont collectées et traitées par le Groupement d‘intérêt public de
          plateforme de l‘inclusion pour traiter votre demande de référencement de votre entreprise. Pour en savoir plus
          sur vos droits consultez la <a href={POLITIQUE_DE_CONFIDENTIALITÉ_URL}>Politique de Confidentialité</a> du
          Groupement d‘intérêt public de plateforme de l‘inclusion. En cliquant sur «&nbsp;confirmer&nbsp;» vous reconnaissez
          avoir pris connaissance et accepter les <a href={CONDITIONS_GÉNÉRALES_UTILISATION_URL}>Conditions Générales
          d‘Utilisation</a> du Groupement d‘intérêt public de plateforme de l‘inclusion.
        </p>
      </Container>
    </>
  );
}
