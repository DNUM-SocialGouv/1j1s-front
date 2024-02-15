import React from 'react';
import { Container } from 'src/client/components/layouts/Container/Container';

import { Link } from '~/client/components/ui/Link/Link';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from './EnSavoirPlusApprentissageJeunes.module.scss';

export default function EnSavoirPlusApprentissageJeunes() {
	return <Container className={styles.enSavoirPlus}>
		<div className={styles.enSavoirPlusParents}>
			<h2 className={styles.heading}>L’apprentissage vous intéresse&nbsp;? <span className={styles.headingSecondary}>On répond à toutes vos questions</span></h2>
			<Link className={styles.link} href="/faq/apprentissage-parents-enfants" appearance="asPrimaryButton">
				Consulter la FAQ
				<Link.Icon/>
			</Link>
		</div>
		<div className={styles.enSavoirPlusEmployeurs}>
			<h2 className={styles.heading}>Employeurs : tout ce qu’il y a à savoir <span className={styles.headingSecondary}>sur l’apprentissage pour votre entreprise</span>
			</h2>
			<Link className={styles.link} href="/apprentissage-entreprises" appearance="asPrimaryButton">
				Découvrir l’apprentissage
				<Link.Icon/>
			</Link>
		</div>
	</Container>;
}
