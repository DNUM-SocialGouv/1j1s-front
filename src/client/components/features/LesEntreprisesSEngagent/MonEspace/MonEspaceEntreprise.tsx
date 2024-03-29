import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './MonEspaceEntreprise.module.scss';

export default function MonEspaceEntreprise() {

	return (
		<section className={styles.monEspace}>
			<Container className={styles.container}>
				<h1 className={styles.monEspaceTitre}>Les entreprises s‘engagent auprès de la jeunesse !</h1>
				<div className={styles.monEspaceAccroche}>J‘accède à mon espace entreprise</div>
				<div className={styles.monEspaceDescription}>
					<strong>Vous avez déjà rejoint la mobilisation &quot;Les entreprises s‘engagent&quot; pour les jeunes
						?</strong>
					<div>Pour accéder à tous les services qui vous aideront à réaliser et valoriser vos engagements pour la
						jeunesse, connectez-vous à votre
						espace sur la plateforme &quot;Les entreprises s‘engagent&quot;.
					</div>
				</div>
				<div className={styles.containerBoutons}>
					<Link
						className={styles.monEspaceConnexion}
						href="https://www.lesentreprises-sengagent.gouv.fr/login"
						appearance="asPrimaryButton">
						Se connecter
						<Link.Icon/>
					</Link>
					<Link
						appearance={'asQuaternaryButton'}
						className={styles.monEspaceInscription}
						href="/les-entreprises-s-engagent">
						<Link.Icon name="information"/>
						Pas encore inscrit ? Rejoignez la mobilisation
					</Link>
				</div>
			</Container>
		</section>
	);
}
