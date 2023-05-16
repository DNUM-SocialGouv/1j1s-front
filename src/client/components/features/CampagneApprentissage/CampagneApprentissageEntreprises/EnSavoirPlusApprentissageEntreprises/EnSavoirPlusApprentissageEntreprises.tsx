import React from 'react';
import { Container } from 'src/client/components/layouts/Container/Container';
import { Link } from 'src/client/components/ui/Link/Link';

import styles from './EnSavoirPlusApprentissageEntreprises.module.scss';

export default function EnSavoirPlusApprentissageEntreprises() {
	return <Container className={styles.enSavoirPlus}>
		<div className={styles.enSavoirPlusFaq}>
			<h2 className={styles.heading}>On répond à toutes vos questions<br/> sur l’apprentissage</h2>
			<Link className={styles.link} href="/faq/apprentissage-employeurs-apprentis" appearance="asPrimaryButton">
				Consulter la FAQ
			</Link>
		</div>
		<div className={styles.enSavoirPlusDepotOffre}>
			<h2 className={styles.heading}>
				Vous êtes à la recherche d’un apprenti ?
			</h2>
			<Link className={styles.link} href="/apprentissage/deposer-offre" appearance="asPrimaryButton">
				Déposer une offre
			</Link>
		</div>
	</Container>;
}
