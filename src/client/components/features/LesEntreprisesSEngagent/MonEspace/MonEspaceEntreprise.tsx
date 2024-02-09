import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

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
					<LinkStyledAsButtonWithIcon
						className={styles.monEspaceConnexion}
						href="https://www.lesentreprises-sengagent.gouv.fr/login"
						appearance="asPrimaryButton">
						Se connecter
					</LinkStyledAsButtonWithIcon>
					<Link
						appearance={'asQuaternaryButton'}
						className={styles.monEspaceInscription}
						href="/les-entreprises-s-engagent">
						Pas encore inscrit ? Rejoignez la mobilisation
						<Link.Icon name="information" position={'left'}/>
					</Link>
				</div>
			</Container>
		</section>
	);
}
