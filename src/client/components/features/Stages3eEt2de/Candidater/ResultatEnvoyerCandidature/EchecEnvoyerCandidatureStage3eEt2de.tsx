import { Container } from '../../../../layouts/Container/Container';
import { ButtonComponent } from '../../../../ui/Button/ButtonComponent';
import { BackButton } from '../../../ButtonRetour/BackButton';
import styles
	from './ResultatEnvoyerCandidatureStage3eEt2de.module.scss';

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
