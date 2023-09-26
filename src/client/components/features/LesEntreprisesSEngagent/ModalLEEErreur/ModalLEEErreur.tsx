import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/ModalLEEErreur/ModalLEEErreur.module.scss';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export function ModalLEEErreur(props: { open: boolean, close: () => void }) {
	return <ModalComponent
		isOpen={props.open}
		close={props.close}
	>
		<ModalComponent.Content className={styles.modal}>
			<h1 className={styles.heading}>Une erreur est survenue</h1>
			<span className={styles.subHeading}>Pour plus d‘informations, rendez-vous sur le site des entreprises s‘engagent</span>
			<div className={styles.buttons}>
				<LinkStyledAsButton
					appearance="asPrimaryButton"
					href="/les-entreprises-s-engagent/inscription"
				>
					Retourner au formulaire
				</LinkStyledAsButton>
				<LinkStyledAsButton
					appearance="asSecondaryButton"
					href="/"
				>
					Aller à l’accueil
				</LinkStyledAsButton>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
