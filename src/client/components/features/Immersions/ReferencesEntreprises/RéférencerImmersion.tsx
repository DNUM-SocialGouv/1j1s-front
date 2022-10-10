import styles from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerImmersion.module.scss';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const subtitle = 'Ce formulaire vous permet d\'indiquer les métiers de votre établissement ouverts aux immersions. Si votre entreprise comprend plusieurs établissements, il convient de renseigner un formulaire pour chaque établissement (SIRET différent).';
const immersionFacileUrl = 'https://immersion-facile.beta.gouv.fr/etablissement/unJeuneUneSolution';

export function RéférencerImmersion() {
  return (
    <>
      <HeadTag title="je référence mon entreprise pour des immersions | 1jeune1solution"/>
      <Hero className={styles.hero}>
        <p><b>Je référence mon entreprise</b></p>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </Hero>
      <div className={styles.section}>
        <iframe className={styles.iframe} src={immersionFacileUrl}/>
        <div className={styles.rgpd}>
          Vous êtes informé que vos données sont collectées et traitées par le Groupement d&apos;intérêt public de plateforme de l&apos;inclusion pour
          traiter votre demande de référencement de votre entreprise. Pour en savoir plus sur vos droits consultez la <a
            href={'https://immersion-facile-1.gitbook.io/mentions-legales/politique-de-confidentialite'}>Politique de Confidentialité</a> du Groupement
          d&apos;intérêt public de plateforme de l&apos;inclusion. En cliquant sur « confirmer » vous reconnaissez avoir pris connaissance et accepter
          les <a href={'https://immersion-facile-1.gitbook.io/mentions-legales/conditions-generales-dutilisation'}>Conditions Générales
          d&apos;Utilisation</a> du Groupement d&apos;intérêt public de plateforme de l&apos;inclusion.
        </div>
      </div>
    </>
  );
}
