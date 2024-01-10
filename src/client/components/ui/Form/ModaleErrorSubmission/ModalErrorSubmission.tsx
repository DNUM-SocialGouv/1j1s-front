import React from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

import { ModalComponent } from '../../Modal/ModalComponent';
import styles from './ModalErrorSubmission.module.scss';

interface ModaleErrorSubmissionProps {
	isOpen: boolean
	onClose: () => void
	onBackToForm: () => void
	description?: React.ReactElement | string
}

export function ModalErrorSubmission({ isOpen, onClose, description, onBackToForm }: ModaleErrorSubmissionProps) {
	return <ModalComponent isOpen={isOpen} close={onClose} aria-labelledby={'error_title'}>
		<ModalComponent.Content className={styles.content}>
			<ModalComponent.Title className={styles.title} id={'error_title'}>
				Une erreur est survenue lors de l‘envoi du formulaire
			</ModalComponent.Title>
			{
				description && <div className={styles.description}>
					{description}
				</div>
			}
			<span className={styles.redirections}>
				<ButtonComponent appearance={'primary'} onClick={onBackToForm} label={'Retour au formulaire'}/>
				<LinkStyledAsButtonWithIcon appearance={'asSecondaryButton'} href="/">
					Aller à l‘accueil
				</LinkStyledAsButtonWithIcon>
			</span>
		</ModalComponent.Content>
	</ModalComponent>;
}

