import React, { FormEvent, useState } from 'react';

import { DéchargeRGPD } from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { ComboboxCommune } from '~/client/components/ui/Form/Combobox/ComboboxCommune/ComboboxCommune';
import { InputText } from '~/client/components/ui/Form/InputText/InputText';
import { SpinnerIcon } from '~/client/components/ui/Icon/spinner.icon';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { ageOptions } from '~/client/domain/selectAgeData';
import { BffDemandeDeContactService } from '~/client/services/demandeDeContact/bff.demandeDeContact.service';
import { isSuccess } from '~/server/errors/either';
import { emailRegex } from '~/shared/emailRegex';

import styles from './FormulaireContactCEJ.module.scss';

interface FormulaireDeContactCEJProps {
	isSuccessOnSubmit: (isSuccess: boolean) => void;
}

export function FormulaireDeContactCEJ({ isSuccessOnSubmit }: FormulaireDeContactCEJProps) {
	const [inputAge, setInputAge] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const demandeDeContactService = useDependency<BffDemandeDeContactService>('demandeDeContactService');

	async function envoyerFormulaireDeContact(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const form: HTMLFormElement = event.currentTarget;
		const data = new FormData(form);
		setIsLoading(true);
		const response = await demandeDeContactService.envoyerPourLeCEJ({
			age: Number(data.get('age')),
			codePostal: String(data.get('codePostal')),
			email: String(data.get('mail')),
			nom: String(data.get('lastname')),
			prénom: String(data.get('firstname')),
			téléphone: String(data.get('phone')),
			ville: String(data.get('ville')),
		});
		setIsLoading(false);
		if (isSuccess(response)) {
			isSuccessOnSubmit(true);
		} else {
			isSuccessOnSubmit(false);
		}
	}

	return (
		<form
			className={styles.formulaire}
			onSubmit={envoyerFormulaireDeContact}
			aria-label="formulaire cej"
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
				label="Adresse email"
				pattern={emailRegex}
				name="mail"
				placeholder="Exemple : jean.dupont@gmail.com"
				required
				type="text"
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
			<ComboboxCommune
				required
				label="Ville"
				name="commune"
			/>
			{isLoading
				? (<ButtonComponent
					className={styles.formulaireButton}
					disabled
					icon={<SpinnerIcon/>}
					iconPosition="left"
					label="Envoi en cours"/>)
				: (<ButtonComponent className={styles.formulaireButton} label="Envoyer la demande" type="submit"/>)
			}

			<div className={styles.formulaireDécharge}>
				<DéchargeRGPD/>
			</div>
		</form>
	);
}
