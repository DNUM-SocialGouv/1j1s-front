import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

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
					<LinkStyledAsButton
						className={styles.monEspaceConnexion}
						href="https://www.lesentreprises-sengagent.gouv.fr/login"
						appearance="asPrimaryButton">
						Se connecter
					</LinkStyledAsButton>
					<LinkStyledAsButton 
						appearance={'asQuaternayButton'} 
						icon={<Icon name="information"/>} 
						iconPosition={'left'}
						className={styles.monEspaceInscription}
						href="/les-entreprises-s-engagent">
						Pas encore inscrit ? Rejoignez la mobilisation
					</LinkStyledAsButton>
				</div>
			</Container>
		</section>
	);
}
