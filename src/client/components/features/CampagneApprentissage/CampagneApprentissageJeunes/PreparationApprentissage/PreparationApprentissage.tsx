import classNames from 'classnames';
import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './PreparationApprentissage.module.scss';

export default function PreparationApprentissage() {
	return (
		<div
			className={styles.preparationApprentissage}>
			<Container className={styles.contenu}>
				<section className={styles.choixApprentissage} aria-labelledby={'titre-section-choix-apprentissage'}>
					<h2 className={styles.titleChoixApprentissage} id={'titre-section-choix-apprentissage'}>
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
				</section>
				<section className={styles.prepaApprentissage} aria-labelledby={'titre-section-prepa-apprentissage'}>
					<h2 className={styles.titlePrepaApprentissage} id={'titre-section-prepa-apprentissage'}>
						La prépa-apprentissage c’est quoi ?
					</h2>
					<Link
						className={classNames(styles.linkPrepaApprentissage, styles.link)}
						href={'/articles/la-prepa-apprentissage-c-est-quoi'}
						appearance={'asPrimaryButton'}>
						Lire l‘article
					</Link>
				</section>
			</Container>
		</div>);
}
