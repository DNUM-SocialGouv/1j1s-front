import { useState } from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Accompagnement/Accompagnement.module.scss';
import {
	FormulaireDeContactCEJ,
} from '~/client/components/features/ContratEngagementJeune/FormulaireContactCEJ/FormulaireContactCEJ';
import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';
import { ModaleSuccessSubmission } from '~/client/components/ui/Form/ModaleSuccessSubmission/ModaleSuccessSubmission';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

type formulaireStatus = 'notSubmitted' | 'error' | 'success'

interface ModaleMissionLocaleProps {
	isMissionLocaleModaleOpen: boolean,
	setIsMissionLocaleModaleOpen: (modaleOpen: boolean) => void
}

export function ModaleMissionLocale({ isMissionLocaleModaleOpen, setIsMissionLocaleModaleOpen }: ModaleMissionLocaleProps) {
	const [statusForm, setStatusForm] = useState<formulaireStatus>('notSubmitted');
	return <>
		<ModalComponent
			isOpen={isMissionLocaleModaleOpen}
			close={() => setIsMissionLocaleModaleOpen(false)}
			aria-labelledby={'dialog_label'}
		>
			<ModalComponent.Title className={styles.accompagnementModalTitle} id="dialog_label">
				Vous pouvez bénéficier d’un accompagnement répondant à vos besoins auprès de votre Mission Locale
			</ModalComponent.Title>
			<ModalComponent.Content>
				<small className={styles.accompagnementModalSubTitle}>(Tous les champs sont obligatoires)</small>
				<FormulaireDeContactCEJ
					onSuccess={() => {
						setIsMissionLocaleModaleOpen(false);
						setStatusForm('success');
					}}
					onFailure={() => {
						setIsMissionLocaleModaleOpen(false);
						setStatusForm('error');
					}}/>
			</ModalComponent.Content>
		</ModalComponent>

		<ModaleSuccessSubmission isOpen={statusForm === 'success'} onClose={() => {
			setIsMissionLocaleModaleOpen(false);
			setStatusForm('notSubmitted');
		}}/>

		<ModalErrorSubmission isOpen={statusForm === 'error'} onClose={() => {
			setIsMissionLocaleModaleOpen(true);
			setStatusForm('notSubmitted');
		}}/>
	</>;
}
