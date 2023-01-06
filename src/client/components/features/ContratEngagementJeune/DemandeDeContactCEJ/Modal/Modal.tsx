import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import FormulaireDeContactCEJ
	from '~/client/components/features/ContratEngagementJeune/DemandeDeContactCEJ/Formulaire/Formulaire';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

import styles from './Modal.module.scss';

interface ModalDemandeDeContactCEJProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export function Modal(props: ModalDemandeDeContactCEJProps) {
	const { isOpen, setIsOpen } = props;
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		if (!isOpen) setIsSuccess(false);
	}, [isOpen]);

	function onFormulaireEnvoyé() {
		setIsSuccess(true);
	}

	return (
		<ModalComponent
			isOpen={isOpen}
			close={() => setIsOpen(false)}
			aria-labelledby={!isSuccess ? 'dialog_label' : 'dialog_label_success'}
		>
			{!isSuccess &&
        <ModalComponent.Title className={styles.modalTitle} id="dialog_label">
          J‘ai des questions sur le Contrat d‘Engagement Jeune et souhaite être rappelé
        </ModalComponent.Title>
			}
			<ModalComponent.Content
				className={classNames({ [styles.rappelContent]: !isSuccess, [styles.rappelContentSuccess]: isSuccess })}
			>
				{!isSuccess ? (
					<>
						<small className={styles.modalSubTitle}>(Tous les champs sont obligatoires)</small>
						<FormulaireDeContactCEJ onSuccess={() => onFormulaireEnvoyé() }>
							<ButtonComponent label='Fermer' onClick={ () => setIsOpen(false)} title="Fermer, Revenir à la page" />
						</FormulaireDeContactCEJ>
					</>
				) : (
					<div className={styles.success}>
						<CheckIcon circled={true} animate className={styles.successIcon}/>
						<h1 id="dialog_label_success" className={styles.successMessage}>Votre demande a bien été transmise !</h1>
						<ButtonComponent
							type="button"
							label="Fermer"
							onClick={() => setIsOpen(false)}
							title="Fermer, Revenir à la page"
						/>
					</div>
				)}
			</ModalComponent.Content>
		</ModalComponent>
	);
}
