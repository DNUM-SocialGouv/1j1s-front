import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import classNames from 'classnames';
import { isSuccess } from '~/server/errors/either';
import React from 'react';
import styles from './ModalLEEErreur.module.scss';

export function ModalLEEErreur(props: { open: boolean, close: () => void }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
	>
		<ModalComponent.Title className={styles.modalTitle} id="dialog_label">
			Une erreur est survenue
		</ModalComponent.Title>
		<ModalComponent.Content
			className={classNames({ [styles.rappelContent]: !isSuccess, [styles.rappelContentSuccess]: isSuccess })}
		>
			<small className={styles.modalSubTitle}>Pour plus d'informations, rendez-vous sur le site des <a
				href="https://lesentreprises-sengagent.gouv.fr/">entreprises s'engagent</a></small>
		</ModalComponent.Content>
	</ModalComponent>;
}
