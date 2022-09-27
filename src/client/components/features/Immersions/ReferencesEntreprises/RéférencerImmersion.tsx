import styles from '~/client/components/features/Immersions/ReferencesEntreprises/RéférencerImmersion.module.scss';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

const subtitle = 'Ce formulaire vous permet d\'indiquer les métiers de votre établissement ouverts aux immersions. Si votre entreprise comprend plusieurs établissements, il convient de renseigner un formulaire pour chaque établissement (SIRET différent).';
const immersionFacileUrl = 'https://immersion-facile.beta.gouv.fr/etablissement/unJeuneUneSolution';

export function RéférencerImmersion () {
  return (
    <>
      <HeadTag title="je référence mon entreprise pour des immersions | 1jeune1solution" />
      <Hero className={ styles.hero }>
        <p><b>Je référence mon entreprise</b></p>
        <p className={styles.heroSubtitle}>{ subtitle }</p>
      </Hero>
      <div className={ styles.section }>
        <iframe className={styles.iframe} src={ immersionFacileUrl } />
      </div>
    </>
  );
}
