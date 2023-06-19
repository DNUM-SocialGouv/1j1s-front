import React from 'react';

import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './ModalLEEErreur.module.scss';

export function ModalLEEErreur(props: { open: boolean, close: () => void }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
	>
		<ModalComponent.Content className={styles.content}>
			<h1 className={styles.modalHeading}>Une erreur est survenue</h1>
			<small className={styles.modalSubHeading}>Pour plus d‘informations, rendez-vous sur <a
				href="https://lesentreprises-sengagent.gouv.fr/">le site des entreprises s‘engagent</a></small>
		</ModalComponent.Content>
	</ModalComponent>;
}
