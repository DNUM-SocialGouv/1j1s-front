import { Container } from '~/client/components/layouts/Container/Container';

import styles from './SuccessEnvoyerCandidatureStage3eEt2de.module.scss';

export function SuccesEnvoyerCandidatureStage3eEt2de() {
	return <Container>
		<h1 className={styles.titre}>Féliciations, vos informations ont bien été envoyées</h1>
		<p className={styles.texte}>L’entreprise a choisi d’être contactée par e-mail. Elle recevra donc vos informations et vous recontactera par la suite.</p>
	</Container>;
}
