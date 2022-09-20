import Image from 'next/image';
import logoImage from 'public/images/CEJ/logo.svg';
import logoApple from 'public/images/logos/apple.svg';
import logoGoogle from 'public/images/logos/google-play.svg';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Application/Application.module.scss';

export default function Application() {
  return (
    <div className={styles.application}>
      <div className={styles.applicationContainer}>

        <Image priority src={logoImage} alt={'accroche'}/>

        <div className={styles.applicationDescription}>
          L&apos;appli qui vous permet d&apos;échanger plus facilement avec votre conseiller et de réaliser vos recherches d&apos;emploi,
          d&apos;immersion, d&apos;alternance et de service civique.
        </div>

        <div className={styles.applicationLogoContainer}>
          <div className={styles.applicationLogo}>
            <Image priority src={logoGoogle} alt={'Logo Google Play Store'}/>
            <a href="https://play.google.com/store/apps/details?id=fr.fabrique.social.gouv.passemploi&gl=FR"
              className={'underline-none'}>
              Get it on <br/>
              <span className={styles.applicationLogoStore}>Google Play</span>
            </a>
          </div>
          <div className={styles.applicationLogo}>
            <Image priority src={logoApple} alt={'Logo Apple App Store'}/>
            <a href="https://apps.apple.com/fr/app/contrat-dengagement-jeune/id1581603519"
              className={'underline-none'}>
              Download on the <br/>
              <span className={styles.applicationLogoStore}>APP Store</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
