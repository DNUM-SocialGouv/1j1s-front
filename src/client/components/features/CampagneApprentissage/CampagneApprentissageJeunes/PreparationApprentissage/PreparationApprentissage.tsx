import classNames from 'classnames';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './PreparationApprentissage.module.scss';

export default function PreparationApprentissage() {
	return (
		<section
			aria-labelledby={'titre-section-preparation-apprentissage'}
			className={styles.preparationApprentissage}>
			<Container className={styles.contenu}>
				<div className={styles.choixApprentissage}>
					<h2 className={styles.titleChoixApprentissage} id={'titre-section-preparation-apprentissage'}>
						Vous souhaitez faire le choix de l’apprentissage ?
					</h2>
					<div className={styles.linkContainerChoixApprentissage}>
						<Link className={styles.link} href={'/formations/apprentissage'} appearance={'asPrimaryButton'}>
							Trouver votre formation en apprentissage
						</Link>
						<Link className={styles.link} href={'/apprentissage'} appearance={'asSecondaryButton'}>
							Trouver votre entreprise
						</Link>
					</div>
				</div>
				<div className={styles.prepaApprentissage}>
					<h2 className={styles.titlePrepaApprentissage} id={'titre-section-preparation-apprentissage'}>
						La prépa-apprentissage c’est quoi ?
					</h2>
					<Link
						className={classNames(styles.linkPrepaApprentissage, styles.link)}
						href={'/articles/la-prepa-apprentissage-c-est-quoi'}
						appearance={'asPrimaryButton'}>
							Lire l‘article
					</Link>
				</div>
			</Container>
		</section>);
}
