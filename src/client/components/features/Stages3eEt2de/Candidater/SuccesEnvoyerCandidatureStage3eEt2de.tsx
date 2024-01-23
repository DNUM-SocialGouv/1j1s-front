import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import styles from './SuccessEnvoyerCandidatureStage3eEt2de.module.scss';

export function SuccesEnvoyerCandidatureStage3eEt2de() {
	return <Container className={styles.container}>
		<h1 className={styles.titre}>Féliciations, vos informations ont bien été envoyées</h1>
		<p className={styles.texte}>L’entreprise a choisi d’être contactée par e-mail. Elle recevra donc vos informations et vous recontactera par la suite.</p>
		<BackButton
			label="Continuer la recherche"
			aria-label="Continuer la recherche"
			icon={undefined}
			iconPosition={undefined}
			className={styles.boutonRetourDeposerOffre}
			appearance={'primary'}
		/>
		<LinkStyledAsButton
			href={'/'}
			appearance={'asSecondaryButton'}
			className={styles.boutonRetourAccueil}
		>
			Retour à l’accueil
		</LinkStyledAsButton>
	</Container>;
}
