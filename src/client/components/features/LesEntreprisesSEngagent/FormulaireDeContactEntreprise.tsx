import React, { FormEvent, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { TextArea } from '~/client/components/ui/Form/InputText/TextArea';
import { CheckIcon } from '~/client/components/ui/Icon/check.icon';
import { SpinnerIcon } from '~/client/components/ui/Icon/spinner.icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';

import styles from './FormulaireDeContactEntreprise.module.scss';

const EMAIL_REGEX = "^[a-zA-Z0-9!#$%&@'\u0022*+/=?^_`{|}~-]+(?:\\.[a-zA-Z0-9!#$%&'\u0022*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$";


export interface FormulaireDeContactProps {
  isOpen: boolean
  close: (...args: unknown[]) => unknown
}

export default function FormulaireDeContactEntreprise({ isOpen, close }: FormulaireDeContactProps) {
	const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');
	const [isLoading, setIsLoading] = useState(false);
	const [envoyé, setEnvoyé] = useState(false);

	async function envoyerDemandeDeContactEntreprise(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		setIsLoading(true);
		const response = await demandeDeContactService.envoyerPourLesEntreprisesSEngagent({
			email: String(data.get('email')),
			message: String(data.get('message')),
			nom: String(data.get('nom')),
			prénom: String(data.get('prénom')),
			sujet: String(data.get('sujet')),
			téléphone: String(data.get('téléphone')),

		});
		setIsLoading(false);

		if(isSuccess(response)) {
			setEnvoyé(true);
		} else {
			alert('Erreur dans l‘envoi du formulaire :' + response.errorType);
		}
	}
	
	return (
		<ModalComponent
			closeLabel=''
			isOpen={isOpen}
			close={close}
			className={styles.modal}
			aria-labelledby={envoyé ? 'dialog_label_envoyé' : 'dialog_label_formulaire'}>
			{
				!envoyé && <>
					<ModalComponent.Title className={styles.modalTitle}>
						<div id="dialog_label_formulaire">Contactez-nous</div>
						<div>
              (Tous les champs sont obligatoires)
						</div>
					</ModalComponent.Title>
					<ModalComponent.Content className={styles.modalContent}>
						<form
							onSubmit={envoyerDemandeDeContactEntreprise}
						>
							<div className={styles.formulaireDeRappel}>
								<InputText
									label="Prénom"
									name="prénom"
									autoFocus
									placeholder="Exemples : Marc, Sonia…"
									required
								/>
								<InputText
									label="Nom"
									name="nom"
									placeholder="Exemples : Ducourt, Marie"
									required
								/>
								<InputText
									pattern={EMAIL_REGEX}
									label="Adresse email"
									name="email"
									placeholder="Exemple : mail@exemple.com"
									required
								/>
								<InputText
									type="tel"
									pattern="^(\+33|0|0033)[1-9]\d{8}$"
									label="Téléphone"
									name="téléphone"
									placeholder="Exemple : 0199999999"
									required
								/>
							</div>
							<InputText
								className={styles.sujet}
								label="Sujet"
								name="sujet"
								placeholder="Exemple : Demande de contact"
								required
							/>
							<TextArea
								className={styles.textArea}
								label="Message"
								name="message"
								placeholder="Indiquez plus de détails sur votre demande"
								required
								rows={4}
							/>
							<div className={styles.formulaireDeRappelButton}>
								{ isLoading
									? (<ButtonComponent disabled icon={<SpinnerIcon />} iconPosition='left' label='Envoi en cours' />)
									: (<ButtonComponent label="Envoyer la demande" />)
								}
							</div>
							<div className={styles.décharge}>
								<DéchargeRGPD />
							</div>
						</form>
					</ModalComponent.Content>
				</>
			}
			{
				envoyé && <>
					<ModalComponent.Title className={styles.modalTitle}>
						<div id="dialog_label_envoyé">Votre demande a bien été transmise !</div>
					</ModalComponent.Title>
					<ModalComponent.Content>
						<div className={styles.success}>
							<CheckIcon circled={true} animate className={styles.successIcon} />
							<ButtonComponent label="Fermer" onClick={close} />
						</div>
					</ModalComponent.Content>
				</>
			}

		</ModalComponent>
	);
}
