import React, { useState } from 'react';

import {
	FormulaireDeContactCEJ,
} from '~/client/components/features/ContratEngagementJeune/FormulaireContactCEJ/FormulaireContactCEJ';
import { ModalErrorSubmission } from '~/client/components/ui/Form/ModaleErrorSubmission/ModalErrorSubmission';
import { ModaleSuccessSubmission } from '~/client/components/ui/Form/ModaleSuccessSubmission/ModaleSuccessSubmission';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './ModaleDemandeContactCEJ.module.scss';

interface ModalDemandeDeContactCEJProps {
	isOpen: boolean
	setIsOpen: (value: boolean) => void
}

type formulaireStatus = 'notSubmitted' | 'error' | 'success'

export function ModaleDemandeContactCEJ({ isOpen, setIsOpen }: ModalDemandeDeContactCEJProps) {
	const [statusForm, setStatusForm] = useState<formulaireStatus>('notSubmitted');

	return (
		<>
			<ModalComponent
				isOpen={isOpen}
				close={() => setIsOpen(false)}
				aria-labelledby={'dialog_label'}
			>
				<ModalComponent.Title className={styles.modalTitle} id="dialog_label">
					J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé
				</ModalComponent.Title>
				<ModalComponent.Content>
					<small className={styles.modalSubTitle}>(Tous les champs sont obligatoires)</small>
					<FormulaireDeContactCEJ
						onSuccess={() => {
							setIsOpen(false);
							setStatusForm('success');
						}}
						onFailure={() => {
							setIsOpen(false);
							setStatusForm('error');
						}}/>
				</ModalComponent.Content>
			</ModalComponent>

			<ModaleSuccessSubmission isOpen={statusForm === 'success'} onClose={() => {
				setIsOpen(false);
				setStatusForm('notSubmitted');
			}}/>

			<ModalErrorSubmission
				isOpen={statusForm === 'error'}
				onClose={() => {
					setStatusForm('notSubmitted');
				}}
				onBackToForm={() => {
					setIsOpen(true);
					setStatusForm('notSubmitted');
				}}/>
		</>
	);
}
