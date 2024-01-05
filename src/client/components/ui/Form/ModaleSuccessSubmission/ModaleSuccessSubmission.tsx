import { CheckIcon } from '../../Icon/check.icon';
import { ModalComponent } from '../../Modal/ModalComponent';
import styles from './ModaleSuccessSubmission.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';

interface ModaleSuccessSubmissionProps {
	isOpen: boolean
	onClose: () => void
}

export function ModaleSuccessSubmission({ isOpen, onClose }: ModaleSuccessSubmissionProps){
	return <ModalComponent
		aria-labelledby={'dialog_label_success'}
		isOpen={isOpen}
		close={onClose}
	>
		<ModalComponent.Content>
			<div className={styles.content}>
				<CheckIcon circled={true} animate className={styles.contentIcon}/>
				<h1 id="dialog_label_success" className={styles.contentMessage}>
					Votre demande a bien été transmise !
				</h1>
				<ButtonComponent
					type="button"
					label="Fermer"
					onClick={onClose}
					title="Fermer, Revenir à la page"
				/>
			</div>
		</ModalComponent.Content>
	</ModalComponent>;
}
