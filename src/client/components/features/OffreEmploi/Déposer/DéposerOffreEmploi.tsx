import styles from '~/client/components/features/OffreEmploi/Déposer/DéposerOffreEmploi.module.scss' ;
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export function DéposerOffreEmploi () {
  return (
    <>
      <HeadTag title="Déposer une offre d'emploi ou d'alternance | 1jeune1solution" />
      <Hero className={ styles.hero }>
        <p><b>Déposez votre offre d&apos;emploi ou d&apos;alternance sur 1jeune1solution</b></p>
        <p className={styles.heroSubtitle}>En partenariat avec Pôle Emploi</p>
      </Hero>
      <div className={ styles.section }>
        <iframe className={styles.iframe} src="https://deposer-offre.www.1jeune1solution.gouv.fr/#/deposer-offre" />
      </div>
    </>
  );
}
