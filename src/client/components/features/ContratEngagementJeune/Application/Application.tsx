import logoImage from 'public/images/CEJ/logo.svg';
import logoApple from 'public/images/logos/apple.svg';
import logoGoogle from 'public/images/logos/google-play.svg';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Application/Application.module.scss';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';

export default function Application() {
	return (
		<div className={styles.application}>
			<div className={styles.applicationContainer}>

				<Image src={logoImage} alt={'Contrat d‘engagement jeune'} aria-hidden="true" />

				<div className={styles.applicationDescription}>
					L‘appli qui vous permet d‘échanger plus facilement avec votre conseiller et de réaliser vos recherches
					d‘emploi,
					d‘immersion, d‘alternance et de service civique.
				</div>

				<div className={styles.applicationTelecharger}>
					<Link
						href="https://play.google.com/store/apps/details?id=fr.fabrique.social.gouv.passemploi&gl=FR"
						className={styles.applicationTelechargerLien}>
						<div className={styles.applicationTelechargerLienLogo} aria-hidden="true">
							<Image src={logoGoogle} alt={''} fill />
						</div>
						<div>
							Télécharger sur <span>Google Play</span>
						</div>
					</Link>
					<Link
						href="https://apps.apple.com/fr/app/contrat-dengagement-jeune/id1581603519"
						className={styles.applicationTelechargerLien}>
						<div className={styles.applicationTelechargerLienLogo} aria-hidden="true">
							<Image src={logoApple} alt={''} fill />
						</div>
						<div>
							Télécharger sur <span>APP Store</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
