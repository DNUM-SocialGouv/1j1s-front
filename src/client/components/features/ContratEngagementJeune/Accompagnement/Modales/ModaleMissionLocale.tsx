import { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import {
	FormulaireDeContactCEJ,
} from '~/client/components/features/ContratEngagementJeune/FormulaireContactCEJ/FormulaireContactCEJ';
import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

type formulaireStatus = 'notSubmitted' | 'error' | 'success'

interface ModaleMissionLocale {
	missionLocaleModalOpen: boolean,
	onChangeMissionLocalModalIsOpen: (modaleOpen: boolean) => void
}

export function ModaleMissionLocale({ missionLocaleModalOpen, onChangeMissionLocalModalIsOpen }: ModaleMissionLocale) {
	const [statusForm, setStatusForm] = useState<formulaireStatus>('notSubmitted');
	return <>
		<ModalComponent
			isOpen={missionLocaleModalOpen}
			close={() => onChangeMissionLocalModalIsOpen(false)}
			aria-labelledby={'dialog_label'}
		>
			<ModalComponent.Title className={styles.accompagnementModalTitle} id="dialog_label">
				Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale
			</ModalComponent.Title>
			<ModalComponent.Content>
				<small className={styles.accompagnementModalSubTitle}>(Tous les champs sont obligatoires)</small>
				<FormulaireDeContactCEJ isSuccessOnSubmit={(isSuccess: boolean) => {
					onChangeMissionLocalModalIsOpen(false);
					setStatusForm(isSuccess ? 'success' : 'error');
				}}/>
			</ModalComponent.Content>
		</ModalComponent>

		<ModalComponent
			aria-labelledby={'dialog_label_success'}
			isOpen={statusForm === 'success'}
			close={() => {
				onChangeMissionLocalModalIsOpen(false);
				setStatusForm('notSubmitted');
			}}
		>
			<ModalComponent.Content>
				<div className={styles.accompagnementSuccess}>
					<CheckIcon circled={true} animate className={styles.accompagnementSuccessIcon}/>
					<ModalComponent.Title id="dialog_label_success" className={styles.accompagnementSuccessMessage}>
						Votre demande a bien été transmise !
					</ModalComponent.Title>
				</div>
			</ModalComponent.Content>
		</ModalComponent>

		<ModalErrorSubmission isOpen={statusForm === 'error'} onClose={() => {
			onChangeMissionLocalModalIsOpen(true);
			setStatusForm('notSubmitted');
		}}/>
	</>;
}
