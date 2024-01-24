import { Container } from '../../../../layouts/Container/Container';
import { LinkStyledAsButton } from '../../../../ui/LinkStyledAsButton/LinkStyledAsButton';
import { BackButton } from '../../../ButtonRetour/BackButton';
import styles from './ResultatEnvoyerCandidatureStage3eEt2de.module.scss';

export function SuccesEnvoyerCandidatureStage3eEt2de() {
	return <Container className={styles.container}>
		<h1 className={styles.titreSucces}>Féliciations, vos informations ont bien été envoyées</h1>
		<p className={styles.texte}>L’entreprise a choisi d’être contactée par e-mail. Elle recevra donc vos informations et vous recontactera par la suite.</p>
		<div className={styles.boutonsCTA}>
			<BackButton
				label="Continuer la recherche"
				aria-label="Continuer la recherche"
				icon={undefined}
				iconPosition={undefined}
				className={styles.boutonContinuerRecherche}
				appearance={'primary'}
			/>
			<LinkStyledAsButton
				href={'/'}
				appearance={'asSecondaryButton'}
				className={styles.boutonRetourAccueil}
			>
				Retour à l’accueil
			</LinkStyledAsButton>
		</div>
	</Container>;
}
