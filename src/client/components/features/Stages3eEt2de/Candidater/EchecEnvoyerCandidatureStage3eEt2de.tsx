import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import styles
	from '~/client/components/features/Stages3eEt2de/Candidater/ResultatEnvoyerCandidatureStage3eEt2de.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';

export function EchecEnvoyerCandidatureStage3eEt2de(props: {
	retourFormulaire: () => void,
}) {
	return <Container className={styles.container}>
		<h1 className={styles.titreErreur}>Une erreur est survenue</h1>
		<p className={styles.texte}>Nous n’avons pas pu envoyer vos informations à l’entreprise. Veuillez réessayer plus tard</p>
		<div className={styles.boutonsCTA}>
			<ButtonComponent
				appearance={'primary'}
				label="Retour au formulaire"
				onClick={props.retourFormulaire}
				className={styles.boutonRetourFormulaire}
			/>
			<BackButton
				label="Retour à la recherche"
				aria-label="Retour à la recherche"
				icon={undefined}
				iconPosition={undefined}
				className={styles.boutonRetourRecherche}
				appearance={'secondary'}
			/>
		</div>
	</Container>;
}
