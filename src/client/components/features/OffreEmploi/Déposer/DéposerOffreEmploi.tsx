import styles from '~/client/components/features/OffreEmploi/Déposer/DéposerOffreEmploi.module.scss';
import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';

export function DéposerOffreEmploi() {
  return (
    <>
      <HeadTag title="Déposer une offre d'emploi ou d'alternance | 1jeune1solution"/>
      <Hero className={styles.hero}>
        <p><b>Déposez votre offre d&apos;emploi ou d&apos;alternance sur 1jeune1solution</b></p>
        <p className={styles.heroSubtitle}>En partenariat avec Pôle Emploi</p>
      </Hero>
      <div className={styles.section}>
        <iframe className={styles.iframe} src="https://deposer-offre.www.1jeune1solution.gouv.fr/#/deposer-offre"/>
        <div className={styles.rgpd}>
          Vous êtes informé que vos données sont collectées et traitées par Pôle emploi pour traiter votre demande de dépôt d&apos;offre. Pour en savoir
          plus sur vos droits, consultez la <a
            href={'https://www.pole-emploi.fr/informations/informations-legales-et-conditio/protection-des-donnees-personnel.html'}>Politique de
          Confidentialité</a> de Pôle emploi. En cliquant sur « confirmer » vous reconnaissez avoir pris connaissance et accepter les <a
            href={'https://www.pole-emploi.fr/informations/informations-legales-et-conditio/conditions-generales-dutilisatio.html'}>Conditions Générales
          d&apos;Utilisation</a> de Pôle Emploi.
        </div>
      </div>
    </>
  );
}
