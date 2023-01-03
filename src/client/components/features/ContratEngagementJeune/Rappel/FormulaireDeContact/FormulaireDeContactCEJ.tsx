import React, { FormEvent, PropsWithChildren, useState } from 'react';

import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { InputCommune } from '~/client/components/ui/Form/InputCommune/InputCommune';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { ageOptions } from '~/client/domain/selectAgeData';
import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';

import { SpinnerIcon } from '../../../../ui/Icon/spinner.icon';
import { DéchargeRGPD } from '../../../LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import styles from './FormulaireDeContactCEJ.module.scss';

interface FormulaireDeContactCEJProps {
  onSuccess?: () => void;
}

export default function FormulaireDeContactCEJ({ onSuccess }: PropsWithChildren<FormulaireDeContactCEJProps>) {
	const [inputAge, setInputAge] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const demandeDeContactService = useDependency<DemandeDeContactService>('demandeDeContactService');

	async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		setIsLoading(true);
		const response = await demandeDeContactService.envoyerPourLeCEJ({
			age: Number(data.get('age')),
			codeCommune: String(data.get('codeCommune')),
			email: String(data.get('mail')),
			nom: String(data.get('lastname')),
			nomCommune: String(data.get('libelleCommune')),
			prénom: String(data.get('firstname')),
			téléphone: String(data.get('phone')),

		});
		setIsLoading(false);

		if (isSuccess(response)) {
			if (onSuccess) {
				onSuccess();
			}
		} else {
			alert('Erreur dans l‘envoi du formulaire :' + response.errorType);
		}
	}

	return (
		<form
			className={styles.formulaire}
			onSubmit={envoyerFormulaireDeContact}
		>
			<InputText
				label="Prénom"
				name="firstname"
				autoFocus
				placeholder="Exemple : Jean"
				required
			/>
			<InputText
				label="Nom"
				name="lastname"
				placeholder="Exemple : Dupont"
				required
			/>
			<InputText
				type="email"
				label="Adresse email"
				name="mail"
				placeholder="Exemple : jean.dupont@gmail.com"
				required
			/>
			<InputText
				type="tel"
				pattern="^(\+33|0|0033)[1-9]\d{8}$"
				label="Téléphone"
				name="phone"
				placeholder="Exemple : 0606060606"
				required
			/>
			<Select
				required
				label="Age"
				name="age"
				optionList={ageOptions}
				onChange={setInputAge}
				value={inputAge}
			/>
			<InputCommune
				required
				id="autocomplete-commune"
				libellé=""
				code=""
				placeholder="Exemple: Paris, Béziers..."
				showRadius={false}
			/>
			{isLoading
				? (<ButtonComponent disabled icon={<SpinnerIcon />} iconPosition='left' label='Envoi en cours' />)
				: (<ButtonComponent className={styles.formulaireButton} label="Envoyer la demande" />)
			}

			<div className={styles.formulaireDécharge}>
				<DéchargeRGPD />
			</div>
		</form>
	);
}
