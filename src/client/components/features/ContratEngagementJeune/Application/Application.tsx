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

				<Image priority src={logoImage} alt={'Contrat d‘engagement jeune'} aria-hidden="true"/>

				<div className={styles.applicationDescription}>
          L‘appli qui vous permet d‘échanger plus facilement avec votre conseiller et de réaliser vos recherches d‘emploi,
          d‘immersion, d‘alternance et de service civique.
				</div>

				<div className={styles.applicationTelecharger}>
					<a
						href="https://play.google.com/store/apps/details?id=fr.fabrique.social.gouv.passemploi&gl=FR"
						className={styles.applicationTelechargerLien}
					>
						<div className={styles.applicationTelechargerLienLogo} aria-hidden="true">
							<Image src={logoGoogle} alt={''} fill/>
						</div>
						<div>
              Télécharger sur<br/>
							<span className={styles.applicationTelechargerLienStore}>Google Play</span>
						</div>
					</a>
					<a
						href="https://apps.apple.com/fr/app/contrat-dengagement-jeune/id1581603519"
						className={styles.applicationTelechargerLien}
					>
						<div className={styles.applicationTelechargerLienLogo} aria-hidden="true">
							<Image src={logoApple} alt={''} fill/>
						</div>
						<div>
              Télécharger sur<br/>
							<span className={styles.applicationTelechargerLienStore}>APP Store</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
}
